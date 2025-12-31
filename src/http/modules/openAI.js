import http from 'src/http/interceptor.js'

export default {
    perguntaSentenca: (data, config) => http.post('/openAI/perguntaSentenca', data, config),
}
