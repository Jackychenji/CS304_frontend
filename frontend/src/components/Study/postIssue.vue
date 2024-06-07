<script setup lang="ts">
import {ref} from 'vue';
import {useUserStore} from "@/store/modules/user.ts";
import {IssueRequestData} from "@/api/types/StudyAdvice/postIssue.ts";
import {IssuePostApi} from "@/api/modules/StudyAdvice/postIssue.ts";



const userStore = useUserStore();
const defaultAvatar = 'https://example.com/default-avatar.jpg';

// const userStore = useUserStore();
defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const loading = ref<boolean>(false)
const title = ref<string>('');
const content = ref<string>('');
const courseCode = ref<string>('');
const handleButtonClick = () => {
  console.log('按钮被点击了！');
};
const postIssue = () => {

  const issue: IssueRequestData = {
    openerId: userStore.userData.userId,
    content: content.value,
    courseCode:courseCode.value,
    title:title.value
  };
  loading.value = true;
  console.log(issue)
  IssuePostApi(issue)
      .then(response => {
        // 在这里处理成功响应
        console.log("Post issue successful:", response);
        alert('发布成功')
        content.value=''
      })
      .catch(error => {
        // 在这里处理错误响应
        console.error("Error posting issue:", error);
        // 如果需要，可以在这里更新 UI 或者执行其他操作

      })
      .finally(() => {
        loading.value = false;
      });
};

</script>

<template>
  <el-container style="width: 1410px">
    <el-card
        style="height: 70%; width: 100%; font-size: 36px"
        shadow="hover"
    >
      <template #header>
        <div class="card-header" >
          <span>新建问题</span>
          <span style="margin-left: 20px;"></span>
          <a-input v-model:value="courseCode" placeholder="请输入课程编号" show-count :maxlength="20" style="font-size: 18px; width: 15%"/>
        </div>
      </template>
      <a-typography>
        <div style="font-size: 18px;">标题</div>
        <a-input v-model:value="title" show-count :maxlength="20" style="font-size: 18px; width: 100%"/>
        <a-divider/>
        <div style="font-size: 18px;">正文内容</div>
        <a-textarea v-model:value="content" placeholder="请输入内容" :rows="4" show-count :maxlength="100"
                    style="font-size: 18px; width: 100%"/>
      </a-typography>
      <a-button html-type="submit" :loading="loading" type="primary" @click="postIssue">
        提交
      </a-button>
    </el-card>
  </el-container>
</template>
<style lang="scss" scoped>
.custom-descriptions-item {
  width: 200px; /* 设置自定义宽度 */
}

.issue-number {
  color: #666;
  font-size: 40px;
}

a-avatar {
  margin-right: 18px;
}

a-tag {
  margin-right: 8px;
}

a-divider {
  margin: 24px 0;
}

</style>
