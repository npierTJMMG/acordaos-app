// src/services/acordaoService.ts
import api from '@/services/api'
import type { AcordaoPayload } from '@/types/AcordaoPayload'
import type { AcordaoResponse } from '@/types/AcordaoResponse'

export async function fetchAcordaos(
  payload: AcordaoPayload,
  config?: any
) {
  const { data } = await api.get<AcordaoResponse>(
    '/acordaos/buscar',
    {
      params: payload,
      ...config
    }
  )

  return data
}
