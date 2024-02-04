<template>
  <q-page class="column items-center justify-evenly">
    <TableView :games="games" v-if="false" />
    <GridView :games="games" v-else />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { chain } from 'lodash'
import { useGamesStore, Game } from 'stores/gamesStore'
import { useFiltersStore } from 'stores/filtersStore'
import TableView from 'src/components/LibraryViews/TableView.vue'
import GridView from 'src/components/LibraryViews/GridView.vue'

export default defineComponent({
  name: 'LibraryPanel',
  components: { TableView, GridView },
  setup () {
    const gamesStore = useGamesStore()
    const filtersStore = useFiltersStore()

    const games = computed(() => {
      const sort = gamesStore.sort?.value || 'Name'
      return chain(gamesStore.games)
        .filter((game: Game) => {
            const matches = filtersStore.matchesFilter(game)
            return matches
        })
        // .sortBy(sort)
        .value()
    })

    return { games }
  }
})
</script>
