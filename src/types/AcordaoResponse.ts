export interface Acordao {
  num_processo:      string;
  id_tribunal:       string;
  id_acordao:       string;
  des_assuntos:      string[];
  des_orgao:         string;
  data_juntada:      string;
  des_classe:        string;
  texto:             string;
  des_tribunal:      string;
  ids_assuntos:      number[];
  tipo_inteiro_teor: string;
  id_orgao:          number;
  id_classe:         number;
  id_ordenacao:      number;
}

export interface AcordaoResponse {
  acordaos:   Acordao[];
  total:       number;
  searchAfter: number[];
  status:      number;
}
