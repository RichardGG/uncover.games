<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { VirtualScroller } from 'primevue'
import type { Ref } from 'vue'
import GameCover from '@/components/elements/GameCover.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/appStore.ts'
import { useCollectionsStore } from '@/stores/collectionsStore.ts'
import { nextTick } from 'process'

const appStore = useAppStore()
const {
  gameOpen,
  preferredCoverSize,
  coversPerRow,
  lastSelectedCoversPerRow,
  isMobile,
} = storeToRefs(appStore)
const coversPanel = useTemplateRef('covers-panel')
const { width, height } = useElementSize(coversPanel)
const sizingArea = useTemplateRef('sizing-area')
const { height: imageHeight } = useElementSize(sizingArea)
const virtualScroller = useTemplateRef('virtual-scroller')

const collectionsStore = useCollectionsStore()

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

const rows = computed(() =>
  chunk(collectionsStore.collections.Games || [], coversPerRow.value)
)
const flipEmoji: Ref<boolean> = ref(false)

const setPreferredCoverSize = () => {
  preferredCoverSize.value = width.value / coversPerRow.value
}

watch(width, (val) => {
  if (!val || !preferredCoverSize.value) {
    return
  }
  const newSize = Math.round(val / preferredCoverSize.value)
  coversPerRow.value = newSize > 0 ? newSize : 1
  console.log('width change', gameOpen.value)
  // nextTick(() => {
  if (gameOpen.value) {
    const row = gameOpen.value / coversPerRow.value
    virtualScroller.value?.scrollToIndex(row)
  }
  // })
})

watch(lastSelectedCoversPerRow, () => {
  setPreferredCoverSize()
})

onMounted(() => {
  setPreferredCoverSize()
})
</script>
<template>
  <div ref="covers-panel" class="relative h-full w-full">
    <div
      ref="sizing-area"
      class="absolute top-0 left-0 w-full min-h-10 flex z-10 bg-amber-500 pointer-events-none opacity-0"
    >
      <GameCover
        v-for="i in coversPerRow"
        :key="collectionsStore.collections.Games?.[i].Id"
        :file-name="collectionsStore.collections.Games?.[i].CoverImage"
        class="w-full"
      />
    </div>
    <VirtualScroller
      ref="virtual-scroller"
      :items="rows"
      class="h-full w-full"
      :item-size="imageHeight"
      :scroll-height="`${height}px`"
      :delay="50"
    >
      <template v-slot:item="{ item, options }">
        <div
          class="flex justify-around md:my-2 my-1 mx-1"
          :style="`height: ${imageHeight}px`"
        >
          <div
            v-for="(game, gameIndex) in item"
            :key="`game-${gameIndex}`"
            class="relative w-full rounded-2xl border-4 md:mx-1 mx-0.5 overflow-hidden border-primary transition-colors cursor-pointer"
            :class="{
              'border-transparent':
                gameOpen !== options.index * coversPerRow + gameIndex,
            }"
          >
            <!-- <div class="absolute top-0 left-0 z-10 bg-black p-4">
              {{ options.index * coversPerRow + gameIndex }} - {{ game.Name }} -
              {{ game.CoverImage }}
            </div> -->
            <GameCover
              :file-name="game.CoverImage"
              class="w-full"
              @click="
                appStore.setGame(options.index * coversPerRow + gameIndex)
              "
            />
          </div>
          <div
            v-for="n in coversPerRow - item.length"
            :key="n"
            class="w-full mx-1 border-4 border-transparent"
          ></div>
        </div>
        <!-- <div v-if="isMobile" class="h-[40vh] flex justify-center items-center">
          <div
            class="text-5xl transition-transform"
            :class="flipEmoji ? '-scale-x-100' : ''"
            @click="flipEmoji = !flipEmoji"
          >
            🗿
          </div>
        </div> -->
      </template>
    </VirtualScroller>
  </div>
</template>
