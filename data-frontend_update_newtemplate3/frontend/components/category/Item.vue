<script setup lang="ts">
import { type TagsDto } from "~/models/category.model";

const props = defineProps<{
  tag: TagsDto
}>()
</script>

<template>
  <li>
    <a href="#">{{tag.name}}
      <span> ({{tag.count}})</span>
    </a>
  </li>
</template>

<style scoped>

</style>