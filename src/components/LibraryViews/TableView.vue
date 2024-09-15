<template>
  <q-table
    title="Games"
    :columns="columns"
    :rows="games"
    row-key="Id"
    :virtual-scroll="true"
    style="height: calc(100vh - 100px); width: calc(100% - 40px)"
    :rows-per-page-options="[0]"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from 'stores/gamesStore'
import Cover from 'src/components/Cover.vue'

export default defineComponent({
  name: 'TableView',
  components: { Cover },
  props: {
    games: Array<Game>
  },
  setup (props) {
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

    const openLink = (url: string) => window.open(url, '_blank')
    return { columns, openLink }
  }
})
</script>