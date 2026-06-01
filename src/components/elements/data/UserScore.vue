<script lang="ts" setup>
import { PhStar } from '@phosphor-icons/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
const { gameOpen } = storeToRefs(appStore)
const userScore = computed(() => {
  // gameOpen may not have a strict index signature, cast to a generic record to safely index by GameFields
  const score = (gameOpen.value as Record<string, any>)?.['UserScore'] as number | undefined
  return score !== undefined ? score : 0
})
</script>
<template>
  <div class="flex flex-col justify-center items-center">
  <div class="flex">
    <PhStar :weight="userScore >= 10 ? 'fill' : 'regular'" class="w-6 h-6" />
    <PhStar :weight="userScore >= 30 ? 'fill' : 'regular'" class="w-6 h-6" />
    <PhStar :weight="userScore >= 50 ? 'fill' : 'regular'" class="w-6 h-6" />
    <PhStar :weight="userScore >= 70 ? 'fill' : 'regular'" class="w-6 h-6" />
    <PhStar :weight="userScore >= 90 ? 'fill' : 'regular'" class="w-6 h-6" />
  </div>
  <div class="text-[#999999] text-xs">({{ userScore }}%)</div>
  </div>
</template>