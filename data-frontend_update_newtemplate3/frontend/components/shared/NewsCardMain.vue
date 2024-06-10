<script setup lang="ts">
import {type NewsDto} from "~/models/news.model";

interface Props {
    news: NewsDto, 
    isShowAuthor: boolean
}

withDefaults(defineProps<Props>(), {
    isShowAuthor: true
})
</script>

<template>
  <NuxtLink :to="`/bai-viet/${news.slug}`">
    <div class="news-card-main mb-30">
      <div class="gradient-overlay"></div>
      <div class="image-area">
        <nuxt-img  :src="news.imageUrl || ' '" format="webp" height="500" :alt="news.title" class="img-fluid w-100 h-100" style="object-fit: cover;"/>
      </div>
      <div class="new-content">
        <div class="news-title">
          <NuxtLink :to="`/bai-viet/${news.slug}`">{{ news.title }}</NuxtLink>
        </div>
        <div class="news2-info">
          <p v-if="isShowAuthor" class="name">{{ news.author }}</p>
          <SharedNewsAuthor
            :author="news.author"
            :publishDate="news.publishDate"
          />
          <div class="news2-view">
            <i class="fa fa-eye"></i>
            <p>{{ news.view }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
.news-card-main {
  position: relative;
  min-height: 480px;
  max-height: 480px;
  display: flex;
}
.news-card-main .image-area {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.news-card-main .new-content {
  padding: 24px 24px 18px;
  position: absolute;
  bottom: 0;
  z-index: 1;
}
.news-card-main .new-content .news-title {
  font-size: 22px;
  line-height: 26px;
}
.news-card-main .new-content .news-title a {
  color: #fff;
  transition: all 0.9s ease;
  -o-transition: all 0.9s ease;
  -webkit-transition: all 0.9s ease;
  text-shadow: 1px 1px 3px rgba(0,0,0,.4);
}
.news-card-main .news2-info {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-start;
  color: #fff;
  margin-top: 10px;
}
.news-card-main .news2-info p,
.news-card-main .news2-info .new-author,
.news-card-main .news2-info .new-author .fa.fa-clock-o {
  margin: 0 0;
  font-size: 13px;
}
.news-card-main .news2-view {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  color: #d72924;
  font-weight: 700;
  font-size: 16px;
}
.news-card-main:hover:after {
  opacity: 1;
}
.news-card-main:after {
  background: rgba(0, 0, 0, .2);
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
  bottom: 0;
  left: 0;
  content: "";
  opacity: 0;
  -webkit-transition: all ease 500ms;
  -o-transition: all ease 500ms;
  transition: all ease 500ms;
}
</style>