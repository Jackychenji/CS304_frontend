<script setup lang="ts">
import { ref } from 'vue';
import { CourseRequestData } from "@/api/types/Course/getCourse.ts";
import { courseGetApi } from "@/api/modules/Course/getCourse.ts";
import { useRouter } from 'vue-router'; // Import Vue Router



defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const creditFilters = [{ text: '1', value: '1' },{ text: '2', value: '2' },{ text: '3', value: '3' }, { text: '4', value: '4' },{ text: '5', value: '5' }, /* Add more filters if needed */];
const courseTypeFilters = [{ text: '通识必修课', value: '通识必修课' }, { text: '通识选修课', value: '通识选修课' },
  { text: '校外共享课', value: '校外共享课' }, { text: '培养环节', value: '培养环节' },{ text: '专业基础课', value: '专业基础课' },
  { text: '专业必修课', value: '专业必修课' }, { text: '专业选修课', value: '专业选修课' },{ text: '专业核心课', value: '专业核心课' },
  { text: '人文类', value: '人文类' }, { text: '社科类', value: '社科类' },{ text: '艺术类', value: '艺术类' },
  { text: '其他任选类', value: '其他任选类' }, { text: '外语类', value: '外语类' },{ text: '国学类', value: '国学类' },
  { text: '专业导论类', value: '专业导论类' }, { text: '劳育类', value: '劳育类' },{ text: '毕业设计/论文', value: '毕业设计/论文' },
  { text: '实践', value: '实践' }, { text: '国际化人才培养', value: '国际化人才培养' },{ text: '任选', value: '任选' }];
const scoringTypeFilters = [{ text: '二级制', value: '二级制' }, { text: '十三级制', value: '十三级制' }, /* Add more filters if needed */];

const filterByCourseType = (value, row) => {
  return row.courseType === value;
};

const filterByScoringType = (value, row) => {
  return row.scoringType === value;
};

const filterByCredit = (value, row) => {
  return row.credit === value;
};

const loading = ref<boolean>(false)
const searchText = ref<string>('');


//#region 查
const tableData = ref<CourseRequestData[]>([])
const searchTable = () => {
  const searchTerm = searchText.value.trim().toLowerCase();
  if (!searchTerm) {
    return;
  }
  tableData.value = tableData.value.filter(row =>
      Object.values(row).some(val =>
          val !== null && val.toString().toLowerCase().includes(searchTerm)
      )
  );
};

const resetSearch = () => {
  searchText.value = '';
  getTableData(); // Reset table data

};



const getTableData = () => {
  loading.value = true
  courseGetApi()
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

const detailInfo = (row: CourseRequestData) => {
  // Navigate to the desired route when clicking the "查看" button
  router.push(`/course/course/${row.courseCode}`); // Example route, replace with your actual route
}

const seeClass = () => {
  // Navigate to the desired route when clicking the "查看" button
  router.push(`/course/class`); // Example route, replace with your actual route
}

getTableData();


</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <div>
          <el-input v-model="searchText" placeholder="搜索内容" clearable size="large" @clear="resetSearch" @keyup.enter.native="searchTable" style="width: 150px;" />
          <el-button type="primary" :icon="CirclePlus" @click="seeClass()" size="large">查看所有课程</el-button>
        </div>

        <el-table :data="tableData" :default-sort="{ prop: 'classId', order: 'ascending' }">>
          <el-table-column prop="courseCode" label="课程编号" align="center" width="100px" />
          <el-table-column prop="courseName" label="课程名称" align="center" width="150px"  />
          <el-table-column prop="credit" label="学分" align="center" width="80px" sortable :filters="creditFilters" :filter-method="filterByCredit" />
          <el-table-column prop="courseType" label="课程类型" align="center" sortable :filters="courseTypeFilters" :filter-method="filterByCourseType" />
          <el-table-column prop="scoringType" label="评测类型" align="center" sortable :filters="scoringTypeFilters" :filter-method="filterByScoringType" />
          <el-table-column prop="department" label="院系" align="center"/>


          <el-table-column prop="prerequisite" label="先修课" align="center" sortable/>
          <el-table-column fixed="right" label="操作" width="200" align="center">
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

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar > * {
  margin-right: 10px;
}
</style>
