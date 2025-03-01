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
              <q-icon
                :name="
                  menuOpened.sort ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
              />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => (menuOpened.sort = true)"
              @before-hide="() => (menuOpened.sort = false)"
            >
              <q-list>
                <q-item clickable @click="() => (sortDesc = false)">
                  <q-item-section avatar>
                    <q-icon v-if="!sortDesc" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section> Ascending </q-item-section>
                </q-item>
                <q-item clickable @click="() => (sortDesc = true)">
                  <q-item-section avatar>
                    <q-icon v-if="sortDesc" color="primary" name="check" />
                  </q-item-section>
                  <q-item-section> Descending </q-item-section>
                </q-item>
                <q-item
                  v-for="option in sortOptions"
                  :key="option.label"
                  clickable
                  @click="() => (sort = option)"
                >
                  <q-item-section avatar>
                    <q-icon
                      v-if="option.value === sort?.value"
                      color="primary"
                      name="check"
                    />
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
              <q-icon
                :name="
                  menuOpened.filterPresets
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                "
              />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => (menuOpened.filterPresets = true)"
              @before-hide="() => (menuOpened.filterPresets = false)"
            >
              <q-list>
                <q-item
                  v-for="filter in collectionsStore.collections.FilterPresets"
                  :key="filter.Name + ''"
                  clickable
                  @click="() => (currentFilter = filter)"
                >
                  <q-item-section avatar>
                    <q-icon
                      v-if="currentFilter.Id === filter.Id"
                      color="primary"
                      name="check"
                    />
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
              <q-icon
                :name="
                  menuOpened.view ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
              />
            </q-item-section>
            <q-menu
              auto-close
              :fit="true"
              @before-show="() => (menuOpened.view = true)"
              @before-hide="() => (menuOpened.view = false)"
            >
              <q-list>
                <q-item clickable @click="() => (view = 'grid')">
                  <q-item-section avatar>
                    <q-icon
                      v-if="view === 'grid'"
                      color="primary"
                      name="check"
                    />
                  </q-item-section>
                  <q-item-section> Grid </q-item-section>
                </q-item>
                <q-item clickable @click="() => (view = 'table')">
                  <q-item-section avatar>
                    <q-icon
                      v-if="view === 'table'"
                      color="primary"
                      name="check"
                    />
                  </q-item-section>
                  <q-item-section> Table </q-item-section>
                </q-item>
                <q-item clickable @click="() => (view = 'filter')">
                  <q-item-section avatar>
                    <q-icon
                      v-if="view === 'filter'"
                      color="primary"
                      name="check"
                    />
                  </q-item-section>
                  <q-item-section> Filter Edit </q-item-section>
                </q-item>
                <q-item clickable @click="() => (view = 'storage')">
                  <q-item-section avatar>
                    <q-icon
                      v-if="view === 'storage'"
                      color="primary"
                      name="check"
                    />
                  </q-item-section>
                  <q-item-section> Data Storage </q-item-section>
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
import { defineComponent, ref } from 'vue';
import { useCollectionsStore } from 'src/stores/collectionsStore';
import { useUIStore } from 'src/stores/uiStore';
import { storeToRefs } from 'pinia';
import { map } from 'lodash';
import { sortTranslations, SortOrder } from 'src/types/SortTypes';

export default defineComponent({
  name: 'TopPanel',

  components: {},

  setup() {
    const filtersStore = useUIStore();
    const collectionsStore = useCollectionsStore();
    const { sort, sortDesc, search, view, currentFilter } =
      storeToRefs(filtersStore);
    const menuOpened = ref({
      sort: false,
      filterPresets: false,
      view: false,
    });

    const sortOptions = map(
      sortTranslations,
      (title: string, sortType: SortOrder) => ({
        label: title,
        value: sortType,
      })
    );

    return {
      sort,
      sortOptions,
      sortDesc,
      search,
      menuOpened,
      currentFilter,
      view,
      collectionsStore,
    };
  },
});
</script>
