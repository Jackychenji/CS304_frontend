<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { useUserStore } from "@/store/modules/user.ts";
import { ResetRequestData } from "@/api/types/resetPassword.ts";

const resetFormData: ResetRequestData = reactive({
    userId: "",
    oldPassword: "",
    newPassword: "",
})

interface FormState {
    oldPassword: string;
    newPassword: string;
    newPasswordForSure: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    oldPassword: '',
    newPassword: '',
    newPasswordForSure: '',
});
const validateOldPass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('Please input the old password');
    }
};

const validateNewPass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('Please input the new password');
    } else {
        if (formState.newPasswordForSure !== '') {
            formRef.value.validateFields('newPasswordForSure');
        }
        return Promise.resolve();
    }
};

const validateNewPassForSure = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('Please input the new password again');
    } else if (value !== formState.newPassword) {
        return Promise.reject("Two inputs don't match!");
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    newPassword: [{ required: true, validator: validateNewPass, trigger: 'change' }],
    oldPassword: [{ required: true, validator: validateOldPass, trigger: 'change' }],
    newPasswordForSure: [{ required: true, validator: validateNewPassForSure, trigger: 'change' }],
};
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    resetFormData.oldPassword = values.oldPassword;
    resetFormData.newPassword = values.newPassword;
    resetFormData.userId = useUserStore().userData.userId;
    useUserStore().resetPassword(resetFormData)
};
const handleFinishFailed = errors => {
    console.log(errors);
};
const resetForm = () => {
    formRef.value.resetFields();
};
const handleValidate = (...args) => {
    console.log(args);
};
</script>

<template>

    <!-- ResetPassword Card -->
    <a-card :bordered="true" class="header-solid h-full card-profile-information" :bodyStyle="{ paddingBottom: '17px' }"
        :headStyle="{ paddingRight: 0, }">
        <template #title>
            <h1>密码修改</h1>
        </template>

        <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
            @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed">
            <a-form-item has-feedback label="旧密码" name="oldPassword">
                <a-input v-model:value="formState.oldPassword" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="新密码" name="newPassword">
                <a-input v-model:value="formState.newPassword" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="确认密码" name="newPasswordForSure">
                <a-input v-model:value="formState.newPasswordForSure" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 7 }">
                <a-button style=" margin-right: 10px" @click="resetForm">重置</a-button>
                <a-button type="primary" danger html-type="submit">确认修改</a-button>
            </a-form-item>
        </a-form>
    </a-card>
    <!-- / ResetPassword Card -->

</template>

<style scoped></style>