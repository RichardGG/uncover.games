import { defineStore } from 'pinia'
import { Game } from 'src/types/Game/Game';
import { Tag } from 'src/types/Game/GameFieldTypes';
import { FilterPreset } from 'src/types/FilterTypes';
import { FileMetadata, getDriveFile } from 'src/services/driveService'
import { LoadingStatus } from 'src/types/LoadingStatusTypes';
import { getCachedData, needsRefresh, setCachedData } from 'src/services/cacheService';
import { useDriveStore } from './driveStore';

export const CollectionTypes = [
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

export interface CollectionsData extends CollectionsMap<Array<FileMetadata> | Array<Tag> | Array<Game>> {
  'Games': Array<Game>,
  'AgeRatings': Array<Tag>,
  'Categories': Array<Tag>,
  'Companies': Array<Tag>,
  'CompletionStatuses': Array<Tag>,
  'Emulators': Array<Tag>,
  'Features': Array<Tag>,
  'FilterPresets': Array<FilterPreset>,
  // 'GameScanners': Array<Tag>,
  'Genres': Array<Tag>,
  // 'ImportExclusions': Array<Tag>,
  'Platforms': Array<Tag>,
  'Regions': Array<Tag>,
  'Series': Array<Tag>,
  'Sources': Array<Tag>,
  'Tags': Array<Tag>,
}

export type CollectionLoadingStatuses = {
  [key in CollectionType]: LoadingStatus;
}

export interface CollectionsState {
  collections: CollectionsData,
  statuses: CollectionLoadingStatuses,
}

export const useCollectionsStore = defineStore('collectionsStore', {
  state: (): CollectionsState => {
    const statuses:CollectionLoadingStatuses = {}
    CollectionTypes.forEach((type: CollectionType) => {
      statuses[type] = {
        state: 'pending',
      }
    })
    return { collections: {}, statuses } as CollectionsState
  },
  actions: {
    async init(googleApiToken: string) {
      const driveStore = useDriveStore()
      // For each collection, loads cache, checks if file metadata updated, redownloads
      for (const collectionType of CollectionTypes) {
        this.statuses[collectionType] = { state: 'pending' }

        const cachedResponse = await getCachedData('Collections', collectionType)
        if (cachedResponse) {
          this.collections[collectionType] = await cachedResponse.json()
        }

        const metadata = driveStore.getFileMetadata(`${collectionType}.json`)
        if (!metadata) {
          // Couldn't find file
          return
        }

        if (! needsRefresh(metadata.modifiedTime, cachedResponse)) {
          this.statuses[collectionType] = { state: 'done' }
          return
        }

        try {
          this.statuses[collectionType] = { state: 'downloading' }
          getDriveFile(googleApiToken, metadata.id).then(({ data }) => {
            setCachedData('Collections', collectionType, JSON.stringify(data))
            this.collections[collectionType] = data
            this.statuses[collectionType] = { state: 'done' }
          })
        } catch (e) {
          // TODO should we do something if the request fails
        }
      }
    }
  },
  getters: {
    cachesLoading(state) {
      const statuses: CollectionLoadingStatuses = state.statuses
      const caches:Array<string> = []
      CollectionTypes.forEach((type:keyof CollectionLoadingStatuses) => {
        const state:LoadingStatus = statuses[type]
        if (state && state.state === 'loading-cache') {
          caches.push(type)
        }
      })
      return caches
    },

    filesDownloading(state) {
      const statuses: CollectionLoadingStatuses = state.statuses
      const files: Array<string> = []
      CollectionTypes.forEach((type: keyof CollectionLoadingStatuses) => {
        const state:LoadingStatus = statuses[type]
        if (state && state.state === 'downloading') {
          files.push(type)
        }
      })
      return files
    },

    loadingMessage() {
      if (this.cachesLoading.length) {
        return 'Loading caches'
      }
      if (this.filesDownloading.length) {
        return 'Downloading files'
      }
      return null
    }
  },
})

