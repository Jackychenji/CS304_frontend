import { request } from "@/utils/service.ts"
import type * as User from "../../types/user.ts"

/** 刷新信息 */
export function getAllUserApi() {
    return request<User.GetAllUserResponseData>({
        url: "/user/findAll",
        method: "get",
    })
}