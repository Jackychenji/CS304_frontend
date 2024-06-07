<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElSteps, ElStep, ElForm, ElFormItem, ElResult, FormInstance, FormRules } from 'element-plus';
import { Edit, UploadFilled } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user.ts";
import { ResetRequestData } from "@/api/types/resetPassword.ts";


const userStore = useUserStore();

const stepActive = ref(0);

const newPasswordForSure = ref("");

const resetFormRef = ref<FormInstance | null>(null)

const resetFormData: ResetRequestData = reactive({
  userId: "",
  oldPassword: "",
  newPassword: "",
})

const save = () => {
  useUserStore()
    .resetPassword(resetFormData)
    .then(() => {

    })
    .catch(() => {

    })
    .finally(() => {
    })
  stepActive.value = 1;
};

const resetFormRules: FormRules = {
  userId: [{ required: true, message: "请输入学工号", trigger: "blur" }],
  oldPassword: [
    { required: true, message: "请输入旧的密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  newPassword: [
    { required: true, message: "请输入新的密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  newPasswordForSure: [
    { required: true, message: "请再次输入新的密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
  ],
};

const validateForm = () => {
  resetFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      save();
    } else {
      console.log('表单验证不通过', fields);
    }
  });
};

</script>


<template>
  <div class="reset-form">
    <el-container>
      <el-aside width="500px">
        <img style="width: 500px; height: 500px; margin-top: 10%;" src="/study.svg" />
      </el-aside>
      <el-main>
        <form class="form">
          <span class="title">密码重置</span>
          <el-steps style="background-color: #d5f1f0" :active="stepActive" simple finish-status="success">
            <el-step :icon="Edit" title="填写新密码" />
            <el-step :icon="UploadFilled" title="完成重置" />
          </el-steps>
          <el-form v-if="stepActive === 0" ref="resetFormRef" :model="resetFormData" :rules="resetFormRules"
            :label-width="120">
            <div class="form-container">
              <el-form-item style="margin-top: 12px" label="学工号" prop="userId">
                <input class="input" v-model="resetFormData.userId" placeholder="请输入学工号" />
              </el-form-item>
              <el-form-item label="旧密码" prop="oldPassword">
                <input type="password" class="input" v-model="resetFormData.oldPassword" placeholder="请输入旧密码" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <input type="password" class="input" v-model="resetFormData.newPassword" placeholder="请输入新密码" />
              </el-form-item>
              <el-form-item label="确认新密码" prop="newPasswordForSure">
                <input type="password" class="input" v-model="newPasswordForSure" placeholder="请再一次输入新密码" />
              </el-form-item>
            </div>
            <div style="
							margin-top: 20px;
							display: flex;
							flex-direction: row;
							width: 100%;
							justify-content: center;
						">
              <button style="width: 40%" @click="validateForm">提交</button>
              <button style="margin-left: 10%; width: 40%" @click="userStore.goLogin">
                返回登录
              </button>
            </div>
          </el-form>
        </form>
        <el-result v-if="stepActive === 1" icon="success" title="密码重置成功" sub-title="请牢记自己的新密码，返回登录后使用新密码登录">
          <template #extra>
            <button class="button" @click="userStore.goLogin()">返回登录</button>
          </template>
        </el-result>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.reset-form {
  width: 1000px;
  background: #eaf8f7;
  overflow: hidden;
  border-radius: 17px;
  color: #010101;

  /* 居中显示 */
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 12px #cac6c6;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 17px;
  text-align: center;
}

.form button {
  background-color: #81d4d1;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form button:hover {
  background-color: #6ccdca;
}

.button {
  width: 150px;
  background-color: #81d4d1;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #6ccdca;
}

.title {
  font-weight: bold;
  font-size: 1.9rem;
  margin-bottom: 18px;
}

.form-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 0.5rem;
  width: 100%;
}

.input {
  background: none;
  border: 0;
  outline: 0;
  height: 20px;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 8px 15px;
}
</style>
