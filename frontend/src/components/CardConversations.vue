<script setup lang="ts">
import { defineProps } from 'vue';
import { useUserStore } from "@/store/modules/user.ts";
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const props = defineProps<{
	data: Array<any>;
}>();

function handleReply() {
	router.push('/main/online-chat');
}

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


</script>

<template>

	<!-- Conversations Card -->
	<a-card :bordered="true" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
		<template #title>
			<h1>会话</h1>
		</template>
		<a-list class="conversations-list" item-layout="horizontal" :split="false" :data-source="data">
			<template #renderItem="{ item }">
				<a-list-item>
					<a-list-item-meta :title="getOtherUserName(item.chatUsers, userStore.userData.userId)" :description="getLatestMessage(item.messages,userStore.userData.userId).content">
						<template #avatar>
							<a-avatar slot="avatar" :size="52" shape="square"
								style="margin-right: 12px; margin-top: 17px; margin-left: 12px;" :src="getOtherAvatar(item.chatUsers, userStore.userData.userId)" />
						</template>
					</a-list-item-meta>
					<a-button slot="actions" @click="handleReply">
						回复
					</a-button>
				</a-list-item>
			</template>
		</a-list>
	</a-card>
	<!-- / Conversations Card -->

</template>

<style scoped>
.conversations-list {
	.ant-list-item {
		padding: 11px 0;
	}

	.ant-avatar {
		border-radius: 10.5px;
		box-shadow: rgba(0, 0, 0, 0.12);
	}

	.ant-list-item-meta-title {
		font-size: 14px;
		font-weight: 600;
		color: #141414;
		margin: 0;
	}

	.ant-list-item-meta {
		align-items: center;
	}

	.ant-list-item-meta-description {
		font-size: 12px;
		font-weight: 600;
		color: #8C8C8C;
	}

	.ant-list-item-action {
		margin-left: 0;
	}

	.ant-btn-link {
		font-size: 12px;
	}
}
</style>