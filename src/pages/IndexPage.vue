<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: calc(100vh - 100px);" v-if="loading">
    <div style="font-size: 26px;">
      Loading...
    </div>
    <table>
      <tr v-for="(status, type) in loadingStatus" :key="type">
        <td>{{ type }}</td>
        <td>{{ status.loading ? status.progress : '✅' }}</td>
      </tr>
    </table>
  </div>
  <LibraryPanel v-else/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { some, find } from 'lodash'
import { filesize } from 'filesize'
import { useDriveStore, File } from 'src/stores/driveStore'
import { useGamesStore } from 'stores/gamesStore'
import { useFiltersStore } from 'stores/filtersStore'
import LibraryPanel from 'src/components/LibraryPanel.vue'

export type LoadingStatus = {
  loading: boolean,
  progress: string,
}

export type LoadingStatuses = {
  Files: LoadingStatus,
  Games: LoadingStatus,
  AgeRatings: LoadingStatus,
  Categories: LoadingStatus,
  Companies: LoadingStatus,
  CompletionStatuses: LoadingStatus,
  Emulators: LoadingStatus,
  Features: LoadingStatus,
  FilterPresets: LoadingStatus,
  // GameScanners: LoadingStatus,
  Genres: LoadingStatus,
  // ImportExclusions: LoadingStatus,
  Platforms: LoadingStatus,
  Regions: LoadingStatus,
  Series: LoadingStatus,
  Sources: LoadingStatus,
  Tags: LoadingStatus,
}

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {
    const loading = ref(true)
    const loadingStatus = ref(<LoadingStatuses>{
      Files: { loading: true, progress: 'waiting' },
      Games: { loading: true, progress: '' },
      AgeRatings: { loading: true, progress: '' },
      Categories: { loading: true, progress: '' },
      Companies: { loading: true, progress: '' },
      CompletionStatuses: { loading: true, progress: '' },
      Emulators: { loading: true, progress: '' },
      Features: { loading: true, progress: '' },
      FilterPresets: { loading: true, progress: '' },
      // GameScanners: { loading: true, progress: '' },
      Genres: { loading: true, progress: '' },
      // ImportExclusions: { loading: true, progress: '' },
      Platforms: { loading: true, progress: '' },
      Regions: { loading: true, progress: '' },
      Series: { loading: true, progress: '' },
      Sources: { loading: true, progress: '' },
      Tags: { loading: true, progress: '' },
    })

    watch(loadingStatus, (newStatus) => {
      loading.value = some(newStatus, (status) => status.loading)
    }, { deep: true })

    onMounted(() => {
      const gamesStore = useGamesStore()
      const filtersStore = useFiltersStore()
      const driveStore = useDriveStore()

      if (!driveStore.token) {
        driveStore.startAuth()
        return
      }

      const getFile = <K extends keyof LoadingStatuses>(files:Array<File>, fileName:K):any => {
        const fileId = find(files, { name: `${fileName}.json` } )?.id
        loadingStatus.value[fileName].progress = 'waiting'
        return driveStore.getFile(fileId, { 
          onDownloadProgress: (progress:ProgressEvent) => {
            loadingStatus.value[fileName].progress = filesize(progress.loaded)
          }
        }).then(({ data }) => {loadingStatus.value[fileName].loading = false; gamesStore.games = data})
      }

      // Load data from Google Drive (TODO fetch all pages etc)
      driveStore.listFiles((progress:number) => loadingStatus.value.Files.progress = filesize(progress)).then((files) => {
        loadingStatus.value.Files.loading = false
        gamesStore.files = files
        getFile(files, 'Games').then(({ data }) => gamesStore.games = data)
        getFile(files, 'AgeRatings').then(({ data }) => gamesStore.ageRatings = data)
        getFile(files, 'Categories').then(({ data }) => gamesStore.categories = data)
        getFile(files, 'Companies').then(({ data }) => gamesStore.companies = data)
        getFile(files, 'CompletionStatuses').then(({ data }) => gamesStore.completionStatuses = data)
        getFile(files, 'Emulators').then(({ data }) => gamesStore.emulators = data)
        getFile(files, 'Features').then(({ data }) => gamesStore.features = data)
        getFile(files, 'FilterPresets').then(({ data }) => filtersStore.filterPresets = data)
        // getFile(files, 'GameScanners').then(({ data }) => gamesStore.gameScanners = data)
        getFile(files, 'Genres').then(({ data }) => gamesStore.genres = data)
        // getFile(files, 'ImportExclusions').then(({ data }) => gamesStore.importExclusions = data)
        getFile(files, 'Platforms').then(({ data }) => gamesStore.platforms = data)
        getFile(files, 'Regions').then(({ data }) => gamesStore.regions = data)
        getFile(files, 'Series').then(({ data }) => gamesStore.series = data)
        getFile(files, 'Sources').then(({ data }) => gamesStore.sources = data)
        getFile(files, 'Tags').then(({ data }) => gamesStore.tags = data)
      }, { onDownloadProgress: (progress:ProgressEvent) => progress.loaded / progress.total })

    })

    return { loading, loadingStatus }
  }
})
</script>
