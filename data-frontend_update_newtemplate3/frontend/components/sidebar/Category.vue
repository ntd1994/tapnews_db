<script setup lang="ts">
import {useFetch, useRoute, useRuntimeConfig} from "nuxt/app";
const $config = useRuntimeConfig();
// const $route = useRoute();
// const { data: tags } = await useFetch<{name: string, count: number}[]>("/api/tags", {
//   baseURL: $config.public.apiURL
// });

</script>

<template>
  <!-- <div class="sidebar-box">
    <SharedHeaderSidebarItem header-title="Tags" />
    <ul class="archive-list">
      <CategoryItem
        v-for="tag in tags.data"
        :tag="tag"
      />
    </ul>
  </div> -->
</template>

<style scoped>

</style>