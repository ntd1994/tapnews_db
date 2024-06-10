<script setup lang="ts">
import { type NewsDto } from "~/models/news.model";

const props = defineProps<{
  news: NewsDto
}>()
</script>

<template>
  <div>
    <div class="position-relative">
      <NuxtLink :to="`/bai-viet/${news.slug}`" class="img-opacity-hover mb-10">
        <nuxt-img  :src="news.imageUrl || ' '" format="webp" height="300" :alt="news.title" class="img-fluid" style="height: 100px; object-fit: cover; width: 100%;" />
      </NuxtLink>
      <div class="topic-box-top-xs">
        <div class="topic-box-sm color-cod-gray mb-20">{{news.categoryName}}</div>
      </div>
    </div>
    <h3 class="title-medium-dark size-md mb-none elipsis-3-lines">
      <NuxtLink :to="`/bai-viet/${news.slug}`">{{news.title}}</NuxtLink>
    </h3>
  </div>
</template>

<style scoped>

</style>