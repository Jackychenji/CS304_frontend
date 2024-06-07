<script setup lang="ts">
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {CourseRequestData} from "@/api/types/Course/getOneCourse.ts";
import {courseGetApi} from "@/api/modules/Course/getOneCourse.ts";
import {ClassRequestData} from "@/api/types/Course/getCourseClass.ts";
import {courseClassApi} from "@/api/modules/Course/getCourseClass.ts";
import {FollowPostApi} from "@/api/modules/Course/FollowClass.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {useCourseStore} from "@/store/modules/Course/classDisplay.ts";

const userStore = useUserStore();
const courseStore = useCourseStore();
const route = useRoute();
const router = useRouter();
const courseCode = route.params.classId as string;


defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const loading = ref<boolean>(false)
const selectedRow = ref<CourseRequestData | null>(null); // 保存选中行的数据
const tableData = ref<ClassRequestData[]>([])
const switchValue = ref<boolean>(false);
const operation = ref<string>("-1");


const getCourseData = () => {
  for (let i = 0; i < userStore.userData.followCourses.length; i++) {
    if (userStore.userData.followCourses[i].courseCode == courseCode) {
      switchValue.value = true;
      operation.value = "1";

    }
  }
  loading.value = true
  courseGetApi(courseCode)
      .then(({data}) => {
        selectedRow.value = data

      })
      .catch(() => {
        selectedRow.value = {}

      })
      .finally(() => {
        loading.value = false
      })
}

const getClassData = () => {
  loading.value = true
  courseClassApi(courseCode)
      .then(({data}) => {
        tableData.value = data
        courseStore.classData = data
        console.log(courseStore.classData)
      })
      .catch(() => {
        tableData.value = []
      })
      .finally(() => {
        loading.value = false
      })
}
const detailInfo = (row: ClassRequestData) => {
  // Navigate to the desired route when clicking the "查看" button
  router.push(`/course/class/${row.classId}`); // Example route, replace with your actual route
}

const goMaterial = (row: CourseRequestData) => {
  // Navigate to the desired route when clicking the "查看" button
  router.push(`/course/material/${row.courseCode}`); // Example route, replace with your actual route
}
const handleSwitchChange = () => {
  if (switchValue.value) {
    operation.value = "1";
    userStore.userData.followCourses.push(selectedRow.value)
  } else {
    operation.value = "-1"
    userStore.userData.followCourses.pop(selectedRow.value)
  }

  FollowPostApi(userStore.userData.userId, selectedRow.value.courseCode, operation.value)
      .then(response => {
        console.log("Post scores successful:", response);
        alert('修改成功')

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
getCourseData();
getClassData();

</script>

<template>
  <div class="container">
    <el-container style="width: 1410px">
      <el-card
          style=" width: 100%; height: 100%"
          shadow="hover"
          class="custom-card"
      >
        <template #header>
          <div class="card-header">
            <span>课程信息</span>
          </div>
        </template>
        <el-descriptions :column="1" border size="large">
          <el-descriptions-item align="center" label-class-name="my-label" width="80px">
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-monitor/>
                </el-icon>
                课程编号
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.courseCode }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item align="center" label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-postcard/>
                </el-icon>
                课程名称
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.courseName }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item
              align="center"
              label-class-name="my-label"
          >
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-user/>
                </el-icon>
                学分
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.credit }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item
              align="center"
              label-class-name="my-label"
          >
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-refresh/>
                </el-icon>
                课程类型
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.courseType }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item
              align="center"
              label-class-name="my-label"
          >
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-SetUp/>
                </el-icon>
                评分方式
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.scoringType }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item align="center" label-class-name="my-label " width="80px">
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-monitor/>
                </el-icon>
                开设学院
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.department }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item align="center" label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-postcard/>
                </el-icon>
                先修课
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.prerequisite }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item
              align="center"
              label-class-name="my-label"
          >
            <template #label>
              <div class="cell-item">
                <el-icon class="iconfont">
                  <el-icon-user/>
                </el-icon>
                课程介绍
              </div>
            </template>
            <div v-if="selectedRow">
              {{ selectedRow.courseIntro }}
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card
          style="width: 100%"
          shadow="hover"
          class="custom-card"
      >
        <template #header>
          <div class="card-header">
            <span>课程总览</span>
          </div>
        </template>
        <template #footer>
          <div style="margin-top: 20px; text-align: center;">
            <el-button type="primary" size="large" @click="goMaterial(selectedRow)">
              <el-icon class="iconfont">
                <el-icon-MessageBox/>
              </el-icon>
              课程文件
            </el-button>
            <el-switch
                v-model="switchValue"
                style="margin-left: 20px;"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="关注"
                inactive-text="取消关注"
                @change="handleSwitchChange"
            ></el-switch>
          </div>
        </template>


        <el-table :data="tableData" :default-sort="{ prop: 'classId', order: 'ascending' }" style="height: 300px">>
          <el-table-column prop="classId" label="课程编号" align="center" width="100%"/>
          <el-table-column prop="instructor" label="指导老师" align="center"/>
          <el-table-column prop="language" label="授课语言" align="center" sortable>
            <template #default="scope">
              <el-tag v-if="scope.row.language == 'chinese'" type="success" effect="plain">中文</el-tag>
              <el-tag v-else type="danger" effect="plain">英文</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="课程详情" align="center">
            <template #default="scope" style="display: flex; flex-direction: column; align-items: center;">
              <el-button type="primary" text bg size="small" @click="detailInfo(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.custom-descriptions-item {
  width: 200px; /* 设置自定义宽度 */
}

.container {
  background-color: #ffffff; /* 设置背景色 */
}

.custom-card {
  height: 500px; /* 设置高度为300px */
}
</style>
