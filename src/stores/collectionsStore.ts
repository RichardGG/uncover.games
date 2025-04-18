import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import type { Game } from '@/types/Game/Game'
import type { Tag } from '@/types/Game/GameFieldTypes'
import type { FilterPreset } from '@/types/FilterTypes'
import { type FileMetadata } from '@/services/driveService'
import type { LoadingStatus } from '@/types/LoadingStatusTypes'
import {
  getCachedData,
  needsRefresh,
  setCachedData,
} from '@/services/cacheService'
import { useDriveStore } from '@/stores/driveStore'

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

export type CollectionType = (typeof CollectionTypes)[number]

export type CollectionsMap<Types> = {
  [key in CollectionType]: Types
}

export interface CollectionsData
  extends CollectionsMap<Array<FileMetadata> | Array<Tag> | Array<Game> | Array<FilterPreset>> {
  Games: Array<Game>
  AgeRatings: Array<Tag>
  Categories: Array<Tag>
  Companies: Array<Tag>
  CompletionStatuses: Array<Tag>
  Emulators: Array<Tag>
  Features: Array<Tag>
  FilterPresets: Array<FilterPreset>
  // 'GameScanners': Array<Tag>,
  Genres: Array<Tag>
  // 'ImportExclusions': Array<Tag>,
  Platforms: Array<Tag>
  Regions: Array<Tag>
  Series: Array<Tag>
  Sources: Array<Tag>
  Tags: Array<Tag>
}

export type CollectionLoadingStatuses = {
  [key in CollectionType]: LoadingStatus
}

export interface CollectionsState {
  collections: CollectionsData
  statuses: CollectionLoadingStatuses
}

export const useCollectionsStore = defineStore('collectionsStore', {
  state: (): CollectionsState => {
    const statuses: CollectionLoadingStatuses = {}
    CollectionTypes.forEach((type: CollectionType) => {
      statuses[type] = {
        state: 'pending',
      }
    })
    return { collections: {
      Games: [],
      AgeRatings: [],
      Categories: [],
      Companies: [],
      CompletionStatuses: [],
      Emulators: [],
      Features: [],
      FilterPresets: [],
      Genres: [],
      Platforms: [],
      Regions: [],
      Series: [],
      Sources: [],
      Tags: [],
    }, statuses } as CollectionsState
  },
  actions: {
    async init() {
      const driveStore = useDriveStore()
      // For each collection, loads cache, checks if file metadata updated, redownloads
      for (const collectionType of CollectionTypes) {
        this.statuses[collectionType] = { state: 'pending' }

        const cachedResponse = await getCachedData(
          'Collections',
          collectionType
        )
        if (cachedResponse) {
          this.collections[collectionType] = await cachedResponse.json()
        }

        const metadata = driveStore.getFileMetadata(`${collectionType}.json`)
        if (!metadata) {
          console.error(`No file in Google Drive for ${collectionType}`)
          // Couldn't find file
          continue
        }

        if (!needsRefresh(metadata.modifiedTime, cachedResponse)) {
          this.statuses[collectionType] = { state: 'done' }
          continue
        }

        try {
          this.statuses[collectionType] = { state: 'downloading' }
          driveStore.getJson(metadata.id).then((response: void | AxiosResponse<any, any>) => { // eslint-disable-line
            if (! response) {
              // TODO handle
              console.error(
                `Failed to download ${collectionType} file from Google Drive`
              )
              return
            }
            const { data } = response;
            setCachedData('Collections', collectionType, JSON.stringify(data))
            this.collections[collectionType] = data
            this.statuses[collectionType] = { state: 'done' }
          })
        } catch {
          // TODO should we do something if the request fails
          console.error(
            `Failed to download ${collectionType} file from Google Drive`
          )
        }
      }
    },
  },
  getters: {
    cachesLoading(state) {
      const statuses: CollectionLoadingStatuses = state.statuses
      const caches: Array<string> = []
      CollectionTypes.forEach((type: keyof CollectionLoadingStatuses) => {
        const state: LoadingStatus = statuses[type]
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
        const state: LoadingStatus = statuses[type]
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
    },
  },
})
