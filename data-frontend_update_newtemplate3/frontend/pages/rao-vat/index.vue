<script setup lang="ts">
import type { PagedRaoVatItemDto, } from "~/models/news.model";
import {useFetch, useRoute, useRuntimeConfig, useServerSeoMeta, useRouter} from "nuxt/app";
import type {PagedList} from "~/models/pagination.model";
import type {CategoryDto} from "~/models/category.model";
import {generateSubPages} from "~/utils/functions";
import { ref } from "vue";

const $config = useRuntimeConfig();
const $route = useRoute();
const query = $route.query;
const slug = (typeof query.categorySlug == 'object') ? query.categorySlug?.[0] : query.categorySlug;

const getSubPages = (pageList: PagedList<any>): number[] => {
  return generateSubPages(pageList);
}

const {data: raovatList} = await useFetch<PagedList<PagedRaoVatItemDto>>("/api/rao-vat", {
  baseURL: $config.public.apiURL,
  params: {
    page: query.page || 1,
    size: 8,
    categorySlug: slug
  }
});


const subPages = raovatList.value ? getSubPages(raovatList.value) : [];

const {data: categories } = await useFetch<CategoryDto[]>("/api/categories", {
  baseURL: $config.public.apiURL,
  params: {
    type: 'raovat'
  }
});

useServerSeoMeta({
  keywords: `rao vat${slug ? `, ${(slug as string)?.replaceAll('-', ' ')}` : ''}`,
  title: 'Rao vặt',
  ogTitle: 'Rao vặt',
  description: '',
  ogDescription: '',
  ogImage: '',
}, {
    mode: 'all'
})
const $router = useRouter()

const filterCategory = (slug: string) => {
  window.location.href = `/rao-vat?categorySlug=${slug}`
}
const generateRaoVatUrl = (page: number) => {
  return `/rao-vat?page=${page}` + (!!slug ? `&categorySlug=${slug}` : '');
}

const handleTabClick = (tab) => {
  filterCategory(tab.slug)
}

const breadcrumbs = computed(() => {
  
  let _breadcrumbs = []
   _breadcrumbs.push({ url: '/', title: 'Home' });
   _breadcrumbs.push({ url: `/rao-vat`, title: 'Rao Vặt' });
  return _breadcrumbs
})
</script>

<template>
  <SharedContentMasterLayout>
    <template #breadcrumb>
      <SharedBreadcrumb :breadcrumbs="breadcrumbs" :category="'Rao Vặt'" :tabs="categories" @onTabClick="handleTabClick"/>
    </template>
    <template #left-side>
      <div class="raovat-content row">
        <template v-if="raovatList.items.length > 0">
          <div v-for="(news, index) in raovatList?.items" class="raovat-content-item col-12 col-md-6 col-lg-4 relative">
            <div class="raovat-item h-100">
              <News3Item :news="news" :isShowImage="true" :isRaoVat="true"/>
            </div>
            <div class="box-category">
              <SharedBoxCategory :category="news.categoryName" :slug="news.categoryName"/>
            </div>
          </div>
        </template>
        <template v-else>
          <div style="width: 100%; padding: 0 15px">
            <SharedNothingFound />
          </div>
        </template>
      </div>
    </template>
    <template #right-side>
      <SidebarMostView :pagesize="10"/>
      <SidebarAd />
    </template>
  </SharedContentMasterLayout>
</template>

<style>
.raovat-content {
  margin-top: -15px;
}
.raovat-item {
  background-color: white;
}

.raovat-content .raovat-content-item {
  padding: 15px;
}

.raovat-content .raovat-content-item .raovat-item {
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.08)
}

.raovat-content .raovat-content-item .raovat-item .news-info {
  padding: 0 15px !important;
}

.raovat-content .raovat-content-item .box-category {
  position: absolute;
  top: 15px;
  left: 30px;
}
</style>
