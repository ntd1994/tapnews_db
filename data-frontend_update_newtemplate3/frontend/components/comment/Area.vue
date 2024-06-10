<script setup lang="ts">
import { type CommentDto} from "~/models/comment.model";

const props = defineProps<{
  comments: CommentDto[]
}>()
</script>

<template>
    <div class="comments-area" >
        <h2 class="title-semibold-dark size-xl border-bottom mb-40 pb-20">{{comments.length}} Bình luận</h2>
        <ul>
            <li v-for="comment in comments">
                <CommentItem :comment="comment" />
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>