// ------------------------------ <==============================> ------------------------------ //
// Módulo de validação e manipulação de CPFs e CNPJs
// ------------------------------ <==============================> ------------------------------ //

// Retorna os dígitos de verificação de um CPF sem pontuação
const getCpfDigits = (cpf) => {
	let a = 0, b = 0;
	for (let i=0; i<9; ++i) {
		const dig = parseInt(cpf[i]);
		a += (10 - i)*dig;
		b += (11 - i)*dig;
	}
	a = 11 - a%11;
	if (a > 9) a = 0;
	b = 11 - (b + a*2)%11;
	if (b > 9) b = 0;
	return a.toString() + b;
};

// Verifica se uma string contém um CPF válido
const isCpfValid = (cpf) => {
	if (cpf.length === 11) {
		return getCpfDigits(cpf) === cpf.substr(9);
	}
	if (cpf.length === 14) {
		if (cpf[3] !== '.' || cpf[7] !== '.' || cpf[11] !== '-') {
			return false;
		}
		return getCpfDigits(filterCpf(cpf)) === cpf.substr(12);
	}
	return false;
};

// Formata um CPF adicionando pontuação
const formatCpf = (cpf) =>
	cpf.length !== 11?
		cpf:
			cpf.substr(0, 3) + '.' +
			cpf.substr(3, 3) + '.' +
			cpf.substr(6, 3) + '-' +
			cpf.substr(9);

// Remove a pontuação de um CPF
const filterCpf = (cpf) =>
	cpf.length !== 14?
		cpf:
			cpf.substr(0, 3) +
			cpf.substr(4, 3) +
			cpf.substr(8, 3) +
			cpf.substr(12);

// Retorna os dígitos de verificação de um CNPJ sem pontuação
const getCnpjDigits = (cnpj) => {
	let a = 0, b = 0;
	for (let i=0; i<12; ++i) {
		const dig = parseInt(cnpj[i]);
		a += dig*(9 - ((i + 4)&7));
		b += dig*(9 - ((i + 3)&7));
	}
	a = 11 - a%11;
	if (a > 9) a = 0;
	b = 11 - (b + a*2)%11;
	if (b > 9) b = 0;
	return a.toString() + b;
};

// Verifica se uma string contém um CNPJ válido
const isCnpjValid = (cnpj) => {
	if (cnpj.length === 14) {
		return getCnpjDigits(cnpj) === cnpj.substr(12);
	}
	if (cnpj.length === 18) {
		if (cnpj[2] !== '.' || cnpj[6] !== '.' || cnpj[10] !== '/' || cnpj[15] !== '-') {
			return false;
		}
		return getCnpjDigits(filterCnpj(cnpj)) === cnpj.substr(16);
	}
	return false;
};

// Formata um CNPJ adicionando pontuação
const formatCnpj = (cnpj) =>
	cnpj.length !== 14?
		cnpj:
			cnpj.substr(0, 2) + '.' +
			cnpj.substr(2, 3) + '.' +
			cnpj.substr(5, 3) + '/' +
			cnpj.substr(8, 4) + '-' +
			cnpj.substr(12);

// Remove a pontuação de um CNPJ
const filterCnpj = (cnpj) =>
	cnpj.length !== 18?
		cnpj:
			cnpj.substr(0, 2) +
			cnpj.substr(3, 3) +
			cnpj.substr(7, 3) +
			cnpj.substr(11, 4) +
			cnpj.substr(16);

// Verifica se uma string contém um CPF ou CNPJ válido
const isCpfCnpjValid = (str) => {
	const {length} = str;
	if (length === 11) {
		return isCpfValid(str);
	}
	if (length === 18) {
		return isCnpjValid(str);
	}
	if (length !== 14) {
		return false;
	}
	return str[3] === '.'? isCpfValid(str): isCnpjValid(str);
};

// Formata um CPF ou CNPJ adicionando pontuação
const filterCpfCnpj = (str) => {
	const {length} = str;
	if (length === 18) {
		return filterCnpj(str);
	}
	if (length === 14 && str[3] === '.') {
		return filterCpf(str);
	}
	return str;
};

// Remove a pontuação de um CPF ou CNPJ
const formatCpfCnpj = (str) => {
	const {length} = str;
	if (length === 11) {
		return formatCpf(str);
	}
	if (length === 14 && str[3] !== '.') {
		return formatCnpj(str);
	}
	return str;
};

// ------------------------------ <==============================> ------------------------------ //
// Público

module.exports.isValid = isCpfCnpjValid;
module.exports.format = formatCpfCnpj;
module.exports.filter = filterCpfCnpj;

module.exports.Cpf = {
	isValid: isCpfValid,
	format: formatCpf,
	filter: filterCpf,
};

module.exports.Cnpj = {
	isValid: isCnpjValid,
	format: formatCnpj,
	filter: filterCnpj,
};

module.exports.CpfCnpj = {
	isValid: isCpfCnpjValid,
	format: formatCpfCnpj,
	filter: filterCpfCnpj,
};

// ------------------------------ <==============================> ------------------------------ //
