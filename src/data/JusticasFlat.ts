// src/data/JusticasFlat.ts
import type { Orgao } from '@/types/Justica';

export interface OrgaoFlat extends Orgao {
  id_justica: number;
  des_justica: string;
}

export const ORGAOS_FLAT: OrgaoFlat[] = [
  { id_orgao:14141, des_orgao:  'JME/MG - 1ª Auditoria', id_justica: 31, des_justica: 'Justiça Militar de Minas Gerais' },
  { id_orgao:14142, des_orgao:  'JME/MG - 2ª Auditoria', id_justica: 31, des_justica: 'Justiça Militar de Minas Gerais' },
  { id_orgao:14143, des_orgao:  'JME/MG - 3ª Auditoria', id_justica: 31, des_justica: 'Justiça Militar de Minas Gerais' },
  { id_orgao:81647, des_orgao:  'JME/MG - 4ª Auditoria', id_justica: 31, des_justica: 'Justiça Militar de Minas Gerais' },
  { id_orgao:81648, des_orgao:  'JME/MG - 5ª Auditoria', id_justica: 31, des_justica: 'Justiça Militar de Minas Gerais' },
  { id_orgao:13231, des_orgao:  'JME/RS - 1ª Auditoria', id_justica: 51, des_justica: 'Justiça Militar do Rio Grande do Sul' },
  { id_orgao:13232, des_orgao:  'JME/RS - 2ª Auditoria', id_justica: 51, des_justica: 'Justiça Militar do Rio Grande do Sul' },
  { id_orgao:13234, des_orgao:  'JME/RS - Auditoria de Santa Maria', id_justica: 51, des_justica: 'Justiça Militar do Rio Grande do Sul' },
  { id_orgao:13235, des_orgao:  'JME/RS - Auditoria de Passo Fundo', id_justica: 51, des_justica: 'Justiça Militar do Rio Grande do Sul' },
  { id_orgao:15661, des_orgao: 'JME/SP - 1ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:17970, des_orgao: 'JME/SP - 2ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:15662, des_orgao: 'JME/SP - 3ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:15663, des_orgao: 'JME/SP - 4ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:29004, des_orgao: 'JME/SP - 5ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:29005, des_orgao: 'JME/SP - 6ª Auditoria', id_justica: 11, des_justica: 'Justiça Militar de São Paulo' },
  { id_orgao:32693, des_orgao: 'JMU - 1ª Auditoria da 1ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32694, des_orgao: 'JMU - 2ª Auditoria da 1ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32695, des_orgao: 'JMU - 3ª Auditoria da 1ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32696, des_orgao: 'JMU - 4ª Auditoria da 1ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32697, des_orgao: 'JMU - 1ª Auditoria da 2ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32698, des_orgao: 'JMU - 2ª Auditoria da 2ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32699, des_orgao: 'JMU - 1ª Auditoria da 3ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32700, des_orgao: 'JMU - 2ª Auditoria da 3ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32701, des_orgao: 'JMU - 3ª Auditoria da 3ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32702, des_orgao: 'JMU - Auditoria da 4ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32703, des_orgao: 'JMU - Auditoria da 5ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32704, des_orgao: 'JMU - Auditoria da 6ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32705, des_orgao: 'JMU - Auditoria da 7ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32706, des_orgao: 'JMU - Auditoria da 8ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32707, des_orgao: 'JMU - Auditoria da 9ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32708, des_orgao: 'JMU - Auditoria da 10ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32709, des_orgao: 'JMU - 1ª Auditoria da 11ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32710, des_orgao: 'JMU - 2ª Auditoria da 11ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
  { id_orgao:32711, des_orgao: 'JMU - Auditoria da 12ª CJM', id_justica: 61, des_justica: 'Justiça Militar da União' },
];