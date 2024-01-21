<template>
    <q-page class="column items-center justify-evenly">
    <q-table
      title="Games"
      :columns="columns"
      :rows="games"
      row-key="Id"
    >
      <template v-slot:body-cell-Cover="props">
        <q-td>
          <Cover :fileName="props.row.CoverImage" />
        </q-td>
      </template>
      <template v-slot:body-cell-Actions="props">
        <q-td>
          <q-btn color="secondary" label="...">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item 
                  clickable 
                  @click="openLink(link.Url)"
                  v-for="(link, index) in props.row.Links"
                  :key="`link-${props.row.Id}-${index}`"
                >
                  <q-item-section>{{ link.Name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { chain } from 'lodash'
import { useGamesStore, Game } from 'stores/gamesStore'
import { useFiltersStore } from 'stores/filtersStore'
import Cover from 'src/components/Cover.vue'

export default defineComponent({
  name: 'LibraryPanel',
  components: { Cover },
  setup () {
    const gamesStore = useGamesStore()
    const filtersStore = useFiltersStore()

    const columns = [
      {
        label: 'Cover',
        name: 'Cover',
        field: 'Cover',
      },
      {
        label: 'Name',
        name: 'Name',
        field: 'Name',
      },
      {
        label: 'CommunityScore',
        name: 'CommunityScore',
        field: 'CommunityScore',
      },
      {
        label: 'ReleaseDate',
        name: 'ReleaseDate',
        field: (row: Game) => row.ReleaseDate?.ReleaseDate,
      },
      {
        label: 'CompletionStatus',
        name: 'CompletionStatus',
        field: (row: Game) => row.CompletionStatus?.Name,
      },
      {
        label: 'Source',
        name: 'Source',
        field: (row: Game) => row.Source?.Name,
      },
      {
        label: 'Hidden',
        name: 'Hidden',
        field: 'Hidden',
      },
      {
        label: 'Actions',
        name: 'Actions',
        field: 'Actions',
      },
    ]

    const games = computed(() => {
      console.log('games computed filter')
      const sort = gamesStore.sort?.value || 'Name'
      console.log('sort', gamesStore.sort?.value, sort)
      return chain(gamesStore.games)
        .filter((game: Game) => {
            const matches = filtersStore.matchesFilter(game)
            // console.log('lodash filter', matches)
            return matches
        })
        // .sortBy(sort)
        .value()
    })

    const openLink = (url: string) => window.open(url, '_blank')

    return { games, columns, openLink }
  }
})
</script>
