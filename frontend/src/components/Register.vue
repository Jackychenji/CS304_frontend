<script setup lang="ts">
import { reactive, ref } from 'vue';
import scPasswordStrength from "@/components/PasswordStrength.vue";
import { Edit, Message, UploadFilled } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user.ts";
import { RegisterRequestData } from "@/api/types/register.ts";
import { FormInstance, FormRules } from 'element-plus';

const userStore = useUserStore();

const stepActive = ref(0);
const showAgree = ref(false);
const agree = ref(false);
const passwordForSure = ref("");

const registerFormRef = ref<FormInstance | null>(null)

const registerFormData: RegisterRequestData = reactive({
  email: "",
  role: "",
  userId: "",
  userName: "",
  password: "",
})

const registerFormRules: FormRules = {
  email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" },],
  role: [{ required: true, message: "请选择账户类型", trigger: "blur" }],
  userId: [{ required: true, message: "请输入学工号", trigger: "blur" }],
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  passwordForSure: [
    // { required: true, message: "请再次输入密码", trigger: "blur" },
    // { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
  ],
};

function pre() {
  stepActive.value -= 1;
}

function next() {
  stepActive.value += 1;
  // TODO: 下一步
}

function save() {
  useUserStore()
    .register(registerFormData)
    .then(() => {

    })
    .catch(() => {

    })
    .finally(() => {
    })
  stepActive.value += 1;
}

const validateForm = () => {
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      save();
    } else {
      console.log('表单验证不通过', fields);
    }
  });
};
</script>

<template>
  <div class="register-form">
    <el-container>
      <el-aside width="500px">
        <img style="width: 500px; height: 500px; margin-top: 10%;" src="/study.svg" />
      </el-aside>
      <el-main>
        <form class="form">
          <span class="title">注册账号</span>
          <el-steps style="background-color: #d5f1f0" :active="stepActive" simple finish-status="success">
            <el-step :icon="Message" title="基础信息" />
            <el-step :icon="Edit" title="详细信息" />
            <el-step :icon="UploadFilled" title="完成注册" />
          </el-steps>
          <el-form v-if="stepActive === 0" ref="registerFormRef" :model="registerFormData" :rules="registerFormRules"
            :label-width="120">
            <div class="form-container">
              <el-form-item style="margin-top: 12px" label="邮箱" prop="email">
                <input class="input" v-model="registerFormData.email" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <input type="password" class="input" v-model="registerFormData.password" placeholder="请输入登录密码" />
              </el-form-item>
              <sc-password-strength style="width: 80%; margin-left: 17%"
                v-model="registerFormData.password"></sc-password-strength>
              <el-form-item label="确认密码" prop="passwordForSure">
                <input type="password" class="input" v-model="passwordForSure" placeholder="请再一次输入登录密码" />
              </el-form-item>
            </div>
            <el-form-item prop="agree">
              <el-checkbox class="checkbox" value="form.agree">已阅读并同意
              </el-checkbox>
              <span class="link" @click="showAgree = true">《平台服务协议》</span>
            </el-form-item>
          </el-form>
          <el-form v-if="stepActive === 1" ref="registerFormRef" :model="registerFormData" :rules="registerFormRules"
            :label-width="120">
            <div class="form-container">
              <el-form-item style="margin-top: 12px" label="用户名" prop="userName">
                <input class="input" v-model="registerFormData.userName" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="学工号" prop="userId">
                <input class="input" v-model="registerFormData.userId" placeholder="请输入学工号" />
              </el-form-item>
              <el-form-item label="账号类型" prop="role">
                <el-radio-group v-model="registerFormData.role" fill="#81d4d1">
                  <el-radio-button label="Student">学生
                  </el-radio-button>
                  <el-radio-button label="Teacher">老师
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
          <el-form style="text-align: center">
            <button v-if="stepActive === 0" style="width: 45%" @click="next">
              下一步
            </button>
            <button v-if="stepActive === 0" style="margin-left: 7%; width: 45%" @click="userStore.goLogin()">
              返回登录
            </button>
            <button v-if="stepActive === 1" style="width: 30%" @click="pre">
              上一步
            </button>
            <button v-if="stepActive === 1" style="margin-left: 5%; width: 30%" @click="validateForm">
              提交
            </button>
            <button v-if="stepActive === 1" style="margin-left: 5%; width: 30%" @click="userStore.goLogin()">
              返回登录
            </button>
          </el-form>
        </form>
        <el-result v-if="stepActive === 2" icon="success" title="注册成功" sub-title="可以使用用户名、学工号及电子邮箱登录系统">
          <template #extra>
            <button class="button" @click="userStore.goLogin()">前去登录</button>
          </template>
        </el-result>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="showAgree" title="平台服务协议" width="50%" destroy-on-close>
    平台服务协议
    <template #footer>
      <button class="button" @click="showAgree = false">取消</button>
      <button class="button" style="margin-left: 5%" @click="
            showAgree = false;
          agree = true;
          ">
        已阅读并同意
      </button>
    </template>
  </el-dialog>
</template>

<style scoped>
.register-form {
  width: 1100px;
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
  margin-bottom: 22px;
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

.link {
  font-weight: bold;
  color: #81d4d1;
  transition: color 0.3s ease;
}

.link:hover {
  color: #6ccdca;
  text-decoration: underline;
}
</style>