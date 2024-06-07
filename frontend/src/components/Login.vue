<script setup lang="ts">
import { reactive, ref } from 'vue';
import { LoginRequestData } from "@/api/types/login.ts";
import { useUserStore } from "@/store/modules/user.ts";
import router from "@/router";
import { User, Lock, Key } from '@element-plus/icons-vue'
import { type FormInstance, type FormRules } from "element-plus"
import { useNotificationStore } from "@/store/modules/notification.ts";
import { useChatStore } from "@/store/modules/OnlineChat/index.ts";
import { message } from 'ant-design-vue';

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const chatStore = useChatStore();

const code = ref("")

const loginFormData: LoginRequestData = reactive({
  userId: "12111511",
  password: "123456789",
})

const loginFormRef = ref<FormInstance | null>(null)

// const login = () => {
//   // router.replace('/main/home');
//   useUserStore()
//     .login(loginFormData)
//     .then(() => {
//       notificationStore.notificationWebsocketInit(userStore.userData.userId)
//       notificationStore.getNotificationData({ userId: userStore.userData.userId });
//       chatStore.chatWebsocketInit(userStore.userData.userId)
//       chatStore.getChatData({ userId: userStore.userData.userId });
//       router.replace('/main/home');
//       console.log('登录成功');
//     })
//     .catch(() => {
//       loginFormData.password = ""
//       console.log('登录失败');
//     })
//     .finally(() => {
//       console.log('登录结束');
//     })
// };

const login = async () => {
  try {
    await useUserStore().login(loginFormData);
    const userId = userStore.userData.userId;
    
    await notificationStore.notificationWebsocketInit(userId);
    await notificationStore.getNotificationData({ userId });
    await chatStore.chatWebsocketInit(userId);
    await chatStore.getChatData({ userId });

    router.replace('/main/home');
    message.success('Login successfully.');
    console.log('登录成功');
  } catch (error) {
    loginFormData.password = "";
    console.log('登录失败', error);
  } finally {
    console.log('登录结束');
  }
};

const loginFormRules: FormRules = {
  userId: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}

const validateForm = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      login();
      console.log('表单验证通过', fields);
    } else {
      console.log('表单验证不通过', fields);
    }
  });
};

</script>

<template>
  <div class="login-form" ref="loginForm">
    <el-container>
      <el-aside width="500px" style="text-align: center;">
        <div style="display: flex; flex-direction: column; text-align: center; margin-top: 10%; margin-bottom: -5%;">
          <span class="title">SUSTech</span>
          <span class="subtitle">Academic Assistant</span>
        </div>
        <img style="width: 400px;" src="/study.svg" />
      </el-aside>
      <el-main>
        <el-form class="form" ref="loginFormRef" :model="loginFormData" :rules="loginFormRules">
          <div class="logo">
            <img style="width: 300px;" src="/logo_word.png" />
          </div>
          <!-- <span style="font-weight: bold; font-size: 1.9rem; margin-bottom: 19px;">注册账号</span> -->
          <div class="form-container">
            <div style="display: flex; align-items: center;">
              <el-icon size=" 30" style="margin: 0 12px;">
                <user />
              </el-icon>
              <input type="text" v-model="loginFormData.userId" class="input" :placeholder="'用户名 / 学号 / 邮箱'" />
            </div>

            <div style="display: flex; align-items: center;">
              <el-icon size=" 30" style="margin: 0 12px;">
                <lock />
              </el-icon>
              <input type="password" v-model="loginFormData.password" class="input" :placeholder="'请输入密码'" />
            </div>

            <div style="display: flex; align-items: center;" v-if="false">
              <el-icon size=" 30" style="margin: 0 12px;">
                <key />
              </el-icon>
              <input type="text" v-model="code" class="input" :placeholder="'请输入验证码'" />
            </div>
          </div>
          <div class="lose">
            <button @click="userStore.goForget()">忘记密码?
            </button>
          </div>
          <button class="login-button" @click.prevent="validateForm">登录</button>
        </el-form>
        <div class="form-section">
          还没有账号?
          <button @click="userStore.goRegister()">创建新账号
          </button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.login-form {
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

/*Form text*/
.title {
  font-size: 2.2rem;
  font-family: "Chalkboard SE", sans-serif;
}

.subtitle {
  font-size: 2.2rem;
  font-family: "Chalkboard SE", sans-serif;
}

/*Inputs box*/
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
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
  padding: 8px 15px;
}

.form-section {
  padding: 16px;
  font-size: 1.2rem;
  background-color: #d5f1f0;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section button {
  font-weight: bold;
  color: #81d4d1;
  transition: color 0.3s ease;
  font-size: 1.2rem;

  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.form-section button:hover {
  color: #6ccdca;
  text-decoration: underline;
}

/*Button*/
.form .login-button {
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

.form .login-button:hover {
  background-color: #6ccdca;
}

.lose {
  font-size: 1.2rem;
  text-align: right;
  margin: -5px 10px;
}

.lose button {
  font-weight: bold;
  color: #81d4d1;
  transition: color 0.3s ease;
  font-size: 1.2rem;

  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.lose button:hover {
  color: #6ccdca;
  text-decoration: underline;
}
</style>
