<script setup lang="ts">
import { storeToRefs } from 'pinia'
import GamesCovers from '@/components/views/GamesCovers.vue'
import GamesTable from '@/components/views/GamesTable.vue'
import { useAppStore } from '@/stores/appStore.ts'
import { useCollectionsStore } from '@/stores/collectionsStore.ts'

const appStore = useAppStore()
const collectionsStore = useCollectionsStore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <div v-if="!collectionsStore?.collections?.Games?.length" class="flex flex-col items-center justify-center h-full gap-4">
    <p class="text-lg text-surface-500">No games found. Sign into the <a class="font-medium underline" href="https://playnite.link/addons.html#UncoverGamesExporter_d0ec6248-2b1f-421a-9ed4-722e5623f61f" target="_blank" rel="noopener noreferrer">UncoverGamesExporter</a> Playnite plugin to upload game data.</p>
  </div>
  <GamesTable v-if="layout === 'table'" />
  <GamesCovers v-if="layout === 'covers'" />
</template>
