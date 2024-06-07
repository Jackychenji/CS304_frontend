<script setup lang="ts">
import { ref } from 'vue';
import { ClassRequestData } from "@/api/types/Course/getClass.ts";
import { classGetApi } from "@/api/modules/Course/getClass.ts";
import { useRouter } from 'vue-router'; // Import Vue Router
import {JudgeRequestData} from "@/api/types/Course/judgeClass.ts";
import {JudgePostApi} from "@/api/modules/Course/judgeClass.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {useClassStore} from "@/store/modules/Course/classes.ts";

const userStore = useUserStore();
const classStore = useClassStore();

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const loading = ref<boolean>(false)
const dialogVisible = ref<boolean>(false); // 控制对话框的显示与隐藏
const selectedRow = ref<ClassRequestData | null>(null); // 保存选中行的数据


const difficultyScore = ref<number>(0);
const gradingScore = ref<number>(0);
const workloadScore = ref<number>(0);
const harvestScore = ref<number>(0);




//#region 查
const tableData = ref<ClassRequestData[]>([])




const getTableData = () => {
  if (classStore.classData.length!=0) {
    // 使用缓存的数据
    tableData.value = classStore.classData;
    console.log(1)
    return;
  }
  loading.value = true
  classGetApi()
    .then(({ data }) => {
      tableData.value = data
      classStore.classData = data; // 缓存数据
      console.log(2)
      console.log(classStore.classData.length)
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const judgeClass = (row: ClassRequestData) => {
  dialogVisible.value = true; // 点击评价按钮时显示对话框
  selectedRow.value = row; // 将选中行的数据保存到变量中
  console.log(selectedRow.value)
}

const router = useRouter(); // Get the router instance

const detailInfo = (row: ClassRequestData) => {
  router.push(`/course/class/${row.classId}`); // Example route, replace with your actual route
}

const seeCourse = () => {
  // Navigate to the desired route when clicking the "查看" button
  router.push(`/course/introduction`); // Example route, replace with your actual route
}


const handleJudge = () => {
  const scoresData: JudgeRequestData = {
    difficultyScore: difficultyScore.value,
    gradingScore: gradingScore.value,
    workloadScore: workloadScore.value,
    harvestScore: harvestScore.value,
    classId: selectedRow.value ? selectedRow.value.classId : 0,
    userId: userStore.userData.userId, // 你需要提供用户ID，可以从你的系统中获取
  };
  loading.value = true;
  console.log(scoresData)
  JudgePostApi(scoresData)
      .then(response => {
        // 在这里处理成功响应
        console.log("Post scores successful:", response);
        alert('修改成功')
        dialogVisible.value = false

      })
      .catch(error => {
        // 在这里处理错误响应
        console.error("Error posting scores:", error);
        // 如果需要，可以在这里更新 UI 或者执行其他操作
      })
      .finally(() => {
        loading.value = false;
      });
};

getTableData()



</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="seeCourse()">查看课程</el-button>
        </div>
        <el-table :data="tableData" :default-sort="{ prop: 'classId', order: 'ascending' }">>
          <el-table-column prop="classId" label="课程编号" align="center" width="80px" sortable />
          <el-table-column prop="className" label="课程名称" align="center" width="150px" sortable />
          <el-table-column prop="instructor" label="指导老师" align="center" width="80px" sortable />
          <el-table-column prop="semester" label="学期" align="center" width="80px" sortable>
            <template #default="scope">
              <el-tag v-if="scope.row.semester == 'fall'" type="success" effect="plain">秋季</el-tag>
              <el-tag v-else type="danger" effect="plain">春季</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="language" label="授课语言" align="center" sortable>
            <template #default="scope">
              <el-tag v-if="scope.row.language == 'chinese'" type="success" effect="plain">中文</el-tag>
              <el-tag v-else type="danger" effect="plain">英文</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="difficultyScore" label="难度系数" align="center" sortable>
            <template #default="scope">
              {{ scope.row.difficultyScore.toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column prop="gradingScore" label="给分好坏" align="center" sortable>
            <template #default="scope">
              {{ scope.row.gradingScore.toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column prop="workloadScore" label="工程量" align="center" sortable>
            <template #default="scope">
              {{ scope.row.workloadScore.toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column prop="harvestScore" label="收获程度" align="center" sortable>
            <template #default="scope">
              {{ scope.row.harvestScore.toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column prop="averageScore" label="平均分" align="center" sortable>
            <template #default="scope">
              {{ scope.row.averageScore.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="recommend" label="推荐人数" align="center" width="80px" sortable />
          <el-table-column prop="unrecommend" label="踩雷人数" align="center" width="80px" sortable />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope" style="display: flex; flex-direction: column; align-items: center;">
              <el-button type="primary" text bg size="small" @click="detailInfo(scope.row)">查看</el-button>
              <el-button type="danger" text bg size="small" @click="judgeClass(scope.row)">评价</el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="评价课程" width="40%">
      <!-- Dialog content -->
      <div class="evaluation-dialog-content">
        <p>课程名称：{{ selectedRow ? selectedRow.className : '' }}</p>
        <p>指导老师：{{ selectedRow ? selectedRow.instructor : '' }}</p>
        <div class="evaluation-item">
          <p>难度系数：</p>
          <a-rate v-model:value="difficultyScore"/>
        </div>
        <div class="evaluation-item">
          <p>评分：</p>
          <a-rate v-model:value="gradingScore"/>
        </div>
        <div class="evaluation-item">
          <p>工程量：</p>
          <a-rate v-model:value="workloadScore"/>
        </div>
        <div class="evaluation-item">
          <p>收获程度：</p>
          <a-rate v-model:value="harvestScore"/>
        </div>
      </div>
      <!-- Dialog footer -->
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleJudge" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
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
