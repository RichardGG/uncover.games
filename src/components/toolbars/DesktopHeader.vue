<script setup lang="ts">
import {
  Toolbar,
  Button,
  Avatar,
  OverlayBadge,
  IconField,
  InputText,
  InputIcon,
} from 'primevue'
import { storeToRefs } from 'pinia'
import SavedFilters from '../menus/SavedFiltersMenu.vue'
import { useAppStore } from '../../stores/appStore.ts'
import { useTemplateRef } from 'vue'
import LayoutMenu from '../menus/LayoutMenu.vue'
import SortMenu from '../menus/SortMenu.vue'
import BrandControls from '../controls/BrandControls.vue'
import UserControls from '../controls/UserControls.vue'

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
      <Button
        v-tooltip.bottom="'Custom filter'"
        icon="pi pi-filter"
        severity="secondary"
        text
        @click="customFilterOpen = !customFilterOpen"
      />
      <Button
        v-tooltip.bottom="'Saved filters'"
        icon="pi pi-bookmark"
        severity="secondary"
        text
        class="relative"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="savedFiltersMenu?.menu?.toggle($event)"
      />
      <SavedFilters ref="saved-filters-menu" />
      <Button
        v-tooltip.bottom="'Sort by'"
        icon="pi pi-sort-alt"
        severity="secondary"
        text
        @click="sortMenu?.menu?.toggle($event)"
      />
      <SortMenu ref="sort-menu" />
      <Button
        v-tooltip.bottom="'Group by'"
        icon="pi pi-tags"
        severity="secondary"
        text
      />
      <Button
        v-tooltip.bottom="'Layout'"
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
