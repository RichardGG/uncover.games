<template>
  <q-page class="column items-center justify-evenly">
    <TableView :games="games" v-if="view === 'table'" />
    <GridView :games="games" v-else />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { filter, sortBy, reverse } from 'lodash'
import { useGamesStore, Game } from 'stores/gamesStore'
import { useFiltersStore } from 'stores/filtersStore'
import TableView from 'src/components/LibraryViews/TableView.vue'
import GridView from 'src/components/LibraryViews/GridView.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'LibraryPanel',
  components: { TableView, GridView },
  setup () {
    const gamesStore = useGamesStore()
    const filtersStore = useFiltersStore()
    const { sort, view } = storeToRefs(gamesStore)

    const games = computed(() => {
      let games = filter(gamesStore.games, (game: Game) => {
            const matches = filtersStore.matchesFilter(game)
            return matches
        })
      games = sortBy(games, sort.value?.value ?? 'Name')
      if (gamesStore.sortDesc) {
        games = reverse(games)
      }
      if (gamesStore.search) {
        games = games.filter((game) => game.Name?.toLowerCase()?.includes(gamesStore.search.toLowerCase()))
      }
      return games
    })

    return { games, sort, view }
  }
})
</script>
