<script setup lang="ts">
import {
  PhArrowDown,
  PhBookmarkSimple,
  PhSquaresFour,
  PhStackSimple,
  PhToggleLeft,
} from '@phosphor-icons/vue'
import { useTemplateRef, computed } from 'vue'
import { Button, Badge } from 'primevue'
import { storeToRefs } from 'pinia'
import SavedFilters from '@/components/menus/SavedFiltersMenu.vue'
import { useAppStore } from '@/stores/appStore.ts'
import LayoutMenu from '@/components/menus/LayoutMenu.vue'
import SortMenu from '@/components/menus/SortMenu.vue'

const appStore = useAppStore()
const { customFilterOpen } = storeToRefs(appStore)

const savedFiltersMenu = useTemplateRef('saved-filters-menu')
const layoutMenu = useTemplateRef('layout-menu')
const sortMenu = useTemplateRef('sort-menu')

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
  <div
    class="flex justify-around items-center h-16 px-1 border-t border-(--p-content-border-color) z-10"
  >
    <div class="relative w-1/5 mx-2">
      <Badge
        v-if="customFilterCount"
        :value="customFilterCount"
        size="small"
        class="absolute right-0"
      />
      <Button
        label="Filter"
        icon-pos="top"
        severity="secondary"
        text
        class="w-full h-14 text-[14px]!"
        @click="customFilterOpen = true"
      >
        <template #icon>
          <PhToggleLeft
            :size="24"
            class="shrink-0 -mb-2"
          />
        </template>
      </Button>
    </div>
    <Button
      label="Sort"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 text-[14px]!"
      @click="sortMenu?.menu?.toggle($event)"
    >
      <template #icon>
        <PhArrowDown
          :size="24"
          class="shrink-0 -mb-2"
        />
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
        <PhBookmarkSimple
          :size="24"
          class="shrink-0 -mb-2"
        />
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
        <PhStackSimple
          :size="24"
          class="shrink-0 -mb-2"
        />
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
        <PhSquaresFour
          :size="24"
          class="shrink-0 -mb-2"
        />
      </template>
    </Button>
    <LayoutMenu ref="layout-menu" />
  </div>
</template>
