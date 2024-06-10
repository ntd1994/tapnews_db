<script setup lang="ts">
import type { NewsDto, PagedRaoVatItemDto } from "~/models/news.model";
import {useFetch, useRoute, useRuntimeConfig} from "#app";
import {type PagedList} from "~/models/pagination.model";

const props = defineProps<{
  pagesize?: number
}>()

const $config = useRuntimeConfig();
const $route = useRoute();
const {data: data} = await useFetch<PagedList<PagedRaoVatItemDto>>("/api/rao-vat", {
  baseURL: $config.public.apiURL as string,
  params: {
    page: 1,
    size: 10
  }
});
</script>

<template>
  <div class="sidebar-box">
    <SharedNewsHeader :header="'Rao vặt'"/>
    <News3Header :header="'Rao vặt'"/>
    <div class="add-item5-lg" style="padding: 0 10px;">
      <RaoVatItem
        v-for="news in data?.items.slice(0, pagesize || 5)"
        :key="news.id"
        :news="news"
      />
    </div>
  </div>
</template>

<style>
.not-home-page .sidebar-box {
  background-color: white
}
</style>