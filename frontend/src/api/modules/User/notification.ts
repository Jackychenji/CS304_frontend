import { request } from "@/utils/service.ts"
import type * as Notification from "../../types/notification.ts"

/** 登录 */
export function getNotificationApi(userId: string) {
    return request<Notification.FindNotificationResponseData>({
        url: `/notification/findByUserId/${userId}`,
        method: "get",
    })
}