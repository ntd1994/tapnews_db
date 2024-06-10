<script setup lang="ts">
import { computed } from "vue";
import {type NewsDto} from "~/models/news.model";

const props = defineProps<{
  label?: string,
  newses: NewsDto[]
}>()
const sortedList = computed(() => (props.newses?.sort((v1, v2) => (new Date(v2.publishDate!).getTime() - new Date(v1.publishDate!).getTime())) || []))
</script>

<template>
  <div class="new2-area">
    <SharedNewsHeader :header="label || newses[0].categoryName"/>
    <div class="row">
      <div class="col-lg-8 col-12">
        <SharedNewsCardMain :news="newses[0]"/>
      </div>
      <div class="col-lg-4 col-12 w-100">
        <div class="row">
          <div v-for="(news, index) in newses.slice(1, 4)" :key="news.id" class="col-12">
            <News3Item :news="news" :isShowImage="index === 0"/>
            <div v-if="index < newses.slice(1, 4).length - 1" class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.new2-area .sub-height-img img {
  height: 170px;
  width: 100%;
}

.line {
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
}


@media screen and (max-width:960px) {
  .new2-area .news2-main-item  {
    min-height: 360px !important;
    max-height: 360px !important;
  }

  .new2-area .sub-height-img img {
    height: 500px;
  }

  .new2-area .news-info .time .post-date-light {
    margin-bottom: 30px;
  }
}

@media screen and (max-width:576px) {
  .new2-area .news2-main-item  {
    min-height: 250px !important;
    max-height: 250px !important;
  }

  .new2-area .sub-height-img img {
    height: auto;
    max-height: 340px;
  }
}
</style>