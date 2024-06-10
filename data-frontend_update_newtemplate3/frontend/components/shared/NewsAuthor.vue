<script setup lang="ts">
const props = defineProps<{
  author?: string,
  publishDate?: string | Date
}>()

</script>

<template>
  <ul class="new-author">
    <li v-if="publishDate">
      <span>
        <i class="fa fa-clock-o" aria-hidden="true" style="margin-right: 5px;"></i>
      </span>
      <span>{{formatNewsDate(publishDate)}}</span>
    </li>
  </ul>
</template>

<style scoped>
.new-author li {
  display: flex;
  align-items: center;
}
.new-author i {
  font-size: 18px;
}
</style>
