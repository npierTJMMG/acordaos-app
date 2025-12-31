// src/services/sentencaService.ts
import api from '@/services/api'
import type { SentencaPayload } from '@/types/SentencaPayload'
import type { SentencaResponse } from '@/types/SentencaResponse'

export async function fetchSentencas(
  payload: SentencaPayload,
  config?: any
) {
  const { data } = await api.get<SentencaResponse>(
    '/acordaos/buscar',
    {
      params: payload,
      ...config
    }
  )

  return data
}
