<script setup lang="ts">
import { useUserStore } from "@/store/modules/user.ts";

const userStore = useUserStore();
</script>

<template>
    <!-- Profile Information Card -->
    <a-card :bordered="true" class="header-solid h-full card-profile-information" :bodyStyle="{ paddingBottom: '17px' }"
        :headStyle="{ paddingRight: 0, }">
        <template #title>
            <h1>个人信息</h1>
        </template>

        <template #extra>
            <a-button type="link" slot="extra">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-muted"
                        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
                        fill="#111827" />
                    <path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
                        fill="#111827" />
                </svg>
            </a-button>
        </template>

        <p style="color: #142738;">
            大家好，我是来自南方科技大学计算机科学与工程系的学生，就读于计算机科学与技术专业，所属于致诚书院。我对计算机领域充满热情，并且热衷于探索各种前沿技术和解决复杂问题的挑战。期待能有机会与您进一步交流和合作！
        </p>
        <hr style="margin: 27px 0;">
        <a-descriptions :title="userStore.userData.userName" :column="1" :labelStyle="{ color: '#8C8C8C' }"
            :contentStyle="{ color: '#142738', fontWeight: 'bold' }">
            <a-descriptions-item label="学工号">
                {{userStore.userData.userId}}
            </a-descriptions-item>
            <a-descriptions-item label="用户名">
                {{userStore.userData.userName}}
            </a-descriptions-item>
            <a-descriptions-item label="角色">
                {{userStore.userData.role}} 
            </a-descriptions-item>
            <a-descriptions-item label="Email">
                {{userStore.userData.email}}
            </a-descriptions-item>
        </a-descriptions>
    </a-card>
    <!-- / Profile Information Card -->

</template>

<style scoped></style>