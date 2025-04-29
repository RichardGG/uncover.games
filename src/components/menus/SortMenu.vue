<script setup lang="ts">
import { Menu, SelectButton } from 'primevue'
import { useTemplateRef, computed } from 'vue'
import { SortOrder, SortOrderDirection, sortOrderTranslations } from '@/types/SortTypes'
import { useAppStore } from '@/stores/appStore'
import FieldIcon from '@/components/elements/FieldIcon.vue'

const appStore = useAppStore()

const menu = useTemplateRef('menu')

const sortKeys = Object.keys(SortOrder).filter(k => isNaN(Number(k))) as (keyof typeof SortOrder)[]
const sortOptions = computed(() => sortKeys.map((key) => ({
  label: sortOrderTranslations[SortOrder[key]],
  command: () => appStore.currentFilter.SortingOrder = SortOrder[key],
  value: SortOrder[key],
  class: appStore.currentFilter.SortingOrder === SortOrder[key] 
    ? 'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary' 
    : ''
})))

const scrollToTop = () => {
  // @ts-expect-error list is not provided in the type definition
  const list: element = menu.value?.list
  if (list) {
    list.parentElement.scrollTop = 0
  }
}

defineExpose({ menu })
</script>
<template>
  <Menu
    ref="menu"
    :model="sortOptions"
    :popup="true"
    class="max-h-[50vh] overflow-y-scroll"
    @show="scrollToTop"
  >
    <template #start>
      <SelectButton
        v-model="appStore.currentFilter.SortingOrderDirection"
        option-label="name"
        option-value="value"
        :options="[
          {
            value: SortOrderDirection.Ascending,
            name: 'Ascending', 
          },
          {
            value: SortOrderDirection.Descending,
            name: 'Descending'
          }
        ]"
      />
    </template>
    <template #itemicon="slotProps">
      <div :class="appStore.currentFilter.SortingOrder === slotProps.item.value ? 'text-primary' : 'text-surface'">
        <FieldIcon :sort="slotProps.item.value" />
      </div>
    </template>
  </Menu>
</template>
