import { request } from "@/utils/service.ts"
import type * as Chat from "../../types/OnlineChat/index.ts"

/** 创建聊天 */
export function createChatApi(data: Chat.CreateChatRequestData) {
    return request<ApiResponseData<{}>>({
        url: "/chat/addOneChat",
        method: "post",
        data
    })
}

/** 获取聊天 */
export function getChatApi(userId: string) {
    return request<Chat.FindChatResponseData>({
        url: `/chat/findUserChats/${userId}`,
        method: "get",
    })
}

/** 发送信息 */
export function sendMessageApi(data: Chat.sendMessageRequestData) {
    return request<Chat.sendMessageResponseData>({
        url: "/message/addOne",
        method: "post",
        data
    })
}

/** 发送图片 */
export function sendImageApi(chatId: string, senderId: string, data: FormData) {
    return request<Chat.sendMessageResponseData>({
        url: `/picture/messagePictureUpload/${chatId}/${senderId}`,
        method: "post",
        headers: { 'Content-Type': 'multipart/formdata' },
        data
    })
}

