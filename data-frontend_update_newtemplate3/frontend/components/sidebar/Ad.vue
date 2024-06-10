<script setup lang="ts">
import {useFetch, useRoute, useRuntimeConfig} from "nuxt/app";

const props = defineProps<{
  url?: string,
  imageUrl?: string,
  pagesize?: number
}>()

const $config = useRuntimeConfig();
const apiUrl = $config.public.apiURL;
const { data: ads } = await useFetch<any[]>("/api/ads", {
    baseURL: apiUrl
  })

const adsRight = ads.value?.filter(e => e.position === 'right')

</script>

<template>
  <div class="sidebar-box">
    <!-- <SharedHeaderSidebarItem header-title="Quảng Cáo" /> -->
    <News3Header :header="'Quảng Cáo'"/>
    <div class="ne-banner-layout1 text-center mb-30" v-for="(ad, index) in adsRight.slice(0, pagesize || 2)" :key="index">
      <NuxtLink :to="ad.url || ''" class="img-opacity-hover">
        <nuxt-img  :src="ad.imageUrl || ' '" alt="ad" class="img-fluid img-thumbnail" />
      </NuxtLink>
    </div>
    <!-- <div class="ne-banner-layout1 text-center mt-30">
      <NuxtLink :to="`https://www.sumofood.vn/` || ''" class="img-opacity-hover">
        <nuxt-img  :src="`https://api.nguoivietplus.com/advertisements/550afdb6-3cc7-4857-b7af-d49649fdc254.jpg` || ' '" alt="ad" class="img-fluid img-thumbnail" />
      </NuxtLink>
    </div>
    <div class="ne-banner-layout1 text-center mt-30">
      <NuxtLink :to="`https://vinahe.com/` || ''" class="img-opacity-hover">
        <nuxt-img  :src="`https://api.nguoivietplus.com/advertisements/e1bd3bae-9db5-4e64-ad46-d2caec54e050.jpeg` || ' '" alt="ad" class="img-fluid img-thumbnail" />
      </NuxtLink>
    </div> -->
  </div>
</template>

<style scoped>
.not-home-page .sidebar-box {
  background-color: #f0f1f4
}
</style>
