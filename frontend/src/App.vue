<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { useUserStore } from "@/store/modules/user.ts";
import { useNotificationStore } from "@/store/modules/notification.ts";
import { useChatStore } from "@/store/modules/OnlineChat/index.ts";

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const chatStore = useChatStore();

onMounted(() => {
  if(!userStore.userData.userId) {
    console.log('user not login');
    return;
  }
  notificationStore.notificationWebsocketInit(userStore.userData.userId)
  notificationStore.getNotificationData({ userId: userStore.userData.userId });
  chatStore.chatWebsocketInit(userStore.userData.userId)
  chatStore.getChatData({ userId: userStore.userData.userId });
})

onBeforeMount(() => {
  notificationStore.notificationWebsocketClose();
  chatStore.chatWebsocketClose();
})
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style></style>
