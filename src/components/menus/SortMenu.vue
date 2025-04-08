<script setup lang="ts">
import { Popover, SelectButton } from 'primevue'
import { useTemplateRef } from 'vue'
import { SortOrder, sortOrderTranslations, SortOrderDirection } from '@/types/SortTypes'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const menu = useTemplateRef('menu')

defineExpose({ menu })
</script>
<template>
  <Popover ref="menu">
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
    <ul class="list-none p-0 m-0 flex flex-col w-52">
      <li
        v-for="order in Object.keys(SortOrder).filter(k => isNaN(Number(k))) as (keyof typeof SortOrder)[]"
        :key="order"
        class="flex items-center gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer"
        @click="appStore.currentFilter.SortingOrder = SortOrder[order]"
      >
        <span class="font-medium">{{ SortOrder[order] }} - {{ sortOrderTranslations[SortOrder[order]] }}</span>
      </li>
    </ul>
  </Popover>
</template>
