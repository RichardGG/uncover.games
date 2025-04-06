<script setup lang="ts">
import { PhMinus, PhPlus } from '@phosphor-icons/vue'
import { storeToRefs } from 'pinia'
import { InputNumber, Popover } from 'primevue'
import { useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
const { lastSelectedCoversPerRow, coversPerRow, layout } = storeToRefs(appStore)

const menu = useTemplateRef('menu')

defineExpose({ menu })

const changeRowSize = () => {
  lastSelectedCoversPerRow.value = coversPerRow.value
}
</script>
<template>
  <Popover ref="menu">
    <ul class="list-none p-0 m-0 flex flex-col w-52">
      <li
        class="flex items-center gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer"
        :class="layout === 'table' ? 'bg-highlight-emphasis' : ''"
        @click="layout = 'table'"
      >
        <span class="font-medium">Table</span>
      </li>
      <li
        class="flex items-center justify-between gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer"
        :class="layout === 'covers' ? 'bg-highlight-emphasis' : ''"
        @click="layout = 'covers'"
      >
        <span class="font-medium">Covers</span>
        <div
          v-if="layout === 'covers'"
          class="ml-4"
        >
          <InputNumber
            v-model="coversPerRow"
            show-buttons
            button-layout="horizontal"
            increment-icon="pi-plus"
            decrement-icon="pi-minus"
            increment-button-class="bg-(--p-content-background) w-8"
            decrement-button-class="bg-(--p-content-background) w-8"
            class="-mr-2 h-8"
            input-class="w-8! text-center p-0"
            :min="1"
            size="small"
            @input="changeRowSize"
          >
            <template #decrementicon>
              <PhMinus />
            </template>
            <template #incrementicon>
              <PhPlus />
            </template>
          </InputNumber>
        </div>
      </li>
    </ul>
  </Popover>
</template>
