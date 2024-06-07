<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from "@/store/modules/user.ts";
import { useChatStore } from "@/store/modules/OnlineChat/index.ts";
import { type ChatData } from "@/api/types/OnlineChat/index.ts";
import { type UserData } from "@/api/types/user.ts";
import { Search } from '@element-plus/icons-vue'

const userStore = useUserStore();
const chatStore = useChatStore();

const selectedItem = ref<ChatData | null>(null);

const handleItemClick = (item: any) => {
    selectedItem.value = item;
    console.log('Item clicked:', item);
};

const selectedUsers = ref<UserData[] | null>([]);

const handleUserClick = (item: any) => {
    selectedUsers.value?.push(item);
    console.log('User clicked:', item);
    console.log('Selected users:', selectedUsers.value);
};

const getTime = (time: string) => {
    if (!time) {
        return '';
    }
    const date = new Date(time);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

const messageValue = ref<string>('');

const sendMessage = () => {
    if (!selectedItem.value) {
        return;
    }
    chatStore.sendMessage({
        chatId: selectedItem.value?.chatId,
        senderId: userStore.userData.userId,
        content: messageValue.value,
    }).then(() => {

    }).catch(() => {

    }).finally(() => {
        messageValue.value = '';
    });
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }
};

const emojiClicked = ref(false);

const hidenEmoji = () => {
    // if(emojiClicked.value){
    //     emojiClicked.value = false
    // }
}

const handleHoverChange = () => {
    emojiClicked.value = true
};

const emojiList = [
    'http://tva3.sinaimg.cn/bmiddle/005J4OU5ly1h3r8joivohg308w08wgug.gif',
    'http://tva3.sinaimg.cn/bmiddle/005J4OU5ly1h3r8jpm3wyg30b40b475d.gif',
    'http://tva3.sinaimg.cn/bmiddle/005J4OU5ly1h3r8k1e1vlg308w08we20.gif',
    'http://tva3.sinaimg.cn/bmiddle/005J4OU5ly1h3r8k0p8vog30b40a93zb.gif',
    'http://tva3.sinaimg.cn/bmiddle/005J4OU5ly1h3r8k0uvj6g30b40abmy4.gif'
];

const imageClicked = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
        fileInput.click();
    }
};

const handleFileChange = (e) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        if (!file) {
            return;
        }

        if (file.type !== 'image/png') {
            message.error('Please select a PNG image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        chatStore.sendImage(
            selectedItem.value?.chatId,
            userStore.userData.userId,
            formData,
        ).then(() => {
            message.success('Image sent successfully.');
        }).catch(() => {
            message.error('Failed to send image.');
        });
    }
};

const searchText = ref('');

const filteredChats = computed(() => {
    const text = searchText.value.toLowerCase();
    console.log('text:', text);
    return chatStore.chatData.filter(item =>
        getOtherUserName(item.chatUsers, userStore.userData.userId).toLowerCase().includes(text)
    );
});

const handleAddClick = () => {
    openAdd.value = true;
    userStore.getAllUser();
};

onMounted(() => {
    chatStore.getChatData({ userId: userStore.userData.userId });
});

const openAdd = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const handleOk = () => {
    if (selectedUsers.value.length === 0) {
        message.error('Please select at least one user.');
        return;
    }

    const chatUsers = computed(() => {
        return selectedUsers.value ? selectedUsers.value.map(user => user.userId) : [];
    });

    chatStore.createChat({ chatUsers: chatUsers.value }).then(() => {
        message.success('Chat created successfully.');
        chatStore.getChatData({ userId: userStore.userData.userId });
    }).catch(() => {
        message.error('Failed to create chat.');
    });

    confirmLoading.value = true;
    setTimeout(() => {
        openAdd.value = false;
        confirmLoading.value = false;
    }, 2000);
};

function getOtherUserName(chatUsers: [], myUserId: string) {
    if (!chatUsers) {
        return null;
    }
    const otherUser = chatUsers.filter(user => user.userId !== myUserId);
    if (otherUser.length >= 2) {
        const userNamesString = chatUsers.map(user => user.userName).join(', ');
        return "【群聊】" + userNamesString;
    }
    return otherUser.length > 0 ? otherUser[0].userName : null;
}

function getOtherAvatar(chatUsers: [], myUserId: string) {
    if (!chatUsers) {
        return null;
    }
    const otherUser = chatUsers.filter(user => user.userId !== myUserId);
    if (otherUser.length >= 2) {
        return "/groupChat.svg";
    }
    return otherUser.length > 0 ? otherUser[0].avatar : null;
}

const fakeMessage = {
    content: "  ",
    sendingTime: null,
};

function getLatestMessage(messages: [], myUserId: string) {
    if (messages.length === 0) {
        return fakeMessage;
    }
    const otherUserMessages = messages.filter(message => message.sender.userId !== myUserId);
    if (otherUserMessages.length === 0) {
        return fakeMessage;
    }

    const latestMessage = otherUserMessages.reduce((latest, current) => {
        return new Date(current.sendingTime) > new Date(latest.sendingTime) ? current : latest;
    });

    console.log('latestMessage:', latestMessage);

    return latestMessage
}

function getMessage(chatId: string) {
    const chat = chatStore.chatData.find(chat => chat.chatId === chatId);
    const messages = chat?.messages.sort((a, b) => new Date(a.sendingTime).getTime() - new Date(b.sendingTime).getTime());
    return messages;
}

const searchInput = ref('')

const filteredUsers = computed(() => {
    const text = searchInput.value.toLowerCase();
    return userStore.allUserData.filter(item =>
        item.userName.toLowerCase().includes(text)
    ); 
});
</script>

<template>
    <a-layout class="chat" @click="hidenEmoji">
        <a-layout-sider width="42vh" style="background-color: #ffffff;">
            <div
                style="height: 10vh; width: 100%; display: flex; flex-direction:row; justify-content:space-between; align-items: center;">
                <div class="container">
                    <div class="search-container">
                        <input class="input" type="text" v-model="searchText" placeholder="Search...">
                        <svg viewBox="0 0 24 24" class="search__icon">
                            <g>
                                <path
                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="add-container">
                    <button class="btn" @click="handleAddClick">
                        <svg t="1714974320925" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4247"
                            data-spm-anchor-id="a313x.search_index.0.i4.1b623a81qTwy2e" width="27" height="27">
                            <path
                                d="M930.738818 418.535831H605.170853V93.238515A93.080637 93.080637 0 0 0 512.135324 0a93.058083 93.058083 0 0 0-93.012974 93.261069v325.500303H93.396506a93.306177 93.306177 0 0 0-93.328731 93.261069 93.441502 93.441502 0 0 0 27.222759 66.173634 92.967866 92.967866 0 0 0 65.857878 27.561071h325.973938V930.806367c0 25.756745 10.216993 49.077651 27.087435 65.902986a92.697218 92.697218 0 0 0 65.835323 27.312976 93.148299 93.148299 0 0 0 93.125745-93.215962V605.734592h325.567965c51.490936 0 93.238515-42.108444 93.215961-93.59938-0.022554-51.468382-41.770133-93.59938-93.215961-93.599381z"
                                p-id="4248" data-spm-anchor-id="a313x.search_index.0.i0.1b623a81qTwy2e" class="selected"
                                fill="#A4CAF8"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                style="height: 70vh; width: 100%; margin-top: 2vh; background-color: #DEEDFC; border-radius: 17px; box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);">
                <a-list class="chats-list" item-layout="horizontal" :split=true :data-source="filteredChats">
                    <template #renderItem="{ item }">
                        <a-list-item @click="handleItemClick(item)"
                            :style="{ cursor: 'pointer', backgroundColor: selectedItem?.chatId === item.chatId ? 'white' : '#DEEDFC' }"
                            style="border-radius: 17px;">
                            <a-list-item-meta>
                                <template #avatar>
                                    <a-avatar slot="avatar" :size="52" shape="square"
                                        style="margin-left: 12px; margin-right: 12px;"
                                        :src="getOtherAvatar(item.chatUsers, userStore.userData.userId)" />
                                </template>
                                <template #title>
                                    <h2>{{ getOtherUserName(item.chatUsers,
                                        userStore.userData.userId) }}</h2>
                                </template>
                                <template #description>
                                    <p>{{ getLatestMessage(item.messages,
                                        userStore.userData.userId).content.includes("data:image/png;") ? "[图片]" :
                                        getLatestMessage(item.messages,
                                            userStore.userData.userId).content }}</p>
                                </template>
                            </a-list-item-meta>
                            <h1 style="margin-right: 17px; color: #9B9B9B; font-size: 15px;">
                                {{ getTime(getLatestMessage(item.messages, userStore.userData.userId).sendingTime) }}
                            </h1>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </a-layout-sider>
        <a-layout
            style="background-color: #ffffff; background-image: url('/public/chat.svg'); background-repeat: no-repeat; background-size: 37% 37%; background-position: 114.5% 77%;">
            <a-layout-header style="height: 5vh; background: #ffffff; display: flex; align-items: center;">
                <h1 style="font-size: 22px; color: #141414;">{{ getOtherUserName(selectedItem?.chatUsers,
                    userStore.userData.userId) }}</h1>
            </a-layout-header>
            <a-layout-content style="width: 92vh; background: #ffffff; margin-left: 2vh;">
                <div class="chat-container" style="height: 55vh; border-radius: 17px;">
                    <a-list class="chat-list" size="large" :data-source="getMessage(selectedItem?.chatId)" :split=false>
                        <template #renderItem="{ item }">
                            <a-list-item style="height: 100%; width: 100%;">
                                <div v-if="item.sender.userId != userStore.userData.userId" class="chat_item_left">
                                    <div class="chat_item_avatar">
                                        <a-avatar style="border-radius: 50%;" slot="avatar" :size="52" shape="square"
                                            :src="item.sender.avatar" />
                                    </div>
                                    <div class="chat_item_text">
                                        <div class="nickname">
                                            {{ item.sender.userName }}
                                        </div>
                                        <div v-if="item.type == 0" class="text">
                                            {{ item.content }}
                                        </div>
                                        <div v-if="item.type == 1" class="emoji">
                                            <img :src="item.content" />
                                        </div>
                                        <div v-if="item.type == 2" class="image">
                                            <img :src="item.content" />
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="chat_item_right">
                                    <div class="chat_item_text">
                                        <div class="nickname">
                                            {{ item.sender.userName }}
                                        </div>
                                        <div v-if="item.type == 0" class="text">
                                            {{ item.content }}
                                        </div>
                                        <div v-if="item.type == 1" class="emoji">
                                            <img :src="item.content" />
                                        </div>
                                        <div v-if="item.type == 2" class="image">
                                            <img :src="item.content" />
                                        </div>
                                    </div>
                                    <div class="chat_item_avatar">
                                        <a-avatar style="border-radius: 50%;" slot="avatar" :size="52" shape="square"
                                            :src="item.sender.avatar" />
                                    </div>
                                </div>
                            </a-list-item>
                        </template>
                    </a-list>
                </div>
                <div class="text-container"
                    style="position: relative; height: 22vh; border-radius: 17px; box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);">
                    <a-textarea v-model:value="messageValue" :bordered="false" size="large"
                        placeholder="按Enter发送 / Shift+Enter 换行" :rows="7" allow-clear @keydown="handleKeyDown"
                        style="height: 100%;">
                    </a-textarea>
                    <button class="send-button" @click="sendMessage">
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <span>Send</span>
                    </button>
                    <div class="tools">
                        <div class="tool">
                            <a-popover title="Emoji" trigger="click" :visible="emojiClicked"
                                @visibleChange="handleHoverChange">
                                <template #content>
                                    <div style="display: flex; flex-wrap: wrap;">
                                        <div @click="sendMessage" v-for="(item, index) in emojiList" :key="index">
                                            <img style="height:80px; width:80px" :src="item" />
                                        </div>
                                    </div>
                                </template>
                                <img src="/emoji.svg" />
                            </a-popover>
                        </div>
                        <div class="tool" @click="imageClicked">
                            <input accept="image/png" style="display: none;" id="fileInput" type="file"
                                @change="handleFileChange">
                            <img src="/image.svg" />
                        </div>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>

    <a-modal v-model:open="openAdd" width="700px" title="新建聊天" :confirm-loading="confirmLoading" @ok="handleOk">
        <a-layout>
            <a-layout-sider width="300px" style="background-color: #ffffff;">
                <el-input
                    v-model="searchInput"
                    style="height:42px; width: 270px; margin-top: 7px; margin-bottom: 12px; margin-left: 12px"
                    placeholder="Search User..."
                    :prefix-icon="Search"
                />
                <a-list class="friends-list" item-layout="horizontal" :split=true :data-source="filteredUsers">
                    <template #renderItem="{ item }">
                        <a-list-item @click="handleUserClick(item)"
                            :style="{ cursor: 'pointer', backgroundColor: selectedItem?.userId === item.userId ? '#DEEDFC' : 'white' }">
                            <a-list-item-meta :description="item.userName">
                                <template #avatar>
                                    <a-avatar slot="avatar" :size="45" shape="square"
                                        style="margin-left: 12px; margin-right: 2px;"
                                        :src="item.avatar || '/avatar.svg'" />
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="height: 50px; background-color: #ffffff; display: flex; align-items: center;">
                    <h1 style="margin: 0; margin-left: -37px;">
                        选择联系人
                    </h1>
                </a-layout-header>
                <a-layout-content style="background-color: #ffffff;">
                    <div class="avatars-container">
                        <div v-for="(user, index) in selectedUsers" :key="index" class="avatar">
                            <img :src="user.avatar || '/avatar.svg'" :alt="user.userName" />
                        </div>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-modal>
</template>

<style scoped>
.chat {
    height: 82vh;
    width: 100%;
}

.container {
    position: relative;
    background: linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%);
    border-radius: 1000px;
    padding: 10px;
    display: grid;
    place-content: center;
    z-index: 0;
    max-width: 300px;
    margin: 12px 12px;
}

.search-container {
    position: relative;
    width: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    padding: 5px;
    display: flex;
    align-items: center;
}

.search-container::after,
.search-container::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    position: absolute;
}

.search-container::before {
    top: -1px;
    left: -1px;
    background: linear-gradient(0deg, rgb(218, 232, 247) 0%, rgb(255, 255, 255) 100%);
    z-index: -1;
}

.search-container::after {
    bottom: -1px;
    right: -1px;
    background: linear-gradient(0deg, rgb(163, 206, 255) 0%, rgb(211, 232, 255) 100%);
    box-shadow: rgba(79, 156, 232, 0.7019607843) 3px 3px 5px 0px, rgba(79, 156, 232, 0.7019607843) 5px 5px 20px 0px;
    z-index: -2;
}

.input {
    padding: 10px;
    width: 100%;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    border: none;
    color: #9EBCD9;
    font-size: 20px;
    border-radius: 50px;
}

.input:focus {
    outline: none;
    background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
}

.search__icon {
    width: 50px;
    aspect-ratio: 1;
    border-left: 2px solid white;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    padding-left: 12px;
    margin-right: 10px;
}

.search__icon:hover {
    border-left: 3px solid white;
}

.search__icon path {
    fill: white;
}

.btn {
    display: grid;
    place-items: center;
    background: #e3edf7;
    padding: 1.4em;
    border-radius: 12px;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
        -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    transition: transform 0.5s;
}

.btn:hover {
    box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
        inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
        -0.5px -0.5px 0px rgba(255, 255, 255, 1),
        0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
        0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translateY(0.5em);
}

.btn svg {
    transition: transform 0.5s;
}

.btn:hover svg {
    transform: scale(0.9);
    fill: #333333;
}

.chats-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
    max-height: 70vh;
    overflow-y: auto;

    .ant-list-item {
        padding: 9px 0;
    }

    .ant-avatar {
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.12);
    }

    .ant-list-item-meta {
        align-items: center;
    }

    h2 {
        font-size: 17px;
        margin: 0;
        margin-top: -12px;
    }

    p {
        margin: 0;
        margin-top: -2px;
    }
}

/*定义整体的宽度*/
.chats-list::-webkit-scrollbar {
    width: 7px;
}

/*定义滚动条轨道*/
.chats-list::-webkit-scrollbar-track {
    border-radius: 17px;
}

/*定义滑块*/
.chats-list::-webkit-scrollbar-thumb {
    border-radius: 17px;
    background: #FFFFFF;
}

.chat-list {
    height: 100%;
    width: 100%;
    max-height: 55vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}

/*定义整体的宽度*/
.chat-list::-webkit-scrollbar {
    width: 12px;
}

/*定义滚动条轨道*/
.chat-liste::-webkit-scrollbar-track {
    border-radius: 17px;
}

/*定义滑块*/
.chat-list::-webkit-scrollbar-thumb {
    border-radius: 17px;
    background: #DEEDFC;
}

.chat_item_left {
    height: 100%;
    width: 100%;
    margin: 7px 0px;
    display: flex;
    justify-content: flex-start;

    .chat_item_avatar {
        img {
            height: 50px;
            width: 50px;
            border-radius: 17px;
        }
    }

    .chat_item_text {
        margin-left: 17px;

        .nickname {
            color: black;
            font-size: 14px;
        }

        .text {
            float: left;
            max-width: auto;
            margin-top: 9px;
            padding: 12px 12px;
            font-size: 15px;
            color: #9B9B9B;
            background-color: #F2F2F2;
            border-radius: 0px 12px 12px 12px;
        }

        .emoji {
            display: flex;
            justify-content: flex-start;

            margin-top: 9px;

            img {
                height: 100px;
                width: 100px;
            }
        }

        .image {
            display: flex;
            justify-content: flex-start;

            margin-top: 9px;

            img {
                width: 40%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

.chat_item_right {
    height: 100%;
    width: 100%;
    margin: 7px 0px;
    display: flex;
    justify-content: flex-end;

    .chat_item_text {
        margin-right: 17px;

        .nickname {
            text-align: end;
            color: black;
            font-size: 14px;
        }

        .text {
            float: right;
            max-width: auto;
            margin-top: 9px;
            padding: 12px 12px;
            font-size: 15px;
            color: #ffffff;
            background-color: #A4CAF8;
            border-radius: 12px 0px 12px 12px;
        }

        .emoji {
            display: flex;
            justify-content: flex-end;

            margin-top: 9px;

            img {
                height: 100px;
                width: 100px;
            }
        }

        .image {
            display: flex;
            justify-content: flex-end;

            margin-top: 9px;

            img {
                width: 40%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .chat_item_avatar {
        img {
            height: 50px;
            width: 50px;
            border-radius: 17px;
        }
    }
}

.send-button {
    font-family: inherit;
    font-size: 22px;
    background: #A4CAF8;
    color: white;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 17px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    right: 30px;
    z-index: 2;
}

.send-button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
}

.send-button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
}

.send-button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
}

.send-button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.send-button:hover span {
    transform: translateX(5em);
}

.send-button:active {
    transform: scale(0.95);
}

@keyframes fly-1 {
    from {
        transform: translateY(0.1em);
    }

    to {
        transform: translateY(-0.1em);
    }
}

.tools {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 2;

    .tool {
        margin: 0 10px;

        img {
            cursor: pointer;
            height: 29px;
            width: 29px;
        }
    }
}

.friends-list {
    height: 300px;
    width: 100%;
    overflow: hidden;
    max-height: 300px;
    overflow-y: auto;

    .ant-list-item {
        padding: 9px 0;
    }

    .ant-avatar {
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.12);
    }

    .ant-list-item-meta {
        align-items: center;
    }
}

/*定义整体的宽度*/
.friends-list::-webkit-scrollbar {
    width: 7px;
}

/*定义滚动条轨道*/
.friends-liste::-webkit-scrollbar-track {
    border-radius: 17px;
}

/*定义滑块*/
.friends-list::-webkit-scrollbar-thumb {
    border-radius: 17px;
    background: #DEEDFC;
}

.avatars-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    padding: 12px;
}

.avatar img {
    width: 100%;
    height: 80%;
    border-radius: 12px;
}
</style>