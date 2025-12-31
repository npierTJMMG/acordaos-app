import moment from 'moment'

export default {
	isEmpty(v, validateZero = true) {
		v = this.isNumber(v) ? Number(v) : v
		if (validateZero && v === 0) return true
		return v === undefined || v === null || v === '' || v.length === 0
	},
	isNumber(string) {
		let validation = /^\d+(,\d\d)?$/
		if (!validation.test(string)) return false
		if (typeof string == 'string' && string.match(/(\d+[,.]\d+)/)) return parseFloat(string)
		else if (typeof string == 'string' && string.match(/(\d+)/)) return parseInt(string)
		else if (typeof string == 'number') return string % 1 == 0 ? parseInt(string) : parseFloat(string)
	},
	isDate(date) {
		if (date === undefined || date === '' || date === null || date.length > 10) return false

		if (date.includes('-')) {
			return moment(date, 'YYYY-MM-DD', true).isValid();
		}
		return moment(date, 'DD/MM/YYYY', true).isValid();
	},
    isEmail(email) {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase());
    },
    isPhoneNumber(phoneNumber) {
        const expression = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

        return expression.test(String(phoneNumber).toLowerCase());
    },
    cpf(cpf) {
        let numeros
        let digitos
        let soma
        let resultado
        let digitos_iguais = 1

        cpf = cpf
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
        cpf = cpf.trim()

        if (cpf.length < 11) {
            return false
        }

        for (let i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0
                break
            }
        }

        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9)
            digitos = cpf.substring(9)
            soma = 0

            for (let i = 10; i > 1; i--) {
                soma += numeros.charAt(10 - i) * i
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

            if (resultado != digitos.charAt(0)) {
                return false
            }

            numeros = cpf.substring(0, 10)
            soma = 0

            for (let i = 11; i > 1; i--) {
                soma += numeros.charAt(11 - i) * i
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

            if (resultado != digitos.charAt(1)) {
                return false
            }

            return true
        } else {
            return false
        }
    },
    cnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '')

        if (cnpj == '') return false
        if (cnpj.length != 14) {
            return false
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho)
        var digitos = cnpj.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(0)) {
            return false
        }

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1)) {
            return false
        }

        return true
    },
    currentDate(date) {
        if (date === undefined || date === null || date === '') return true
        var CurrentDate = moment().toDate()
        var GivenDate = moment(date, date.includes('/') ? 'DD/MM/YYYY' : 'YYYY-MM-DD').toDate()
        return GivenDate < CurrentDate
    },
    currentYear(year) {
        let currentYear = new Date().getFullYear()
        return year > currentYear
    },
    minDate(date) {
        if (date === null || date === undefined || date === '') {
            return true
        }
        var minDate = new Date('1900-01-01')
        var GivenDate = new Date(date)
        return GivenDate >= minDate
    },
    maxDate(date, max) {
        var maxDate = new Date(max)
        var GivenDate = new Date(date)
        return GivenDate <= maxDate
    },
	minimumDate(d, m) {
        if (this.isEmpty(d) || this.isEmpty(m)) return true
        if (!this.isDate(d) || !this.isDate(m)) return false
        var gd = moment(d), md = moment(m)
        return gd >= md
    },
    diferenceBetweenDates(date1, date2) {
        var inicial = new Date(date1)
        var final = new Date(date2)
        return inicial.toDateString() === final.toDateString() ? true : inicial < final
    },
    biggestDate(minDate, date) {
        if (minDate === null || minDate === undefined || minDate === '') return true
        minDate = minDate.includes('-') ? moment(minDate).toDate() : moment(minDate, 'DD/MM/YYYY').toDate()
        date = date.includes('-') ? moment(date).toDate() : moment(date, 'DD/MM/YYYY').toDate()

        if (minDate > date) {
            return false
        }

        return true
    },
    sameDate(date1, date2) {
        date1 = new Date(date1)
        date2 = new Date(date2)

        if (date1.toDateString() !== date2.toDateString()) {
            return false
        }

        return true
    },
    duplicateValue(value, arr) {
        arr = arr.split(',');
        let filter = arr.filter(item => item !== "")
        filter = filter.filter(item => parseInt(item) === parseInt(value))
        if (filter.length > 0) {
            return false
        }
        return true
    },

    maxValue(max, value) {
        if (value === '' || parseInt(value) <= 0 || max === '' || parseInt(max) <= 0) return true
        return parseInt(value) <= parseInt(max)
    },
    minValue(min, value) {
        if (value === '') return true
        if (value < min) {
            return false
        }
        return true
    },
    maxFileSize(file, maxFileSize) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        let maxExt = maxFileSize.replace(/[^a-zA-Z]+/g, '')
        let maxValue = parseInt(maxFileSize.replace(/[^0-9]+/g, ''))
        let indexOf = sizes.indexOf(maxExt)

        if (Array.isArray(file)) {
            for (let i in file) {
                let { size } = file[i]
                let index = parseInt(Math.floor(Math.log(size) / Math.log(1024)))
                let sizeOfFile = Math.round(size / Math.pow(1024, index), 2)
                if (index > indexOf) return false
                if (index === indexOf) {
                    if (sizeOfFile > maxValue) {
                        return false
                    }
                }
            }
        }
        let { size } = file
        let index = parseInt(Math.floor(Math.log(size) / Math.log(1024)))
        let sizeOfFile = Math.round(size / Math.pow(1024, index), 2)
        if (index > indexOf) return false
        if (index === indexOf) {
            if (sizeOfFile > maxValue) {
                return false
            }
        }
        return true


    },
    isEmpty(value) {
        if (value === undefined) return false
        if (value === null) return false
        if (value === '') return false
        if (value.length === 0) return false
        return true
    },
    validate(form, errors, rules) {
        for (let rule in rules) {
            for (let data in rules[rule]) {
                const field = rules[rule][data]
                let func = field.includes(':') ? field.split(':')[0] : field
                let param = field.includes(':') ? field.split(':')[1] : null

                if (!this.callValidateFunction(form[rule])[func](param)) {
                    if (param !== null) {
                        errors[rule] = this.callValidateMessage()[func](param)
                    } else {
                        errors[rule] = this.callValidateMessage()[func]
                    }
                    console.log(rule)
                    console.log(param)
                    return false
                }
            }
        }
        return true
    },
    callValidateFunction(value) {
        return {
            maxFileSize: max => this.maxFileSize(value, max),
            required: () => this.isEmpty(value),
            cpf: () => this.cpf(value),
            minDate: () => this.minDate(value),
            maxDate: max => this.maxDate(value, max),
            currentDate: () => this.currentDate(value),
            image: () => value.type === "image/png" || value.type == "image/jpg" ? true : false,
            imageSize: () => value.size > 2097152 ? false : true,
            minYear: () => value > 1900,
            currentYear: () => value <= new Date().getFullYear(),
            email: () => this.isEmail(value),
            phone: () => this.isPhoneNumber(value),
            min: min => value.length >= min,
            max: max => value.length <= max,
            difDate: date => this.biggestDate(date, value),
            cnpj: () => this.cnpj(value),
            minValue: min => this.minValue(min, value),
            maxValue: (max) => this.maxValue(max, value),
            minStringInvert: min => String(value) <= String(min),
            exactSize: size => value.length >= size,
            sameString: (str) => value !== str,
            sameDate: (date) => this.sameDate(date, value),
            duplicateValue: arr => this.duplicateValue(value, arr),
			minimumDate: maximum => this.minimumDate(value, maximum),        }
    },
    callValidateMessage() {
        return {
            required: 'Campo obrigatório',
            cpf: 'Formato de cpf inválido',
            minDate: 'A data não pode ser anterior a 1900',
            maxDate: max => {
                let date = max.split('-')
                date = `${date[2]}/${date[1]}/${date[0]}`
                return `A data não pode ser maior que ${date}`
            },
            currentDate: 'A data não pode ser superior a data atual',
            image: 'O arquivo deve ser uma imagem do tipo png ou jpg',
            imageSize: 'O tamanho do arquivo não pode ser maior que 2MB',
            minYear: 'A data não pode ser menor que 1900',
            currentYear: 'A data não pode ser maior que o ano atual',
            email: 'formato de email inválido',
            phone: 'Formato de telefone inválido',
            min: min => `O campo deve conter no mínimo ${min} caracteres`,
            max: max => `O campo deve conter no máximo ${max} caracteres`,
            difDate: date => {
                date = date.includes('-') ? moment(date).format('DD/MM/YYYY') : moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
                return `A data não pode ser menor que ${date}`
            },
            cnpj: 'Formato de cnpj inválido',
            minValue: min => `O campo deve ter um valor maior ou igual a ${min}`,
            maxValue: max => `O campo deve ter um valor menor ou igual a ${max}`,
            minStringInvert: min => `O campo deve ter um valor maior ou igual a ${min}`,
            exactSize: size => `O campo deve ter ${size} caracteres`,
            sameString: str => 'O campo dever equivalente',
            sameDate: date => {
                date = date.split('-')
                date = `${date[2]}/${date[1]}/${date[0]}`
                return `A data deve ser equivalente a ${date}`
            },
            duplicateValue: () => 'Valor duplicado.',
            maxFileSize: max => `Arquivo não pode ser maior que ${max}`,
			minimumDate: minimum => {
                const date = moment(minimum).format('DD/MM/YYYY')
                return `A data não pode ser menor que ${date}`
            },
        }
    }

}
