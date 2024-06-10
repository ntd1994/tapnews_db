<script setup lang="ts">
const props = defineProps<{
    title: string,
    isMain: {
        type: Boolean,
        default: false
    }
}>()

</script>

<template>
  <div class="news-title">
    <p class="title" :class="[isMain ? 'elipsis-3-lines main' : 'elipsis-2-lines sub']">{{ title }}</p>
  </div>
</template>

<style>
.news-title .title {
    margin: 0;
    font-weight: 500;
    transition: all 0.3s ease-out;
    font-size: 15px;
}

.news-title .title:hover {
    color: red !important;
    cursor: pointer;
}

.news-title .title.main {
    font-size: 22px;
    line-height: 26px;
}

.news-title .title.sub {
    font-size: 15px;
    line-height: 22px;
    color: #101010;
}

@media screen and (max-width:576px) {
    .elipsis-2-lines.sub {
        -webkit-line-clamp: 1 !important;
    }
}
</style>
