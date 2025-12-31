<template>
    <div class="card card-body data-table table-result">
        <h5 class="mb-2">Resultado</h5>

        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <el-select
                    class="select-primary"
                    v-model="pagination.perPage"
                    placeholder="Por página"
                >
                    <el-option
                        class="select-primary"
                        v-for="item in pagination.perPageOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </div>

            <div class="col-6 col-md-5">
                <span class="text-default">
                    Número de resultados por página
                </span>
            </div>
        </div>

        <div class="el-result">
            <div
                class="el-result-item"
                v-for="(item, index) in queriedData"
                :key="index"
            >
                <div class="col-12 document-title d-flex justify-content-between align-items-center">
					<h1 class="m-0">Sentença</h1>
					<loading :active.sync="isLoadingInteiroTeor" />
					<el-button-group>
						<el-button
							class="btn-table button-responsive"
							icon="el-icon-document-copy"
							title="Copiar informações da sentença"
							@click="copySentenca(item)"
						></el-button>
						<el-button
							class="btn-primary button-responsive"
							icon="el-icon-download"
							title="Visualizar/baixar sentença"
							@click.prevent="downloadFile(item)"
						></el-button>
					</el-button-group>
				</div>
                <div
                    class="row"
                    v-for="(colunm, colunmIndex) in tableColumns"
                    :key="colunmIndex"
                >
                    <div class="col-12 col-md-3 form-group document-label">
                        <span class="text-bold">{{ colunm.label }}: </span>
                    </div>
                    <div class="col-12 col-md-9 form-group" v-if="colunm.prop == 'tribunalOrgao'">
                        <template>
                            {{ item['des_tribunal'] + " - " + item['des_orgao']}}
                        </template>
                    </div>
                    <div class="col-12 col-md-9 form-group" v-else-if="colunm.prop == 'num_processo'">
                        <template>
                            {{ numProcessoFormatado(item[colunm.prop]) }}
                        </template>
                    </div>
                    <div class="col-12 col-md-9 form-group" v-else-if="colunm.prop == 'data_juntada'">
                        <template>
                            {{ dataAutuacaoFormatada(item[colunm.prop]) }}
                        </template>
                    </div>
                    <div class="col-12 col-md-9 form-group" v-else-if="colunm.prop == 'des_assuntos'">
						<template>
                            {{ assuntosFormatados(item[colunm.prop]) }}
                        </template>
                    </div>
                    <div class="col-12 col-md-9 form-group" v-else>
                        <template>
                            {{ item[colunm.prop] }}
                        </template>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-3 form-group document-label">
                        <span class="text-bold">Texto: </span>
                    </div>

                    <div class="col-12 col-md-9 form-group">
                        <div class="content-container show" :class="'document_texto_encontrados' + item.index">
                            <div class="text-content"
                                style="max-height: 200px; overflow-y: auto;"
                                v-html="item.textoEncontrados">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="row mt-2">
            <div class="col-12 col-md-3">
                <p class="category">
                    Mostrando {{ from + 1 }} até {{ to }} de
                    {{ total }}
                </p>
            </div>
            <div class="col-md-9">
                <p-pagination
                    type="primary"
                    class="pull-right"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="pagination.total"
                    @click="onClickPagination"
                ></p-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import PPagination from 'src/components/UIComponents/Pagination.vue'
import { mapGetters } from 'vuex'
import http from '/src/http'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import NosConsulta from '@/enums/NosConsulta.js'

export default {
    data() {
        return {
            isLoadingInteiroTeor: false,
			nosConsulta: NosConsulta,
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 20, 30],
                total: 0,
            },
            searchQuery: '',
            propsToSearch: [
                'ementa_formatada',
                'num_processo',
                'des_classe',
                'Referencia',
                'nome_relator_acordao',
                'nome_relator',
                'Materia',
                'TipoDecisao',
                'data_publicacao_formatada',
                'data_julgamento_formatada',
                'texto',
            ],
            tableColumns: [
                {
                    prop: 'tribunalOrgao',
                    label: 'Tribunal/Órgão',
                    minWidth: 250,
                },
                {
                    prop: 'num_processo',
                    label: 'Número do Processo',
                    minWidth: 250,
                },
                {
                    prop: 'des_classe',
                    label: 'Classe Processual',
                    minWidth: 250,
                },
                {
                    prop: 'des_assuntos',
                    label: 'Assunto(s)',
                    minWidth: 250,
                },
                {
                    prop: 'data_juntada',
                    label: 'Juntada no Processo',
                    minWidth: 250,
                },
            ],
            tableData: []
        }
    },
    components: {
        Loading,
        PPagination,
    },
    computed: {
        ...mapGetters({
            publicSearch: 'publicSearch/publicSearch',
            publicSearchCollection: 'publicSearch/publicSearchCollection',
        }),
        pagedData() {
            return this.tableData.slice(this.from, this.to)
        },
        queriedData() {
            if (!this.searchQuery) {
                this.pagination.total = this.tableData.length
                return this.pagedData
            }

            let result = this.tableData.filter((row) => {
                let isIncluded = false
                for (let key of this.propsToSearch) {
                    try {
                        let rowValue = this.isEmpty(row[key])
                            ? ''
                            : String(row[key])
                        rowValue = rowValue.toLowerCase()
                        if (
                            rowValue.includes &&
                            rowValue.includes(this.searchQuery.toLowerCase())
                        ) {
                            isIncluded = true
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                return isIncluded
            })
            this.pagination.total = result.length
            return result.slice(this.from, this.to)
        },
        to() {
            let highBound = this.from + this.pagination.perPage
            if (this.total < highBound) {
                highBound = this.total
            }
            return highBound
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1)
        },
        total() {
            this.pagination.total = this.tableData.length
            return this.tableData.length
        },
    },
    methods: {
        setScrollTop(className) {
            setTimeout(() => {
                let section = $(className)
                if (section.length) {
                    let top = section.offset().top
                    $('html, body').animate(
                        {
                            scrollTop: top,
                        },
                        800
                    )
                }
            }, 300)
        },
        scrollTo(selector) {
            setTimeout(() => {
                let section = $(selector)
                if (section.length) {
                    let top = section.offset().top
                    $('html, body').animate({ scrollTop: top }, 800)
                }
            }, 300)
        },
        async getConteudo(id_tribunal,id_sentenca) {
            const { recuperarConteudo } = http.sentencas
            const data = {
                id_tribunal: id_tribunal,
                id_sentenca: id_sentenca,
                texto: this.form.texto
            }
			try {
                const matchingItem = this.nosConsulta.find(item => item.id == id_tribunal);
                if (matchingItem) {

					const config = {
                        timeout: matchingItem.timeout,
                        baseURL: matchingItem.endereco
                    }

                    const req = await recuperarConteudo(data, config);
                    let { inteiro_teor, tipo_inteiro_teor } = req;

                    return { inteiro_teor, tipo_inteiro_teor };
                } else {
                    console.error(`Não foi encontrado dado para o id_tribunal: ${id_tribunal}`);
                }
            } catch (error) {
                console.error(error)
            }
        },
        onClickPagination(value) {
            this.setScrollTop('table-result')
        },
		numProcessoFormatado(numProcesso) {
			// Preenche com zeros à esquerda até 20 caracteres
			const padded = numProcesso.padStart(20, '0');
			// Aplica a máscara no formato #######-##.####.#.##.####
			return `${padded.slice(0, 7)}-${padded.slice(7, 9)}.${padded.slice(9, 13)}.${padded.slice(13, 14)}.${padded.slice(14, 16)}.${padded.slice(16)}`;
		},
		dataAutuacaoFormatada(data) {
			if (!data) return '';
			const [year, month, day] = data.split('-');
			return `${day}/${month}/${year}`;
		},
		assuntosFormatados(data){
			return data.join('; ');
		},
		base64ToBlob(base64String, contentType) {
			const byteString = atob(base64String);

			const arrayBuffer = new ArrayBuffer(byteString.length);
			const uint8Array = new Uint8Array(arrayBuffer);
			for (let i = 0; i < byteString.length; i++) {
				uint8Array[i] = byteString.charCodeAt(i);
			}

			const blob = new Blob([uint8Array], { type: contentType });
			return blob;
		},
        async downloadFile(row) {
            try {

                if(!row.conteudo_full){
                    this.isLoadingInteiroTeor = true;
                    row.conteudo_full = await this.getConteudo(row.id_tribunal,row.id_sentenca);
                    this.isLoadingInteiroTeor = false;
                }

				var conteudo = this.base64ToBlob(row.conteudo_full.inteiro_teor);
				var tipo = row.conteudo_full.tipo_inteiro_teor == 'pdf' ? 'application/pdf' : 'text/html';
                var blob = new Blob([conteudo], { type: tipo });
				var url = URL.createObjectURL(blob);
				window.open(url, '_blank');
			} catch (error) {
                console.log(error)

                this.$notify({
                    title: 'Atenção!',
                    message: 'Erro ao buscar o arquivo. Tente novamente mais tarde',
                    type: 'warning',
                })
            }
        },
		copySentenca(row) {
			try {
				const textArea = document.createElement("textarea")

				textArea.value = 'Tribunal/Órgão: ' + row.des_tribunal + ' - ' + row.des_orgao + '\n'
				textArea.value += 'Número do Processo: ' + this.numProcessoFormatado(row.num_processo) + '\n'
				textArea.value += 'Classe Processual: ' + row.des_classe + '\n'
				textArea.value += 'Assunto(s): ' + this.assuntosFormatados(row.des_assuntos) + '\n'
				textArea.value += 'Juntada no Processo: ' + this.dataAutuacaoFormatada(row.data_juntada) + '\n\n'
				textArea.value += 'Texto: ' + row.texto + '\n'

				document.body.appendChild(textArea)
				textArea.select()
				document.execCommand('copy')
				document.body.removeChild(textArea)
			} catch (error) {
				return this.$message({
					message: 'Não foi possível copiar o conteúdo da sentença.',
					type: 'error',
				})
			}

			return this.$message({
				message: 'Conteúdo copiado para a área de transferência.',
				type: 'success',
			})
        },
        upCollection() {
            const { publicSearchCollection: collection } = this
            if (
                collection !== undefined &&
                collection !== null &&
                collection.length > 0
            ) {
                this.tableData = collection
            }
        },
    },
    props: ['form', 'classes'],
    mounted() {
        this.upCollection()
    },
}
</script>

<style>
.swal2-title {
  font-size: 22px;
}
.swal2-input {
  height: 200px;
}
</style>
