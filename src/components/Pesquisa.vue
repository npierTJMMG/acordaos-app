<script setup lang="ts">
import { useAcordaosStore } from '@/stores/useAcordaosStore'
import { ref, computed, onMounted } from 'vue'
import AssuntosEnum from '@/enums/AssuntosEnum'
import ClassesEnum from '@/enums/ClassesEnum'
import RelatoresEnum from '@/enums/RelatoresEnum'

// Instancia a store
const store = useAcordaosStore()

// Listas estáticas
const listaAssuntos = ref(AssuntosEnum)
const listaClasses = ref(ClassesEnum)
const listaRelatores = ref(RelatoresEnum)

// Limpa formulário e store
function limparFormulario() {
  store.limpar()
}
</script>

<template>
  <VRow no-gutters class="corpo flex-column w-90 w-sm-85 w-md-60">
    <v-form :disabled="store.loadingBusca || store.loadingPaginacao" class="mb-3 pa-5 elevation-1 rounded-lg position-relative">

      
        
      <label class="titulo">Pesquisa Livre</label>
      <div class="d-flex flex-column flex-sm-row">
        <div class="d-flex flex-column w-100 w-sm-70 mr-sm-3">
          <v-text-field
            placeholder="Pesquisar..."
            variant="outlined"
            clearable
            density="compact"
            rounded="md"
            color="primary"
            hint="Busque por qualquer palavra ou termo. Use aspas duplas para buscar pelo termo exato."
            v-model="store.searchFilters.texto"
          />
        </div>
        <div class="d-flex flex-column w-100 w-sm-30 ml-sm-3">
          <v-checkbox
            v-model="store.searchFilters.is_somente_ementa"
            label="Pesquisar texto somente na ementa"
            density="compact"
            hide-details
            color="primary"
            class="ml-2"
          />
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row">
        <div class="d-flex flex-column w-100 w-sm-30 mr-sm-3">
          <legend class="subtitulo">Matéria</legend>
          <v-radio-group inline v-model="store.searchFilters.materia">
            <v-radio color="primary" label="Cível" value="Cível"></v-radio>
            <v-radio color="primary" label="Criminal" value="Criminal"></v-radio>
          </v-radio-group>
        </div>
        <div class="d-flex flex-column w-100 w-sm-50 ml-sm-3">
          <label class="subtitulo mb-2">Classes</label>
          <v-select
            placeholder="Selecione as classes"
            variant="outlined"
            density="compact"
            rounded="xl"
            color="primary"
            multiple
            chips
            closable-chips
            clearable
            persistent-clear
            :items="listaClasses"
            v-model="store.searchFilters.ids_classes"
            item-title="descricao"
            item-value="id"
          />
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row">
        <div class="d-flex flex-column w-100 w-sm-60 mr-sm-3">
          <label class="subtitulo mb-2">Assuntos</label>
          <v-autocomplete
            placeholder="Selecione os assuntos"
            variant="outlined"
            density="compact"
            rounded="xl"
            color="primary"
            multiple
            chips
            clearable
            closable-chips
            persistent-clear
            :items="listaAssuntos"
            v-model="store.searchFilters.ids_assuntos"
            item-title="descricao"
            item-value="id"
          />
        </div>
      </div>
      
      <div class="d-flex flex-column flex-sm-row">
        <div class="d-flex flex-column w-100 w-sm-50 mr-sm-3">
          <label class="subtitulo mb-2">Relator</label>
          <v-select
            placeholder="Selecione os relatores"
            variant="outlined"
            density="compact"
            rounded="xl"
            color="primary"
            multiple
            chips
            closable-chips
            clearable
            persistent-clear
            :items="listaRelatores"
            v-model="store.searchFilters.relator"
            item-title="nome"
            item-value="nome"
          />
        </div>
        <div class="d-flex flex-column w-100 w-sm-50 ml-sm-3">
          <label class="subtitulo mb-2">Relator para o Acórdão</label>
          <v-autocomplete
            placeholder="Selecione os relatores para fins de acórdão"
            variant="outlined"
            density="compact"
            rounded="xl"
            color="primary"
            multiple
            chips
            clearable
            closable-chips
            persistent-clear
            :items="listaRelatores"
            v-model="store.searchFilters.relator_acordao"
            item-title="nome"
            item-value="nome"
          />
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row">
        <fieldset class="rounded-lg d-flex align-left w-100 w-md-50 my-5">
          <legend class="subtitulo" style="margin-left: 10px; padding: 0 5px 0 5px;">Data de juntada do acórdão</legend>
          <div class="d-flex flex-column w-50 pa-4">
            <label class="subtitulo">De</label>
            <v-text-field
              variant="outlined"
              type="date"
              density="compact"
              v-model="store.searchFilters.data_inicio_juntada"
              :disabled="store.loadingBusca || store.loadingPaginacao"
            />
          </div>
          <div class="d-flex flex-column w-50 pa-4">
            <label class="subtitulo">Até</label>
            <v-text-field
              variant="outlined"
              type="date"
              density="compact"
              v-model="store.searchFilters.data_fim_juntada"
              :disabled="store.loadingBusca || store.loadingPaginacao"
            />
          </div>
        </fieldset>
        <fieldset class="rounded-lg d-flex align-right w-100 w-md-50 my-5">
          <legend class="subtitulo" style="margin-left: 10px; padding: 0 5px 0 5px;">Data de julgamento</legend>
          <div class="d-flex flex-column w-50 pa-4">
            <label class="subtitulo">De</label>
            <v-text-field
              variant="outlined"
              type="date"
              density="compact"
              v-model="store.searchFilters.data_inicio_julgamento"
              :disabled="store.loadingBusca || store.loadingPaginacao"
            />
          </div>
          <div class="d-flex flex-column w-50 pa-4">
            <label class="subtitulo">Até</label>
            <v-text-field
              variant="outlined"
              type="date"
              density="compact"
              v-model="store.searchFilters.data_fim_julgamento"
              :disabled="store.loadingBusca || store.loadingPaginacao"
            />
          </div>
        </fieldset>
      </div>

      <fieldset class="rounded d-flex align-center w-100 w-md-50 my-5">
        <legend class="subtitulo">Ordenar por</legend>
        <v-radio-group inline v-model="store.userOrder" @change="store.setUserOrder()">
          <v-radio color="primary" label="Mais novos primeiro" value="desc"></v-radio>
          <v-radio color="primary" label="Mais antigos primeiro" value="asc"></v-radio>
        </v-radio-group>
      </fieldset>
      
      <div class="d-flex justify-end">
        <div class="mr-sm-4 w-sm-35 d-flex justify-end">
          <div v-if="store.loadingBusca" class="d-none d-sm-flex align-center">
            <v-progress-circular indeterminate color="primary" class="mr-4 mr-sm-0"></v-progress-circular>
            <p class="ml-3 mt-md-2">Buscando...</p>
          </div>
        </div>
        <div class="ml-sm-4 d-flex align-center">
          <v-btn :disabled="store.loadingBusca" class="mx-2" rounded="xl" variant="outlined" :ripple="false" flat text="LIMPAR"
              @click="limparFormulario()"></v-btn>
          <v-btn :disabled="store.loadingBusca" class="mx-2" rounded="xl" color="primary" :ripple="false" prepend-icon="mdi-magnify"
              elevation="0" text="BUSCAR" @click="store.buscarButton(store.userOrder)"></v-btn>
        </div>
      </div>
    </v-form>
  </VRow>
</template>

<style lang="scss" scoped>
.corpo {
  font-family: 'Montserrat';
}

.titulo {
  font-family: 'Montserrat';
  font-size: 22px;
  font-weight: 400;
}

.subtitulo {
  font-family: 'Montserrat';
  font-size: 12px;
  font-weight: 700;
}

fieldset {
  border: 1px solid #c2c2c2;
  position: relative;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: .5rem;
}

.justicas-orgaos {
  font-size: 14px;
}
</style>