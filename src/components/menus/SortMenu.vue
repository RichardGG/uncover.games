<script setup lang="ts">
import { Popover, SelectButton } from 'primevue'
import { useTemplateRef } from 'vue'

const menu = useTemplateRef('menu')

defineExpose({ menu })
</script>
<template>
  <Popover ref="menu">
    <SelectButton :options="['Ascending', 'Descending']" />
    <ul class="list-none p-0 m-0 flex flex-col w-52">
      <li
        class="flex items-center gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer rounded-border"
      >
        <span class="font-medium">Name</span>
      </li>
      <li
        class="flex items-center gap-2 px-2 rounded-md h-8 hover:bg-highlight-emphasis cursor-pointer rounded-border"
      >
        <span class="font-medium">Score</span>
      </li>
    </ul>
  </Popover>
</template>
