<script setup lang="ts">
import { ref } from 'vue'
import { DataTable, Column } from 'primevue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/appStore.ts'

const appStore = useAppStore()
const { isMobile, gameOpen } = storeToRefs(appStore)

const games = ref([
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Half-Life 2: Episode 1',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Like a Dragon Gaiden: The Man Who Erased His Name.',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
])
</script>

<template>
  <div class="w-full h-full relative">
    <DataTable
      :value="games"
      @row-click="gameOpen = true"
      scrollable
      scrollHeight="flex"
      class="absolute! w-full!"
    >
      <Column
        field="name"
        header="Name"
        frozen
        class="border-r!"
        :class="isMobile ? 'min-w-[45vw]' : 'min-w-80'"
      ></Column>
      <Column field="code" header="Code"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column field="aaa" header="aaa"></Column>
      <Column field="bbb" header="bbb"></Column>
      <Column field="ccc" header="ccc"></Column>
      <Column field="ddd" header="ddd"></Column>
    </DataTable>
  </div>
</template>
