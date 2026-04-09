// src/stores/useConteudoFullStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Acordao } from '@/types/AcordaoResponse'
import type { ConteudoFullPayload } from '@/types/ConteudoFullPayload'
import { fetchConteudoFull } from '@/services/conteudoFullService'

export interface ConteudoFullResponse {
  inteiro_teor: string
  tipo_inteiro_teor: string
  status: number
}

function base64ToUint8Array(base64: string): Uint8Array {
  const cleanBase64 = base64.replace(/^data:.*;base64,/, '')
  const binaryString = atob(cleanBase64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}

function getArquivoInfo(tipoInteiroTeor: string) {
  const tipo = String(tipoInteiroTeor || '').toLowerCase().trim()

  if (tipo === 'pdf' || tipo.includes('pdf')) {
    return {
      mimeType: 'application/pdf',
      extensao: 'pdf',
    }
  }

  if (tipo === 'html' || tipo.includes('html')) {
    return {
      mimeType: 'text/html;charset=utf-8',
      extensao: 'html',
    }
  }

  return {
    mimeType: 'application/octet-stream',
    extensao: 'bin',
  }
}

export const useConteudoFullStore = defineStore('conteudoFullStore', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const inteiroTeor = ref('')
  const tipoInteiroTeor = ref('')
  const status = ref<number | null>(null)

  const hasConteudo = computed(() => !!inteiroTeor.value)

  async function buscarConteudoFull(payload: ConteudoFullPayload) {
    loading.value = true
    error.value = null

    try {
      const data = await fetchConteudoFull(payload, {
        baseURL: import.meta.env.VITE_API_URL as string,
      })

      inteiroTeor.value = data.inteiro_teor
      tipoInteiroTeor.value = data.tipo_inteiro_teor
      status.value = data.status

      return data
    } catch (err: any) {
      console.error(err)
      error.value =
        err?.response?.data?.message ||
        err?.message ||
        'Erro ao buscar conteúdo completo'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function downloadAcordao(acordao: Acordao | any) {
    try {
      const payload: ConteudoFullPayload = {
        id_acordao: acordao.id_acordao,
      }

      const data = await buscarConteudoFull(payload)

      const nomeBase = acordao?.num_processo
        ? `acordao-${String(acordao.num_processo).replace(/[^\dA-Za-z_-]/g, '_')}`
        : `acordao-${payload.id_acordao}`

      const { mimeType, extensao } = getArquivoInfo(data.tipo_inteiro_teor)

      const bytes = base64ToUint8Array(data.inteiro_teor)
      const blob = new Blob([bytes], { type: mimeType })

      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${nomeBase}.${extensao}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error(err)
      error.value =
        err?.response?.data?.message ||
        err?.message ||
        'Erro ao fazer download do acórdão'
    }
  }

  function limpar() {
    loading.value = false
    error.value = null
    inteiroTeor.value = ''
    tipoInteiroTeor.value = ''
    status.value = null
  }

  return {
    loading,
    error,
    inteiroTeor,
    tipoInteiroTeor,
    status,
    hasConteudo,
    buscarConteudoFull,
    downloadAcordao,
    limpar,
  }
})