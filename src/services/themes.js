const TokenKey = 'Theme-Token'

export function getTheme() {
    return JSON.parse(sessionStorage.getItem(TokenKey))
}

export function setTheme(theme) {
    return sessionStorage.setItem(TokenKey, JSON.stringify(theme))
}
