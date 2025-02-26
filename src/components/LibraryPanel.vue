<template>
  <q-page class="column items-center justify-evenly">
    <GameView v-if="game" />
    <TableView v-else-if="view === 'table'" :games="games" />
    <GridView v-else-if="view === 'grid'" :games="games" />
    <StorageView v-else-if="view === 'storage'" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCollectionsStore } from 'stores/collectionsStore'
import { useFiltersStore } from 'stores/filtersStore'
import TableView from 'src/components/LibraryViews/TableView.vue'
import GridView from 'src/components/LibraryViews/GridView.vue'
import StorageView from 'src/components/LibraryViews/StorageView.vue'
import { storeToRefs } from 'pinia'
import GameView from './LibraryViews/GameView.vue'
import { filterGames } from 'src/services/filter'

export default defineComponent({
  name: 'LibraryPanel',
  components: { TableView, GridView, StorageView, GameView },
  setup () {
    const collectionsStore = useCollectionsStore()
    const filtersStore = useFiltersStore()
    const { currentFilter, sort, view, game } = storeToRefs(filtersStore)

    const games = computed(() => filterGames(
      collectionsStore.Games,
      filtersStore.currentFilter,
      filtersStore.sort,
      filtersStore.sortDesc,
      filtersStore.search,
    ))

    return { games, sort, view, currentFilter, game }
  }
})
</script>
