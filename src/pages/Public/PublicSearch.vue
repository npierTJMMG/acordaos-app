<template>
    <main>
        <div class="login-page" id="searchFormFrame">
            <div class="container">
                <div class="card card-body">
                    <div class="row">
                        <div class="col col-12">
                            <form @submit.prevent="submitForm" v-if="isMobile">

                                <div class="row mb-3">
                                    <div class="form-group col-12 col-sm-12 col-md-12">
										<h5>Pesquisa livre</h5>
										<el-tooltip placement="top">
											<div slot="content">Busque por qualquer palavra ou termo. Use aspas duplas para buscar pelo termo exato.</div>
											<input v-model="form.texto"
												:disabled="loading"
												ref="searchFilter" class="form-control" placeholder="Pesquisar..."
											/>
										</el-tooltip>
                                    </div>
                                </div>

                                <div class="row" v-if="isAvancada">
                                    <div class="form-group col-12 col-sm-12 col-md-6">
                                        <label>Classes</label>

                                        <el-select
                                            :disabled="loading"
                                            v-model="form.ids_classes"
                                            clearable multiple
                                            class="select-primary" placeholder="Selecione as classes">
                                            <el-option
                                                v-for="classe in classesSelect"
                                                :key="classe.id"
                                                :label="classe.descricao"
                                                :value="classe.id">
                                            </el-option>
                                        </el-select>
                                    </div>

                                    <div class="form-group col-12 col-sm-12 col-md-6">
                                        <label>Assuntos</label>
                                        <el-select
                                            :disabled="loading"
                                            v-model="form.ids_assuntos"
                                            clearable filterable multiple
                                            class="select-primary" placeholder="Selecione os assuntos">
                                            <el-option
                                                v-for="assunto in assuntosSelect"
                                                :key="assunto.id"
                                                :label="assunto.descricao + ' (' + assunto.id + ')'"
                                                :value="assunto.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>

                                <div class="row" v-if="isAvancada">
                                    <div class="form-group col-12 col-sm-12 col-md-12 mt-4">
                                        <label>Justiças e Órgãos</label>
                                        <fieldset>
                                            <legend><el-checkbox :disabled="loading" :indeterminate="isTribunaisIndeterminate" v-model="allTribunaisChecked" @change="handleCheckAllTribunaisChange">Todas as Justiças/Órgãos</el-checkbox></legend>

                                            <el-checkbox-group :disabled="loading" v-model="form.tribunais" >
                                                <span class="form-group col-12 col-sm-3 col-md-3 mt-4" v-for="tribunal in tribunaisCheckbox">
                                                    <el-checkbox class="form-group mt-2" :indeterminate="tribunal.indeterminate" @change="(status) => handleCheckedTribunaisChange(tribunal.id, status)" :label="tribunal.id" :key="tribunal.id">{{tribunal.descricao}}</el-checkbox>
                                                </span>
                                            </el-checkbox-group>
                                            <div class="row mt-4">
                                                <div class="form-group col-12 col-sm-12 col-md-12">
                                                    <el-select
                                                        :disabled="loading"
                                                        @change="handleSelectOrgaosChange"
                                                        v-model="form.ids_orgaos"
                                                        clearable multiple
                                                        class="select-primary" placeholder="Selecione os órgãos de cada tribunal">
                                                        <el-option
                                                            v-for="orgao in orgaosSelect"
                                                            :key="orgao.id"
                                                            :label="orgao.descricao"
                                                            :value="orgao.id">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </div>
                                </div>

                                <div class="row" v-if="isAvancada">
                                    <div class="form-group col-12 col-sm-12 col-md-6 mt-2">
                                        <fieldset>
                                            <legend>Data de juntada da sentença</legend>
                                            <div class="row">
                                                <div class="form-group col-12 col-sm-12 col-md-6">
                                                    <label>De</label>
                                                    <input
                                                        v-model="form.data_inicio"
                                                        :disabled="loading"
                                                        class="form-control"
                                                        :class="form.errors.data_inicio && 'is-invalid'"
                                                        type="date"/>
                                                    <small class="text-danger" role="alert">
                                                        <strong>{{form.errors.data_inicio}}</strong>
                                                    </small>
                                                </div>

                                                <div class="form-group col-12 col-sm-12 col-md-6">
                                                    <label>Até</label>
                                                    <input
                                                        v-model="form.data_fim"
                                                        :disabled="loading" class="form-control"
                                                        :class="form.errors.data_fim && 'is-invalid'"
                                                        type="date"
                                                    />

                                                    <small class="text-danger" role="alert">
                                                        <strong>{{
                                                            form.errors.data_fim
                                                        }}</strong>
                                                    </small>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

								<div class="row">
                                    <div class="form-group col-12 col-sm-12 col-md-6 mt-2">
                                        <fieldset>
                                            <legend>Ordenar por</legend>
                                            <div class="row">
                                                <div class="form-group col-12 col-md-6">
                                                    <el-radio v-model="form.ordenacao" label="desc">Mais novos primeiro</el-radio>
                                                </div>
                                                <div class="form-group col-12 col-md-6">
                                                    <el-radio v-model="form.ordenacao" label="asc">Mais antigos primeiro</el-radio>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="
                                            form-group
                                            col-12 col-sm-12 col-md-12
                                        ">
                                        <button :disabled="loading" class="float-right ml-sm-2 btn btn-primary btn-round btn-xs-block">
                                            <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                                            <i v-else class="fa fa-search"></i>
                                            Buscar
                                        </button>
										<button type="button" class="float-right ml-sm-2 btn btn-table btn-round btn-xs-block" @click="mudarPesquisa()" round>
                                            {{ tipoBusca }}
                                        </button>

                                        <button @click.prevent="resetForm" class="
                                                float-right
                                                ml-sm-2
                                                btn
                                                btn-outline-default
                                                btn-round
                                                btn-xs-block
                                            ">
                                            Limpar
                                        </button>
                                    </div>
                                </div>
                            </form>
							<form @submit.prevent="submitForm" v-else>

                                <div class="row mb-3">
                                    <div class="form-group col-12 col-sm-12 col-md-12">
										<h5>Pesquisa livre</h5>
										<el-tooltip placement="top">
											<div slot="content">Busque por qualquer palavra ou termo. Use aspas duplas para buscar pelo termo exato.</div>
											<input v-model="form.texto"
												:disabled="loading"
												ref="searchFilter" class="form-control" placeholder="Pesquisar..."
											/>
										</el-tooltip>
                                    </div>
                                </div>

								<h6>Pesquisa Avançada</h6>

                                <div class="row">
                                    <div class="form-group col-12 col-sm-12 col-md-6">
                                        <label>Classes</label>

                                        <el-select
                                            :disabled="loading"
                                            v-model="form.ids_classes"
                                            clearable multiple
                                            class="select-primary" placeholder="Selecione as classes">
                                            <el-option
                                                v-for="classe in classesSelect"
                                                :key="classe.id"
                                                :label="classe.descricao"
                                                :value="classe.id">
                                            </el-option>
                                        </el-select>
                                    </div>

                                    <div class="form-group col-12 col-sm-12 col-md-6">
                                        <label>Assuntos</label>
                                        <el-select
                                            :disabled="loading"
                                            v-model="form.ids_assuntos"
                                            clearable filterable multiple
                                            class="select-primary" placeholder="Selecione os assuntos">
                                            <el-option
                                                v-for="assunto in assuntosSelect"
                                                :key="assunto.id"
                                                :label="assunto.descricao + ' (' + assunto.id + ')'"
                                                :value="assunto.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group col-12 col-sm-12 col-md-12 mt-4">
                                        <label>Justiças e Órgãos</label>
                                        <fieldset>
                                            <legend><el-checkbox :disabled="loading" :indeterminate="isTribunaisIndeterminate" v-model="allTribunaisChecked" @change="handleCheckAllTribunaisChange">Todas as Justiças/Órgãos</el-checkbox></legend>

                                            <el-checkbox-group :disabled="loading" v-model="form.tribunais" >
                                                <span class="form-group col-12 col-sm-3 col-md-3 mt-4" v-for="tribunal in tribunaisCheckbox">
                                                    <el-checkbox class="form-group mt-2" :indeterminate="tribunal.indeterminate" @change="(status) => handleCheckedTribunaisChange(tribunal.id, status)" :label="tribunal.id" :key="tribunal.id">{{tribunal.descricao}}</el-checkbox>
                                                </span>
                                            </el-checkbox-group>
                                            <div class="row mt-4">
                                                <div class="form-group col-12 col-sm-12 col-md-12">
                                                    <el-select
                                                        :disabled="loading"
                                                        @change="handleSelectOrgaosChange"
                                                        v-model="form.ids_orgaos"
                                                        clearable multiple
                                                        class="select-primary" placeholder="Selecione os órgãos de cada tribunal">
                                                        <el-option
                                                            v-for="orgao in orgaosSelect"
                                                            :key="orgao.id"
                                                            :label="orgao.descricao"
                                                            :value="orgao.id">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group col-12 col-sm-12 col-md-6 mt-2">
                                        <fieldset>
                                            <legend>Data de juntada da sentença</legend>
                                            <div class="row">
                                                <div class="form-group col-12 col-sm-12 col-md-6">
                                                    <label>De</label>
                                                    <input
                                                        v-model="form.data_inicio"
                                                        :disabled="loading"
                                                        class="form-control"
                                                        :class="form.errors.data_inicio && 'is-invalid'"
                                                        type="date"/>
                                                    <small class="text-danger" role="alert">
                                                        <strong>{{form.errors.data_inicio}}</strong>
                                                    </small>
                                                </div>

                                                <div class="form-group col-12 col-sm-12 col-md-6">
                                                    <label>Até</label>
                                                    <input
                                                        v-model="form.data_fim"
                                                        :disabled="loading" class="form-control"
                                                        :class="form.errors.data_fim && 'is-invalid'"
                                                        type="date"
                                                    />

                                                    <small class="text-danger" role="alert">
                                                        <strong>{{
                                                            form.errors.data_fim
                                                        }}</strong>
                                                    </small>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

								<div class="row">
                                    <div class="form-group col-12 col-sm-12 col-md-6 mt-2">
                                        <fieldset>
                                            <legend>Ordenar por</legend>
                                            <div class="row">
                                                <div class="form-group col-12 col-md-6">
                                                    <el-radio v-model="form.ordenacao" label="desc">Mais novos primeiro</el-radio>
                                                </div>
                                                <div class="form-group col-12 col-md-6">
                                                    <el-radio v-model="form.ordenacao" label="asc">Mais antigos primeiro</el-radio>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="
                                            form-group
                                            col-12 col-sm-12 col-md-12
                                        ">
                                        <button :disabled="loading" class="float-right ml-sm-2 btn btn-primary btn-round btn-xs-block">
                                            <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                                            <i v-else class="fa fa-search"></i>
                                            Buscar
                                        </button>

                                        <button @click.prevent="resetForm" class="
                                                float-right
                                                ml-sm-2
                                                btn
                                                btn-outline-default
                                                btn-round
                                                btn-xs-block
                                            ">
                                            Limpar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="resultTableFrame" class="container" style="text-align: left">
                <result-table  :form="form" v-if="publicSearchCollection !== null" />
            </div>
        </div>
    </main>
</template>

<script>
import http from '@/http'
import NProgress from 'nprogress'
import validator from '@/util/validadores'
import AssuntosEnum from '@/enums/AssuntosEnum'
import ClassesEnum from '@/enums/ClassesEnum'
import NosConsulta from '@/enums/NosConsulta.js'
import OrgaosEnum from '@/enums/OrgaosEnum'
import TribunaisEnum from '@/enums/TribunaisEnum'
import { mapGetters, mapActions } from 'vuex'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import ResultTable from 'src/components/ResultTable.vue'

export default {
    data() {
        return {
            cliques: 0,
            assuntosSelect: AssuntosEnum,
            classesSelect: ClassesEnum,
            tribunaisCheckbox: TribunaisEnum,
			numTribunaisSelecionados: 0,
            orgaosSelect: OrgaosEnum,
            allTribunaisChecked: false,
            isTribunaisIndeterminate: false,
            loading: false,
            form: {
                ids_assuntos: [],
                ids_classes: [],
                tribunais: [],
                ids_orgaos: [],
                texto: '',
                data_inicio: '',
                data_fim: '',
				ordenacao: 'desc',
                errors: {
                    data_inicio: '',
                    data_fim: '',
                },
            },
			nosConsulta: NosConsulta,
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [5, 10, 20, 30],
                total: 0,
            },
            searchQuery: '',
            tableData: [],
            isAvancada: false,
            tipoBusca: 'Busca Avançada',
			isMobile: window.innerWidth < 768,
        }
    },
    components: {
        PPagination,
        ResultTable,
    },
    computed: {
        ...mapGetters({
            publicSearch: 'publicSearch/publicSearch',
            publicSearchCollection: 'publicSearch/publicSearchCollection',
        }),
        pagedData() {
            return this.tableData.slice(this.from, this.to)
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
        ...mapActions({
            setPublicSearch: 'publicSearch/setPublicSearch',
            setPublicSearchCollection: 'publicSearch/setPublicSearchCollection',
        }),
		mudarPesquisa() {

            document.getElementById('searchFormFrame').scrollIntoView()

            this.isAvancada = !this.isAvancada

            if (this.isAvancada==false){
                this.tipoBusca = 'Busca Avançada'
            } else {
                this.tipoBusca = 'Busca Simples'
            }

            this.limparPesquisaAvançada();
        },
        tableSort({ prop, order }) {
            this.globalSort(this.tableData, prop, order)
            this.pagination.currentPage = 1
        },
        async completeWithZeros(string, step) {
            let range = (start, end) =>
                [...Array(end - start + 1)].map((_, i) => start + i)
            if (string.length < step) {
                await range(string.length + 1, step).map((i) => (string += '0'))
            }
            return string
        },
        resetForm() {
            this.form.texto = '';

			this.limparPesquisaAvançada()

            this.setPublicSearch(null)
            this.setPublicSearchCollection(null)

        },
		limparPesquisaAvançada() {
            this.form.ids_assuntos = [];
            this.form.ids_classes = [];
            this.form.tribunais = [];
            this.form.ids_orgaos = [];
            this.form.data_inicio = '';
            this.form.data_fim = '';
            this.form.errors.data_inicio = '';
			this.allTribunaisChecked = false;
			this.isTribunaisIndeterminate = false;
			this.tribunaisCheckbox.forEach(obj => obj.indeterminate = false);

            document.getElementById('searchFormFrame').scrollIntoView()
        },
        async fetchData() {
            NProgress.start()
            this.loading = true

            NProgress.done()
            this.loading = false
        },
        submitForm() {
            this.search()
        },
        treatDataTable(data) {
            if (Array.isArray(data)) {
                data.map((item) => {
                    item['textoEncontrados'] = item.texto

                    return item
                })
                data.map((item, index) => {
                    item = this.treatNullFor(item)
                })
            }
            return data
        },
        treatData() {
            const { form } = this
            let data = {}

            Object.entries(form).map(([k, v]) => {
                if (k !== 'errors') {
                    data[k] = v
                }
            })

            return data
        },
        async search() {
            NProgress.start()
            this.loading = true

            const { searchData } = http.sentencas
            const data = this.treatData()
            this.setPublicSearch(this.form)
            this.setPublicSearchCollection(null)
            this.tableData = []
			let mensagensSucessoModal = ''
			let mensagensErroModal = ''
            let retornadas = 0
            let encontradas = 0

            try {
                const promises = this.nosConsulta.map((item) => {

                    const dataWithEndereco = { ...data }

                    const config = {
                        timeout: item.timeout,
                        baseURL: item.endereco
                    }

                    return searchData(dataWithEndereco, config)
                        .then((response) => {
                            let { sentencas, qtd_sentencas, retornados } = response
                            sentencas = this.treatDataTable(sentencas)
							mensagensSucessoModal = true

                            retornadas += retornados
                            encontradas += qtd_sentencas

                            return sentencas
                        })
                        .catch((error) => {
                            console.error(`Erro com o endereço ${item.endereco}:`, error.message)
							mensagensErroModal+= ` ${item.descricao}; `
                            return []
                        })
                })

                // Aguarda todas as promessas (requisições ou timeouts) serem resolvidas
                const results = await Promise.all(promises)

                mensagensErroModal = mensagensErroModal.slice(0, -1)

				this.showReturnMessage(mensagensSucessoModal, mensagensErroModal, encontradas, retornadas)

                // Combina os resultados em um único array
                const combinedSentencas = results.flat()

				if (this.form.ordenacao=='asc'){
					combinedSentencas.sort((a, b) => {
						// Primeiro compara data_juntada de forma crescente
						if (a.data_juntada < b.data_juntada) return -1;
						if (a.data_juntada > b.data_juntada) return 1;

						// Se as datas forem iguais, compara des_classe em ordem alfabética crescente
						if (a.des_classe < b.des_classe) return -1;
						if (a.des_classe > b.des_classe) return 1;

						return 0;
					});
				} else {
					combinedSentencas.sort((a, b) => {
						// Primeiro compara data_juntada de forma decrescente
						if (a.data_juntada > b.data_juntada) return -1;
						if (a.data_juntada < b.data_juntada) return 1;

						// Se as datas forem iguais, compara des_classe em ordem alfabética crescente
						if (a.des_classe < b.des_classe) return -1;
						if (a.des_classe > b.des_classe) return 1;

						return 0;
					});
				}

                NProgress.done()
                this.loading = false

                if(!combinedSentencas.length){
                    document.getElementById('searchFormFrame').scrollIntoView()
                    return
                }

                this.setPublicSearchCollection(combinedSentencas)
                this.tableData = this.publicSearchCollection
                document.getElementById('resultTableFrame').scrollIntoView()
            } catch (error) {
                console.error('Erro durante a busca:', error)
            }
        },
        handleCheckAllTribunaisChange(val) {
            this.isTribunaisIndeterminate = false
            this.form.tribunais = []
            this.form.ids_orgaos = []
            if(val){
                this.form.tribunais = this.getIdsTribunaisCheckbox();
                this.form.ids_orgaos = this.getIdsAllOrgaos()
				this.tribunaisCheckbox.forEach(obj => {
					obj.indeterminate = false;
				});
            }
        },
        handleSelectOrgaosChange(selectedOrgaos) {
			this.tribunaisCheckbox.forEach(tribunal => {
				const orgaosDoTribunal = this.orgaosSelect.filter(orgao => orgao.tribunal === tribunal.id)
				const totalOrgaos = orgaosDoTribunal.length
				const selectedCount = orgaosDoTribunal.filter(orgao => selectedOrgaos.includes(orgao.id)).length

				if (selectedCount === 0) {
					// Nenhum órgão do tribunal selecionado
					tribunal.indeterminate = false
					const index = this.form.tribunais.indexOf(tribunal.id)
					if (index !== -1) {
						this.form.tribunais.splice(index, 1)
					}
				} else if (selectedCount > 0 && selectedCount < totalOrgaos) {
					// Seleção parcial de órgãos do tribunal
					tribunal.indeterminate = true
					if (!this.form.tribunais.includes(tribunal.id)) {
						this.form.tribunais.push(tribunal.id)
					}
				} else if (selectedCount === totalOrgaos) {
					// Todos os órgãos do tribunal selecionados
					tribunal.indeterminate = false
					if (!this.form.tribunais.includes(tribunal.id)) {
						this.form.tribunais.push(tribunal.id)
					}
				}
			})

			// Recalcular o estado de "todas as justiças/órgãos" e "indeterminado"
			const numTribunaisSelecionados = this.form.tribunais.length
			const totalTribunais = this.tribunaisCheckbox.length

			if (numTribunaisSelecionados === 0) {
				this.isTribunaisIndeterminate = false
				this.allTribunaisChecked = false
			} else if (
				numTribunaisSelecionados === totalTribunais &&
				this.tribunaisCheckbox.every(tribunal => tribunal.indeterminate === false)
			) {
				this.isTribunaisIndeterminate = false
				this.allTribunaisChecked = true
			} else {
				this.isTribunaisIndeterminate = true
				this.allTribunaisChecked = false
			}
		},
        handleCheckedTribunaisChange(idTribunal,status) {

			let orgaosTribunal = this.getIdsOrgaosFromTribunaisCheckbox(this.orgaosSelect,idTribunal)

			if(status){
				this.form.ids_orgaos = [
					...this.form.ids_orgaos,
					...orgaosTribunal
				];
			} else {
				this.form.ids_orgaos = this.form.ids_orgaos.filter(id => !orgaosTribunal.includes(id))
			}

            var numTribunaisSelecionadas = this.form.tribunais.length
			var hasIndeterminate = false

			this.tribunaisCheckbox.forEach(obj => {
				if (idTribunal==obj.id) {
					obj.indeterminate = false
				}
				if (obj.indeterminate==true) {
					hasIndeterminate = true
				}
			});

            this.isTribunaisIndeterminate = false
            this.allTribunaisChecked = false

            if(numTribunaisSelecionadas==4 && !hasIndeterminate){
                this.isTribunaisIndeterminate = false
                this.allTribunaisChecked = true
            } else if(numTribunaisSelecionadas>0){
                this.isTribunaisIndeterminate = true
                this.allTribunaisChecked = false
            }
        },
        getIdsTribunaisCheckbox(){
            return this.tribunaisCheckbox.map(tribunal => tribunal.id);
        },
        getIdsAllOrgaos(){
            return this.orgaosSelect.map(orgao => orgao.id);
        },
        getIdsOrgaosFromTribunaisCheckbox(arr, valores) {
            // Filtra os objetos onde o atributo tribunal é um dos valores especificados
            const objetosFiltrados = arr.filter(obj => obj.tribunal === valores);

            // Mapeia para retornar apenas o atributo id dos objetos filtrados
            const idOrgaos = objetosFiltrados.map(obj => obj.id);

            return idOrgaos;
        },
		async showReturnMessage(isMensagemSucesso,mensagemFalha, qtdEncontrada, qtdRetornada) {
            if (isMensagemSucesso){
				if(qtdRetornada<qtdEncontrada){
					await this.$message({
          				showClose: true,
						duration: 7000,
						message: 'Sua pesquisa retornou muitos resultados. Exibindo atualmente ' + qtdRetornada + ' sentenças.   ',
						type: 'success'
					});
				} else {
					await this.$message({
          				showClose: true,
						duration: 7000,
						message: 'Foram retornadas ' + qtdRetornada + ' sentenças.   ',
						type: 'success'
					});
				}
            }

            if (mensagemFalha){
				this.$message({
					showClose: true,
					duration: 7000,
					message: 'No momento, não foi possível realizar a busca nas seguintes justiças: ' + mensagemFalha + '   ',
					type: 'warning'
				});
            }
		},
        validateForm() {
            const { form } = this
            const rules = {
                data_inicio: ['minDate'],
                data_fim: ['minDate'],
            }

            if (
                form.texto != '' ||
                (form.data_inicio != '' && form.data_fim != '')
            ) {
                return validator.validate(form, form.errors, rules)
            }
            this.$notify({
                message:
                    'Atenção ! É necessário informar algum critério de pesquisa para que sua pesquisa seja executada corretamente. Refaça sua pesquisa!',
                type: 'warning',
            })
            return false
        },
		checkScreen() {
			this.isMobile = window.innerWidth < 768;
		}
    },
    mounted() {
    	window.addEventListener("resize", this.checkScreen);
        this.fetchData()
    },
	beforeDestroy() {
		window.removeEventListener("resize", this.checkScreen);
	},
}
</script>

<style>

@media (max-width: 768px) {
    .el-select-dropdown {
        min-width: 100% !important;
        width: 100% !important;
        left: 0px !important;
        right: 0px !important;
    }

    .el-select-dropdown__item {
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        padding: 10px !important;
        line-height: 1.5 !important;
    }
}


</style>
