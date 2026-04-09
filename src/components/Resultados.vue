<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAcordaosStore } from '@/stores/useAcordaosStore'
import { useConteudoFullStore } from '@/stores/useConteudoFullStore'
import type { Acordao } from '@/types/AcordaoResponse'

const store = useAcordaosStore()
const storeDownloadDoc = useConteudoFullStore()

// lista de acórdãos a exibir
const sentencas = computed<Acordao[]>(() => store.getAcordaos)

// paginação
const pages = computed<number[]>(() => store.visiblePages)
const currentPage = computed(() => store.currentPage)
const lastPage = computed(() => store.totalPages)

// total vindo do store
const total = computed(() => store.totalResults)

// loading unificado
const isLoading = computed(() => store.loadingBusca || store.loadingPaginacao)

// snackbar (alert canto superior direito)
const showTotal = ref(false)

// ✅ dispara quando: results existe + não está carregando + não tem erro
// ✅ immediate: true => funciona mesmo se o componente montar após a busca já ter terminado
watch(
  [
    () => store.results,
    () => store.loadingBusca,
    () => store.loadingPaginacao,
    () => store.error,
    () => store.totalResults,
  ],
  ([results, loadingBusca, loadingPaginacao, error]) => {
    if (error) return
    if (loadingBusca || loadingPaginacao) return
    if (!results) return

    // exibe sempre que houver uma resposta válida (inclui init/paginação)
    showTotal.value = true
  },
  { immediate: true }
)
</script>

<template>
  <!-- ALERT/TOAST NO CANTO SUPERIOR DIREITO -->
  <v-snackbar
    v-model="showTotal"
    location="top end"
    :timeout="3000"
    color="info"
    variant="elevated"
  >
    Total encontrado: <strong>{{ total }}</strong>

    <template #actions>
      <v-btn variant="text" @click="showTotal = false">Fechar</v-btn>
    </template>
  </v-snackbar>

  <VRow
    no-gutters
    class="corpo w-90 w-sm-80 w-md-60 justify-center my-6 elevation-1 rounded-lg"
  >
    <VRow no-gutters class="flex-column ml-4 mt-4">
      <h2 class="titulo">Resultado</h2>
      <v-spacer />
    </VRow>

    <VRow class="d-flex flex-column align-center w-100">
      <!-- caso de erro -->
      <div v-if="store.error" class="pa-4">
        <v-alert type="error" dense text>
          {{ store.error }}
        </v-alert>
      </div>

      <!-- loading -->
      <div v-else-if="isLoading" class="pa-4">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <!-- sem resultados -->
      <div v-else-if="sentencas.length === 0" class="pa-4">
        Nenhum acórdão encontrado.
      </div>

      <!-- lista de acórdãos -->
      <template v-else>
        <v-card
          v-for="s in sentencas"
          :key="(s as any).id_acordao"
          class="pa-4 my-2 w-90 w-sm-80 w-md-80 elevation-0 border-sm rounded-lg"
        >
          <div
            class="d-flex align-center titulo w-100 pa-2 bg-grey-lighten-1 text-uppercase rounded-lg"
          >
            <span class="titulo">Acórdão</span>
            <v-spacer />
            <VBtnGroup class="justify-end" divided>
              <v-btn
                width="60px"
                color="#002a5e"
                icon="mdi-content-copy"
                @click="storeDownloadDoc.downloadAcordao(s as any)"
              />
            </VBtnGroup>
            <VBtnGroup class="justify-end" divided>
              <v-btn
                width="60px"
                color="#002a5e"
                icon="mdi-content-copy"
                @click="store.copiarAcordao(s as any)"
              />
            </VBtnGroup>
          </div>

          <v-card-text class="card-text">
            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Número do Processo:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ store.numProcessoFormatado((s as any).num_processo) }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Matéria:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ (s as any).materia }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Classe Processual:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ (s as any).des_classe }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Assunto(s):</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ store.assuntosFormatados((s as any).des_assuntos || []) }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Relator:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ (s as any).relator }}
              </VCol>
            </VRow>

            <VRow dense v-if="(s as any).relator_acordao">
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Relator do acórdão:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ (s as any).relator_acordao }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Juntada no Processo:</span>
              </VCol>
              <VCol md="9" class="text-center text-sm-left">
                {{ (s as any).data_juntada }}
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Ementa:</span>
              </VCol>
              <VCol class="container-texto-sentenca">
                <div v-html="(s as any).ementa" />
              </VCol>
            </VRow>

            <VRow dense>
              <VCol
                cols="12"
                md="3"
                sm="4"
                class="text-center text-sm-right pr-sm-5"
              >
                <span class="subtitulo mt-1">Texto:</span>
              </VCol>
              <VCol class="container-texto-sentenca">
                <div v-html="(s as any).texto" />
              </VCol>
            </VRow>
          </v-card-text>
        </v-card>
      </template>
    </VRow>

    <!-- paginação -->
    <VRow class="justify-center my-6">
      <VBtnGroup>
        <v-btn :disabled="currentPage === 1" @click="store.goToPage(currentPage - 1)">
          «
        </v-btn>

        <v-btn
          v-for="p in pages"
          :key="p"
          :class="{ 'page-active': p === currentPage }"
          @click="store.goToPage(p)"
        >
          {{ p }}
        </v-btn>

        <v-btn :disabled="currentPage === lastPage" @click="store.goToPage(currentPage + 1)">
          »
        </v-btn>
      </VBtnGroup>
    </VRow>
  </VRow>
</template>

<style lang="scss" scoped>
.corpo {
  font-family: 'Montserrat';
}

.titulo {
  font-family: 'Montserrat';
  font-size: 24px;
  font-weight: 500;
}

.subtitulo {
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.75px;
}

.container-texto-sentenca {
  max-height: 210px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.01);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.container-texto-sentenca > div p {
  margin-bottom: 0.5em;
}

.page-active {
  font-weight: bold;
  background-color: rgba(0, 42, 94, 0.1);
}
</style>