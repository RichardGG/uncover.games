<script setup lang="ts">
import { Button, Toolbar } from 'primevue'
import { storeToRefs } from 'pinia'
import { useTemplateRef } from 'vue'
import SavedFilters from '@/components/menus/SavedFiltersMenu.vue'
import { useAppStore } from '@/stores/appStore.ts'
import LayoutMenu from '@/components/menus/LayoutMenu.vue'
import SortMenu from '@/components/menus/SortMenu.vue'
import BrandControls from '@/components/controls/BrandControls.vue'
import UserControls from '@/components/controls/UserControls.vue'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)
const savedFiltersMenu = useTemplateRef('saved-filters-menu')
const layoutMenu = useTemplateRef('layout-menu')
const sortMenu = useTemplateRef('sort-menu')
</script>

<template>
  <Toolbar class="m-4 mb-0">
    <template #start>
      <BrandControls />
      <!-- v-tooltip.bottom="'Custom filter'" -->
      <Button
        icon="pi pi-filter"
        severity="secondary"
        text
        @click="customFilterOpen = !customFilterOpen"
      />
      <!-- v-tooltip.bottom="'Saved filters'" -->
      <Button
        icon="pi pi-bookmark"
        severity="secondary"
        text
        class="relative"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="savedFiltersMenu?.menu?.toggle($event)"
      />
      <SavedFilters ref="saved-filters-menu" />
      <!-- v-tooltip.bottom="'Sort by'" -->
      <Button
        icon="pi pi-sort-alt"
        severity="secondary"
        text
        @click="sortMenu?.menu?.toggle($event)"
      />
      <SortMenu ref="sort-menu" />
      <!-- v-tooltip.bottom="'Group by'" -->
      <Button
        icon="pi pi-tags"
        severity="secondary"
        text
      />
      <!-- v-tooltip.bottom="'Layout'" -->
      <Button
        icon="pi pi-objects-column"
        severity="secondary"
        text
        @click="layoutMenu?.menu?.toggle($event)"
      />
      <LayoutMenu ref="layout-menu" />
    </template>
    <template #end>
      <UserControls />
    </template>
  </Toolbar>
</template>
