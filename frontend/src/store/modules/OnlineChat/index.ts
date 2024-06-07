import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import { CreateChatRequestData, FindChatRequestData, sendMessageRequestData, type ChatData } from "@/api/types/OnlineChat/index.ts";
import { createChatApi, getChatApi, sendMessageApi, sendImageApi } from "@/api/modules/OnlineChat/index.ts";
import store from "@/store";

export const useChatStore = defineStore("chat", () => {
    const chatData = reactive<ChatData[]>([])

    const websocket = ref()

    const serverUrl = import.meta.env.VITE_WEBSOCKET_BASE_URL_Message

    function chatWebsocketInit(userId) {
        websocket.value = new WebSocket(`${serverUrl}${userId}`)

        console.log('WebSocket Connection State:' + websocket.value.readyState)

        websocket.value.onopen = () => {
            console.log("Connection established")
        }

        websocket.value.onmessage = async (event) => {

            const newMessage = JSON.parse(event.data).message

            console.log('Received message:', newMessage)

            const chat = chatData.find(chat => chat.chatId === newMessage.messageChat);

            if (chat) {
                chat.messages.push(newMessage);
            } else {
                getChatData({ userId: userId });
                const chat = chatData.find(chat => chat.chatId === newMessage.messageChat);
                if (chat) {
                    chat.messages.push(newMessage);
                } else {
                    console.warn(`ChatData with chatId ${newMessage.messageChat} not found.`);
                }
            }

            console.log('Chat Data:', chatData)
        }

        websocket.value.onclose = () => {
            console.log("Connection closed")
        }

        websocket.value.onerror = (error) => {
            console.log(error)
        }
    }

    function chatWebsocketClose() {
        if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
            websocket.value.close();
            console.log("Connection closed");
        } else {
            console.log("WebSocket is not connected or already closed");
        }
    }

    const createChat = async ({ chatUsers }: CreateChatRequestData) => {
        const apiData = await createChatApi({ chatUsers })
        console.log(apiData)
    }

    const getChatData = async ({ userId }: FindChatRequestData) => {
        const apiData = await getChatApi(userId)
        Object.assign(chatData, apiData.data)
    }

    const sendMessage = async ({ content, senderId, chatId }: sendMessageRequestData) => {
        const apiData = await sendMessageApi({ content, senderId, chatId })
        const newMessage = apiData.data
        const chat = chatData.find(chat => chat.chatId === chatId);
        chat.messages.push(newMessage)
    }

    const sendImage = async (chatId: string, senderId: string, data: FormData) => {
        const apiData = await sendImageApi(chatId, senderId, data)
        const newMessage = apiData.data
        const chat = chatData.find(chat => chat.chatId === chatId);
        chat.messages.push(newMessage)
    }

    return { chatData, chatWebsocketInit, chatWebsocketClose, createChat, getChatData, sendMessage, sendImage }
})

/** 在 setup 外使用 */
export function useChatStoreHook() {
    return useChatStore(store)
}