<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Button, ScrollPanel, Splitter, SplitterPanel } from 'primevue'

import CustomFilters from '../../components/views/CustomFilters.vue'
import GamesView from '../../components/views/GamesView.vue'
import GameDetails from '../../components/views/GameDetails.vue'
import { useAppStore } from '../../stores/appStore.ts'

const appStore = useAppStore()
const { isMobile, gameOpen, customFilterOpen, gameExpanded } =
  storeToRefs(appStore)
</script>
<template>
  <div
    class="h-full flex flex-col shrink border-0 rounded-0"
    :class="{ 'p-4': !isMobile }"
  >
    <div
      class="border border-(--p-content-border-color) h-full flex rounded-lg"
      :class="{
        'border-0!': isMobile,
      }"
    >
      <div
        v-if="!isMobile && customFilterOpen && !gameExpanded"
        :min-size="20"
        class="flex flex-col w-100 shrink-0 border-r border-(--p-content-border-color)"
      >
        <div
          class="flex w-full items-center justify-between px-4 py-2 border-b border-(--p-content-border-color)"
        >
          Custom filter
          <Button
            icon="pi pi-times"
            severity="secondary"
            text
            class="-mr-2"
            @click="customFilterOpen = false"
          />
        </div>
        <div class="relative h-full">
          <ScrollPanel class="absolute h-full w-full">
            <CustomFilters />
          </ScrollPanel>
        </div>
      </div>
      <Splitter class="w-full border-0!" :gutter-size="1">
        <SplitterPanel
          v-if="!gameExpanded || !gameOpen"
          :min-size="20"
          class="relative w-full h-full"
          :class="{
            'pt-4 pl-4': !isMobile,
            'pt-1 pl-1': isMobile,
          }"
          :size="50"
        >
          <GamesView />
        </SplitterPanel>
        <SplitterPanel
          v-if="gameOpen && !isMobile"
          :min-size="20"
          class="relative w-100 shrink-0 border-l border-(--p-content-border-color)"
          :size="50"
        >
          <div
            class="!absolute top-0 left-0 flex space-x-1 p-1 w-full bg-black/20 z-10 justify-between"
          >
            <div>
              <Button
                @click="gameOpen = false"
                icon="pi pi-times"
                severity="secondary"
                text
              />
              <Button
                @click="gameExpanded = !gameExpanded"
                icon="pi pi-expand"
                severity="secondary"
                text
              />
            </div>
            <div>
              <Button icon="pi pi-ellipsis-h" severity="secondary" text />
            </div>
          </div>
          <ScrollPanel class="absolute h-full w-full">
            <GameDetails />
          </ScrollPanel>
        </SplitterPanel>
      </Splitter>
    </div>
  </div>
</template>
