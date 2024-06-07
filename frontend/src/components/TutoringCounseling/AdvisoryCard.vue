<template>
  <a-col :span="span">
    <a-card :title="title" :bordered="bordered">
      <p>{{ description }}</p>
    </a-card>
  </a-col>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    span: Number,
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>