<script setup lang="ts">
import { PhLockSimple, PhLockSimpleOpen } from '@phosphor-icons/vue'
import { nextTick, onMounted, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'
import { useAppStore } from '@/stores/appStore.ts'
import GameDetails from '@/components/views/GameDetails.vue'
import CustomFilters from '@/components/views/CustomFilters.vue'

const appStore = useAppStore()
const { gameOpen, customFilterOpen } = storeToRefs(appStore)

enum SheetType
{
  Game,
  CustomFilter,
}

const gameSheet = ref<InstanceType<typeof BottomSheet>>()
const customFilterSheet = ref<InstanceType<typeof BottomSheet>>()

const maxSheetHeight = ref(0)

const lockedSheets = ref<SheetType[]>([])
const openSheets = ref<SheetType[]>([])

const gameSheetSize = computed(() => lockedSheets.value.includes(SheetType.Game) ? 300 : maxSheetHeight.value)
const customFilterSheetSize = computed(() => lockedSheets.value.includes(SheetType.CustomFilter) ? 300 : maxSheetHeight.value)

watch(gameOpen, (val) => {
  console.log
  if (val !== null) {
    if (!openSheets.value.includes(SheetType.Game)) {
      openSheet(SheetType.Game)
    }
  } else {
    if (openSheets.value.includes(SheetType.Game)) {
      closeSheet(SheetType.Game)
    }
  }
})

watch(customFilterOpen, (val) => {
  if (val === true) {
    openSheet(SheetType.CustomFilter)
  } else {
    closeSheet(SheetType.CustomFilter)
  }
})

const openSheet = (sheetType: SheetType) => {
  if (sheetType === SheetType.Game) {
    gameSheet.value?.open()
    openSheets.value.push(SheetType.Game)
  } else if (sheetType === SheetType.CustomFilter) {
    customFilterSheet.value?.open()
    openSheets.value.push(SheetType.CustomFilter)
  }
}

const closeSheet = (sheetType: SheetType, closeSheet: boolean = true) => {
  console.log('closing sheet', sheetType)
  if (sheetType === SheetType.Game) {
    if (closeSheet) {
      gameSheet.value?.close()
    }
    openSheets.value = openSheets.value.filter((s) => s !== SheetType.Game)
    appStore.setGame(null)
  } else if (sheetType === SheetType.CustomFilter) {
    if (closeSheet) {
      customFilterSheet.value?.close()
    }
    openSheets.value = openSheets.value.filter((s) => s !== SheetType.CustomFilter)
    customFilterOpen.value = false
  }
}

const pinSheet = (sheetType: SheetType) => {
  if (sheetType === SheetType.Game) {
    lockedSheets.value = lockedSheets.value.includes(SheetType.Game)
      ? lockedSheets.value.filter((s) => s !== SheetType.Game)
      : [...lockedSheets.value, SheetType.Game]
      gameSheet.value?.snapToPoint(gameSheetSize.value)
  } else if (sheetType === SheetType.CustomFilter) {
    lockedSheets.value = lockedSheets.value.includes(SheetType.CustomFilter)
      ? lockedSheets.value.filter((s) => s !== SheetType.CustomFilter)
      : [...lockedSheets.value, SheetType.CustomFilter]
      customFilterSheet.value?.snapToPoint(customFilterSheetSize.value)
  }
}

onMounted(() => {
  if (gameOpen.value) {
    nextTick(function () {
      openSheet(SheetType.Game)
    })
  }
  if (customFilterOpen.value) {
    nextTick(function () {
      openSheet(SheetType.CustomFilter)
    })
  }
})
</script>

<template>
  <BottomSheet
    ref="customFilterSheet"
    :swipe-close-threshold="30"
    :snap-points="[customFilterSheetSize]"
    :blocking="false"
    @closed="closeSheet(SheetType.CustomFilter, false)"
    @instinct-height="(n) => (maxSheetHeight = n)"
  >
    <template #header>
      <div class="h-1" />
      <Button
        size="small"
        severity="secondary"
        :text="!lockedSheets.includes(SheetType.CustomFilter)"
        class="!absolute -top-0.5 right-1 bg-black/0! border-0!"
        @click="pinSheet(SheetType.CustomFilter)"
      >
        <template #icon>
          <PhLockSimple
            v-if="lockedSheets.includes(SheetType.CustomFilter)"
            class="shrink-0"
            :size="18"
          />
          <PhLockSimpleOpen
            v-else
            class="shrink-0"
            :size="18"
          />
        </template>
      </Button>
    </template>
    <div class="-mt-[1vh]">
      <CustomFilters />
    </div>
  </BottomSheet>

  <BottomSheet
    ref="gameSheet"
    :swipe-close-threshold="30"
    :snap-points="[gameSheetSize]"
    :blocking="true"
    @closed="closeSheet(SheetType.Game, false)"
    @instinct-height="(n) => (maxSheetHeight = n)"
  >
    <template #header>
      <div class="h-1" />
      <Button
        size="small"
        severity="secondary"
        :text="!lockedSheets.includes(SheetType.Game)"
        class="!absolute -top-0.5 right-1 bg-black/0! border-0!"
        @click="pinSheet(SheetType.Game)"
      >
        <template #icon>
          <PhLockSimple
            v-if="lockedSheets.includes(SheetType.Game)"
            class="shrink-0"
            :size="18"
          />
          <PhLockSimpleOpen
            v-else
            class="shrink-0"
            :size="18"
          />
        </template>
      </Button>
    </template>
    <div class="-mt-[1vh] w-[100vw]">
      <GameDetails />
    </div>
  </BottomSheet>
</template>

<style lang="css">
:root {
  --vsbs-background: var(--p-content-background);
  --vsbs-handle-background: var(--p-content-border-color);
  --vsbs-padding-x: 0px;
}
</style>
