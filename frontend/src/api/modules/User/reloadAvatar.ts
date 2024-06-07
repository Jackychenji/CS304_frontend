import { request } from "@/utils/service.ts"

/** 更新头像 */
export function reloadAvatarApi(userId: string, data: FormData) {
    return request<ApiResponseData<{}>>({
        url: `/picture/avatarUpload/${userId}`,
        method: "post",
        headers: { 'Content-Type': 'multipart/formdata' },
        data
    })
}