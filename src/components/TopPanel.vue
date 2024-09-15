<template>
    <q-toolbar>

    <q-btn color="secondary" label="...">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item 
            clickable 
            v-for="(link, index) in menuOptions"
            :key="`menu-${index}`"
            v-close-popup="!link.options"
          >
            <q-item-section>{{ link.label }}</q-item-section>
            <q-item-section side v-if="link.options">
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>
            <q-menu v-if="link.options" auto-close anchor="top end" self="top start">
              <q-list>
                <q-item
                  v-for="option in link.options"
                  :key="option.label"
                  dense
                  clickable
                  @click="option.click"
                >
                  <q-item-section>{{ option.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-input v-model="search" standout dense class="q-mx-md" />

    <q-select
      v-model="sort"
      :options="sortOptions"
      filled
      style="min-width: 200px;"
    />

    <q-btn square padding="sm" class="q-mx-md" :icon="sortDesc ? 'arrow_downward' : 'arrow_upward'" @click="sortDesc = !sortDesc" />

  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { map } from 'lodash'
import { useGamesStore } from 'stores/gamesStore'
import { useFiltersStore, Filter } from 'stores/filtersStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TopPanel',

  components: {
  },

  setup () {
    const gamesStore = useGamesStore()
    const filtersStore = useFiltersStore()
    const { sort, sortDesc, search } = storeToRefs(gamesStore)

    // TODO maybe just define these in the template?
    const menuOptions = computed(() => [
      {
        label: 'Sort',
      },
      {
        label: 'Filter Presets',
          options: map(filtersStore.filterPresets, (filter: Filter) => {
            return {
              label: filter.Name,
              click: () => {
                filtersStore.currentFilter = filter
              }
            }
          })
      },
      {
        label: 'Filter',
      },
      {
        label: 'Group By',
      },
      {
        label: 'View',
      },
    ])

    const sortOptions = [
      {
        label: 'Name',
        value: 'Name',
      },
      {
        label: 'Release Date',
        value: 'ReleaseDate',
      },
      {
        label: 'Community Score',
        value: 'CommunityScore',
      },
      {
        label: 'Last Activity',
        value: 'LastActivity',
      },
    ]

    return {
      sort, sortOptions, menuOptions, sortDesc, search
    }
  }
})
</script>
