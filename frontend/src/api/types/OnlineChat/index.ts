export interface Message {
    /** 信息ID */
    messageId: number
    /** 信息类型 */
    type: number
    /** 信息内容 */
    content: string
    /** 信息发送时间 */
    sendingTime: string
}

export interface ChatData {
    /** 聊天ID */
    chatId: number
    /** 聊天成员 */
    chatUsers: {}
    /** 聊天信息 */
    messages: Message[]
}

export interface CreateChatRequestData {
    /** 聊天成员 */
    chatUsers: string[]
}

export interface FindChatRequestData {
    /** 学工号 */
    userId: string
}

export interface sendMessageRequestData {
    /** 聊天ID */
    chatId: number
    /** 信息内容 */
    content: string
    /** 发送者ID */
    senderId: string
}

export type FindChatResponseData = ApiResponseData<{ data: ChatData[] }>

export type sendMessageResponseData = ApiResponseData<{ data: Message }>