<script setup lang="ts">
import classes from "@/components/Course/classes.vue";
import { useClassStore } from "@/store/modules/Course/classes.ts";

const CourseStore = useClassStore()


</script>

<template>
  <div class="table-container">
    <table>
      <classes v-if="CourseStore.showTab === 0" />
    </table>
  </div>
</template>

<style scoped>
.table-container {
  max-width: 600px;
  margin: 0 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}


.version {
  font-size: 12px;
  position: fixed;
  bottom: 5px;
  left: 10px;
  color: #ffffff;
}
</style>