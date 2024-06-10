<script setup lang="ts">
import { useFetch, useRoute, useRuntimeConfig, useServerSeoMeta } from "nuxt/app";
import type { News1Dto, PagedNewsItemDto } from "~/models/news.model";
import type { PagedList } from "~/models/pagination.model";
import type { GetCategoryByIdResponse, GetCategoriesResponse } from "~/models/category.model";
import { generateSubPages } from "~/utils/functions";
import { ref } from "vue";
// import type MostViewListVue from "~/components/mostView/MostViewList.vue";

const $config = useRuntimeConfig();
const $route = useRoute();
const params = $route.params;
const slug = params.menuslug
const query = $route.query;
const apiURL = $config.public.apiURL as string;

const breadcrumbs = computed(() => {
  
  let _breadcrumbs = []
   _breadcrumbs.push({ url: '/', title: 'Home' });
   _breadcrumbs.push({ url: `/${slug}`, title: `${(slug as string)?.replaceAll('-', ' ')}` });
  return _breadcrumbs
})

const getNewsList = async () => {
  const { data: data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: query.page || 1,
      size: 10,
      menuSlug: slug,
    }
  });
  return data;
}

// const getCategory = async () => {
//   const { data: data } = await useFetch<GetCategoriesResponse>(`/api/admin-console/categories`, {
//     baseURL: apiURL,
//     query: { slug }
//   });
//   return data;
// }



const getSubPages = (pageList: PagedList<any>): number[] => {
  return generateSubPages(pageList);
}

const [newsList] = await Promise.all([getNewsList()]);
const subPages = newsList.value ? getSubPages(newsList.value) : [];


const descriptionMetaTag = ref('Nguoivietplus là trang báo điện tử cung cấp bài viết, hình ảnh, video về con người và cộng đồng người Việt trên thế giới và các tin tức quốc tế, phóng sự toàn cầu.')
useServerSeoMeta({
  keywords: (slug as string)?.replaceAll('-', ' '),
  description: descriptionMetaTag.value,
  ogDescription: descriptionMetaTag.value
}, {
  mode: 'all'
})
</script>

<template>
  <section class="category-page section-wrapper" style="background-color: #f0f1f4;">
    <div class="element-container">
      <div class="row">
        <div class="col-lg-9 col-md-12" style="background-color: #f0f1f4;">
          <SharedBreadcrumb :breadcrumbs="breadcrumbs" :category="(slug as string)?.replaceAll('-', ' ')"/>
          <div class="row pagination-container">
            <template v-if="newsList && newsList.items.length > 0">
              <div v-for="news in newsList.items" :key="news.id" class="col-12 col-md-6" style="margin-bottom: 30px;">
                <CategoryCardItem :news="news"/>
              </div>
            </template>
            <template v-else>
              <div class="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                Không tìm thấy kết quả tìm kiếm
              </div>
            </template>
            <div v-if="newsList && newsList.totalPage > 1" class="row mt-20-r mb-30 w-100" style="padding-left: 15px;">
              <div class="col-sm-6 col-12">
                <div class="pagination-btn-wrapper text-center--xs mb15--xs">
                  <ul>
                    <li :class="{ active: 1 == newsList?.page }">
                      <a :href="`/${slug}?page=${1}`">1</a>
                    </li>
                    <li v-if="subPages.length > 0 && subPages[0] > 2"><span>...</span></li>
                    <li v-for="index in subPages" :class="{ active: index == newsList?.page }">
                      <a :href="`/${slug}?page=${index}`">{{ index }}</a>
                    </li>
                    <li v-if="subPages.length > 0 && subPages[subPages.length - 1] + 1 < (newsList?.totalPage ?? 0)">
                      <span>...</span></li>
                    <li v-if="newsList?.totalPage && newsList?.totalPage > 1"
                      :class="{ active: newsList?.totalPage == newsList?.page }">
                      <a :href="`/${slug}?page=${newsList.totalPage}`">{{ newsList.totalPage }}</a>
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
        <div class="col-lg-3 col-md-12" >
          <SidebarRaoVat />
          <SidebarAd />
          <SidebarMostView :pagesize="10"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.category-page .category-header {
  margin-bottom: 30px;
}
</style>
