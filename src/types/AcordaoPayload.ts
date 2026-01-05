// src/types/AcordaoPayload.ts

/**
 * Tipagem para os filtros de busca utilizados na requisição.
 */
export interface SearchFilter {
  ids_assuntos: number[];
  ids_classes: number[];
  is_somente_ementa: string;
  materia: string;
  relator: string[];
  relator_acordao: string[];
  texto: string;
  data_inicio_juntada: string;
  data_fim_juntada: string;
  data_inicio_julgamento: string;
  data_fim_julgamento: string;
}

/**
 * Payload completo para busca de acórdãos.
 */
export interface AcordaoPayload {
  /** Índice da página (pageOffset) */
  pageOffset: number;
  /** Tamanho da página (pageOffset) */
  pageSize: number;
  /** Valor para searchAfter na paginação */
  searchAfterValue: number | null;
  /** Ordem de ordenação: asc ou desc */
  order: 'asc' | 'desc';
  /** Lista de filtros de busca */
  searchFilters: SearchFilter[];
}
