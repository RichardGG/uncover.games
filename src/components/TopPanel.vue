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
            <q-item-section avatar>
              <q-icon color="primary" name="swap_vert" v-if="link.label === 'Sort'" />
              <q-icon color="primary" name="bookmark_border" v-if="link.label === 'Filter Presets'" />
              <q-icon color="primary" name="filter_alt" v-if="link.label === 'Filter'" />
              <q-icon color="primary" name="list" v-if="link.label === 'Group By'" />
              <q-icon color="primary" name="grid_view" v-if="link.label === 'View'" />
            </q-item-section>
            <q-item-section>
              {{ link.label }}
            </q-item-section>
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
                  <q-item-section>
                    {{ option.label }}
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
import { defineComponent, computed } from 'vue'
import { map } from 'lodash'
import { useCollectionsStore } from 'stores/collectionsStore'
import { useFiltersStore, Filter, Sort } from 'stores/filtersStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TopPanel',

  components: {
  },

  setup () {
    const filtersStore = useFiltersStore()
    const collectionsStore = useCollectionsStore()
    const { sort, sortDesc, search, view } = storeToRefs(filtersStore)

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

    // TODO maybe just define these in the template?
    const menuOptions = computed(() => [
      {
        label: 'Sort',
        options: [
          {
            label: sortDesc.value ? 'Desc' : 'Asc',
            click: () => sortDesc.value = !sortDesc.value,
          },
          ...map(sortOptions, (sortOption: Sort) => {
            return {
              label: sortOption.label,
              click: () => sort.value = sortOption
            }
          })
        ]
      },
      {
        label: 'Filter Presets',
        options: map(collectionsStore.FilterPresets, (filter: Filter) => {
          return {
            label: filter.Name,
            click: () => filtersStore.currentFilter = filter
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
        options: [
          {
            label: 'Grid',
            click: () => view.value = 'grid',
          },
          {
            label: 'Table',
            click: () => view.value = 'table',
          },
          {
            label: 'Data Storage',
            click: () => view.value = 'storage',
          }
        ]
      },
    ])

    return {
      sort, sortOptions, menuOptions, sortDesc, search
    }
  }
})
</script>
