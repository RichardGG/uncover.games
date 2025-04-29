<script setup lang="ts">
import { Menu } from 'primevue'
import { defineExpose, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'

import { useCollectionsStore } from '@/stores/collectionsStore'
import { useAppStore } from '@/stores/appStore'
const collectionsStore = useCollectionsStore()
const appStore = useAppStore()
const { currentFilter } = storeToRefs(appStore)

const menu = useTemplateRef('saved-filters-menu')

defineExpose({ menu })
</script>
<template>
  <Menu
    ref="saved-filters-menu"
    :model="collectionsStore.collections.FilterPresets"
    :popup="true"
    class="max-h-[50vh] overflow-y-scroll"
  >
    <template #item="slotProps">
      <div
        class="px-2 py-1.5"
        :class="{
          'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary': currentFilter?.Id === slotProps.item.Id,
        }"
        @click="
          // @ts-expect-error filter will actually be FilterPreset
          currentFilter = slotProps.item"
      >
        {{ slotProps.item.Name }}
      </div>
    </template>
  </Menu>
</template>
