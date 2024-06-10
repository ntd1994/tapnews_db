<script setup lang="ts">
defineProps<{
  header: string
}>()
</script>

<template>
  <div class="topic-box-head">
    <div class="topic-box-content">{{ header }}</div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.topic-box-head {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.topic-box-content {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  background: #d72924;
  color: #fff;
  line-height: 26px;
  padding: 0 5px;
  padding: 2px 15px;
  display: inline-block;
  z-index: 1;
  white-space: nowrap;
  margin-right: 20px;
}

.line {
  height: 1.5px;
  width: 100%;
  background-color: #d72924;
}
</style>
