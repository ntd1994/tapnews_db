<script setup lang="ts">
import { type NewsDto } from "~/models/news.model";

const props = defineProps<{
  label?: string,
  newses: NewsDto[]
}>()
</script>

<template>
  <div class="">
    <SharedNewsHeader :header="label || newses[0].categoryName"/>
    <div class="row">
      <div class="col-md-6 col-12 left">
        <TopStoryItem :news="newses[0]" :isShowTime="true" class="h-100 story-item-top"/>
      </div>
      <div class="col-md-6 col-12 right">
        <TopStoryItem :news="newses[1]" :isShowTime="true" class="h-100 story-item-top"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width:768px) {
  .right {
    margin-top: 25px
  }
}

</style>
