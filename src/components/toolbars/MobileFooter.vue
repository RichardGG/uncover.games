<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Button } from 'primevue'
import SavedFilters from '../menus/SavedFilters.vue'
import {
  PhBookmarksSimple,
  PhFunnel,
  PhLayout,
  PhSortAscending,
  PhStack,
} from '@phosphor-icons/vue'
import { useAppStore } from '../../stores/appStore.ts'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)

const savedFiltersMenu = useTemplateRef('saved-filters-menu')
</script>

<template>
  <div
    class="flex justify-around items-center h-16 px-1 border-t border-(--p-content-border-color) z-10"
  >
    <Button
      label="Filter"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      size="small"
      @click="customFilterOpen = true"
    >
      <template #icon>
        <PhFunnel :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Sort"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      size="small"
    >
      <template #icon>
        <PhSortAscending :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Saved"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      @click="savedFiltersMenu?.menu?.toggle($event)"
    >
      <template #icon>
        <PhBookmarksSimple :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <SavedFilters ref="saved-filters-menu" />
    <Button
      label="Group"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      size="small"
    >
      <template #icon>
        <PhStack :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Layout"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      size="small"
    >
      <template #icon>
        <PhLayout :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
  </div>
</template>
