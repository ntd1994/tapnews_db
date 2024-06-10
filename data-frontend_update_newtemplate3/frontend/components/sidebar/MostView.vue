<script setup lang="ts">
import type { NewsDto, PagedNewsItemDto, PagedRaoVatItemDto } from "~/models/news.model";
import {useFetch, useRoute, useRuntimeConfig} from "#app";
import {type PagedList} from "~/models/pagination.model";

const props = defineProps<{
  pagesize?: number
}>()

const $config = useRuntimeConfig();
const apiURL = $config.public.apiURL as string
const getMostViewNewsList = async () => {
  const { data: data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: 1,
      size: 10,
    }
  });
  
  return data;
}
const mostViewNewsList = await getMostViewNewsList();

</script>

<template>
  <div class="sidebar-box">
    <SharedNewsHeader :header="'Bài viết tiêu biểu'"/>  
    <div class="add-item5-lg" style="padding: 0 10px;">
      <RaoVatItem
        v-for="news in mostViewNewsList?.items?.slice(0, pagesize || 5)"
        :key="news.id"
        :news="news"
        :isRaoVat="false"
      />
    </div>
  </div>
</template>

<style scoped>

</style>