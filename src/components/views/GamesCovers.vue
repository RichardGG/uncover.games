<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import type { Ref } from 'vue'
import GameCover from '@/components/elements/GameCover.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/appStore.ts'

const appStore = useAppStore()
const {
  gameOpen,
  preferredCoverSize,
  coversPerRow,
  lastSelectedCoversPerRow,
  isMobile,
} = storeToRefs(appStore)
const coversPanel = useTemplateRef('covers-panel')
const { width } = useElementSize(coversPanel)

type Game = {
  image: string
}

const chunk = <T,>(arr: T[], chunkSize: number): T[][] => {
  if (chunkSize <= 0) {
    throw new Error('Chunk size has to be greater than 0.')
  }

  const chunks: T[][] = []

  for (let i = 0; i < arr.length; i = i + chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }

  return chunks
}

const games: Ref<Game[]> = ref([])
const rows = computed(() => chunk(games.value, coversPerRow.value))
const flipEmoji: Ref<boolean> = ref(false)

for (let i = 0; i < 50; i++) {
  games.value[i] = {
    image:
      i % 2
        ? 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1737139959'
        : 'https://upload.wikimedia.org/wikipedia/en/2/25/Half-Life_2_cover.jpg',
  }
}

const setPreferredCoverSize = () => {
  preferredCoverSize.value = width.value / coversPerRow.value
}

watch(width, (val) => {
  if (!val || !preferredCoverSize.value) {
    return
  }
  const newSize = Math.round(val / preferredCoverSize.value)
  coversPerRow.value = newSize > 0 ? newSize : 1
})

watch(lastSelectedCoversPerRow, () => {
  setPreferredCoverSize()
})

// TODO this doesn't work
// nextTick(() => setPreferredCoverSize())
</script>
<template>
  <div class="relative h-full w-full" ref="covers-panel">
    <div class="absolute h-full w-full overflow-y-scroll">
      <div
        v-for="(row, index) in rows"
        :key="`row-${index}`"
        class="flex justify-around md:my-2 my-1 mx-1"
      >
        <div
          v-for="(game, gameIndex) in row"
          :key="`game-${gameIndex}`"
          class="w-full rounded-2xl border-4 md:mx-1 mx-0.5 overflow-hidden border-primary transition-colors cursor-pointer"
          :class="{
            'border-transparent': gameOpen !== index * coversPerRow + gameIndex,
          }"
        >
          <GameCover
            :url="game.image"
            class="w-full"
            @click="appStore.setGame(index * coversPerRow + gameIndex)"
          />
        </div>
        <div
          v-for="n in coversPerRow - row.length"
          :key="n"
          class="w-full mx-1"
        ></div>
      </div>
      <div v-if="isMobile" class="h-[40vh] flex justify-center items-center">
        <div
          class="text-5xl transition-transform"
          :class="flipEmoji ? '-scale-x-100' : ''"
          @click="flipEmoji = !flipEmoji"
        >
          🗿
        </div>
      </div>
    </div>
  </div>
</template>
