<script setup lang="ts">
import type { NewsDto } from "~/models/news.model";

const props = defineProps<{
  news: NewsDto
  isCenter?: boolean
  isShowTime?: boolean
  isShowAuthor?: boolean
}>()

</script>

<template>
  <NuxtLink :to="`bai-viet/${news.slug}`" class="top-story-item img-overlay-70 img-scale-animate mb-4 position-relative d-block">
    <nuxt-img :src="news.imageUrl || ' '" :alt="news.title" format="webp" class="img-fluid w-100 h-100" />
    <div class="top-story-content">
      <div class="box-category">
        <SharedBoxCategory :category="news.categoryName" :slug="news?.categoryName"/>
      </div>
      <div class="mask-content-lg">
        <h1 class="title-medium-light" v-if="news.isOutStanding">
          <a :href="`bai-viet/${news.slug}`">{{news.title}}</a>
        </h1>
        <h3 class="title" :class="[isCenter ? 'title-center' : 'title-side']" v-else>
          <a :href="`bai-viet/${news.slug}`" class="elipsis-3-lines">{{news.title}}</a>
        </h3>
        <div v-if="isCenter || isShowTime" class="post-date-light" style="display: flex; align-items: center;">
          <p v-if="isShowAuthor" class="news-author" style="margin: 0;">{{ news.author }}</p>
          <SharedNewsAuthor
              :author="news.author"
              :publishDate="news.publishDate"
          />
          <div class="news2-view" style="margin-bottom: 12px;margin-left: 10px;">
            <i class="fa fa-eye"></i>
            <p style="margin: 0;">{{ news.view }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
.title-medium-light {
  margin-bottom: 10px;
}
.top-story-content {
  padding: 0 30px;
}
.box-category {
  position: absolute;
  top: 0;
}
.mask-content-lg {
  position: absolute;
  z-index: 7;
  bottom: 0;
  left: 0;
  padding: 24px
}
.title {
  margin: 0 0 10px
}
.news-author {
  color: #fff !important;
  margin-right: 10px !important;
  font-size: 14px !important;
}
.mask-content-lg .post-date-light ul li,
.mask-content-lg .post-date-light .news2-view {
  margin: 0 !important;
}

.mask-content-lg .post-date-light .news2-view {
  margin-left: 12px !important;
}

.news2-view,
.news-author {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  color: #d72924;
  font-weight: 700;
  font-size: 16px;
}

.title a {
  color: #fff;
  -o-transition: all 0.9s ease;
  transition: all 0.9s ease;
  -webkit-transition: all 0.9s ease;
  -moz-transition: all 0.9s ease;
  -ms-transition: all 0.9s ease;
  text-shadow: 1px 1px 3px rgba(0,0,0,.4);
}
.title-center a {
  font-size: 32px;
  font-weight: 500;
  line-height: 1.2em;
}
.title-side a {
  font-size: 22px;
  font-weight: 500;
}
.top-story-item:hover:after {
  opacity: 1;
}
.top-story-item:after {
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

/* @media only screen and (max-width:991.9px) {
  .mask-content-lg {
      left: 15px;
      bottom: 0
  }
} */
</style>
