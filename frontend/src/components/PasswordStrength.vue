<template>
  <div class="sc-password-strength">
    <div class="sc-password-strength-bar" :class="`sc-password-strength-level-${level}`"></div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch, onMounted} from 'vue';

const props = defineProps({
  modelValue: {type: String, default: ""}
});

const level = ref(0);

function strength(v: string): void {
  let _level = 0;
  const has_length = v.length >= 6;
  const has_number = /\d/.test(v);
  const has_lovercase = /[a-z]/.test(v);
  const has_uppercase = /[A-Z]/.test(v);
  const no_continuity = !/(\w)\1{2}/.test(v);
  const has_special = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/.test(v);

  if (v.length <= 0) {
    _level = 0;
    level.value = _level;
    return;
  }
  if (!has_length) {
    _level = 1;
    level.value = _level;
    return;
  }
  if (has_number) {
    _level += 1;
  }
  if (has_lovercase) {
    _level += 1;
  }
  if (has_uppercase) {
    _level += 1;
  }
  if (no_continuity) {
    _level += 1;
  }
  if (has_special) {
    _level += 1;
  }
  level.value = _level;
}

watch(() => props.modelValue, (newValue: string) => {
  strength(newValue);
});

onMounted(() => {
  strength(props.modelValue);
});
</script>

<style scoped>
.sc-password-strength {
  height: 5px;
  width: 100%;
  background: var(--el-color-info-light-5);
  border-radius: 5px;
  position: relative;
  margin: 10px 0;
}

.sc-password-strength:before {
  left: 20%;
}

.sc-password-strength:after {
  right: 20%;
}

.sc-password-strength:before, .sc-password-strength:after {
  position: absolute;
  content: "";
  display: block;
  width: 20%;
  height: inherit;
  border: 5px solid var(--el-bg-color-overlay);
  border-top: 0;
  border-bottom: 0;
  z-index: 1;
  background-color: transparent;
  box-sizing: border-box;
}

.sc-password-strength-bar {
  position: absolute;
  height: inherit;
  width: 0%;
  border-radius: inherit;
  transition: width .5s ease-in-out, background .25s;
  background: transparent;
}

.sc-password-strength-level-1 {
  width: 20%;
  background-color: var(--el-color-error);
}

.sc-password-strength-level-2 {
  width: 40%;
  background-color: var(--el-color-error);
}

.sc-password-strength-level-3 {
  width: 60%;
  background-color: var(--el-color-warning);
}

.sc-password-strength-level-4 {
  width: 80%;
  background-color: var(--el-color-success);
}

.sc-password-strength-level-5 {
  width: 100%;
  background-color: var(--el-color-success);
}
</style>
