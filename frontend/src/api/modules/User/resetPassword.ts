import { request } from "@/utils/service.ts"
import type * as Reset from "../../types/resetPassword.ts"

/** 密码重置 */
export function resetPasswordApi(data: Reset.ResetRequestData) {
    return request<Reset.ResetResponseData>({
        url: "/user/updatePassword",
        method: "post",
        data
    })
}