// src/enums/NosConsulta.js

const NosConsulta = Object.freeze([
    {
        id: 11,
        endereco: 'https://api-banco-sentencas.tjmsp.jus.br/api',
        descricao: 'Justiça Militar de São Paulo',
        timeout: 8000,
    },
    {
        id: 31,
        endereco: 'https://bancodesentencas.tjmmg.jus.br/bancosentencas-api/api',
        descricao: 'Justiça Militar de Minas Gerais',
        timeout: 8000,
    },
    {
        id: 51,
        endereco: 'https://bancodesentencas.tjmrs.jus.br/api_sentencas/public/api',
        descricao: 'Justiça Militar do Rio Grande do Sul',
        timeout: 8000,
    },
    {
        id: 61,
        endereco: 'https://bancodesentencas.stm.jus.br/api',
        descricao: 'Justiça Militar da União',
        timeout: 8000,
    },
    // ... adicione outros nós conforme necessário
]);

export default NosConsulta;
