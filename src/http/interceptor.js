import axios from 'axios'
import env from 'src/environments'
import { Notification } from 'element-ui';
import { isLogged, logOut } from 'src/services/auth'
import messages from 'src/util/messages'

let http = axios.create({ baseURL: env.domain, timeout: 180000 })

http.interceptors.request.use(
    config => {
        if (isLogged()) {
            const { token } = isLogged()

            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
                config.headers['Accept'] = 'application/json'
            }
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(new Error(error));
    }
);

http.interceptors.response.use(
    res => {
        const { method } = res.config
        //Para Debugar as requisições POST
        if (process.env.NODE_ENV !== 'production' && method === 'post') {
            console.log(res);
        }
        return res.data
    },
    error => {
        let errorMessage = messages.connectError

        if (error.response) {
            let { status, data } = error.response;

            const { token } = isLogged()
            if (status && parseInt(status) === 401 && token !== undefined) {
                throwError(messages.unauthenticated)
                logOut()
                return Promise.reject(new Error(messages.unauthenticated));
            } else if((status && parseInt(status) === 409)) {
                throwError(messages.conflict)
                return Promise.reject(new Error(data?.response?.message ?? data?.message));
            } else {
                throwError(data?.response?.message ?? data?.message)
                return Promise.reject(new Error(data?.response?.message ?? data?.message));
            }
        }
    }
)

const throwError = message => {
    Notification.error({
        title: 'Erro!',
        message: message ?? 'Erro ao recuperar dados',
        type: 'error',
        duration: 5 * 1000,
    })
}

export default http

