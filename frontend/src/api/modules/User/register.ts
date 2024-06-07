import { request } from "@/utils/service.ts"
import type * as Register from "../../types/register.ts"

/** 密码重置 */
export function registerApi(data: Register.RegisterRequestData) {
    return request<Register.RegisterResponseData>({
        url: "/user/register",
        method: "post",
        data
    })
}