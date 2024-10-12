<template>
  <q-page class="column items-center justify-evenly">
    <TableView v-if="view === 'table'" :games="games" />
    <GridView v-else-if="view === 'grid'" :games="games" />
    <StorageView v-else-if="view === 'storage'" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { filter, sortBy, reverse } from 'lodash'
import { useCollectionsStore } from 'stores/collectionsStore'
import { useFiltersStore } from 'stores/filtersStore'
import TableView from 'src/components/LibraryViews/TableView.vue'
import GridView from 'src/components/LibraryViews/GridView.vue'
import StorageView from 'src/components/LibraryViews/StorageView.vue'
import { storeToRefs } from 'pinia'
import { Game } from 'src/types/Game/Game'

export default defineComponent({
  name: 'LibraryPanel',
  components: { TableView, GridView, StorageView },
  setup () {
    const collectionsStore = useCollectionsStore()
    const filtersStore = useFiltersStore()
    const { currentFilter, sort, view  } = storeToRefs(filtersStore)

    const games = computed(() => {
      let games = filter(collectionsStore.Games, (game: Game) => {
            const matches = filtersStore.matchesFilter(game)
            return matches
        })
      games = sortBy(games, sort.value?.value ?? 'Name')
      if (filtersStore.sortDesc) {
        games = reverse(games)
      }
      return games
    })

    return { games, sort, view, currentFilter }
  }
})
</script>
