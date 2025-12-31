// src/utils/orgaosPorJustica.ts
import type { Justica } from '@/types/Justica';
import type { OrgaoFlat } from '@/data/JusticasFlat';
import { ORGAOS_FLAT} from '@/data/JusticasFlat';

/**
 * Retorna um objeto com os órgãos agrupados por justiça.
 * @returns Record<number, Justica>
 */
export function OrgaosPorJustica(): Record<number, Justica> {
  return ORGAOS_FLAT.reduce((acc, item: OrgaoFlat) => {
    const { id_justica, des_justica, id_orgao, des_orgao } = item;
    if (!acc[id_justica]) {
      acc[id_justica] = {
        id_justica,
        des_justica,
        orgaos: []
      };
    }
    acc[id_justica].orgaos.push({ id_orgao, des_orgao });
    return acc;
  }, {} as Record<number, Justica>);
}
