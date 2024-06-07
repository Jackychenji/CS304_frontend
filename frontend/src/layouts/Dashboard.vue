<template>
  <el-container class="layout-container">
    <el-aside width="37vh">
      <el-scrollbar>
        <div style="padding: 10px 0;display: flex; justify-content: center; align-items: center;">
          <img style="height: 8vh" src="/logo_word.png">
        </div>
        <el-menu :default-openeds="['1']" :default-active="this.$route.path" router active-text-color='#d3e1ef'>
          <el-menu-item index="/main/home">
            <el-icon class="menu-icon">
              <!-- <component is="el-icon-house" /> -->
              <img style="width: 22px;" src="/home.svg" />
            </el-icon>
            <span class="menu-text">主页</span>
          </el-menu-item>

          <template v-for="(menu, index) in menuItems">
            <el-sub-menu :index="menu.index">
              <template #title>
                <el-icon class="menu-icon">
                  <component :is="menu.icon" />
                </el-icon>
                <span class="menu-text">{{ menu.title }}</span>
              </template>
              <template v-for="(group, groupIndex) in menu.children">
                <el-menu-item-group :title="group.title">
                  <template v-for="(item, itemIndex) in group.items">
                    <el-menu-item :index="item.index">
                      <span class="menu-text">{{ item.title }}</span>
                    </el-menu-item>
                  </template>
                </el-menu-item-group>
              </template>
            </el-sub-menu>
          </template>

          <el-menu-item index="/main/online-chat">
            <el-icon class="menu-icon">
              <component is="el-icon-connection" />
            </el-icon>
            <span class="menu-text">在线聊天</span>
          </el-menu-item>

          <el-menu-item index="/main/notification">
            <el-icon class="menu-icon">
              <component is="el-icon-notification" />
            </el-icon>
            <span class="menu-text">通知</span>
          </el-menu-item>

          <el-menu-item index="/main/usercenter">
            <el-icon class="menu-icon">
              <component is="el-icon-user" />
            </el-icon>
            <span class="menu-text">用户中心</span>
          </el-menu-item>

        </el-menu>
        <span class="version">
          SUSTech Academic Assistant 1.0.2
        </span>
      </el-scrollbar>

    </el-aside>

    <el-container>
      <el-header height="10vh">
        <div class="toolbar">
          <!-- 左侧顶置内容 -->
          <el-page-header class="left-align" @back="onBack" :icon="null">
            <template #breadcrumb>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </template>
            <template #title>
              <!-- <div class="loader">
                <svg viewBox="0 0 80 80">
                  <circle id="test" cx="40" cy="40" r="32"></circle>
                </svg>
              </div> -->
              <div class="loader">
                <div class="book-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 126 75" class="book">
                    <rect stroke-width="5" stroke="#ADECF7" rx="7.5" height="70" width="121" y="2.5" x="2.5"></rect>
                    <line stroke-width="5" stroke="#ADECF7" y2="75" x2="63.5" x1="63.5"></line>
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M25 20H50"></path>
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M101 20H76"></path>
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M16 30L50 30"></path>
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M110 30L76 30"></path>
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff74" viewBox="0 0 65 75" class="book-page">
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M40 20H15"></path>
                    <path stroke-linecap="round" stroke-width="4" stroke="#E6E5E5" d="M49 30L15 30"></path>
                    <path stroke-width="5" stroke="#ADECF7"
                      d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z">
                    </path>
                  </svg>
                </div>
              </div>

            </template>

            <template #content>
              <span>{{ this.$route.name }}</span>
            </template>
          </el-page-header>

          <h1>
            <span
              style="color: #DEEDFC; font-size: 50px; font-weight:200; font-family: 'AlimamaDongFangDaKai', sans-serif">南方科技大学学业辅助系统</span>
            <!-- <span style=" color: #DEEDFC; font-size: 52px; font-family: 'Chalkboard SE', sans-serif">SUSTech Academic
              Assistant</span> -->
          </h1>

          <!-- 右侧顶置内容 -->
          <div class="right-align">
            <!-- 设置图标 -->
            <el-icon size="30" style="margin:0 22px; cursor: pointer;">
              <Setting />
            </el-icon>

            <a-dropdown :trigger="['click']" placement="bottomRight" @click="notification">
              <el-icon size="30" style="margin:0 22px; cursor: pointer;">
                <Notification />
              </el-icon>
              <template #overlay>
                <a-list class="notifications-list" bordered split
                  :data-source="notificationStore.notificationData.slice(0, 3)" item-layout="horizontal" slot="overlay">
                  <template #renderItem="{ item }">
                    <a-list-item style="box-shadow: 0 2px 4px rgba(0,0,0,0.2); border-radius: 9px;">
                      <a-list-item-meta style="display: flex; align-items: center; margin: 12px 0px">
                        <template #description>
                          <div style="display: flex; align-items: center; margin-top: -17px;">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
                                fill="#111827" />
                            </svg>
                            <span style="font-size: 12px; font-weight: 600; color: #8C8C8C;  margin: 0px 10px">{{
                              new Date(item.releaseTime) }}</span>
                          </div>
                        </template>
                        <template #title>
                          <h1 style="font-size: 15px; font-weight: 600; color: #141414; margin-top: -22px">{{ item.title
                            }}</h1>
                        </template>
                        <template #avatar>
                          <img style="width: 37px; margin-right: 17px; margin-top: 9px; margin-left: 12px;"
                            :src=toPath(item.type) />
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                  <template #header>
                    <div>通知</div>
                  </template>
                  <template #footer>
                    <div class="notifications-history">
                      <el-button link @click="handleHistory">查看通知历史</el-button>
                    </div>
                  </template>
                </a-list>

              </template>
            </a-dropdown>

            <!-- <el-icon size="30" style="margin:0 22px; cursor: pointer;" @click="showMessage">
              <Message />
            </el-icon> -->

            <el-drawer title="新消息" v-model="message" :size="350" append-to-body destroy-on-close>
              <el-container>
                <el-main>
                  <el-scrollbar>
                    <ul>
                      <p v-for="item in 22" :key="item" class="scrollbar-demo-item">{{ item }}</p>
                    </ul>
                  </el-scrollbar>
                </el-main>
                <el-footer>
                  <el-button type="primary">消息中心</el-button>
                  <el-button @click="markRead">全部设为已读</el-button>
                </el-footer>
              </el-container>
            </el-drawer>


            <!-- 用户信息下拉菜单 -->
            <el-dropdown trigger="click" @command="handleUser">
              <button class="user-button">
                <el-avatar class="avatar" shape="circle" :size="37" :src="userStore.userData.avatar || '/avatar.svg'"
                  @error="true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
                {{userStore.userData.userName}}
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
                  <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Setting, Notification, Message } from '@element-plus/icons-vue'
import router from "@/router";
import menuData from '@/router/menuData.json';
import { ElNotification as notify } from 'element-plus'

import { useNotificationStore } from "@/store/modules/notification.ts";
import { useUserStore } from "@/store/modules/user.ts";
import { useChatStore } from "@/store/modules/OnlineChat/index.ts";

const notificationStore = useNotificationStore();
const userStore = useUserStore();
const chatStore = useChatStore();

function toPath(type: string) {
  if (type === 'account') {
    return '/account.svg';
  } else if (type === 'comment'  || type === 'reply') {
    return '/comment.svg';
  } else if (type === 'material') {
    return '/material.svg';
  } else if (type === 'solution' || type === 'discussion') {
    return '/issue.svg';
  } else {
    return '/system.svg';
  }
}

const handleHistory = () => {
  router.replace({ path: "/main/notification" });
}

const menuItems = menuData;

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onBack = () => {
  notify('Back')
}

function handleUser(command: string) {
  if (command === "usercenter") {
    router.push({ path: "/main/usercenter" });
  }
  if (command === "loginout") {
    notificationStore.notificationWebsocketClose();
    chatStore.chatWebsocketClose();
    router.replace({ path: "/login" });
  }
}

/** 角标当前值 */
const badgeValue = 2
/** 角标最大值 */
const badgeMax = 99

const message = ref(false)

const showMessage = () => {
  message.value = true
}

const data: string[] = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
</script>

<style scoped>
.layout-container {
  height: 98vh;
  /* background-color: #FCFCFC; */
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  /* background: #FCFCFC; */
}

.layout-container .el-aside .el-scrollbar {
  height: 95vh;
  width: 80%;
  left: 10%;
  top: 2%;
  position: relative;
  border-radius: 22px;
  box-shadow: 0 0 22px #cac6c6;
  transition: all 0.7s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.layout-container .el-aside .el-scrollbar:hover {
  transform: scale(1.02);

}

.version {
  font-size: 12px;
  margin: 0 40px;
  position: absolute;
  bottom: 12px;
}

.layout-container .el-menu {
  border-right: none;
  padding: 10px 29px;

  .el-menu-item {
    border-radius: 22px;
  }

  .el-sub-menu {
    border-radius: 22px;
  }
}

/* 自定义菜单项的图标样式 */
.menu-icon {
  margin-right: 17px;
  font-size: 22px;
  /* 设置图标大小 */
}

/* 自定义菜单项文字的样式 */
.menu-text {
  /* font-family: 'Chalkboard SE', sans-serif; */
  /* 设置字体 */
  font-size: 19px;
  /* 设置字体大小 */
  /* font-weight: 700; */
}

.layout-container .el-container {
  height: 97vh;
  /* background-color: #FCFCFC; */
}

.layout-container .el-header {
  top: 2%;
  position: relative;
  color: var(--el-text-color-primary);
  text-align: right;
  font-size: 12px;
}

.layout-container .el-main {
  top: 2%;
  position: relative;
}

.layout-container .toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  left: 20px;
}

.layout-container .left-align {
  align-items: center;
  /* 右侧内容居中对齐 */
}

.layout-container .right-align {
  display: flex;
  align-items: center;
  /* 右侧内容居中对齐 */
}

.user-button {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: #98acc6;
  background-color: #e0e8ef;
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  border-color: rgba(255, 255, 255, 0.333);
  border-radius: 40px 40px 40px 40px;
  padding: 16px 16px;
  transform: translate(0px, 0px) rotate(0deg);
  transition: 0.2s;
  box-shadow: -4px -2px 16px 0 #ffffff, 4px 2px 16px 0 rgb(95 157 231 / 48%);
  cursor: pointer;
}

.user-button:hover {
  color: #516d91;
  background-color: #E5EDF5;
  box-shadow: -2px -1px 8px 0 #ffffff, 2px 1px 8px 0 rgb(95 157 231 / 48%);
}

.user-button:active {
  box-shadow: none;
}

/* .loader {
  --path: #2f3545;
  --dot: #7e97b8;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
}

.loader:before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
} */

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-wrapper {
  width: 72px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.book {
  width: 100%;
  height: auto;
  filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.137));
}

.book-wrapper .book-page {
  width: 50%;
  height: auto;
  position: absolute;
  animation: paging 0.77s linear infinite;
  transform-origin: left;
}

@keyframes paging {
  0% {
    transform: rotateY(0deg) skewY(0deg);
  }

  50% {
    transform: rotateY(90deg) skewY(-20deg);
  }

  100% {
    transform: rotateY(180deg) skewY(0deg);
  }
}

.notifications-list {
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  min-width: 300px;
  overflow-y: auto;
  max-height: 500px;
}

.notifications-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>