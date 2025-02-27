import { defineStore } from 'pinia'
import type { File } from './driveStore'
import { Game } from 'src/types/Game/Game';
import { Tag } from 'src/types/Game/GameFieldTypes';
import { Filter } from './uiStore';

export const CollectionTypes = [
  'Files',
  'Games',
  'AgeRatings',
  'Categories',
  'Companies',
  'CompletionStatuses',
  'Emulators',
  'Features',
  'FilterPresets',
  // 'GameScanners',
  'Genres',
  // 'ImportExclusions',
  'Platforms',
  'Regions',
  'Series',
  'Sources',
  'Tags',
]

export type CollectionType = typeof CollectionTypes[number]

export type CollectionsMap<Types> = {
  [key in CollectionType]: Types;
}

export interface CollectionsState extends CollectionsMap<Array<File> | Array<Tag> | Array<Game>> {
  'Files': Array<File>,
  'Games': Array<Game>,
  'AgeRatings': Array<Tag>,
  'Categories': Array<Tag>,
  'Companies': Array<Tag>,
  'CompletionStatuses': Array<Tag>,
  'Emulators': Array<Tag>,
  'Features': Array<Tag>,
  'FilterPresets': Array<Filter>,
  // 'GameScanners': Array<Tag>,
  'Genres': Array<Tag>,
  // 'ImportExclusions': Array<Tag>,
  'Platforms': Array<Tag>,
  'Regions': Array<Tag>,
  'Series': Array<Tag>,
  'Sources': Array<Tag>,
  'Tags': Array<Tag>,
}

export const useCollectionsStore = defineStore('collectionsStore', {
  state: (): CollectionsState => {
    return {} as CollectionsState
  },
})
