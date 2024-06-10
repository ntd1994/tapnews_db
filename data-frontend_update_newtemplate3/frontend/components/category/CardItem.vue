<script setup lang="ts">
import type { NewsDto } from "~/models/news.model";

interface Props {
  news: NewsDto,
  isRaoVat?: boolean,
}

withDefaults(defineProps<Props>(), {
  isRaoVat: false
})
</script>

<template>
  <div class="ca-card-item">
    <div class="box-category">
      <SharedBoxCategory :category="news.categoryName" :slug="news.categoryName"/>
    </div>
    <div class="image-area overflow-hidden">
        <NuxtLink :to="`${!isRaoVat ? '/bai-viet' : '/rao-vat'}/${news.slug}`" class="img-scale-animate mb-4 position-relative cursor-pointer">
            <nuxt-img :src="news.imageUrl || ''" :alt="''" format="webp" class="img-fluid d-block w-100 h-100" />
        </NuxtLink>
    </div>
    <div class="card-item-bottom">
        <NuxtLink :to="`${!isRaoVat ? '/bai-viet' : '/rao-vat'}/${news.slug}`" style="color: #101010;">
            <SharedNewsTitle :title="news.title" :isMain="true"/>
        </NuxtLink>
        <div class="news2-info">
          <p class="name" style="margin: 0;">{{ news.author }}</p>
          <SharedNewsAuthor
            :author="news.author"
            :publishDate="news.publishDate"
          />
          <div class="news2-view">
            <i class="fa fa-eye"></i>
            <p style="margin: 0;">{{ news.view }}</p>
          </div>
        </div>
        <SharedShortNewsDescription :description="news.description"/>
    </div>
  </div>
</template>

<style>
.ca-card-item {
    position: relative;
}
.ca-card-item .card-item-bottom {
  padding: 15px 15px 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.box-category {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 1;
}
.ca-card-item {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.08);
    background-color: #fff;
    height: 100%;
}
.ca-card-item:hover .img-scale-animate img {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}
.ca-card-item .image-area {
    height: 260px;
}
.ca-card-item .bottom {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.ca-card-item .news2-info {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-start;
  color: #232323;
  margin-top: 10px;
  font-weight: 600;
  margin: 0 0;
}
.ca-card-item .news2-info .new-author,
.ca-card-item .news2-info .new-author .fa.fa-clock-o {
  margin: 0 0;
  font-size: 13px;
  font-weight: 600;
  color: #5c5c5c;
}
.ca-card-item .news2-view {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  color: #d72924;
  font-weight: 600;
  font-size: 16px;
}
.ca-card-item .description.elipsis-3-lines {
    -webkit-line-clamp: 5 !important;
}
</style>