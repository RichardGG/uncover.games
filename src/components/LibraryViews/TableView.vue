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
    <template #body-cell-Debug="props">
      <q-td>
        {{ props.row }}
      </q-td>
    </template>
    <template #body-cell-Cover="props">
      <q-td>
        <Cover :width="30" :file-name="props.row.CoverImage" />
      </q-td>
    </template>
    <template #body-cell="props">
      <q-td :props="props">
        {{ props.value }}
        <q-tooltip v-if="props.value" anchor="bottom left" self="top left" :offset="[-10, -10]">
          {{ props.value }}
        </q-tooltip>
      </q-td>
    </template>
    <template #body-cell-Actions="props">
      <q-td>
        <q-btn color="secondary" label="...">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item 
                v-for="(link, index) in props.row.Links" 
                :key="`link-${props.row.Id}-${index}`"
                clickable
                @click="openLink(link.Url)"
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
import Cover from 'src/components/Cover.vue'
import { QTableColumn } from 'quasar';
import { Game } from 'src/types/Game/Game';
import { GameField } from 'src/types/Game/GameField';
import { formatGameField } from 'src/types/Game/GameFieldFormats';

export default defineComponent({
  name: 'TableView',
  components: { Cover },
  props: {
    games: Array<Game>
  },
  setup () {
    
    let columnMap: Partial<{[K in GameField]: string}> = {
      'Name': 'Name',
      'Platforms': 'Platform',
      // 'Library': 'Library', IDK
      'Developers': 'Developer',
      'Publishers': 'Publisher',
      'ReleaseDate': 'Release Date',
      'Genres': 'Genre',
      'Categories': 'Category',
      'Features': 'Features',
      'Tags': 'Tag',
      'IsInstalled': 'Installed',
      'InstallDirectory': 'Installation Folder',
      'InstallSize': 'Install Size',
      'Roms': 'Image, ROM, or ISO Path',
      'LastActivity': 'Last Played',
      'RecentActivity': 'Recent Activity',
      'Playtime': 'Time Played',
      'PlayCount': 'Play Count',
      'CompletionStatus': 'Completion Status',
      'Series': 'Series',
      'Version': 'Version',
      'AgeRatings': 'Age Rating',
      'Regions': 'Region',
      'Source': 'Source',
      'Added': 'Added',
      'Modified': 'Modified',
      'UserScore': 'User Score',
      'CriticScore': 'Critic Score',
      'CommunityScore': 'Community Score',
    }

    // TODO custom columns, custom order
    let columns: QTableColumn[] = [
      {
        label: 'Actions',
        name: 'Actions',
        field: 'Actions',
      },
      {
        label: 'Cover',
        name: 'Cover',
        field: 'Cover',
      },
    ]

    for (const key in columnMap) {
      const field = key as GameField;
      columns.push({
        label: columnMap[field] || '',
        name: columnMap[field] || '',
        field: (game: Game) => formatGameField(game, field),
      })
    }

    columns = columns.map((item) => ({ 
      ...item,
      align: 'left',
      // style: 'min-width: 200px; max-width: 500px; white-space: normal;',
      style: 'max-width: 500px; overflow: hidden;',
      classes: 'game-table-cell',
    }))

    const openLink = (url: string) => window.open(url, '_blank')
    return { columns, openLink }
  }
})
</script>

<style>
  .game-table-cell:hover {

  }
</style>