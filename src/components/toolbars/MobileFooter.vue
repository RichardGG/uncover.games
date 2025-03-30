<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Button } from 'primevue'
import SavedFilters from '../menus/SavedFiltersMenu.vue'
import {
  PhBookmarksSimple,
  PhFunnel,
  PhLayout,
  PhSortAscending,
  PhStack,
} from '@phosphor-icons/vue'
import { useAppStore } from '../../stores/appStore.ts'
import { storeToRefs } from 'pinia'
import LayoutMenu from '../menus/LayoutMenu.vue'
import SortMenu from '../menus/SortMenu.vue'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)

const savedFiltersMenu = useTemplateRef('saved-filters-menu')
const layoutMenu = useTemplateRef('layout-menu')
const sortMenu = useTemplateRef('sort-menu')
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
      @click="sortMenu?.menu?.toggle($event)"
    >
      <template #icon>
        <PhSortAscending :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <SortMenu ref="sort-menu" />
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
      @click="layoutMenu?.menu?.toggle($event)"
    >
      <template #icon>
        <PhLayout :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <LayoutMenu ref="layout-menu" />
  </div>
</template>
