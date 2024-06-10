<script setup lang="ts">
import moment from 'moment';
import { useFetch, useRoute, useRuntimeConfig, useServerSeoMeta } from 'nuxt/app';
import { computed, ref, onMounted } from 'vue';
import type { NewsDto, PagedNewsItemDto } from '~/models/news.model';
import { replaceAllHtmlTag } from '~/utils/functions';
import type { CommentDto, PagedCommentDto } from "~/models/comment.model";
import type { PagedList } from "~/models/pagination.model";
import { useSchemaOrg, defineWebSite, defineWebPage, defineArticle } from '@vueuse/schema-org'

const $config = useRuntimeConfig();
const $route = useRoute();
const slug = $route.params.slug;
const apiURL = $config.public.apiURL as string;

const getMostViewNewsList = async () => {
  const { data: data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: 1,
      size: 8,
    }
  });
  return data;
}
const getNews = async () => {
  const { data: data } = await useFetch<NewsDto>(`/api/admin-console/news/${slug}`, {
    baseURL: apiURL,
  });
  return data;
}
const [news, mostViewNewsList] = await Promise.all([getNews(), getMostViewNewsList(),]);


const publishedDate = computed(() => {
  const dateFormat = 'MM-DD-YYYY';
  if (!news.value?.publishDate) return moment(new Date()).format(dateFormat);

  return moment(news.value.publishDate).format(dateFormat);
})

const breadcrumbs = computed(() => {
  let _breadcrumbs = []
  _breadcrumbs.push({ url: '/', title: 'Home' });
  _breadcrumbs.push({ url: '/', title: news?.value.categoryName });
  _breadcrumbs.push({ url: '/', title: news?.value.title });
  return _breadcrumbs
})

const comments: CommentDto[] = ref([])

const loadComments = async () => {
  const { items: items } = await $fetch<PagedList<PagedCommentDto>>("/api/comments", {
    baseURL: $config.public.apiURL,
    params: {
      page: 1,
      size: 999,
      newsId: news.value?.id
    }
  });

  comments.value = items
}
onMounted(() => {
  loadComments()
})


useServerSeoMeta({
  keywords: news.value?.metaKeyword || '',
  title: news.value?.title || '',
  ogTitle: news.value?.title || '',
  description: replaceAllHtmlTag(news.value?.description?.slice(0, 300)) || '',
  ogDescription: replaceAllHtmlTag(news.value?.description?.slice(0, 300)) || '',
  ogImage: news.value?.imageUrl || ''
}, {
  mode: 'all'
})

useSchemaOrg([
  defineWebSite({
    name: "Nguoi viet plus"
  }),
  defineWebPage(),
  defineArticle({
    image: news.value?.imageUrl || ''
  })
])

</script>

<template>
  <section class="news-detail section-wrapper" style="background-color: #f0f1f4;">
    <div class="element-container">
      <section class="main-image" style="margin-bottom: 30px">
        <div class="position-relative" style="height: 100%;">
          <nuxt-img :src="news?.imageUrl || ' '" format="webp" :alt="news?.title" class=""
            style="width: auto;height: 100%; object-fit: contain;" />
        </div>
      </section>
      <div class="row">
        <div class="col-lg-9 col-md-12" style="background-color: #f0f1f4;">
          <SharedBreadcrumb :breadcrumbs="breadcrumbs" :category="''" :small="true" />
          <div class="news-detail-content">
            <template v-if="news">
              <div class="news-details-layout1" style="position: relative">
                <div class="box-category">
                  <SharedBoxCategory :category="news.categoryName" :slug="news?.categoryName"/>
                </div>
                <h1 class="title-semibold-dark size-c30 normal-case">{{ news?.title }}</h1>
                <ul class="post-info-dark mb-30" style="display: flex; align-items: center">
                  <li>
                    <a href="#">
                      <i class="fa fa-calendar" aria-hidden="true"></i>{{ publishedDate }}</a>
                  </li>
                  <li style="display: flex; align-items: center">
                    <i class="fa fa-eye" style="color:red"></i>
                    <p style="margin: 0; margin-left: 10px;color: red">{{ news.view }}</p>
                  </li>
                </ul>
                <div class="render-html">
                  <article v-html="news?.content"></article>
                </div>
                <CommentArea :comments="comments" v-if="comments?.length" class="mt-30" />
                <CommentForm :newsId="news?.id" @createCommentSuccess="loadComments" />
              </div>
            </template>
          </div>
        </div>
        <div class="search-side col-lg-3 col-md-12">
          <SidebarRaoVat />
          <SidebarAd />
          <SidebarMostView :pagesize="10" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-detail .main-image {
  /* height: 600px; */
  display: flex;
  justify-content: center;
}
.news-detail .main-image img {
  max-height: 600px;
}
.news-detail-content {
  background-color: #fff;
  padding: 85px 80px 40px
}

.news-detail-content .box-category {
  position: absolute;
  left: 0;
  top: -40px
}

.breadcrumbs-content {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>

<style scoped>
.render-html>article ol {
  display: block;
  list-style-type: decimal;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
}

.render-html>article ul {
  display: block;
  list-style-type: disc;
  margin-top: 1em;
  margin-bottom: 1 em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
}

.render-html>article li {
  display: list-item;
}

.render-html>article ul li {
  list-style-type: none;
}

.render-html>article ul li::before {
  content: "\2022";
  margin-right: 0.5em;
}

.render-html>article ul li.ql-indent-1::before {
  content: "\26AC";
  margin-right: 0.5em;
}

.render-html>article ul li.ql-indent-2::before {
  content: "◾";
  margin-right: 0.5em;
}

.render-html>article blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

.render-html>article pre {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
  border-radius: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
}

.render-html>article :deep(.ql-indent-1) {
  padding-left: 3rem;
}

.render-html>article :deep(.ql-indent-2) {
  padding-left: calc(2 * 3rem);
}

.render-html>article :deep(.ql-indent-3) {
  padding-left: calc(3 * 3rem);
}

.render-html>article :deep(.ql-indent-4) {
  padding-left: calc(4 * 3rem);
}

.render-html>article :deep(.ql-indent-5) {
  padding-left: calc(5 * 3rem);
}

.render-html>article :deep(.ql-indent-6) {
  padding-left: calc(6 * 3rem);
}

.render-html>article :deep(.ql-indent-7) {
  padding-left: calc(7 * 3rem);
}

.render-html>article :deep(.ql-indent-8) {
  padding-left: calc(8 * 3rem);
}

.render-html>article :deep(.ql-align-right) {
  text-align: right;
}

.render-html>article :deep(.ql-align-center) {
  text-align: center;
}

.render-html>article :deep(.ql-align-justify) {
  text-align: justify;
}

.render-html>article h1 {
  font-size: calc(2 * 16px);
  line-height: calc(2 * 16px);
  margin-top: calc(0.67 * 16px);
  margin-bottom: calc(0.67 * 16px);
  font-weight: 600;
}

.render-html>article h2 {
  font-size: calc(1.5 * 16px);
  line-height: calc(1.5 * 16px);
  margin-top: calc(0.83 * 16px);
  margin-bottom: calc(0.83 * 16px);
  font-weight: 600;
}

.render-html>article h3 {
  font-size: calc(1.17 * 16px);
  line-height: calc(1.17 * 16px);
  margin-top: calc(1 * 16px);
  margin-bottom: calc(1 * 16px);
  font-weight: 600;
}

.render-html>article h4 {
  font-size: calc(1 * 16px);
  line-height: calc(1 * 16px);
  margin-top: calc(1.33 * 16px);
  margin-bottom: calc(1.33 * 16px);
  font-weight: 600;
}

.render-html>article h5 {
  font-size: calc(0.83 * 16px);
  line-height: calc(0.83 * 16px);
  margin-top: calc(1.67 * 16px);
  margin-bottom: calc(1.67 * 16px);
  font-weight: 600;
}

.render-html>article h6 {
  font-size: calc(0.67 * 16px);
  line-height: calc(0.67 * 16px);
  margin-top: calc(2.33 * 16px);
  margin-bottom: calc(2.33 * 16px);
  font-weight: 600;
}

.render-html>article p {
  display: block;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  margin-left: 0;
  margin-right: 0;
}

.render-html>article hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}

.render-html>article img {
  display: inline-block;
}

.render-html>article strong {
  font-weight: bolder !important;
}

.render-html>article sub {
  vertical-align: super;
  font-size: smaller;
}

.render-html>article a {
  text-decoration: underline;
  color: #3851e5;
}

@media screen and (max-width:992px) {
  .search-side {
    margin-top: 40px;
  }
  .news-detail-content {
    padding: 85px 40px 40px;
  }
  .news-detail .main-image {
    height: auto;
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width:576px) {
  .news-detail-content {
    padding: 85px 20px 40px;
  }
}
</style>
