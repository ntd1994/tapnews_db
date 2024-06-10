<script setup lang="ts">
const props = defineProps<{
  headerTitle: string
}>()
</script>

<template>
  <div class="topic-border color-cod-gray color-code-blue-1 mb-30">
    <div class="topic-box-lg color-cod-gray color-code-blue-1">{{headerTitle}}</div>
  </div>
</template>

<style scoped>
  .color-code-blue-1::before {
    border-top-color:  #3851e5!important;
  }

  .color-code-blue-1:after {
    background-color: #3851e5 !important;
  }
</style>