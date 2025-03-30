<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="h-full relative flex justify-center items-center overflow-hidden rounded-lg"
  >
    <div
      :style="`background-image: url(${url})`"
      class="absolute bg-[length:100%_100%] -inset-4 blur-lg"
    />
    <img :src="url" class="relative" />
  </div>
</template>
