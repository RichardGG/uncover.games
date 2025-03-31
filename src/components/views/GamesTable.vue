<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { DataTable, Column } from 'primevue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/appStore.ts'

const appStore = useAppStore()
const { isMobile, gameOpen } = storeToRefs(appStore)

type Game = {
  code: string
  name: string
  category: string
  quantity: number
}

const selectedGame: Ref<Game | null> = ref(null)

const games: Ref<Game[]> = ref([
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

const selectGame = () => {
  if (gameOpen.value !== null) {
    selectedGame.value = games.value[gameOpen.value]
  } else {
    selectedGame.value = null
  }
}

watch(gameOpen, () => selectGame(), { immediate: true })

watch(selectedGame, (selected: Game | null) => {
  games.value.forEach((game, index) => {
    if (selected?.name === game.name) {
      appStore.setGame(index)
    }
  })
})
</script>

<template>
  <div class="w-full h-full relative">
    <DataTable
      v-model:selection="selectedGame"
      selection-mode="single"
      :value="games"
      scrollable
      scroll-height="flex"
      class="absolute! w-full!"
      table-class="pb-[40vh]"
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
