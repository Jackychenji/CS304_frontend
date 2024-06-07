<template>
  <div>
    <h1 class="title">{{ courseCode }} 课程资料中心</h1>
  </div>
  <div class="course-materials" :key="refreshKey">
    <div class="actions">
      <input type="file" id="file-upload" @change="handleFileChange" hidden>
      <label for="file-upload">选择文件</label>
      <span v-if="file">{{ file.name }} ({{ displayFileSize(file.size) }})</span>
      <button @click="upload">确认上传</button>
      <input type="text" v-model="searchQuery" placeholder="按文件名搜索" />
      <button @click="filteredMaterials">搜索</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>文件名</th>
          <th>上传者</th>
          <th>上传时间</th>
          <th>下载</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in paginatedMaterials" :key="material.materialId">
          <td>{{ material.materialName }}</td>
          <td>{{ material.providerName }}</td>
          <td>{{ formatReleaseTime(material.releaseTime)}}</td>
          <td><button @click="downloadMaterial(material.materialId)">Download</button></td>
          <td><button @click="deleteMaterial(material.materialId, material.providerId)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
      {{ currentPage }} / {{ totalPages }}
      <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
      <input type="number" v-model.number="jumpPage" placeholder="输入页码" />
      <button @click="jumpToPage">跳转</button>
    </div>
  </div>
</template>



<script setup>
import { ref, computed, reactive } from 'vue';
import { useMaterialStore } from "@/store/modules/Course/material.ts";
import { useUserStore } from '@/store/modules/user';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { uploadMaterialApi } from "@/api/modules/Course/materialUpload.ts";
import { addOneMaterialApi } from "@/api/modules/Course/materialAddOne.ts";
import { deleteMaterialApi } from "@/api/modules/Course/materialDelete.ts";
// import { log } from 'console';

const route = useRoute();
const materialsStore = useMaterialStore();
const user = useUserStore();
const courseCode = route.params.courseCode.toString();
// const courseName = ref('CS304软件工程');
const searchQuery = ref('');
const file = ref(null);
const currentPage = ref(1);
const pageSize = 10;
const jumpPage = ref('');
const courseDataArray = computed(() => {
  const courseData = materialsStore.courseData;
  return Object.values(courseData);
});
const refreshKey = reactive({ value: 0 });

const forceUpdate = () => {
  refreshKey.value++;
};

const formatReleaseTime = (releaseTime) => {
  const date = new Date(releaseTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const totalMaterials = ref(Object.values(materialsStore.courseData).length);

onMounted(() => {
  // if (!materialsStore.courseData || materialsStore.courseData.length === 0) {
  courseDataArray.value = Object.values(materialsStore.fetchMaterial(courseCode));
  console.log(courseCode);
  // }
});

const filteredMaterials = reactive(computed(() => courseDataArray.value.filter(material =>
  material.materialName.toLowerCase().includes(searchQuery.value.toLowerCase()))
));

const totalPages = computed(() => Math.ceil(filteredMaterials.value.length / pageSize));

const paginatedMaterials = reactive(computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  if (start + pageSize > courseDataArray.value.length) {
    return filteredMaterials.value.slice(start, courseDataArray.value.length);
  }
  return filteredMaterials.value.slice(start, start + pageSize);
}));

const upload = async () => {
  if (file.value) {
    try {
      const formData = new FormData();
      formData.append("file", file.value);


      const materialData = {
        materialType: "Document", // Change as needed
        materialName: file.value.name,
        providerId: user.userData.userId,
        providerName: user.userData.userName,
        materialCourse: courseCode
      };

      console.log(materialData);

      // First register the material
      const uploadResponse = await uploadMaterialApi(formData);
      console.log(uploadResponse);
      if (uploadResponse.code === 0) {
        // If the material is added successfully, upload the file
        const addResponse = await addOneMaterialApi(materialData);

        console.log(uploadResponse);
        if (addResponse.code === 0) {
          alert('File uploaded successfully');
          await materialsStore.fetchMaterial(courseCode);
          // Optionally refresh the materials list or handle UI updates
        } else {
          alert('File upload failed');
        }
      } else if (uploadResponse.code === 402) {
        alert('File already exists');
      }
      else {
        alert('Failed to register material');
      }
    }
    catch (error) {
      console.error('Upload error:', error);
      //alert('An error occurred during upload: ' + error.message);
    }
  }
};

const jumpToPage = () => {
  const page = parseInt(jumpPage.value, 10);
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  } else {
    alert('请输入一个有效的页码！');
  }
  jumpPage.value = '';
};


const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// 文件上传


const handleFileChange = (event) => {
  file.value = event.target.files[0]; // 只考虑第一个文件
};

const displayFileSize = (size) => {
  if (size >= 1048576) {
    return (size / 1048576).toFixed(2) + ' MB';
  } else if (size >= 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return size + ' bytes';
};

const deleteMaterial = async (mid, pid) => {
  if (pid !== user.userData.userId) {
    alert(`You are not the provider of this material${pid}/${user.userData.userId}`);
    return;
  }
  try {
    const deleteResponse = await deleteMaterialApi(mid);
    console.log(deleteResponse);
    if (deleteResponse.code === 0) {
      alert('Delete Successfully');
      courseDataArray.value = courseDataArray.value.filter(material => material.materialId !== mid);
      await materialsStore.fetchMaterial(courseCode);
      forceUpdate();
      console.log(courseCode);
      console.log(courseDataArray.value)
      console.log(totalMaterials.value)
    } else {
      alert('Delete Failed');
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    alert('An error occurred during deletion: ' + error.message);
  }
};
const downloadMaterial = async (id) => {
  try {

    // const downloadResponse= await downloadMaterialApi(id);
    // console.log(downloadResponse);

    const url = import.meta.env.VITE_BASE_URL + `/material/download/${id}`
    window.open(url)
    // window.close()
    // if (downloadResponse.code === 0) {
    //   // If the material is added successfully, upload the file
    //   alert('Download Successfully');
    // } else {
    //   alert('Download Failed');
    // }
  } catch (error) {
    console.error('Upload error:', error);
    alert('An error occurred during download: ' + error.message);
  }
};




</script>


<style scoped>
input[type="number"] {
  width: 100px;
  padding: 6px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 6px;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
}

.course-materials {
  width: 98%;
  margin: 20px 0;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: start;
}

.actions input[type="file"] {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -1;
}

.actions label {
  background-color: #2181de;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.actions label:hover {
  background-color: #DEEDFC;
}

.actions input[type="text"],
.actions button {
  padding: 8px;
  margin: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.actions input[type="text"]:focus,
.actions button:focus {
  border-color: #4CAF50;
  outline: none;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

th,
td {
  text-align: left;
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #6a8eb2;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

button {
  cursor: pointer;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #007ba7;
}

.pagination {
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中所有子元素 */
  align-items: center;
  /* 垂直居中所有子元素 */
  margin-top: 20px;
}



.pagination button {
  margin: 0 10px;
}
</style>