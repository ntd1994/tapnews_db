<script setup lang="ts">
const props = defineProps<{
  category: string,
  slug: string
}>()
</script>

<template>
  <div class="topic-box-small color-cod-gray mb-20 category-type" :data-category="category.trim() || ''">{{category}}</div>
</template>

<style scoped>
.topic-box-small {
  color: white;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  padding: 4px 12px;
  width: fit-content;
  letter-spacing: 0.55px;
}

.category-type {
  background-color: #f00303;
}

.category-type[data-category='Đời sống'] {
  background-color: #0075e0;
}

.category-type[data-category='Sức Khỏe'],
.category-type[data-category='Sức khoẻ'] {
  background-color: #4cc9f0;
}

.category-type[data-category='Văn hóa'] {
  background-color: #32CD32;
}

.category-type[data-category='Giải trí'] {
  background-color: #d300cb;
}

.category-type[data-category='Du lịch'] {
  background-color: #FF4500;
}

.category-type[data-category='Ẩm thực'],
.category-type[data-category='Ăn uống'] {
  background-color: #3a0ca3;
}

.category-type[data-category='Bạn đọc'] {
  background-color: #0075E0;
}

.category-type[data-category='Di Trú'],
.category-type[data-category='Di trú'] {
  background-color: #00760c;
}

.category-type[data-category='Việc làm'] {
  background-color: #7209b7;
}

.category-type[data-category='Dịch vụ'] {
  background-color: #4361ee ;
}

.category-type[data-category='Nhà đất'] {
  background-color: #00760C;
}

.category-type[data-category='Nail'] {
  background-color: #0075E0;
}

.category-type[data-category='Làm đẹp'] {
  background-color: #f72585;

}

.category-type[data-category='Buôn Chuyện'] {
  background-color: #ffc300;
}

</style>
