// src/stores/useConteudoFullStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Acordao } from '@/types/AcordaoResponse'
import type { ConteudoFullPayload } from '@/types/ConteudoFullPayload'

interface ConteudoFullResponse {
  inteiro_teor: string
  tipo_inteiro_teor: string
  status: number
}

interface ConteudoFullState {
  loading: boolean
  error: string | null
  inteiroTeor: string
  tipoInteiroTeor: string
  status: number | null
}

export const useConteudoFullStore = defineStore('conteudoFull', {
  state: (): ConteudoFullState => ({
    loading: false,
    error: null,
    inteiroTeor: '',
    tipoInteiroTeor: '',
    status: null,
  }),

  actions: {
    async fetchConteudoFull(payload: ConteudoFullPayload) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.get<ConteudoFullResponse>(
          '/acordaos/getDocumento',
          {
            params: {
              id_acordao: payload.id_acordao,
            },
          }
        )

        this.inteiroTeor = data.inteiro_teor
        this.tipoInteiroTeor = data.tipo_inteiro_teor
        this.status = data.status

        return data
      } catch (error: any) {
        this.error =
          error?.response?.data?.message || 'Erro ao buscar conteúdo completo'
        throw error
      } finally {
        this.loading = false
      }
    },

    async downloadAcordao(acordao: Acordao | any) {
      try {
        const payload: ConteudoFullPayload = {
          id_acordao: Number(acordao.id_acordao),
        }

        const data = await this.fetchConteudoFull(payload)

        const nomeBase = acordao?.num_processo
          ? `acordao-${String(acordao.num_processo).replace(/[^\dA-Za-z_-]/g, '_')}`
          : `acordao-${payload.id_acordao}`

        let mimeType = 'text/plain;charset=utf-8'
        let extensao = 'txt'
        const conteudo = data.inteiro_teor ?? ''

        if (
          data.tipo_inteiro_teor?.toLowerCase().includes('html') ||
          /<\/?[a-z][\s\S]*>/i.test(conteudo)
        ) {
          mimeType = 'text/html;charset=utf-8'
          extensao = 'html'
        } else if (data.tipo_inteiro_teor?.toLowerCase().includes('json')) {
          mimeType = 'application/json;charset=utf-8'
          extensao = 'json'
        }

        const blob = new Blob([conteudo], { type: mimeType })
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `${nomeBase}.${extensao}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        window.URL.revokeObjectURL(url)
      } catch (error: any) {
        this.error =
          error?.response?.data?.message || 'Erro ao fazer download do acórdão'
        console.error(error)
      }
    },
  },
})