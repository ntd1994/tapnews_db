<template>
  <section class="section-wrapper" style="background-color: #f0f1f4;">
    <div class="element-container">
      <div class="row">
        <div class="col-lg-9 col-md-12" style="background-color: #f0f1f4;">
          <SharedBreadcrumb :breadcrumbs="breadcrumbs" :category="''" style="margin-bottom: 1px;"/>
          <div class="row pagination-container">
            <template v-if="newsList && newsList.items.length > 0">
              <div v-for="news in newsList.items" :key="news.id" class="col-12" style="margin-bottom: 30px;">
                <SearchItem :news="news"/>
              </div>
            </template>
            <template v-else>
              <div style="width: 100%; padding: 0 15px">
                <SharedNothingFound />
              </div>
            </template>
            <div v-if="newsList && newsList.totalPage > 1" class="row mt-20-r mb-30 w-100" style="padding-left: 15px;">
              <div class="col-sm-6 col-12">
                <div class="pagination-btn-wrapper text-center--xs mb15--xs">
                  <ul>
                    <li :class="{ active: 1 == newsList?.page }">
                      <a :href="`/tim-kiem/${keyword}?page=${1}`">1</a>
                    </li>
                    <li v-if="subPages.length > 0 && subPages[0] > 2"><span>...</span></li>
                    <li v-for="index in subPages" :class="{ active: index == newsList?.page }">
                      <a :href="`/tim-kiem/${keyword}?page=${index}`">{{ index }}</a>
                    </li>
                    <li v-if="subPages.length > 0 && subPages[subPages.length - 1] + 1 < (newsList?.totalPage ?? 0)">
                      <span>...</span>
                    </li>
                    <li v-if="newsList?.totalPage && newsList?.totalPage > 1"
                      :class="{ active: newsList?.totalPage == newsList?.page }">
                      <a :href="`/tim-kiem/${keyword}?page=${newsList.totalPage}`">{{ newsList.totalPage }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6 col-12">
                <div class="pagination-result text-right pt-10 text-center--xs">
                  <p class="mb-none">Trang {{ newsList?.page }}</p>
                </div>
              </div>
            </div>
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

<script lang="ts" setup>
import { useFetch, useRoute, useRuntimeConfig } from "nuxt/app";
import { onMounted, ref } from "vue";
import type { PagedNewsItemDto } from "~/models/news.model";
import type { PagedList } from "~/models/pagination.model";
import { generateSubPages } from "~/utils/functions";

const $config = useRuntimeConfig();
const $route = useRoute();
const query = $route.query;
const params = $route.params;
const keyword = params.keyword
const apiURL = $config.public.apiURL;

// onMounted(() => {
//   console.log(keyword)
//   getNewsList()
// })

const breadcrumbs = computed(() => {
  let _breadcrumbs = []
   _breadcrumbs.push({ url: '/', title: 'Home' });
   _breadcrumbs.push({ url: '/', title: 'Search Result' });
  return _breadcrumbs
})

const getNewsList = async () => {
  const { data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: query.page || 1,
      size: 8,
      search: keyword,
    }
  });

  return data;
}

const getMostViewNewsList = async () => {
  const { data: data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: query.page || 1,
      size: 8,
    }
  });
  return data;
}

const getSubPages = (pageList: PagedList<any>): number[] => {
  return generateSubPages(pageList);
}

const [newsList, mostViewNewsList] = await Promise.all([getNewsList(), getMostViewNewsList()]);
const subPages = newsList.value ? getSubPages(newsList.value) : [];
</script>

<style>
@media only screen and (max-width:991.9px) {
  .search-side {
    display: none !important;
  }
}
</style>