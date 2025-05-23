<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { UseElementVisibility } from '@vueuse/components'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent, Button } from 'primevue'
import GameCover from '@/components/elements/GameCover.vue'
import { useAppStore } from '@/stores/appStore.ts'
import { GroupableField, groupableFieldTranslations } from '@/types/GroupTypes'
import FieldIcon from '@/components/elements/FieldIcon.vue'

const appStore = useAppStore()
const {
  gameOpen,
  preferredCoverSize,
  coversPerRow,
  lastSelectedCoversPerRow,
  isMobile,
  groupedGames,
} = storeToRefs(appStore)
const coversPanel = useTemplateRef('covers-panel')
const { width } = useElementSize(coversPanel)

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

const expandedGroups: Ref<string[]> = ref([])
const flipEmoji: Ref<boolean> = ref(false)

const setPreferredCoverSize = () => {
  preferredCoverSize.value = width.value / coversPerRow.value
}

const scrollToGame = () => {
  if (gameOpen.value) {
    nextTick(() => {
      document
        .getElementById(`game-cover-${gameOpen.value?.Id}`)
        ?.scrollIntoView({ behavior: 'instant', block: 'center' })
    })
  }
}

const expandAllGroups = () => {
  expandedGroups.value = groupedGames.value?.map((group) => `${group.value}`)
}

const toggleGroups = () => {
  if (expandedGroups.value?.length) {
    expandedGroups.value = []
  } else {
    expandAllGroups()
  }
}

watch(coversPerRow, (newCount, oldCount) => {
  if (oldCount !== newCount) {
    scrollToGame()
  }
})

watch(width, (val) => {
  if (!val || !preferredCoverSize.value) {
    return
  }
  const newSize = Math.round(val / preferredCoverSize.value)
  coversPerRow.value = newSize > 0 ? newSize : 1
  scrollToGame()
})

watch(lastSelectedCoversPerRow, () => {
  setPreferredCoverSize()
})

watch(groupedGames, (groups) => {
  if (groups.length > 20) {
    expandedGroups.value = []
  } else {
    expandAllGroups()
  }
}, { immediate: true })

onMounted(() => {
  // TODO maybe we don't want this?
  // setPreferredCoverSize()
})
</script>
<template>
  <div
    ref="covers-panel"
    class="relative h-full w-full"
  >
    <div class="absolute h-full w-full overflow-y-scroll">
      <div
        v-if="appStore.currentFilter.GroupingOrder !== GroupableField.None"
        class="w-full flex items-center"
      >
        <div class="ml-4 font-medium flex items-center">
          <FieldIcon
            :group="appStore.currentFilter.GroupingOrder"
            class="mr-2 text-surface-500"
          />
          {{ groupableFieldTranslations[appStore.currentFilter.GroupingOrder] }}
        </div>
        <Button
          severity="secondary"
          class="m-2 ml-auto mr-4"
          @click="toggleGroups"
        >
          {{ expandedGroups.length ? 'Collapse all' : 'Expand all' }}
        </Button>
      </div>
      <Accordion
        multiple
        :value="expandedGroups"
      >
        <AccordionPanel
          v-for="(group) in groupedGames"
          :key="group.value"
          :value="`${group.value}`"
        >
          <AccordionHeader
            class="sticky top-0 z-10"
            :class="{
              'hidden': appStore.currentFilter.GroupingOrder === GroupableField.None
            }"
          >
            {{ group.name }}
          </AccordionHeader>
          <AccordionContent :pt="{ content: { class: 'px-0!' } }">
            <UseElementVisibility
              v-for="(item, index) in chunk(group.games || [], coversPerRow)"
              v-slot="{ isVisible }"
              :key="`row-${index}`"
            >
              <div class="flex justify-around md:my-2 my-1 mx-1">
                <div
                  v-for="(game, gameIndex) in item"
                  :id="`game-cover-${game?.Id}`"
                  :key="`game-${gameIndex}`"
                  class="relative w-full rounded-2xl border-4 md:mx-1 mx-0.5 overflow-hidden border-primary transition-colors cursor-pointer"
                  :class="{
                    'border-transparent': gameOpen?.Id !== game?.Id,
                  }"
                  :style="`height: ${(width / coversPerRow) * 1.4}px;`"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center text-center p-4 bg-gray-500/10"
                  >
                    {{ game.Name }}
                  </div>
                  <GameCover
                    v-if="isVisible"
                    :file-name="game.CoverImage || undefined"
                    class="w-full"
                    @click="appStore.setGame(game)"
                  />
                </div>
                <div
                  v-for="n in coversPerRow - item.length"
                  :key="n"
                  class="w-full mx-1 border-4 border-transparent"
                />
              </div>
            </UseElementVisibility>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <div
        v-if="isMobile"
        class="h-[40vh] flex justify-center items-center"
      >
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
