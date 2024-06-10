<script setup lang="ts">
import {type NewsDto} from "~/models/news.model";
const props = defineProps<{
  news: NewsDto
}>()
</script>

<template>
<div>
  <div class="img-scale-animate mb-20">
    <a :href="`bai-viet/${news.slug}`">
      <nuxt-img  :src="news.imageUrl || ' '" format="webp" height="500" :alt="news.title"/>
    </a>
  </div>
  <div class="post-date-dark">
    <SharedNewsAuthor
        :author="news.author"
        :publishDate="news.publishDate"
    />
  </div>
  <h3 class="title-semibold-dark size-lg mb-15">
    <a :href="`bai-viet/${news.slug}`">{{news.title}}</a>
  </h3>
  <p class="elipsis-3-lines">
    {{news.description}}
  </p>
</div>
</template>

<style scoped>

</style>
