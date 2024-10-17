<template>
    <q-toolbar>

    <q-btn color="secondary" label="...">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="swap_vert" />
            </q-item-section>
            <q-item-section>Sort</q-item-section>
            <q-item-section side>
              <q-icon :name="menuOpened.sort ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => menuOpened.sort = true"
              @before-hide="() => menuOpened.sort = false"
            >
              <q-list>
                <q-item clickable @click=" () => sortDesc = false">
                  <q-item-section avatar>
                    <q-icon v-if="!sortDesc" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    Ascending
                  </q-item-section>
                </q-item>
                <q-item clickable @click=" () => sortDesc = true">
                  <q-item-section avatar>
                    <q-icon v-if="sortDesc" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    Descending
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="option in sortOptions"
                  :key="option.label"
                  clickable
                  @click=" () => sort = option"
                >
                  <q-item-section avatar>
                    <q-icon v-if="option.value === sort?.value" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    {{ option.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="bookmark_border" />
            </q-item-section>
            <q-item-section>Filter Presets</q-item-section>
            <q-item-section side>
              <q-icon :name="menuOpened.filterPresets ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => menuOpened.filterPresets = true"
              @before-hide="() => menuOpened.filterPresets = false"
            >
              <q-list>
                <q-item
                  v-for="filter in collectionsStore.FilterPresets"
                  :key="filter.Name + ''"
                  clickable
                  @click=" () => currentFilter = filter"
                >
                  <q-item-section avatar>
                    <q-icon v-if="currentFilter.Id === filter.Id" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    {{ filter.Name }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-item v-close-popup clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="filter_alt" />
            </q-item-section>
            <q-item-section>Filter</q-item-section>
          </q-item>
          <q-item v-close-popup clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="list" />
            </q-item-section>
            <q-item-section>Group By</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="grid_view" />
            </q-item-section>
            <q-item-section>View</q-item-section>
            <q-item-section side>
              <q-icon :name="menuOpened.view ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => menuOpened.view = true"
              @before-hide="() => menuOpened.view = false"
            >
              <q-list>
                <q-item clickable @click="() => view = 'grid'">
                  <q-item-section avatar>
                    <q-icon v-if="view === 'grid'" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    Grid
                  </q-item-section>
                </q-item>
                <q-item clickable @click="() => view = 'table'">
                  <q-item-section avatar>
                    <q-icon v-if="view === 'table'" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    Table
                  </q-item-section>
                </q-item>
                <q-item clickable @click="() => view = 'storage'">
                  <q-item-section avatar>
                    <q-icon v-if="view === 'storage'" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section>
                    Data Storage
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-input v-model="search" standout dense class="q-mx-md" />

  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCollectionsStore } from 'stores/collectionsStore'
import { useFiltersStore } from 'stores/filtersStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TopPanel',

  components: {
  },

  setup () {
    const filtersStore = useFiltersStore()
    const collectionsStore = useCollectionsStore()
    const { sort, sortDesc, search, view, currentFilter } = storeToRefs(filtersStore)
    const menuOpened = ref({
      sort: false,
      filterPresets: false,
      view: false,
    })

    const sortOptions = [
      {
        label: 'Age Rating',
        value: 'AgeRating',
      },
      {
        label: 'Category',
        value: 'Category',
      },
      {
        label: 'Community Score',
        value: 'CommunityScore',
      },
      {
        label: 'Completion Status',
        value: 'CompletionStatus',
      },
      {
        label: 'Critic Score',
        value: 'CriticScore',
      },
      {
        label: 'Date Added',
        value: 'DateAdded',
      },
      {
        label: 'Date Modified',
        value: 'DateModified',
      },
      {
        label: 'Developer',
        value: 'Developer',
      },
      {
        label: 'Favourite',
        value: 'Favourite',
      },
      {
        label: 'Feature',
        value: 'Feature',
      },
      {
        label: 'Genre',
        value: 'Genre',
      },
      {
        label: 'Hidden',
        value: 'Hidden',
      },
      {
        label: 'Image, ROM or ISO Path',
        value: 'Image, ROM or ISO Path',
      },
      {
        label: 'Install Size',
        value: 'InstallSize',
      },
      {
        label: 'Installation Folder',
        value: 'InstallationFolder',
      },
      {
        label: 'Installation Status',
        value: 'InstallationStatus',
      },
      {
        label: 'Last Played',
        value: 'LastPlayed',
      },
      {
        label: 'Library',
        value: 'Library',
      },
      {
        label: 'Name',
        value: 'Name',
      },
      {
        label: 'Platform',
        value: 'Platform',
      },
      {
        label: 'Play Count',
        value: 'PlayCount',
      },
      {
        label: 'Publisher',
        value: 'Publisher',
      },
      {
        label: 'Recent Activity',
        value: 'RecentActivity',
      },
      {
        label: 'Region',
        value: 'Region',
      },
      {
        label: 'Release Date',
        value: 'ReleaseDate',
      },
      {
        label: 'Series',
        value: 'Series',
      },
      {
        label: 'Source',
        value: 'Source',
      },
      {
        label: 'Tag',
        value: 'Tag',
      },
      {
        label: 'Time Played',
        value: 'TimePlayed',
      },
      {
        label: 'User Score',
        value: 'UserScore',
      },
      {
        label: 'Version',
        value: 'Version',
      },
    ]

    return {
      sort, sortOptions, sortDesc, search, menuOpened, currentFilter, view, collectionsStore
    }
  }
})
</script>
