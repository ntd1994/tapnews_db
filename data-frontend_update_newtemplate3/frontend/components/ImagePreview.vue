<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  imageSrc: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center p-8"
    content-class="flex flex-col p-4 bg-white rounded border border-gray-100"
  >
    <ClientOnly>
      <div>
        <img :src="imageSrc" alt="">
      </div>
    </ClientOnly>
  </VueFinalModal>
</template>
