<script setup lang="ts">
import type { NewsDto, News1Dto } from "~/models/news.model";
const props = defineProps<{
  newses: NewsDto[]
}>()


const newses1: News1Dto[] = []
  
props.newses.forEach((element, index) => {
  const key = index % 3
  if (key === 0) {
    const news1: News1Dto = { ...element, subNews: [] }
    newses1.push(news1)
  } else {
    newses1[Math.trunc(index / 3)].subNews.push(element)
  }
});


</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-sm-12" v-for="news1 in newses1" >
        <News1Item class="mb-30"
            :news="news1"
        />
        <News1SubItem
            v-for="news in news1.subNews"
            class="media mb-30"
            :news="news"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
