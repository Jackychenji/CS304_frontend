<template>
  <div>
    <h1 class="title">课程推荐中心</h1>
  </div>
  <div>
    <select v-model="selectedMajor" @change="fetchCourses">
      <option disabled value="">请选择专业</option>
      <option v-for="major in majors" :key="major" :value="major">{{ major }}</option>
    </select>

    <select v-model="selectedCourseType">
      <option v-for="type in courseTypeOptions" :key="type.english" :value="type.english">
        {{ type.chinese }}
      </option>
    </select>

    <select v-model="selectedSortScore">
      <option value="averageScore">按平均分排序</option>
      <option value="difficultyScore">按难度评分排序</option>
      <option value="gradingScore">按给分评分排序</option>
      <option value="workloadScore">按工作量评分排序</option>
      <option value="harvestScore">按收获评分排序</option>
    </select>

    <div v-if="coursesStore.isLoading">正在加载...</div>
    <div v-if="coursesStore.error">错误: {{ coursesStore.error.message }}</div>
    <div v-if="!coursesStore.isLoading && displayedCourses.length > 0">
      <ul>
        <li v-for="course in displayedCourses" :key="course.classId" @mouseover="highlightCourse(course.classId)"
            @mouseleave="unhighlightCourse()" @click="goToCourse(course.classId)"
            :class="{ highlighted: highlightedCourse === course.classId }"
        >
          <div>{{ course.className }}</div>
          <div>{{ course.instructor }} - {{ course.semester }} - {{ course.language }}</div>
          <div>
            难度: {{ course.difficultyScore.toFixed(2) }}, 评分: {{ course.gradingScore.toFixed(2) }}, 工作量: {{
              course.workloadScore.toFixed(2) }},
            收获: {{ course.harvestScore.toFixed(2) }}, 平均分: {{ course.averageScore.toFixed(2) }}
          </div>
        </li>
      </ul>
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
        <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
        <input type="number" v-model="jumpToPageNumber" placeholder="输入页码" />
        <button @click="jumpToPage">跳转到页码</button>
      </div>
    </div>

    <div v-else-if="!coursesStore.isLoading && selectedCourses.length === 0">
      没有找到相关课程。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // 导入 useRouter
import { useCoursesStore } from '@/store/modules/Course/index.ts';

const router = useRouter(); // 获取 router 实例
const coursesStore = useCoursesStore();
const selectedMajor = ref('');
const selectedCourseType = ref('general');
const highlightedCourse = ref(null);
const currentPage = ref(1);
const pageSize = 5;
const jumpToPageNumber = ref('');
const selectedSortScore = ref('averageScore');

const majors = [
  '金融数学', '数学与应用数学', '物理学', '化学', '地球物理学', '统计学',
  '数据科学与大数据技术', '理论与应用力学', '航空航天工程', '机械工程',
  '机器人工程', '新能源科学与工程', '材料科学与工程', '光电信息材料与器件',
  '通信工程', '光电信息科学与工程', '信息工程', '计算机科学与技术',
  '智能科学与技术', '海洋科学', '海洋工程与技术', '生物医学工程',
  '智能医学工程', '环境科学与工程', '水文与水资源工程', '微电子科学与工程',
  '系统设计与智能制造', '自动化', '生物科学', '生物信息学', '生物医学科学',
  '临床医学', '金融学', '金融工程', '大数据管理与应用', '创新创意设计'
];

const courseTypeOptions = [
  { chinese: '通识必修', english: 'general' },
  { chinese: '专业必修', english: 'compulsory' },
  { chinese: '专业选修', english: 'selective' },
  { chinese: '人文类', english: 'humanity' },
  { chinese: '社科类', english: 'social' },
  { chinese: '国学类', english: 'national' },
  { chinese: '美育类', english: 'aesthetic' }
];

const selectedCourses = computed(() => {
  // const generalCourses = coursesStore.courseData['general'] || [];
  // const compulsoryCourses = coursesStore.courseData['compulsory'] || [];
  // const selectiveCourses = coursesStore.courseData['selective'] || [];
  // const humanityCourses = coursesStore.courseData['humanity'] || [];
  // const socialCourses = coursesStore.courseData['social'] || [];
  // const aestheticeCourses = coursesStore.courseData['aesthetic'] || [];
  //
  // // 使用扩展运算符合并三种类型的课程数据
  // let courses = [...generalCourses, ...compulsoryCourses, ...selectiveCourses, ...humanityCourses, ...socialCourses, ...aestheticeCourses];
  // if (selectedCourseType.value) {
  const courses = coursesStore.courseData[selectedCourseType.value] || [];
  // }
  currentPage.value = 1;

  return courses.sort((a, b) => b[selectedSortScore.value] - a[selectedSortScore.value]);
});

const displayedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return selectedCourses.value.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(selectedCourses.value.length / pageSize);
});

function fetchCourses() {
  if (selectedMajor.value) {
    coursesStore.fetchCourses(selectedMajor.value);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function jumpToPage() {
  // 将输入的页码转换为数字
  const targetPage = parseInt(jumpToPageNumber.value, 10);

  // 检查页码是否在有效范围内
  if (!isNaN(targetPage) && targetPage > 0 && targetPage <= totalPages.value) {
    currentPage.value = targetPage;  // 设置当前页码
  } else {
    alert('请输入一个有效的页码号，该页码号应在 1 到 ' + totalPages.value + ' 之间。');
  }

  // 跳转后清空输入框（可选）
  jumpToPageNumber.value = '';
}

function highlightCourse(classId) {
  highlightedCourse.value = classId;
}

function unhighlightCourse() {
  highlightedCourse.value = null;
}

function goToCourse(classId) {
  console.log('Course clicked:', classId);
  router.push(`/course/class/${classId}`);
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

select {
  width: 300px;
  padding: 8px;
  margin-top: 10px;
  margin-right: 10px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 15px;
  background: #ecf0f1;
  border-left: 5px solid #3498db;
  transition: all 0.3s ease;
}

li.highlighted {
  background: #dfe6e9;
  border-left-color: #e74c3c;
}

li:hover {
  background: #bdc3c7;
  cursor: pointer;
}

div {
  margin-top: 5px;
}

.loading-error {
  color: #e74c3c;
  font-weight: bold;
}

.no-data {
  color: #7f8c8d;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin: 0 10px;
  /* 增加按钮的左右间距 */
}

button:disabled {
  background-color: #95a5a6;
  cursor: default;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

input[type="number"] {
  width: 100px;
  padding: 8px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  /* 增加底部的间距 */
}

.page-info {
  margin: 0 15px;
  /* 调整文字左右的间距 */
}

@media (max-width: 600px) {

  select,
  input[type="number"],
  button {
    width: 100%;
    margin-top: 10px;
    margin-right: 0;
  }

  .pagination-controls {
    flex-direction: column;
  }

  .page-info {
    margin: 10px 0;
  }
}
</style>
