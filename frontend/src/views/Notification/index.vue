<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { type NotificationData } from "@/api/types/notification.ts";
import { useUserStore } from "@/store/modules/user.ts";
import { useNotificationStore } from "@/store/modules/notification.ts";

const userStore = useUserStore();
const notificationStore = useNotificationStore();

const info = ref(false);

const notificationDetails = reactive<NotificationData>({
    notificationId: 0,
    type: '',
    title: '',
    content: '',
    releaseTime: '',
    userId: '',
    read: false
});

onMounted(() => {
    console.log(`the component is now mounted.`)
    notificationStore.getNotificationData({ userId: userStore.userData.userId });
})

const handleCheck = (record: any) => {
    console.log(notificationDetails);
    Object.assign(notificationDetails, record);
    console.log(record);
    info.value = true;
};

const handleRead = () => {
    info.value = false;
};

const handleDelete = (e: MouseEvent) => {
    console.log(e);
    return new Promise(resolve => {
        setTimeout(() => resolve(true), 3000);
    });
};
const handleCancel = (e: MouseEvent) => {
    console.log(e);
    message.error('Click on No');
};

const getColor = (type: string) => {
    if (type === 'account') {
        return 'red';
    } else if (type === 'comment' || type === 'reply') {
        return 'green';
    } else if (type === 'material') {
        return 'blue';
    } else if (type === 'solution' || type === 'discussion') {
        return 'purple';
    } else {
        return 'default';
    }
};

const columns = [
    // {
    //     title: '编号',
    //     dataIndex: 'notificationId',
    //     key: 'notificationId',
    //     align: 'center',
    //     width: '10%',
    // },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: '10%',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        width: '10%',
    },
    {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        align: 'center',
        width: '20%',
    },
    {
        title: '时间',
        dataIndex: 'releaseTime',
        key: 'releaseTime',
        align: 'center',
        width: '10%',
    },
    // {
    //     title: '通知用户',
    //     dataIndex: 'userId',
    //     key: 'userId',
    //     align: 'center',
    //     width: '10%',
    // },
    {
        title: '操作',
        key: 'action',
        align: 'center',
        width: '17%',
    },
];
</script>

<template>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0, }">
        <template #title>
            <a-row type="flex" align="middle">
                <a-col :span="24" :md="1">
                    <span>
                        <svg style="height: 29px; width: 29px;" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </span>
                </a-col>
                <a-col :span="24" :md="11">
                    <h1 style="font-family: 'simsun', sans-serif; font-size: 22px;">通知信息</h1>
                </a-col>
                <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
                    <a-radio-group v-model="headerBtns" size="large">
                        <a-radio-button value="real" danger>一键已读</a-radio-button>
                        <a-radio-button value="delete">一键删除</a-radio-button>
                    </a-radio-group>
                </a-col>
            </a-row>
        </template>
        <a-table :columns="columns" :data-source="notificationStore.notificationData">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                    <span>
                        <a-tag key="record.type" :color="getColor(record.type)">
                            {{ record.type.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'releaseTime'">
                    <span>
                        {{ new Date(record.releaseTime) }}
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button type="primary" ghost @click="handleCheck(record)"
                            style="margin: 0 12px;">查看详情</a-button>
                        <a-popconfirm title="Are you sure delete this notification?" @confirm="handleDelete(record)"
                            @cancel="handleCancel">
                            <template #icon><question-circle-outlined style="color: red" /></template>
                            <a-button danger>删除</a-button>
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
    </a-card>
    <a-modal v-model:open="info" title="通知详情" width="900px">
        <a-descriptions style="margin-top: 22px;">
            <a-descriptions-item label="编号">{{ notificationDetails.notificationId }}</a-descriptions-item>
            <a-descriptions-item label="类型">{{ notificationDetails.type }}</a-descriptions-item>
            <a-descriptions-item label="标题">{{ notificationDetails.title }}</a-descriptions-item>
            <a-descriptions-item label="内容">{{ notificationDetails.content }}</a-descriptions-item>
            <a-descriptions-item label="时间">{{ new Date(notificationDetails.releaseTime) }}</a-descriptions-item>
            <a-descriptions-item label="通知人">{{ notificationDetails.userId }}</a-descriptions-item>
        </a-descriptions>
        <template #footer>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="handleRead">已读</a-button>
        </template>
    </a-modal>
</template>

<style scoped></style>