<template>
  <div
      class="flex max-w-sm p-7 flex-col items-center gap-1 border-2 border-dashed rounded-md w-full justify-content"
      :class="{'border-indigo-500': isHover, 'border-gray-300': !isHover}"
      @dragenter.prevent="setActive"
      @dragover.prevent="setActive"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop">
    <img src="~/assets/svg/add-image.svg" alt="add-image" />

    <div class="flex flex-col items-center gap-1">
      <input
        ref="fileImageRef"
        :multiple="props.multiple"
        name="image"
        type="file"
        class="hidden"
        accept="image/*"
        @change="onSelectedFiles($event)"
      />
      <button type="button" @click="onClick">
        <p class="text-indigo-600 text-lg font-medium cursor-pointer">{{ title }}</p>
      </button>
      <p class="text-sm font-medium text-gray-500">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'

const events = ['dragenter', 'dragover', 'dragleave', 'drop'] as const;
const selectFileEventName = 'onSelectedFile';


const props = defineProps({
    multiple: { type: Boolean, default: () => (false) },
    title: { type: String, default: 'Upload a file' }
  })

const emits = defineEmits([
  selectFileEventName
])

const fileImageRef = ref()
const isHover = ref(false)

const onClick = () => {
  fileImageRef.value?.click()
}

const onSelectedFiles = ($event: Event) => {
  handleFile(($event?.target as HTMLInputElement)?.files!)
}

  function onDrop(e: DragEvent) {
    setInactive() // add this line too
    handleFile(e.dataTransfer?.files!)
  }

  function setActive() {
      isHover.value = true
  }

  function setInactive() {
      isHover.value = false
  }

  onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
  })

  onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
  })

  function preventDefaults(e: Event) {
    e.preventDefault()
  }

  function handleFile(files: FileList) {
    if(files) {
        emits(selectFileEventName, files)
      }
    }

</script>

<style scoped lang="scss">
button {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
  border: none;
  height: 20px;
}
</style>
