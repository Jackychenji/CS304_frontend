import { request } from "@/utils/service.ts"
import type * as Login from "../../types/login.ts"

/** 刷新信息 */
export function reloadInfoApi(userId: string) {
    return request<Login.LoginResponseData>({
        url: `/user/findByUserId/${userId}`,
        method: "get",
    })
}