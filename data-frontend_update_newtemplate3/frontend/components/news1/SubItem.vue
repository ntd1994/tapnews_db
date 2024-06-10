<script setup lang="ts">
import { type NewsDto } from "~/models/news.model";
const props = defineProps<{
  news: NewsDto
}>()
</script>

<template>
  <div class="media mb-30">
    <a class="img-opacity-hover" :href="`bai-viet/${news.slug}`">
      <nuxt-img  :src="news.imageUrl || ' '" format="webp" height="300" :alt="news.title" style="width: 100px !important; height: 70px !important; object-fit: cover" />
    </a>
    <div class="media-body">
      <div class="post-date-dark">
        <SharedNewsAuthor
            :publishDate="news.publishDate"
        />
      </div>
      <h3 class="title-medium-dark size-md mb-none">
        <a :href="`bai-viet/${news.slug}`">{{news.title}}</a>
      </h3>
    </div>
  </div>
</template>

<style scoped>

</style>
