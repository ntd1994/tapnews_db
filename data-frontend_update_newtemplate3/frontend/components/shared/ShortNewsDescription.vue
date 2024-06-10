<script setup lang="ts">
defineProps<{
    description: string
}>()
</script>

<template>
  <div>
    <p class="description elipsis-3-lines">{{ description }}</p>
  </div>
</template>

<style scoped>
.description {
  font-size: 15px;
  line-height: 24px;
  color: #232323;
}
</style>
