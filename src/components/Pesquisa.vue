<script setup lang="ts">
import { useAcordaosStore } from '@/stores/useAcordaosStore'
import { ref, computed, onMounted } from 'vue'
import AssuntosEnum from '@/enums/AssuntosEnum'
import ClassesEnum from '@/enums/ClassesEnum'
import { OrgaosPorJustica } from '@/util/OrgaosPorJustica'
import type { Justica } from '@/types/Justica'

// Instancia a store
const store = useAcordaosStore()

// Listas estáticas
const listaAssuntos = ref(AssuntosEnum)
const listaClasses = ref(ClassesEnum)

// Carrega justiças do helper
const justicasMap = OrgaosPorJustica()
const justicasList = Object.values(justicasMap) as Justica[]

// Estado de seleção de órgãos
const selectedIds = ref<Set<number>>(new Set())
const allOrgIds = justicasList.flatMap(j => j.orgaos.map(o => o.id_orgao))

// Checkbox principal para justiças
const todasJusticasSelecionadas = computed({
  get: () => selectedIds.value.size === allOrgIds.length,
  set: val => {
    if (val) selectedIds.value = new Set(allOrgIds)
    else selectedIds.value.clear()
  }
})
const isJusticasIndeterminate = computed(
  () => selectedIds.value.size > 0 && selectedIds.value.size < allOrgIds.length
)

// Estado de cada grupo de justiça
function grupoChecked(idJustica: number) {
  const total = justicasMap[idJustica].orgaos.length
  const sel = justicasMap[idJustica].orgaos.filter(o => selectedIds.value.has(o.id_orgao)).length
  return sel === total
}
function grupoIndeterminate(idJustica: number) {
  const total = justicasMap[idJustica].orgaos.length
  const sel = justicasMap[idJustica].orgaos.filter(o => selectedIds.value.has(o.id_orgao)).length
  return sel > 0 && sel < total
}

function selecionarTodasJusticas(val: boolean) {
  registrarDadosNoPayload()
}

function handleJusticasSelecionadas(idJustica: number) {
  const orgs = justicasMap[idJustica].orgaos.map(o => o.id_orgao)
  if (grupoChecked(idJustica)) orgs.forEach(id => selectedIds.value.delete(id))
  else orgs.forEach(id => selectedIds.value.add(id))
  registrarDadosNoPayload()
}

// Sincroniza v-select de órgãos
const listaOrgaos = computed(() =>
  justicasList.flatMap(j => j.orgaos.map(o => ({ id: o.id_orgao, descricao: o.des_orgao })))
)
const orgaosSelecionados = computed({
  get: () => Array.from(selectedIds.value),
  set: (arr: number[]) => { selectedIds.value = new Set(arr) }
})

// Atualiza filtros na store
function registrarDadosNoPayload() {
  store.searchFilters.ids_orgaos = orgaosSelecionados.value
}

// Limpa formulário e store
function limparFormulario() {
  store.limpar()
  selectedIds.value.clear()
}
</script>

<template>
  <VRow no-gutters class="corpo flex-column w-90 w-sm-85 w-md-60">
    <v-form :disabled="store.loading" class="mb-3 pa-5 elevation-1 rounded-lg position-relative">
      <label class="titulo">Pesquisa Livre</label>
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

      <label class="subtitulo">Pesquisa Avançada</label>
      <div class="d-flex flex-column flex-sm-row">
        <div class="d-flex flex-column w-100 w-sm-50 mr-sm-3">
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
        <div class="d-flex flex-column w-100 w-sm-50 ml-sm-3">
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

      <fieldset class="rounded-lg d-flex align-center w-100 w-md-50 my-5">
        <legend class="subtitulo" style="margin-left: 10px; padding: 0 5px 0 5px;">Data de juntada da acórdão</legend>
        <div class="d-flex flex-column w-50 pa-4">
          <label class="subtitulo">De</label>
          <v-text-field
            variant="outlined"
            type="date"
            density="compact"
            v-model="store.searchFilters.data_inicio"
            :disabled="store.loading"
          />
        </div>
        <div class="d-flex flex-column w-50 pa-4">
          <label class="subtitulo">Até</label>
          <v-text-field
            variant="outlined"
            type="date"
            density="compact"
            v-model="store.searchFilters.data_fim"
            :disabled="store.loading"
          />
        </div>
      </fieldset>

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