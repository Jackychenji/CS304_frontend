<script setup lang="ts">
import { ref } from 'vue';
import { IssueRequestData } from "@/api/types/StudyAdvice/getMyIssue.ts";
import { issueGetApi } from "@/api/modules/StudyAdvice/getMyIssue.ts";
import { useRouter } from 'vue-router'; // Import Vue Router

import {useUserStore} from "@/store/modules/user.ts";

const userStore = useUserStore();

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const loading = ref<boolean>(false)


//#region 查
const tableData = ref<IssueRequestData[]>([])




const getTableData = () => {
  loading.value = true
  issueGetApi(userStore.userData.userId)
      .then(({ data }) => {
        tableData.value = data
      })
      .catch(() => {
        tableData.value = []
      })
      .finally(() => {
        loading.value = false
      })
}


const router = useRouter(); // Get the router instance

const detailInfo = (row: IssueRequestData) => {
  router.push(`/study/myIssue/${row.issueId}`); // Example route, replace with your actual route
}


getTableData()



</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <el-table :data="tableData" :default-sort="{ prop: 'issueCourseCode', order: 'ascending' }">>
          <el-table-column prop="issueCourseCode" label="问题编号" align="center" width="180px" sortable />
          <el-table-column prop="open" label="状态" align="center" width="200px" sortable>
            <template #default="scope">
              <el-tag v-if="scope.row.open == true" type="success" effect="plain">开启</el-tag>
              <el-tag v-else type="danger" effect="plain">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="opener.userName" label="发起人" align="center" width="200px" sortable />
          <el-table-column prop="title" label="标题" align="center" width="200px" sortable />
          <el-table-column prop="vote" label="投票人数" align="center" width="180px" sortable />
          <el-table-column prop="releaseTime" label="发起时间" align="center" width="300px" sortable />
          <el-table-column fixed="right" label="操作" width="100px" align="center">
            <template #default="scope" style="display: flex; flex-direction: column; align-items: center;">
              <el-button type="primary" text bg size="small" @click="detailInfo(scope.row)">查看</el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 1410px;
  /* 去除容器的 padding */
}

.table-wrapper {
  margin-bottom: 20px;

}

.evaluation-dialog-content {
  padding: 20px;
}

.evaluation-item {
  margin-bottom: 15px;
}

.evaluation-item p {
  display: inline-block;
  margin-right: 10px;
}
</style>
