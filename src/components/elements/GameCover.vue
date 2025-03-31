<script setup lang="ts">
import { useDriveStore } from '@/stores/driveStore'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'
import { ref } from 'vue'

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

if (props.fileName) {
  driveStore
    .getImage(googleAuthStore.getToken(), props.fileName)
    .then((dataUri: string) => {
      if (dataUri) {
        url.value = dataUri
      }
    })
}

const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
</script>

<template>
  <div
    class="h-full relative flex justify-center items-center overflow-hidden rounded-lg"
  >
    <div
      :style="`background-image: url(${url})`"
      class="absolute bg-[length:100%_100%] -inset-4 blur-lg"
    />
    <div
      class="absolute inset-0 bg-black/50 flex flex-col justify-end items-end p-4 z-10"
    >
      <div>{{ fileName }}</div>
      <div>{{ cyrb53(url) }}</div>
    </div>
    <img :src="url" class="relative" />
  </div>
</template>
