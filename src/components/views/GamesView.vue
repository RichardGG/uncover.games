<script setup lang="ts">
import { storeToRefs } from 'pinia'
import GamesCovers from '@/components/views/GamesCovers.vue'
import GamesTable from '@/components/views/GamesTable.vue'
import { useAppStore } from '@/stores/appStore.ts'

const appStore = useAppStore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <GamesTable v-if="layout === 'table'" />
  <GamesCovers v-if="layout === 'covers'" />
</template>
