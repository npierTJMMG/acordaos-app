// src/stores/conteudoFullStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import type { ConteudoFullPayload } from '@/types/ConteudoFullPayload';
import type { ConteudoFullResponse } from '@/types/ConteudoFullResponse';

interface ConteudoFullState {
  inteiroTeor: string;
  tipoInteiroTeor: string;
  status: number | null;
  loading: boolean;
  error: string | null;
}

export const useConteudoFullStore = defineStore('conteudoFull', {
  state: (): ConteudoFullState => ({
    inteiroTeor: '',
    tipoInteiroTeor: '',
    status: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchConteudoFull(payload: ConteudoFullPayload) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.post<ConteudoFullResponse>(
          '/sua-rota-da-api',
          payload
        );

        this.inteiroTeor = data.inteiro_teor;
        this.tipoInteiroTeor = data.tipo_inteiro_teor;
        this.status = data.status;

        return data;
      } catch (error: any) {
        this.error =
          error?.response?.data?.message || 'Erro ao buscar conteúdo completo';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    resetConteudoFull() {
      this.inteiroTeor = '';
      this.tipoInteiroTeor = '';
      this.status = null;
      this.error = null;
      this.loading = false;
    },
  },
});