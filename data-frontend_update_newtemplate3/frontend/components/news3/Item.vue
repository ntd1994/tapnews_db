<script setup lang="ts">
import {type NewsDto} from "~/models/news.model";

interface Props {
  news: NewsDto,
  isMain?: boolean
  isRaoVat?: boolean,
  isShowImage?: boolean
}

withDefaults(defineProps<Props>(), {
  isMain: false,
  isShowImage: true,
})
</script>

<template>
  <div class="news-item">
    <div v-if="isShowImage" class="overflow-hidden" :class="isMain ? 'main-height-img' : 'sub-height-img'">
      <NuxtLink :to="`${!isRaoVat ? '/bai-viet' : '/rao-vat'}/${news.slug}`" class="img-scale-animate mb-4 position-relative cursor-pointer">
        <nuxt-img :src="news.imageUrl || ''" :alt="''" format="webp" class="img-fluid d-block" />
      </NuxtLink>
    </div>
    <div class="news-info">
      <NuxtLink :to="`${!isRaoVat ? '/bai-viet' : '/rao-vat'}/${news.slug}`" style="color: #101010;">
        <SharedNewsTitle :title="news.title" :isMain="isMain"/>
      </NuxtLink>
      <div class="time">
        <div class="post-date-light">
          <SharedNewsAuthor
            :author="news.author"
            :publishDate="news.publishDate"
          />
        </div>
      </div>
      <div v-if="isMain">
        <SharedShortNewsDescription :description="news.description"/>
      </div>
    </div>
  </div>
</template>

<style>

.news-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.news-item:hover .img-scale-animate img {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.news-info .time .post-date-light {
  margin-bottom: 15px;
}


.news-info .time .post-date-light ul li {
  color: #5c5c5c;
  font-size: 600;
  font-size: 12px;
  margin: 0;
}

.main-height-img img {
  height: 250px;
  width: 100%;
}

.sub-height-img img {
  height: 118px;
  width: 100%;
}

@media screen and (max-width:768px) {
  .main-height-img img {
    height: auto;
  }
  .sub-height-img img {
    height: 200px;
  }
  .news-info .time .post-date-light {
    margin-bottom: 30px;
  }
}

@media screen and (max-width:576px) {
  .main-height-img img,
  .sub-height-img img {
    height: auto;
    max-height: 340px;
  }
}
</style>
