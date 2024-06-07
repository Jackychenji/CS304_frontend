import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import { FindNotificationRequestData, type NotificationData } from "@/api/types/notification.ts";
import { getNotificationApi } from "@/api/modules/User/notification";
import store from "@/store";
import { SmileOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { h } from 'vue';

export const useNotificationStore = defineStore("notification", () => {
    const notificationData = reactive<NotificationData[]>([])

    const websocket = ref()

    const serverUrl = import.meta.env.VITE_WEBSOCKET_BASE_URL_Notification

    function notificationWebsocketInit(userId) {
        websocket.value = new WebSocket(`${serverUrl}${userId}`)

        console.log('WebSocket Connection State:' + websocket.value.readyState)

        websocket.value.onopen = () => {
            console.log("Connection established")
        }

        websocket.value.onmessage = async (event) => {

            const notification = JSON.parse(event.data)

            notificationData.push(notification)

            openNotification(notification)
        }

        websocket.value.onclose = () => {
            console.log("Connection closed")
        }

        websocket.value.onerror = (error) => {
            console.log(error)
        }
    }

    function notificationWebsocketClose() {
        if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
            websocket.value.close();
            console.log("Connection closed");
        } else {
            console.log("WebSocket is not connected or already closed");
        }
    }

    const openNotification = (data: {}) => {
        notification.open({
            message: data.title,
            description: data.content,
            icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
        });
    };

    const getNotificationData = async ({ userId }: FindNotificationRequestData) => {
        console.log(userId)
        const apiData = await getNotificationApi(userId)
        Object.assign(notificationData, apiData.data)
        console.log(apiData)
    }

    return { notificationData, notificationWebsocketInit, notificationWebsocketClose, getNotificationData }
})

/** 在 setup 外使用 */
export function useNotificationStoreHook() {
    return useNotificationStore(store)
}
