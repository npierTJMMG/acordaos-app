import http from 'src/http/interceptor.js'

export default {
    login: (data) => http.post('/auth/login', data)
}