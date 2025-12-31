// src/types/Justica.ts
export interface Orgao {
  id_orgao: number;
  des_orgao: string;
}

export interface Justica {
  id_justica: number;
  des_justica: string;
  orgaos: Orgao[];
}
