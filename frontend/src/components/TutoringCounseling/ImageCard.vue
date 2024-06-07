<template>
  <a-col :span="span">
    <a-card hoverable class="custom-style">
      <template #cover>
        <img :alt="alt" :src="imageSrc" />
      </template>
      <a-card-meta :title="title">
        <template #description>{{ description }}</template>
      </a-card-meta>
    </a-card>
  </a-col>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    imageSrc: String,
    alt: String,
    span: Number
  }
}
</script>

<style scoped>
.custom-style {
  width: 100%;
  padding-top: 20px;
  background: transparent;
  border: 1px solid transparent; /* 设置透明边框 */
}
</style>