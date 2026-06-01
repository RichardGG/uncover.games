<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
const { gameOpen } = storeToRefs(appStore)
const communityScore = computed(() => {
  // gameOpen may not have a strict index signature, cast to a generic record to safely index by GameFields
  const score = (gameOpen.value as Record<string, any>)?.['CommunityScore'] as number | undefined
  return (score !== undefined && score !== null) ? score : 'N/A'
})

const scoreText = computed(() => {
  if (communityScore.value === 'N/A') {
    return 'N/A'
  } else if (communityScore.value >= 80) {
    return 'Is Positive'
  } else if (communityScore.value >= 70) {
    return 'Mostly Positive'
  } else if (communityScore.value >= 50) {
    return 'Mixed'
  } else if (communityScore.value >= 20) {
    return 'Mostly Negative'
  } else {
    return 'Is Negative'
  }
})

const scoreClasses = computed(() => {
  // More muted colors than critic/user score
  return communityScore.value === 'N/A'
    ? '#999999'
    : communityScore.value >= 80
      ? 'text-[#00ce7a]'
      : communityScore.value >= 70
        ? 'text-[#66cc33]'
        : communityScore.value >= 50
          ? 'text-[#ffbd3f]'
          : communityScore.value >= 20
            ? 'text-[#ff6b73]'
            : 'text-[#ff0000]'
})
</script>
<template>
  <div class="rounded-[0.25rem] text-center p-2" :class="scoreClasses">
    <div class="font-bold text-sm">{{ scoreText }}</div>
    <div class="text-[#999999] text-xs">({{ communityScore }}%)</div>
  </div>
</template>