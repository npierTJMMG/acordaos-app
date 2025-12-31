import http from 'src/http/interceptor.js'

export default {
    searchData: (data, config) => http.post('/sentencas/buscar', data, config),
    recuperarConteudo: (data, config) => http.post('/sentencas/conteudo', data, config)
}
