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
    <!-- <div class="box-category">
      <SharedBoxCategory :category="news.categoryName" />
    </div> -->
    <div class="news2-info">
      <p class="name" style="margin: 0;">{{ news.author }}</p>
      <SharedNewsAuthor :author="news.author" :publishDate="news.publishDate" />
      <div class="news2-view">
        <i class="fa fa-eye"></i>
        <p style="margin: 0;">{{ news.view }}</p>
      </div>
    </div>
    <NuxtLink :to="`${!isRaoVat ? '/bai-viet' : '/rao-vat'}/${news.slug}`" style="color: #101010;">
      <SharedNewsTitle :title="news.title" :isMain="true" />
    </NuxtLink>
    <SharedShortNewsDescription :description="news.description" />
  </div>
</template>

<style>
.ca-card-item {
  position: relative;
  padding: 30px;
}

.box-category {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 1;
}

.ca-card-item {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .08);
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ca-card-item .description {
  margin-bottom: 0px
}
.ca-card-item:hover .img-scale-animate img {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

/* .ca-card-item .bottom {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
} */

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

.ca-card-item .news2-info .name {
  font-size: 13px;
  color: #5c5c5c
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
  -webkit-line-clamp: 3 !important;
}

@media screen and (max-width:768px) {
  /* .ca-card-item .image-area {
    max-height: 400px;
    height: auto;
  } */
}

/* @media screen and (max-width:576px) {
    .ca-card-item .image-area {
        height: 400px;
    }
} */</style>