<script setup lang="ts">
const props = defineProps<{
  author?: string,
  publishDate?: string | Date
}>()

</script>

<template>
  <div class="category-item">
    <span class="category-name">
        Item
    </span>
    <div class="category-number">
        10
    </div>
  </div>
</template>

<style scoped>
.category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.category-item .category-name {
    color: #232323;
    font-size: 14px;
}

.category-item .category-number {
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 0 0;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -ms-border-radius: 50%;
    height: 25px;
    width: 25px;
    text-align: center;
    font-size: 13px;
}

</style>
