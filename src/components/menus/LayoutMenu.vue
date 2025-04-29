<script setup lang="ts">
import { PhMagnifyingGlassMinus, PhMagnifyingGlassPlus } from '@phosphor-icons/vue'
import { storeToRefs } from 'pinia'
import { Menu, ButtonGroup, Button } from 'primevue'
import { useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
const { lastSelectedCoversPerRow, coversPerRow, layout } = storeToRefs(appStore)

const menu = useTemplateRef('menu')

defineExpose({ menu })

const adjustRowSize = (event: Event, amount: number) => {
  event.preventDefault()
  event.stopPropagation()
  if (coversPerRow.value + amount > 0) {
    coversPerRow.value += amount
  }
  lastSelectedCoversPerRow.value = coversPerRow.value
}

</script>
<template>
  <Menu
    ref="menu"
    :model="[
      {label: 'Table'},
      {label: 'Covers'},
    ]"
    :popup="true"
    class="max-h-[50vh] overflow-y-scroll"
  >
    <template #item="slotProps">
      <div
        v-if="slotProps.item.label === 'Table'"
        class="flex items-center gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer"
        :class="layout === 'table' ? 'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary' : ''"
        @click="layout = 'table'"
      >
        <span class="font-medium">Table</span>
      </div>
      <div
        v-if="slotProps.item.label === 'Covers'"
        class="flex items-center justify-between gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer"
        :class="layout === 'covers' ? 'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary' : ''"
        @click="layout = 'covers'"
      >
        <span class="font-medium">Covers</span>
        <div
          v-if="layout === 'covers'"
          class="ml-4"
        >
          <ButtonGroup>
            <Button
              class="py-1"
              severity="secondary"
              @click="adjustRowSize($event, 1)"
            >
              <PhMagnifyingGlassMinus
                size="22"
                class="p-0"
              />
            </Button>
            <Button
              class="py-1"
              severity="secondary"
              @click="adjustRowSize($event, -1)"
            >
              <PhMagnifyingGlassPlus
                size="22"
                class="p-0"
              />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </template>
  </Menu>
</template>
