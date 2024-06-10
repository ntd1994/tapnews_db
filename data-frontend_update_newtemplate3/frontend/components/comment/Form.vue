<script setup lang="ts">
import { useFetch, useRuntimeConfig } from 'nuxt/app';
import { ref } from 'vue';

const props = defineProps<{
  newsId?: string,
  raoVatId?: string
}>()
const $config = useRuntimeConfig();
const emits = defineEmits(['createCommentSuccess'])
const name = ref('')
const email = ref('')
const content = ref('')
let isFirstSubmitComment = ref(false)
const isSubmitting = ref(false)
const createComment = async () => {
  isFirstSubmitComment.value = true
  if (!content.value || !email.value || !name.value) {
    return
  }
  isSubmitting.value = true

  await $fetch(`/api/comments`, {
        baseURL: $config.public.apiURL,
        method: 'post',
        body: {
            newsId: props.newsId,
            raoVatId: props.raoVatId,
            content: content.value,
            anonymousEmail: email.value,
            anonymousName: name.value
        }
  }).finally(() =>  isSubmitting.value = false)
  emits('createCommentSuccess')
  resetForm()
  isFirstSubmitComment.value = false
}

const resetForm = () => {
  content.value = ''
  email.value = ''
  name.value = ''
}

</script>

<template>
    <div class="leave-comments">
        <h2 class="title-semibold-dark size-xl mb-20 mt-50">Bình luận</h2>
        <form id="leave-comments">
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="name" placeholder="Tên*" class="form-control" type="text">
                        <div class="help-block with-errors text-danger" v-if="!name && isFirstSubmitComment">Vui lòng nhập tên của bạn </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="email" placeholder="Email*" class="form-control" type="email">
                        <div class="help-block with-errors text-danger" v-if="!email && isFirstSubmitComment">Vui lòng nhập email của bạn</div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <textarea v-model="content" placeholder="Bình luận*" class="textarea form-control" id="form-message" rows="8" cols="20"></textarea>
                        <div class="help-block with-errors text-danger" v-if="!content && isFirstSubmitComment">Vui lòng nhập nội dung của bạn</div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group mb-none">
                        <button type="button" @click="createComment" :disabled="isSubmitting" class="btn-ftg-ptp-45">Gửi</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>