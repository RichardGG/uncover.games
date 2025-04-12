<script setup lang="ts">
import { Button, Toolbar } from 'primevue'
import { storeToRefs } from 'pinia'
import { useTemplateRef, computed } from 'vue'
import SavedFilters from '@/components/menus/SavedFiltersMenu.vue'
import { useAppStore } from '@/stores/appStore.ts'
import LayoutMenu from '@/components/menus/LayoutMenu.vue'
import SortMenu from '@/components/menus/SortMenu.vue'
import GroupMenu from '@/components/menus/GroupMenu.vue'
import BrandControls from '@/components/controls/BrandControls.vue'
import UserControls from '@/components/controls/UserControls.vue'
import ButtonIcon from '@/components/elements/ButtonIcon.vue'
import { SortOrderDirection } from '@/types/SortTypes'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)
const savedFiltersMenu = useTemplateRef('saved-filters-menu')
const layoutMenu = useTemplateRef('layout-menu')
const sortMenu = useTemplateRef('sort-menu')
const groupMenu = useTemplateRef('group-menu')

const customFilterCount = computed(() => {
  let count = 0
  if (appStore.currentFilter.Settings.Name) count++
  if (appStore.currentFilter.Settings.Genre) count++
  if (appStore.currentFilter.Settings.Platform) count++
  if (appStore.currentFilter.Settings.ReleaseYear) count++
  if (appStore.currentFilter.Settings.Version) count++
  if (appStore.currentFilter.Settings.Publisher) count++
  if (appStore.currentFilter.Settings.Developer) count++
  if (appStore.currentFilter.Settings.Category) count++
  if (appStore.currentFilter.Settings.Tag) count++
  if (appStore.currentFilter.Settings.Series) count++
  if (appStore.currentFilter.Settings.Region) count++
  if (appStore.currentFilter.Settings.Source) count++
  if (appStore.currentFilter.Settings.AgeRating) count++
  if (appStore.currentFilter.Settings.UseAndFilteringStyle) count++
  if (appStore.currentFilter.Settings.IsInstalled) count++
  if (appStore.currentFilter.Settings.IsUnInstalled) count++
  if (appStore.currentFilter.Settings.Hidden) count++
  if (appStore.currentFilter.Settings.Favorite) count++
  if (appStore.currentFilter.Settings.Library) count++
  if (appStore.currentFilter.Settings.CompletionStatuses) count++
  if (appStore.currentFilter.Settings.UserScore) count++
  if (appStore.currentFilter.Settings.CriticScore) count++
  if (appStore.currentFilter.Settings.CommunityScore) count++
  if (appStore.currentFilter.Settings.LastActivity) count++
  if (appStore.currentFilter.Settings.RecentActivity) count++
  if (appStore.currentFilter.Settings.Added) count++
  if (appStore.currentFilter.Settings.Modified) count++
  if (appStore.currentFilter.Settings.PlayTime) count++
  if (appStore.currentFilter.Settings.InstallSize) count++
  if (appStore.currentFilter.Settings.Feature) count++
  return count
})
</script>

<template>
  <Toolbar class="m-4 mb-0">
    <template #start>
      <BrandControls />
      <!-- v-tooltip.bottom="'Custom filter'" -->
      <Button
        severity="secondary"
        text
        @click="customFilterOpen = !customFilterOpen"
      >
        <template #icon>
          <ButtonIcon
            :button="customFilterCount ? 'filterOn' : 'filter'"
          />
        </template>
      </Button>
      <!-- v-tooltip.bottom="'Saved filters'" -->
      <Button
        severity="secondary"
        text
        class="relative"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="savedFiltersMenu?.menu?.toggle($event)"
      >
        <template #icon>
          <ButtonIcon
            button="saved"
          />
        </template>
      </Button>
      <SavedFilters ref="saved-filters-menu" />
      <!-- v-tooltip.bottom="'Sort by'" -->
      <Button
        severity="secondary"
        text
        @click="sortMenu?.menu?.toggle($event)"
      >
        <template #icon>
          <ButtonIcon
            :button="appStore.currentFilter.SortingOrderDirection === SortOrderDirection.Descending ? 'sort' : 'sortAsc'"
          />
        </template>
      </Button>
      <SortMenu ref="sort-menu" />
      <!-- v-tooltip.bottom="'Group by'" -->
      <Button
        severity="secondary"
        text
        @click="groupMenu?.menu?.toggle($event)"
      >
        <template #icon>
          <ButtonIcon
            button="group"
          />
        </template>
      </Button>
      <GroupMenu ref="group-menu" />
      <!-- v-tooltip.bottom="'Layout'" -->
      <Button
        severity="secondary"
        text
        @click="layoutMenu?.menu?.toggle($event)"
      >
        <template #icon>
          <ButtonIcon
            button="layout"
          />
        </template>
      </Button>
      <LayoutMenu ref="layout-menu" />
    </template>
    <template #end>
      <UserControls />
    </template>
  </Toolbar>
</template>
