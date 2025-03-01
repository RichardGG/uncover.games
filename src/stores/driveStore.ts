import { defineStore } from 'pinia'
import axios, { ResponseType } from 'axios'
import { find } from 'lodash'
import { useCollectionsStore, CollectionType, CollectionTypes } from 'stores/collectionsStore'

export type DriveState = {
  token: string|null,
  states: CacheStates,
}

export type CacheState = {
  state: 'pending'|'loading-cache'|'downloading'|'done'
}

export type CacheStates = {
  [key in CollectionType]: CacheState;
}

export type File = {
  size: string,
  id: string,
  name: string,
  createdTime: string,
  modifiedTime: string,
}

export type ListResponse = {
  nextPageToken: string,
  files: Array<File>,
}

export type YouTubeIdData = {
  kind: string,
  videoId: string,
}

export type YouTubeItemData = {
  etag: string,
  id: YouTubeIdData,
  kind: string,
}

export type YouTubeSearchResponse = {
  items: Array<YouTubeItemData>,
}

export interface ProgressUpdate { (progress: number): void }

const DRIVE_BASE_URL = 'https://www.googleapis.com/drive/v3/files'

export const useDriveStore = defineStore('drive', {
  state: () => {
    const states:CacheStates = {}
    CollectionTypes.forEach((type: CollectionType) => {
      states[type] = {
        state: 'pending',
      }
    })
    return {
      token: null,
      states: states,
    } as DriveState
  },

  actions: {
    startAuth() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth'
        + '?client_id=' + process.env.DRIVE_CLIENT_ID
        + '&redirect_uri=' + process.env.BASE_URL + '/website/callback'
        + '&response_type=token'
        + '&scope=https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/youtube.readonly'

        window.location.href = url
    },

    saveToken(token: string) {
      this.token = token
    },

    async getCachedData(cacheName: string, cacheKey: string): Promise<false | Response> {
      const cacheStorage = await caches.open(cacheName);
      const cachedResponse = await cacheStorage.match(cacheKey);

      if (!cachedResponse || !cachedResponse.ok) {
        return false;
      }

      return await cachedResponse;
    },

    async setCachedData(cacheName: string, cacheKey: string, data: string) {
      const cacheStorage = await caches.open(cacheName)
      cacheStorage.put(cacheKey, new Response(data, { headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': `${Date.now()}`,
      } }))
    },

    getFile(fileId: string, responseType: ResponseType|undefined = undefined) {

      return axios.get(`${DRIVE_BASE_URL}/${fileId}`, {
          params: {
            alt: 'media'
          },
          headers: {
            Authorization: 'Bearer ' + this.token
          },
          responseType: responseType,
        })
    },

    getCollectionFileMetadata(collectionType:CollectionType): File|undefined {
      const collectionsStore = useCollectionsStore()
      return find(collectionsStore.Files, { name: `${collectionType}.json` } )
    },

    fetchFiles(files:Array<File> = [], pageToken:string|null = null): Promise<Array<File>> {
      // Loads all pages of files
      return axios.get(DRIVE_BASE_URL, {
        params: {
          spaces: 'appDataFolder',
          fields: 'files(id,name,size,createdTime,modifiedTime),nextPageToken',
          pageSize: 1000,
          pageToken: pageToken,
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        },
      })
      .then(async ({ data }) => {
        // Add files to files array
        const response:ListResponse = data
        files = files.concat(response.files)

        // Fetch the next page if available
        if (response.nextPageToken) {
          return await this.fetchFiles(files, response.nextPageToken)
        }

        // Final page, return the entire list of files
        return files
      })
    },

    needsRefresh(metadata: File, cachedResponse: Response|false): boolean {
      if (!cachedResponse) {
        return true
      }
      return Date.parse(metadata.modifiedTime) > parseInt(cachedResponse.headers.get('X-Timestamp') ?? '0')
    },

    async initImage(fileName: string): Promise<false|string> {
      const collectionsStore = useCollectionsStore()
      const file = find(collectionsStore.Files, { name: fileName?.replace('\\', '_') } )

      if (!file) {
        return new Promise((resolve) => resolve(false))
      }

      const cachedResponse = await this.getCachedData('Images', fileName)

      // Return the cached data if it's still valid
      if (cachedResponse && !this.needsRefresh(file, cachedResponse)) {
        return new Promise(async (resolve) => resolve(await cachedResponse.text()))
      }

      try {
        const response = await this.getFile(file.id, 'arraybuffer')
        const dataUri = 'data:image/jpeg;base64, '
          + btoa(new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte), '')
          )
        this.setCachedData('Images', fileName, dataUri)
        return new Promise((resolve) => resolve(dataUri))
      } catch(e) {
        return new Promise((resolve) => resolve(false))
      }
    },

    async initCollections(): Promise<void> {
      const collectionsStore = useCollectionsStore()
      for (const collectionType of CollectionTypes) {
        if (collectionType === 'Files') {
          // Files is handled in initFiles
          continue
        }
        this.states[collectionType].state = 'loading-cache'
        const cachedResponse = await this.getCachedData('Collections', collectionType)
        if (cachedResponse) {
          // Store the cached collection
          // TODO I think this doesn't work
          collectionsStore[collectionType] = await cachedResponse.json()
        }

        const metadata = this.getCollectionFileMetadata(collectionType)
        if (!metadata) {
          // Couldn't find file
          return
        }

        // Check if the cached data is old
        if (this.needsRefresh(metadata, cachedResponse)) {
          try {
            this.states[collectionType].state = 'downloading'
            this.getFile(metadata.id).then(({ data }) => {
              this.setCachedData('Collections', collectionType, JSON.stringify(data))
              collectionsStore[collectionType] = data
              this.states[collectionType].state = 'done'
            })
          } catch (e) {
            // TODO should we do something if the request fails
          }
        } else {
          this.states[collectionType].state = 'done'
        }
      }
    },

    async initFiles() {
      const collectionsStore = useCollectionsStore()
      return new Promise(async () => {
        this.states.Files.state = 'loading-cache'
        const cachedResponse = await this.getCachedData('files', 'allFiles')
        if (cachedResponse) {
          // Store the cached files and check collections
          collectionsStore.Files = await cachedResponse.json()
          this.initCollections()
        }

        // Store the fetched files and check collections
        this.states.Files.state = 'downloading'
        const files = await this.fetchFiles()
        collectionsStore.Files = files
        this.initCollections()

        this.states.Files.state = 'done'

        // Cache the fetched files
        this.setCachedData('files', 'allFiles', JSON.stringify(files))
      })
    },

    async getYouTubeVideoId(searchTerm:string)
    {
      // https://developers.google.com/youtube/v3/docs/search/list
      return axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: searchTerm,
          type: 'video',
          videoEmbeddable: true,
          part: 'id'
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        },
      }).then(({ data }) => {
        const response:YouTubeSearchResponse = data
        console.log('id', response.items[0]?.id?.videoId, response.items, response)
        return response.items[0]?.id?.videoId
    })
    },

    initGamesStore() {
      if (!this.token) {
        this.startAuth()
        return
      }
      this.initFiles()
    },
  },
  getters: {
    cachesLoading(state) {
      const states:CacheStates = state.states
      const caches:Array<string> = []
      CollectionTypes.forEach((type:keyof CacheStates) => {
        const state:CacheState = states[type]
        if (state && state.state === 'loading-cache') {
          caches.push(type)
        }
      })
      return caches
    },

    filesDownloading(state) {
      const states:CacheStates = state.states
      const files:Array<string> = []
      CollectionTypes.forEach((type:keyof CacheStates) => {
        const state:CacheState = states[type]
        if (state && state.state === 'downloading') {
          files.push(type)
        }
      })
      return files
    },

    loadingMessage(state) {
      if (this.cachesLoading.length) {
        return 'Loading caches'
      }
      if (this.filesDownloading.length) {
        return 'Downloading files'
      }
      return null
    }
  }
})
