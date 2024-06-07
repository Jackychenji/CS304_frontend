import { request } from "@/utils/service.ts"
import type * as Login from "../../types/login.ts"

/** 登录 */
export function loginApi(data: Login.LoginRequestData) {
    return request<Login.LoginResponseData>({
        url: "/user/login",
        method: "post",
        data
    })
}