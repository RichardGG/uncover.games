<template>
  <q-page class="column items-center justify-evenly">
    <TableView :games="games" v-if="view === 'table'" />
    <GridView :games="games" v-else-if="view === 'grid'" />
    <StorageView v-else-if="view === 'storage'" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { filter, sortBy, reverse } from 'lodash'
import { useCollectionsStore, Game } from 'stores/collectionsStore'
import { useFiltersStore } from 'stores/filtersStore'
import TableView from 'src/components/LibraryViews/TableView.vue'
import GridView from 'src/components/LibraryViews/GridView.vue'
import StorageView from 'src/components/LibraryViews/StorageView.vue'
import { storeToRefs } from 'pinia'

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
