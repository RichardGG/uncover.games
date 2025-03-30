<script setup lang="ts">
import GamesCovers from './GamesCovers.vue'
import GamesTable from './GamesTable.vue'
import { useAppStore } from '../../stores/appStore.ts'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <GamesTable v-if="layout === 'table'" />
  <GamesCovers v-if="layout === 'covers'" />
</template>
