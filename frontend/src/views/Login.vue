<script setup lang="ts">
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import { useUserStore } from '@/store/modules/user.ts';

const userStore = useUserStore();
</script>


<template>
  <div class="background-container">
    <div class="logo">
      <!-- <img src="/logo_word.png" /> -->
    </div>
    <div class="version">© SUSTech Academic Assistant 1.2.0</div>

    <login v-if="userStore.showTab === 0" />
    <register v-if="userStore.showTab === 1" />
    <reset-password v-if="userStore.showTab === 2" />
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('/background_sustech.jpg');
  background-attachment: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-origin: border-box;
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.logo {
  position: absolute;
  top: 30px;
  /* 距离顶部的距离 */
  left: 50px;
  /* 距离左侧的距离 */
  z-index: 0;
  /* 确保logo位于表单之上 */
}

.logo img {
  width: 300px;
  /* 调整logo的宽度 */
  height: auto;
  /* 根据宽度等比例缩放高度 */
}

.version {
  font-size: 12px;
  position: fixed;
  bottom: 5px;
  left: 10px;
  color: #ffffff;
}
</style>
