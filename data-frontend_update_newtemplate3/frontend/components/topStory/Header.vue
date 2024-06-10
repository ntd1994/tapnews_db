<script setup lang="ts">
import type {NewsDto} from "~/models/news.model";

const props = defineProps<{
  newses: NewsDto[]
}>()
</script>

<template>
  <section class="container">
    <div class="bg-body box-layout mt-lg-0 mt-30">
      <div class="d-flex align-items-end" style="gap: 2rem;">
        <div class="topic-box mt-4 mb-5">Tin tức sự kiện</div>
        <div class="feeding-text-dark2">
          <ol id="sample" class="ticker">
            <li v-for="news in newses">
              <a :href="`bai-viet/${news.slug}`">{{news.title}}</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-body {
  background-color: transparent;
}

.feeding-text-dark2 .ticker {
  background-color: transparent;
}

#sample {
  list-style-type: none !important;
  padding-left: 0;
}

.feeding-text-dark2 {
  display: none;
  flex: 1 1 0%;
}
@media (min-width: 768px) { 
  .feeding-text-dark2 {
    display: block;
  }
 }

</style>
