// src/stores/useAcordaosStore.ts
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { fetchAcordaos } from '@/services/acordaoService'
import type { SearchFilter, AcordaoPayload } from '@/types/AcordaoPayload'
import type { AcordaoResponse } from '@/types/AcordaoResponse'

export const useAcordaosStore = defineStore('acordaosStore', () => {
  // --- filtros de busca ---
  const searchFilters = reactive<SearchFilter>({
    ids_assuntos: [],
    ids_classes: [],
    ids_orgaos: [],
    texto: '',
    data_inicio: '',
    data_fim: '',
  })

  // --- paginação e ordenação ---
  const pageSize         = 10
  const totalResults     = ref(0)
  const currentPage      = ref(1)
  const pageOffset       = ref(1)                // sempre >=1
  const searchAfterValue = ref<number | null>(null)

  // ordem fixa escolhida pelo usuário
  const userOrder = ref<'asc' | 'desc'>('desc')

  // estado da chamada
  const loading = ref(false)
  const error   = ref<string | null>(null)
  const results = ref<AcordaoResponse[] | null>(null)

  // --- getters ---
  const getAcordaos = computed(() =>
    results.value?.flatMap(r => r.acordaos) || []
  )
  const hasResults = computed(() => getAcordaos.value.length > 0)

  const totalPages = computed(() =>
    Math.ceil(totalResults.value / pageSize)
  )
  const visiblePages = computed(() => {
    const total = totalPages.value
    const cur   = currentPage.value
    const start = Math.max(1, cur - 2)
    const end   = Math.min(total, cur + 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  // --- função genérica de busca ---  
  async function buscarAcordaos(payloadOrder: 'asc'|'desc') {
    loading.value = true
    error.value   = null

    try {
      const body: AcordaoPayload = {
        pageOffset:       Math.max(1, pageOffset.value),
        searchAfterValue: searchAfterValue.value,
        order:            payloadOrder,
        searchFilters:    [{ ...searchFilters }],
      }

      const resp = await fetchAcordaos(body, {
        baseURL: import.meta.env.VITE_API_URL as string
      })

      const arr = Array.isArray(resp) ? resp : [resp]
      results.value      = arr
      totalResults.value = (resp as any).total ?? totalResults.value

    } catch (err: any) {
      console.error(err)
      error.value   = err?.message || 'Erro na busca'
      results.value = null
    } finally {
      loading.value = false
    }
  }

  // --- navega para a página X ---
  async function goToPage(target: number) {
    if (target < 1 || target > totalPages.value || target === currentPage.value)
      return

    const delta    = target - currentPage.value
    const absDelta = Math.max(1, Math.abs(delta))
    const backward = delta < 0

    // define quantas páginas pular
    pageOffset.value = absDelta

    // extrai o cursor a partir dos resultados já carregados
    const acordaos = getAcordaos.value
    // se for para trás, pego o timestamp da primeira acórdão
    // se for para frente, pego o timestamp da última acórdão
    searchAfterValue.value = backward
      ? acordaos[0]['@timestamp']
      : acordaos[acordaos.length - 1]['@timestamp']

    // inverte o payloadOrder apenas se for para trás
    const payloadOrder = backward
      ? (userOrder.value === 'desc' ? 'asc' : 'desc')
      : userOrder.value

    await buscarAcordaos(payloadOrder)

    // se voltamos para trás, invertemos a lista para manter a ordem do usuário
    if (backward && results.value) {
      results.value = results.value.map(r => ({
        ...r,
        acordaos: [...r.acordaos].reverse()
      }))
    }

    currentPage.value = target
  }

  // --- usuário troca a ordenação ---
  function setUserOrder() {

    // só executa se já houver resultados carregados
    if (!hasResults.value) {
      return
    }

    currentPage.value      = 1
    pageOffset.value       = 1
    searchAfterValue.value = null
    buscarAcordaos(userOrder.value)
  }

  // Rotinas auxiliares
  function numProcessoFormatado(numProcesso: string) {
    const padded = numProcesso.padStart(20, '0')
    return `${padded.slice(0, 7)}-${padded.slice(7, 9)}.${padded.slice(9, 13)}.${padded.slice(13, 14)}.${padded.slice(14, 16)}.${padded.slice(16)}`
  }

  function limpar() {
    // Reset filtros e paginação
    searchFilters.ids_assuntos = []
    searchFilters.ids_classes = []
    searchFilters.ids_orgaos = []
    searchFilters.texto = ''
    searchFilters.data_inicio = ''
    searchFilters.data_fim = ''
    pageOffset.value = 1
    searchAfterValue.value = null
    userOrder.value = 'desc'
    results.value = null
    error.value = null
  }

  function dataFormatada(data: string): string {
    if (!data) return ''
    const [year, month, day] = data.split('-')
    return `${day}/${month}/${year}`
  }

  function assuntosFormatados(dados: string[]) {
    return dados.join('; ')
  }

  // --- inicialização automática ---
  async function init() {
    await buscarAcordaos(userOrder.value)
  }

  return {
    // state
    searchFilters,
    pageSize,
    totalResults,
    currentPage,
    pageOffset,
    searchAfterValue,
    userOrder,
    loading,
    error,
    results,

    // getters
    getAcordaos,
    hasResults,
    totalPages,
    visiblePages,

    // actions
    init,
    buscarAcordaos,
    goToPage,
    setUserOrder,
    limpar,
    numProcessoFormatado,
    dataFormatada,
    assuntosFormatados
  }
})
