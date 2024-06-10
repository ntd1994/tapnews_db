<script setup lang="ts">
import { type CommentDto} from "~/models/comment.model";
import moment from "moment";

const props = defineProps<{
  comment: CommentDto
}>()
</script>

<template>
  <div class="media media-none-xs">
      <nuxt-img  :src="comment.avatar || '/img/authorAvatar/c0.png'" class="img-fluid rounded-circle" alt="comments" />
      <div class="media-body comments-content media-margin30">
          <h3 class="title-semibold-dark">
              <a href="#">{{ comment.name }} ,
                      <span> {{moment(comment.createdAt).format('DD-MM-YYYY')}}</span>
                  </a>
          </h3>
          <p>{{ comment.content }}</p>
      </div>
  </div>
</template>

<style scoped>

</style>