<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from "@/store/modules/user.ts";
import { useChatStore } from "@/store/modules/OnlineChat/index.ts";

const userStore = useUserStore();
const chatStore = useChatStore();

// Conversation's list data.
const conversationsData = [
    {
        id: "1",
        title: "Sophie B.",
        code: "Hi! I need more information…",
        avatar: "/face-3.jpg",
    },
    {
        id: "2",
        title: "Anne Marie",
        code: "Awesome work, can you…",
        avatar: "/face-4.jpg",
    },
    {
        id: "3",
        title: "Ivan",
        code: "About files I can…",
        avatar: "/face-5.jpeg",
    },
    {
        id: "4",
        title: "Peterson",
        code: "Have a great afternoon…",
        avatar: "/face-6.jpeg",
    },
    {
        id: "5",
        title: "Nick Daniel",
        code: "Hi! I need more information…",
        avatar: "/face-2.jpg",
    },
];

const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

async function reloadAvatar(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];

    if (!file) {
        return;
    }

    if (file.type !== 'image/png') {
        message.error('Please select a PNG image.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    userStore.reloadAvatar(formData).then(() => {
        useUserStore().reloadInfo().then(() => {
            message.success('Avatar updated successfully.');
        }).catch((error) => {
            message.error('Failed to update info.');
        });
    }).catch((error) => {
        message.error('Failed to update avatar.');
    });
}
</script>

<template>
    <div>
        <!-- Header Background Image -->
        <div class="profile-nav-bg" style="background-image: url('/bg-profile.jpg')"></div>
        <!-- / Header Background Image -->

        <!-- User Profile Card -->
        <a-card class="card-profile-head" :bordered="false" :bodyStyle="{ padding: 0, }">
            <template #title>
                <div class="ant-card-head">
                    <a-row type="flex" align="middle">
                        <a-col class="col-info" :span="24" :md="12">
                            <a-avatar :size="70" shape="square" :src="userStore.userData.avatar || '/avatar.svg'"
                                @click="triggerFileInput" style="cursor: pointer;"></a-avatar>
                            <input type="file" accept="image/png" ref="fileInput" @change="reloadAvatar"
                                style="display: none;">
                            <div class="avatar-info">
                                <h4>{{ userStore.userData.userName }}</h4>
                                <p>Student / Southern University of Science and Technology</p>
                            </div>
                        </a-col>
                        <a-col :span="24" :md="12"
                            style="display: flex; align-items: center; justify-content: flex-end">
                            <a-radio-group v-model="headerBtns" size="large">
                                <a-radio-button value="overview">上传新的头像</a-radio-button>
                                <a-radio-button value="teams">修改个人信息</a-radio-button>
                            </a-radio-group>
                        </a-col>
                    </a-row>
                </div>
            </template>
        </a-card>
        <!-- User Profile Card -->

        <a-row type="flex" :gutter="24">

            <a-col :span="24" :md="8" style="margin-bottom: 7px;">

                <!-- Profile Information Card -->
                <CardProfileInformation></CardProfileInformation>
                <!-- / Profile Information Card -->

            </a-col>

            <a-col :span="24" :md="8" style="margin-bottom: 7px;">

                <!-- Conversations Card -->
                <CardConversations :data="chatStore.chatData"></CardConversations>
                <!-- / Conversations Card -->

            </a-col>

            <a-col :span="24" :md="8" style="margin-bottom: 7px;">

                <!-- ResetPassword Card -->
                <CardResetPassword></CardResetPassword>
                <!-- / ResetPassword Card -->
                <br />
                <a-card>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </a-card>

            </a-col>

        </a-row>
    </div>
</template>


<style scoped>
.profile-nav-bg {
    height: 200px;
    border-radius: 12px;
    box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
    background-size: cover;
    background-position: center;
}

.card-profile-head {
    margin: -53px 0px 24px;

    @media(min-width: 992px) {
        margin: -53px 24px 24px;
    }

    .ant-card-head {
        border-bottom: 0;
        padding: 0 12px;

        .ant-radio-group {
            margin-top: 15px;

            @media(min-width: 992px) {
                margin-top: 0;
            }
        }

        .col-info {
            display: flex;
            align-items: center;
        }

        .avatar-info {
            margin-left: 17px;

            h4 {
                font-size: 27px;
                font-weight: 700;
                margin: 17px 0;
            }

            p {
                font-size: 14px;
                color: #8c8c8c;
                margin-top: -12px;
            }

        }

        .ant-avatar {
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            margin: 0;
        }
    }
}
</style>