/** 统一处理 Cookie */

import Cookies from "js-cookie"

const TOKEN = "token"

export const getToken = () => {
    return Cookies.get(TOKEN)
}
export const setToken = (token: string) => {
    Cookies.set(TOKEN, token)
}
export const removeToken = () => {
    Cookies.remove(TOKEN)
}
