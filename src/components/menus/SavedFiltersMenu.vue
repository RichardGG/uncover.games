<script setup lang="ts">
import { Menu } from 'primevue'
import { ref, defineExpose, useTemplateRef } from 'vue'

const menu = useTemplateRef('saved-filters-menu')

defineExpose({ menu })

const savedFilters = ref([
  {
    label: 'Done',
  },
  {
    label: 'Play Next',
  },
  {
    label: 'VR',
  },
])
</script>
<template>
  <Menu
    ref="saved-filters-menu"
    id="saved_filters_menu"
    :model="savedFilters"
    :popup="true"
  />
</template>
