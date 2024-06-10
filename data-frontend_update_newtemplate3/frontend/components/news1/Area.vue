<script setup lang="ts">
import type { NewsDto } from '~/models/news.model';

interface INews {
  label: string,
  news: NewsDto[]
}
const props = defineProps<{
  newses: INews[]
}>()
</script>

<template>
  <div class="news1-area">
    <div class="row">
      <div v-for="(item, index) in newses" :key="index" class="col-sm-12 col-md-6 col-lg-3 ">
        <!-- <SharedNewsHeader :header="item.label"/> -->
        <div class="row">
          <div v-for="(news, index) in item.news.slice(0, 4)" :key="news.id" class="newses1 col-12">
            <div v-if="index === 0"  class="">
              <div class="image-area img-scale-animate">
                <NuxtLink :to="`/bai-viet/${news.slug}`">
                  <nuxt-img  :src="news.imageUrl || ' '" format="webp" :alt="news.title" class="img-fluid w-100 h-100" style="object-fit: cover;"/>
                </NuxtLink>
              </div>
              <SharedNewsCardSubItem :news="news" :showTag="index === 0"/>
            </div>
            <SharedNewsCardSubItem v-else :news="news" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.line {
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
}

.news1-area .image-area {
  height: 160px
}

@media screen and (max-width:991.9px) {
  .news1-area .image-area {
    height: 350px
  }
  .news1-area .raovat-title a {
    -webkit-line-clamp: 1
  }
}

@media screen and (max-width:768px) {
  .news1-area .image-area {
    height: 250px
  }
}

@media screen and (max-width:576px) {
  .news1-area .image-area {
    height: auto
  }

  .news1-area .raovat-title a {
    -webkit-line-clamp: 2
  }
}
</style>
