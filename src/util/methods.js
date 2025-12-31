import validator from 'src/util/validadores'
import moment from 'moment'
import {
	orderBy
} from 'natural-orderby'
import { trim } from 'lodash'

export default {
	methods: {
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
		capitalizeName(name) {
			if (name === undefined || name === '' || name === null) return ''
			let newName = name.toLowerCase()
			newName = newName.split(' ')
			newName = newName.map(item => {
				if (item.length <= 3 && item.includes('d')) {
					return item
				}
				return item = `${item[0].toUpperCase()}${item.slice(1, item.length)}`
			})
			newName = newName.join(' ')
			return newName
		},
		clearErrors() {
			for (let item in this.form.errors) {
				this.form.errors[item] = ''
			}
		},
		globalSort(data, prop, order) {
			let ret = ''
			//busca pelo padrao eng para a biblioteca funcionar: busca o não formatado
			if ((prop.includes('data') && prop.includes('_formatada')) ||
				(prop.includes('valor') && prop.includes('_formatada'))) {
				prop = prop.substring(0, prop.lastIndexOf('_formatada'))
			}

			let x = order != null ?
				order.includes('asc') ? 'asc' : 'desc' :
				'asc'

			ret = orderBy(
				data,
				[prop],
				[x]
			);
			return ret
		},
		isDate(date) {
			if (date === undefined || date === '' || date === null || date.length > 10) return false

			if (date.includes('-')) {
				return moment(date, 'YYYY-MM-DD', true).isValid();
			}
			return moment(date, 'DD/MM/YYYY', true).isValid();
		},
		dateBRToISO(date) {
			if (date === undefined || date === '' || date === null) return ''

			return date.slice(0, 10).split('/').reverse().join('-')
		},
		dateISOToBR(date) {
			if (date === undefined || date === '' || date === null) return ''

			return date.slice(0, 10).split('-').reverse().join('/')
		},
		validateCPF() {
			this.clearAllErrors()
			return validator.validate(this.form, this.form.errors, {
				cpf: this.form.cpf !== "" ? ['cpf'] : []
			}) && this.clearErrors('cpf')
		},
		validateCNPJ() {
			return validator.validate(this.form, this.form.errors, {
				cpf_cnpj: this.form.cpf_cnpj !== "" ? ['cnpj'] : []
			}) && this.clearErrors('cpf_cnpj')
		},
		validateMatricula() {
			this.clearAllErrors()
			return (
				validator.validate(this.form, this.form.errors, {
					matricula: this.form.matricula !== '' ? ['min:5', 'max:5'] : []
				}) && this.clearErrors('matricula')
			)
		},
		formatPhoneNumber(phoneNumberString) {
			var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
			if (cleaned.length === 10) {
				var match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
				if (match) {
					return '(' + match[1] + ') ' + match[2] + '-' + match[3]
				}
			} else if (cleaned.length === 11) {
				var match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
				if (match) {
					return '(' + match[1] + ') ' + match[2] + '-' + match[3]
				}
			}
			return null
		},
		emptyString(str) {
			return str === '';
		},
		getDatesByPeriod(start, end) {
			let dates = []
			start = this.$moment(start)
			end = this.$moment(end)

			while (start <= end) {
				dates.push(this.$moment(start).format('YYYY-MM-DD'))
				start = this.$moment(start).add(1, 'days')
			}

			return dates
		},
		treatNullField(field) {
			return field === null ? '' : field
		},
		treatNullFor(data) {
			for (let item in data)
				data[item] = data[item] === null ? "" : data[item]
		},
		treatBooleanField(field) {
			if (field !== "") {
				return field === "1" ? true : false
			}
			return false
		},
		treatBooleanFor(data) {
			for (let item in data)
				data[item] = data[item] === "1" ? true : (data[item] === "0" ? false : data[item])
		},
		setScrollTop(className) {
			setTimeout(() => {
				let section = $(className)
				if (section.length) {
					let top = section.offset().top
					$('html, body').animate({
						scrollTop: top
					}, 800)
				}

			}, 300)
		},
		formataStringData(data) {
			var dia = data.split('/')[0]
			var mes = data.split('/')[1]
			var ano = data.split('/')[2]
			var dataFinal =
				ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2)
			return dataFinal
		},
		getValueText(txtSearch, str) {
			var classe = '1';
			var processo = 'Processo'
			var referencia = 'Referência: Processo n.'
			var relator_acordao = 'Relator para o acórdão:'
			var relator = 'Relator:'
			var revisor = 'Revisor:'
			var julgamento = 'Julgamento:'
			var publicacao = 'Publicação:'
			var decisao = 'Decisão:'
			var materia = 'Matéria:'
			var ementa = 'EMENTA'
			var acordao = 'ACÓRDÃO'
			var relatorio = 'RELATÓRIO'

			var termosTxt = []
			var termosSearch = []
			var res = []
			var termos = [
				['classe', classe],
				['processo', processo],
				['referencia', referencia],
				['relator_acordao', relator_acordao],
				['relator', relator],
				['revisor', revisor],
				['julgamento', julgamento],
				['publicacao', publicacao],
				['decisao', decisao],
				['materia', materia],
				['ementa', ementa],
				['acordao', acordao],
				['relatorio', relatorio],
			]
			var res = []
			var i = 0
			termos.forEach((element) => {
				if (str.includes(element[1])) {
					termosTxt[i] = element[1]
				} else {
					i--
				}
				i++
			})
			var i = 0

			termos.forEach((element) => {
				if (str.includes(element[1])) {
					termosSearch[i] = element[1]
				} else {
					i--
				}
				i++
			})

			termosSearch.forEach(function callback(element, index) {
				if (txtSearch === element && index + 1 < termosSearch.length) {
					let strAnterior = element
					let strProxima = termosSearch[index + 1]
					let posicaoAnterior = str.indexOf(strAnterior)
					let posicaoProxima = str.indexOf(strProxima)
					let sizeAnterior = strAnterior.length
					let getText = str.substring(
						sizeAnterior + posicaoAnterior,
						posicaoProxima
					)
					var resultado_anterior =
						index == 0 ? getText.replace(/[^\d]/g, '') : getText

					if (classe == txtSearch) {
						
						return res.push(getText.trim())
					}

					if (txtSearch == 'ACÓRDÃO' && element == 'ACÓRDÃO') {
						res.push('ACÓRDÃO')
					} else if (txtSearch == 'EMENTA') {
						try {
							let textoEmenta = str.substring(str.indexOf("EMENTA"), str.lastIndexOf("ACÓRDÃO"))

							if(textoEmenta != '') {
								textoEmenta = textoEmenta.match(/EMENTA(.*)/)

								if(textoEmenta !== null) {
									res.push(textoEmenta[1].trim())
								} else {
									res.push('EMENTA')
								}
							} else {
								res.push('EMENTA')
							}
						} catch (error) {
							res.push('EMENTA')
						}
					} else if (txtSearch == 'RELATÓRIO') {
						res.push('RELATÓRIO')
					} else {
						res.push(resultado_anterior.trim())
					}
				} else {
					if (txtSearch == 'Matéria:' && element == 'Matéria:') {

						var posicao = str.indexOf(element) + element.length
						var ultimoTxt = str.substring(posicao, posicao + 9)
						if (ultimoTxt) {
							return ultimoTxt.includes('Cível') ?
								res.push('CI') :
								res.push('CR')
						}
					} else {
						if (
							txtSearch == element &&
							index + 1 == termosSearch.length
						) {
							var posicao = str.indexOf(element) + element.length
							var ultimoTxt = str.substring(
								posicao,
								posicao + 350
							)
							if (ultimoTxt) {
								res.push(ultimoTxt.trim())
							}
						}
					}
				}
			})

			return res[0]
		},

		removerCargo(texto) {
			if (texto === undefined) {
				return false
			}
			var saida = []
			var termos = ['Desembargador', 'DESEMBARGADOR', 'Des.', 'DES.', 'Juiz', 'JUIZ']

			var word = texto
			var i = 0
			termos.forEach((element) => {
				if (word.includes(element)) {
					saida[i] = element
				} else {
					i--
				}
				i++
			})

			if (saida.length != 0) {
				var sizeWord = saida[0].length
				var sizeText = word.length
				var newWord = word.substring(sizeWord, sizeText)

				return newWord.trim()
			} else {
				return word.trim()
			}

		},
		getMagistrados(object) {
			let arrObject = []

			for (let index = 0; index < object.length; index++) {
				let nome = this.removerCargo(object[index]['nome'])
				let magistrado = {
					Cd_Magistrado: object[index]['Cd_Magistrado'],
					NomeAbreviado: object[index]['NomeAbreviado'],
					nome: nome,
				}
				arrObject.push(magistrado)
			}
			return arrObject
		},
		formatNumero(Numero) {
			// SOMENTE NÚMEROS
			Numero = String(Numero.replace(/[^0-9]/g,''))

			if(Numero.length >= 16) {
				Numero = Numero.replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/, function(regex, arg1, arg2, arg3, arg4, arg5, arg6) {
					return arg1 + '-' + arg2 + '.' + arg3 + '.' + arg4 + '.' + arg5 + '.' + arg6;
				})
			}

			return Numero
		},
	}
}
