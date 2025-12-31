<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAcordaosStore } from '@/stores/useAcordaosStore'
import type { Acordao } from '@/types/AcordaoResponse'

const store = useAcordaosStore()

// lista de acórdãos a exibir
const sentencas = computed<Acordao[]>(() => store.getAcordaos)


// páginas visíveis e controle de paginação
const pages       = computed<number[]>(() => store.visiblePages)
const currentPage = computed(() => store.currentPage)
const lastPage    = computed(() => store.totalPages)

</script>

<template>
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
      <div v-else-if="store.loading" class="pa-4">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <!-- sem resultados -->
      <div v-else-if="!store.loading && sentencas.length === 0" class="pa-4">
        Nenhuma acórdão encontrada.
      </div>

      <!-- lista de acórdãos -->
      <template v-else>
        <v-card
          v-for="s in sentencas"
          :key="s.id_sentenca"
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
                @click="store.copiarAcordao(s)"
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
                {{ store.numProcessoFormatado(s.num_processo) }}
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
                {{ s.materia }}
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
                {{ s.des_classe }}
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
                {{ store.assuntosFormatados(s.des_assuntos) }}
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
                {{ s.relator }}
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
                {{ s.data_juntada }}
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
                <div v-html="s.ementa" />
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
                <div v-html="s.texto" />
              </VCol>
            </VRow>
          </v-card-text>
        </v-card>

        <!-- paginação -->
        <VRow class="justify-center my-6">
          <VBtnGroup>
            <v-btn
              :disabled="currentPage === 1"
              @click="store.goToPage(currentPage-1)"
            >
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

            <v-btn
              :disabled="currentPage === lastPage"
              @click="store.goToPage(currentPage+1)"
            >
              »
            </v-btn>
          </VBtnGroup>
        </VRow>
      </template>
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
