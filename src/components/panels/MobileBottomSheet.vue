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

const gameSheet = ref<InstanceType<typeof BottomSheet>>()
const customFilterSheet = ref<InstanceType<typeof BottomSheet>>()
const maxSheetHeight = ref(0)
const lockSheet = ref(false)
const isGameSheetOpen = ref(false)

const gameSheetSize = computed(() => lockSheet.value ? 300 : maxSheetHeight.value)

watch(gameOpen, (val) => {
  if (val !== null) {
    if (!isGameSheetOpen.value) {
      openGameSheet()
    }
  } else {
    if (isGameSheetOpen.value) {
      closeGameSheet()
    }
  }
})

watch(customFilterOpen, (val) => {
  if (val === true) {
    customFilterSheet.value?.open()
  } else {
    customFilterSheet.value?.close()
  }
})

const openGameSheet = () => {
  gameSheet.value?.open()

  // opened event doesn't seem to work
  isGameSheetOpen.value = true
}

const closeGameSheet = () => {
  gameSheet.value?.close()
}

const pinSheet = () => {
  lockSheet.value = !lockSheet.value
  gameSheet.value?.snapToPoint(gameSheetSize.value)
}

const onGameSheetClosed = () => {
  isGameSheetOpen.value = false
  appStore.setGame(null)
}

onMounted(() => {
  if (gameOpen.value) {
    customFilterOpen.value = false
    nextTick(function () {
      openGameSheet()
    })
  } else if (customFilterOpen.value) {
    nextTick(function () {
      customFilterSheet.value?.open()
    })
  }
})
</script>

<template>
  <BottomSheet
    ref="gameSheet"
    :snap-points="[gameSheetSize]"
    :expand-on-content-drag="!lockSheet"
    :blocking="false"
    @max-height="(n) => (maxSheetHeight = n)"
    @closed="onGameSheetClosed"
  >
    <template #header>
      <div class="h-1" />
      <Button
        size="small"
        severity="secondary"
        :text="!lockSheet"
        class="!absolute -top-0.5 right-1 bg-black/0! border-0!"
        @click="pinSheet"
      >
        <template #icon>
          <PhLockSimple
            v-if="lockSheet"
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

  <BottomSheet
    ref="customFilterSheet"
    :snap-points="[maxSheetHeight]"
    :blocking="false"
    @max-height="(n) => (maxSheetHeight = n)"
    @closed="customFilterOpen = false"
  >
    <div class="-mt-[1vh]">
      <CustomFilters />
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
