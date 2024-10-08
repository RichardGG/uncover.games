<template>
  <q-table
    :columns="columns"
    :rows="games"
    row-key="Id"
    :virtual-scroll="true"
    style="height: calc(100vh - 50px); width: 100%"
    :rows-per-page-options="[0]"
    hide-bottom
  >
    <template v-slot:body-cell-Debug="props">
      <q-td>
        {{ props.row }}
      </q-td>
    </template>
    <template v-slot:body-cell-Cover="props">
      <q-td>
        <Cover :width="30" :fileName="props.row.CoverImage" />
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
import { Game } from 'stores/collectionsStore'
import Cover from 'src/components/Cover.vue'
import { map } from 'lodash';
import { format } from 'quasar';

export default defineComponent({
  name: 'TableView',
  components: { Cover },
  props: {
    games: Array<Game>
  },
  setup () {
    // TODO consider getting the fields from Game in CollectionsStore?
    // TODO generic helper function formatField for formatting the data for these fields
    // TODO custom columns, custom order
    let columns = [
      {
        label: 'Actions',
        name: 'Actions',
        field: 'Actions',
      },

      // {
      //   label: 'Debug',
      //   name: 'Debug',
      //   field: 'Debug',
      // },


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
        label: 'Platform',
        name: 'Platform',
        field: 'Platform',
      },
      {
        label: 'Library',
        name: 'Library',
        field: 'Library',
      },
      {
        label: 'Developer',
        name: 'Developer',
        field: (row: Game) => map(row.Developers, 'Name').join(', '),
      },
      {
        label: 'Publisher',
        name: 'Publisher',
        field: (row: Game) => map(row.Publishers, 'Name').join(', '),
      },
      {
        label: 'Release Date',
        name: 'Release Date',
        // TODO date transform
        field: (row: Game) => row.ReleaseDate?.ReleaseDate,
      },
      {
        label: 'Genre',
        name: 'Genre',
        field: (row: Game) => map(row.Genres, 'Name').join(', '),
      },
      {
        label: 'Category',
        name: 'Category',
        field: (row: Game) => map(row.Categories, 'Name').join(', '),
      },
      {
        label: 'Features',
        name: 'Features',
        field: (row: Game) => map(row.Features, 'Name').join(', '),
      },
      {
        label: 'Tag',
        name: 'Tag',
        field: (row: Game) => map(row.Tags, 'Name').join(', '),
      },
      {
        label: 'Installed',
        name: 'Installed',
        field: (row: Game) => row.IsInstalled ? 'Yes' : 'No',
      },
      {
        label: 'Installation Folder',
        name: 'Installation Folder',
        field: 'InstallDirectory',
      },
      {
        label: 'Install Size',
        name: 'Install Size',
        field: (row: Game) => row.InstallSize ? format.humanStorageSize(row.InstallSize) : '',
      },
      {
        label: 'Image, ROM, or ISO Path',
        name: 'Image, ROM, or ISO Path',
        // TODO no idea if this is correct
        field: (row: Game) => map(row.Roms, 'Name').join(', '),
      },
      {
        label: 'Last Played',
        name: 'Last Played',
        // TODO date transform
        field: (row: Game) => row.LastActivity,
      },
      {
        label: 'Recent Activity',
        name: 'Recent Activity',
        // TODO date transform
        field: (row: Game) => row.RecentActivity,
      },
      {
        label: 'Time Played',
        name: 'Time Played',
        field: (row: Game) => {
          const seconds = row.Playtime
          if (seconds < 60) {
            return `${seconds} seconds`
          }
          const minutes = Math.floor(seconds / 60)
          if (minutes < 60) {
            return `${minutes} minutes`
          }
          const hours = Math.floor(minutes / 60)
          return `${hours}h ${minutes % 60}m`
        },
      },
      {
        label: 'Play Count',
        name: 'Play Count',
        field: 'PlayCount',
      },
      {
        label: 'Completion Status',
        name: 'Completion Status',
        field: (row: Game) => row.CompletionStatus?.Name,
      },
      {
        label: 'Series',
        name: 'Series',
        field: (row: Game) => map(row.Series, 'Name').join(', '),
      },
      {
        label: 'Version',
        name: 'Version',
        field: 'Version',
      },
      {
        label: 'Age Rating',
        name: 'Age Rating',
        field: (row: Game) => map(row.AgeRatings, 'Name').join(', '),
      },
      {
        label: 'Region',
        name: 'Region',
        field: (row: Game) => map(row.Regions, 'Name').join(', '),
      },
      {
        label: 'Source',
        name: 'Source',
        field: (row: Game) => row.Source?.Name,
      },
      {
        label: 'Added',
        name: 'Added',
        // TODO date transform
        field: (row: Game) => row.Added,
      },
      {
        label: 'Modified',
        name: 'Modified',
        // TODO date transform
        field: (row: Game) => row.Modified,
      },
      {
        label: 'User Score',
        name: 'User Score',
        field: 'UserScore',
      },
      {
        label: 'Critic Score',
        name: 'Critic Score',
        field: 'CriticScore',
      },
      {
        label: 'Community Score',
        name: 'Community Score',
        field: 'CommunityScore',
      },
    ]

    columns = columns.map((item) => ({ 
      ...item,
      align: 'left',
      // style: 'min-width: 200px; max-width: 500px; white-space: normal;',
      style: 'max-width: 500px;',
    }))

    const openLink = (url: string) => window.open(url, '_blank')
    return { columns, openLink }
  }
})
</script>