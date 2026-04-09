// src/services/conteudoFullService.ts
import api from '@/services/api'
import type { ConteudoFullPayload } from '@/types/ConteudoFullPayload'
import type { ConteudoFullResponse } from '@/types/ConteudoFullResponse'

export async function fetchConteudoFull(
  payload: ConteudoFullPayload,
  config?: any
) {
  const { data } = await api.get<ConteudoFullResponse>(
    '/acordaos/getDocumento',
    {
      params: payload,
      ...config
    }
  )

  return data
}
