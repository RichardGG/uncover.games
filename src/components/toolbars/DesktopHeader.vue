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
import SavedFilters from '../menus/SavedFilters.vue'
import { useAppStore } from '../../stores/appStore.ts'
import { useTemplateRef } from 'vue'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)
const savedFiltersMenu = useTemplateRef('saved-filters-menu')
</script>

<template>
  <Toolbar class="m-4 mb-0">
    <template #start>
      <i class="pi pi-discord mx-2 text-4xl!"></i>
      <div class="mx-4">Uncover.Games</div>
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
      />
      <Button
        v-tooltip.bottom="'Group by'"
        icon="pi pi-tags"
        severity="secondary"
        text
      />
      <Button
        v-tooltip.bottom="'View'"
        icon="pi pi-objects-column"
        severity="secondary"
        text
      />
    </template>
    <template #end>
      <IconField class="mr-6">
        <InputIcon class="pi pi-search" />
        <InputText type="text" />
      </IconField>
      <OverlayBadge class="mr-5">
        <i
          class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!"
        />
      </OverlayBadge>
      <Avatar icon="pi pi-user" class="mr-2" shape="circle" />
    </template>
  </Toolbar>
</template>
