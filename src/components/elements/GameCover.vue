<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDriveStore } from '@/stores/driveStore'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'

const props = defineProps({
  fileName: {
    type: String,
    required: false,
    default: null,
  },
})

const driveStore = useDriveStore()
const googleAuthStore = useGoogleAuthStore()

const url = ref('')

const fetchImage = () => {
  url.value = ''
  if (props.fileName) {
    driveStore
      .getImage(googleAuthStore.getToken(), props.fileName)
      .then((dataUri: string|false) => {
        if (dataUri) {
          url.value = dataUri
        }
      })
  }
}

watch(
  () => props.fileName,
  (newName, oldName) => {
    if (newName !== oldName) {
      fetchImage()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="h-full relative flex justify-center items-center overflow-hidden rounded-lg"
  >
    <div
      :style="`background-image: url(${url})`"
      class="absolute bg-[length:100%_100%] -inset-4 blur-lg"
    />
    <img
      v-if="url"
      :src="url"
      class="relative"
    >
  </div>
</template>
