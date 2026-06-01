<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
const { gameOpen } = storeToRefs(appStore)
const criticScore = computed(() => {
  // gameOpen may not have a strict index signature, cast to a generic record to safely index by GameFields
  const score = (gameOpen.value as Record<string, any>)?.['CriticScore'] as number | undefined
  return (score !== undefined && score !== null) ? score : 'N/A'
})

const scoreClasses = computed(() => {
  // #ff0000
  // #ffcc32
  // #66cc33
  return criticScore.value === 'N/A'
    ? '#999999'
    : criticScore.value >= 75
      ? 'bg-[#00ce7a] text-[#262626]'
      : criticScore.value >= 50
        ? 'bg-[#ffbd3f] text-[#262626]'
        : 'bg-[#ff6b73] text-[#262626]'
})
</script>
<template>
  <div class="flex flex-col items-center justify-center font-bold size-10 text-base leading-6 rounded-[0.25rem]" :class="scoreClasses">
    {{ criticScore }}
  </div>
</template>