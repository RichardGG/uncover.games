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
import { computed, defineComponent, ref } from 'vue';
import { filterToFieldMap } from 'src/services/filterService';
import {
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

export default defineComponent({
  name: 'FilterView',
  components: {},
  props: {},
  setup(props) {
    const collectionsStore = useCollectionsStore();
    const { collections } = storeToRefs(collectionsStore);

    // TODO load in current settings
    const filterSettings = ref<FilterPresetSettings>({
      UseAndFilteringStyle: false,
      IsInstalled: false,
      IsUnInstalled: false,
      Hidden: false,
      Favorite: false,
      Name: null,
      Version: null,
      ReleaseYear: null,
      Genre: null,
      Platform: null,
      Publisher: null,
      Developer: null,
      Category: null,
      Tag: null,
      Series: null,
      Region: null,
      Source: null,
      AgeRating: null,
      Library: null,
      Feature: null,
      UserScore: null,
      CriticScore: null,
      CommunityScore: null,
      LastActivity: null,
      RecentActivity: null,
      Added: null,
      Modified: null,
      PlayTime: null,
      InstallSize: null,
      CompletionStatuses: null,
    });

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

    return { fields, filterSettings };
  },
});
</script>
