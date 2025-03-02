<template>
  <div>
    <div v-for="field in fields" :key="field.key">
      <q-select
        v-if="field.options"
        v-model="filterSettings[field.key]"
        :options="field.options"
        option-label="title"
        :label="field.title"
        style="width: 200px"
      />
      <q-checkbox
        v-else-if="
          field.type === 'true' ||
          field.type === 'false' ||
          field.key === 'UseAndFilteringStyle'
        "
        v-model="filterSettings[field.key]"
        :label="field.title"
      />
      <q-input
        v-else-if="field.type === 'string'"
        v-model="filterSettings[field.key]"
        :label="field.title"
      />
      <div v-else>{{ field.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { filterToFieldMap } from 'src/services/filterService';
import {
  emptyFilter,
  filterOptionLists,
  FilterPresetSettings,
  filterTranslations,
  InstallSizeGroup,
  installSizeGroupTranslations,
  PastTimeSegment,
  pastTimeSegmentTranslations,
  PlaytimeCategory,
  playtimeCategoryTranslations,
  ScoreGroup,
  scoreGroupTranslations,
} from 'src/types/FilterTypes';
import { filter } from 'lodash';
import {
  CollectionTypes,
  useCollectionsStore,
} from 'src/stores/collectionsStore';
import { storeToRefs } from 'pinia';
import { Tag } from 'src/types/Game/GameFieldTypes';
import { useUIStore } from 'src/stores/uiStore';

export default defineComponent({
  name: 'FilterView',
  components: {},
  props: {},
  setup(props) {
    const collectionsStore = useCollectionsStore();
    const uiStore = useUIStore();
    const { collections } = storeToRefs(collectionsStore);
    const { currentFilter } = storeToRefs(uiStore);

    const filterSettings = ref<FilterPresetSettings>(
      currentFilter.value?.Settings || emptyFilter
    );

    // TODO move to service
    const fields = computed(() => {
      return Object.keys(filterToFieldMap).map((keyString: string) => {
        const key = keyString as keyof FilterPresetSettings;
        const style = filterToFieldMap[key].style;
        let options = null;
        if (style === 'id' || style === 'collection') {
          const listType = filterOptionLists[key];
          if (listType) {
            const collection = collections.value[listType] as Array<Tag>;
            if (collection) {
              options = collection.map((item: Tag) => {
                return {
                  title: item.Name,
                  value: item.Id,
                };
              });
            }
          }
        }
        if (style === 'score') {
          options = [];
          // TODO enums have extra blank options
          options = Object.keys(ScoreGroup).map(
            (keyOrString: string | ScoreGroup) => {
              const key = keyOrString as ScoreGroup;
              return {
                title: scoreGroupTranslations[key],
                value: key,
              };
            }
          );
        }
        if (style === 'size') {
          options = [];
          options = Object.keys(InstallSizeGroup).map(
            (keyOrString: string | InstallSizeGroup) => {
              const key = keyOrString as InstallSizeGroup;
              return {
                title: installSizeGroupTranslations[key],
                value: key,
              };
            }
          );
        }
        if (style === 'date') {
          options = [];
          options = Object.keys(PastTimeSegment).map(
            (keyOrString: string | PastTimeSegment) => {
              const key = keyOrString as PastTimeSegment;
              return {
                title: pastTimeSegmentTranslations[key],
                value: key,
              };
            }
          );
        }
        if (style === 'time') {
          options = [];
          options = Object.keys(PlaytimeCategory).map(
            (keyOrString: string | PlaytimeCategory) => {
              const key = keyOrString as PlaytimeCategory;
              return {
                title: playtimeCategoryTranslations[key],
                value: key,
              };
            }
          );
        }

        return {
          title: filterTranslations[key],
          type: filterToFieldMap[key].style,
          key: key,
          options: options,
        };
      });
    });

    // TODO watch filterSettings, on change update currentFilter and set Id to null
    // TODO add a Name field for filter, indicate when unsaved (no Id)

    watch(currentFilter, (filter) => {
      filterSettings.value = filter.Settings || emptyFilter;
    });

    return { fields, filterSettings };
  },
});
</script>
