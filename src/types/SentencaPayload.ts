// src/types/SentencaPayload.ts

/**
 * Tipagem para os filtros de busca utilizados na requisição.
 */
export interface SearchFilter {
  ids_assuntos: number[];
  ids_classes: number[];
  ids_orgaos: number[];
  texto: string;
  data_inicio: string;
  data_fim: string;
}

/**
 * Payload completo para busca de sentenças.
 */
export interface SentencaPayload {
  /** Índice da página (pageOffset) */
  pageOffset: number;
  /** Valor para searchAfter na paginação */
  searchAfterValue: number | null;
  /** Ordem de ordenação: asc ou desc */
  order: 'asc' | 'desc';
  /** Lista de filtros de busca */
  searchFilters: SearchFilter[];
}
