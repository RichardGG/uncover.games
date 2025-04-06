<script setup lang="ts">
import { Popover } from 'primevue'
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
  <Popover ref="saved-filters-menu">
    <div
      v-for="filter in collectionsStore.collections.FilterPresets"
      :key="filter.Id"
      :class="{
        'bg-primary': currentFilter?.Id === filter.Id,
      }"
      @click="currentFilter = filter"
    >
      {{ filter.Name }}
    </div>
  </Popover>
</template>
