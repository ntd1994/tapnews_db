<template>
  <div class="no-item-card">
    <div>
      <h1 style="margin-bottom: 0;">
        Không tìm thấy kết quả tìm kiếm!
      </h1>
      <p v-if="onlyText" style="margin-top: 12px;">
        Vui lòng thử lại
      </p>
    </div>
    <div v-if="onlyText">
      <input v-model="keyword" type="text" id="search-input" class="search-input" placeholder="Tìm kiếm...." required
        @keyup.enter="searchKeyword()">
    </div>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  onlyText?: boolean
}>(), {
  onlyText: false
})

const $router = useRouter()

const keyword = ref()

const searchKeyword = async () => {
  await $router.push({ path: `/tim-kiem/${keyword.value}` })
}
</script>

<style>
.no-item-card {
  background-color: white;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .08);
}

.no-item-card h1 {
  font-weight: 700;
}

.no-item-card .search-input {
  outline: none;
  font-size: 16px;
  display: block;
  width: 100%;
  padding: 12px 12px;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  text-align: center;
}
</style>