<script setup lang="ts">
import { type NewsDto } from "~/models/news.model";

withDefaults(defineProps<{
  news: NewsDto,
  isRaoVat?: boolean
}>(), {
  isRaoVat: true
})

</script>

<template>
  <div class="raovat-item media item-shadow-gray" style="margin: 20px 0;">
    <a class="rao-vat-img img-opacity-hover" :href="`${isRaoVat ? `/rao-vat/${news.slug}` : `/bai-viet/${news.slug}`}`">
      <nuxt-img  :src="news.imageUrl || ' '" format="webp" :alt="news.title" class="rao-vat-img w-full h-full" />
    </a>
    <div class="media-body">
      <div class="time">
        <div class="post-date-light">
          <SharedNewsAuthor
            :author="news.author"
            :publishDate="news.publishDate"
          />
        </div>
      </div>
      <h3 class="raovat-title" style="margin-bottom: 15px; margin-top: 10px;">
        <a :href="`${isRaoVat ? `/rao-vat/${news.slug}` : `/bai-viet/${news.slug}`}`" class="elipsis-2-lines">{{news.title}}</a>
      </h3>
    </div>
  </div>
</template>

<style>
.raovat-item .rao-vat-img {
  width: 90px;
  height: 65px;
}
.raovat-item .raovat-title a {
  font-size: 13px;
  color: #101010 !important;
  transition: all 0.5s ease-out;
}
.raovat-item .raovat-title:hover a {
  color: #d72924 !important
}
.raovat-item .time .post-date-light ul li {
  color: #5c5c5c;
  font-size: 600;
  font-size: 12px;
  margin: 0;
}
</style>