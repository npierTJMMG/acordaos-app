const TokenKey = 'USER_TOKEN'
import axios from 'axios'
import env from 'src/environments.js'

export function isLogged() {
    return JSON.parse(sessionStorage.getItem(TokenKey))
}

export function logIn(user) {
    return sessionStorage.setItem(TokenKey, JSON.stringify(user))
}

export function logOut() {
    sessionStorage.removeItem(TokenKey)
    return document.location.href = '/'
}
export function getPermission(moduleName, permissions, requestPermission) {
    let userPermission = null
    
    permissions.map(item => {
        if (item.descricao === moduleName) {
            userPermission = item
        }
    })

    if (userPermission === null) {
        return false
    }

    if (userPermission[requestPermission] !== "X") {
        return false
    }
    return true
}

export const verifyIP = (to, from, next) => {
    axios.get(`${env.domain}/auth/verifyIP`).then(
        (res) => {
            if (res.data['ipChecked']){
                next()
            } else {
                next('/pesquisa/portal')
            }
            
        },
        (error) => {

        }
    )
}