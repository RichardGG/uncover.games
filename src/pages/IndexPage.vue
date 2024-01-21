<template>
  <LibraryPanel />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { chain, find } from 'lodash'
import { useDriveStore } from 'src/stores/driveStore'
import { useGamesStore } from 'stores/gamesStore'
import { useFiltersStore } from 'stores/filtersStore'
import LibraryPanel from 'src/components/LibraryPanel.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {

    onMounted(() => {
      const gamesStore = useGamesStore()
      const filtersStore = useFiltersStore()
      const driveStore = useDriveStore()

      if (!driveStore.token) {
        driveStore.startAuth()
        return
      }

      // Load data from Google Drive (TODO fetch all pages etc)
      driveStore.listFiles().then((files) => {
        gamesStore.files = files
        driveStore.getFile(find(files, { name: 'Games.json' } ).id).then(({ data }) => gamesStore.games = data)
        driveStore.getFile(find(files, { name: 'AgeRatings.json' } ).id).then(({ data }) => gamesStore.ageRatings = data)
        driveStore.getFile(find(files, { name: 'Categories.json' } ).id).then(({ data }) => gamesStore.categories = data)
        driveStore.getFile(find(files, { name: 'Companies.json' } ).id).then(({ data }) => gamesStore.companies = data)
        driveStore.getFile(find(files, { name: 'CompletionStatuses.json' } ).id).then(({ data }) => gamesStore.completionStatuses = data)
        driveStore.getFile(find(files, { name: 'Emulators.json' } ).id).then(({ data }) => gamesStore.emulators = data)
        driveStore.getFile(find(files, { name: 'Features.json' } ).id).then(({ data }) => gamesStore.features = data)
        driveStore.getFile(find(files, { name: 'FilterPresets.json' } ).id).then(({ data }) => filtersStore.filterPresets = data)
        // driveStore.getFile(find(files, { name: 'GameScanners.json' } ).id).then(({ data }) => gamesStore.gameScanners = data)
        driveStore.getFile(find(files, { name: 'Genres.json' } ).id).then(({ data }) => gamesStore.genres = data)
        // driveStore.getFile(find(files, { name: 'ImportExclusions.json' } ).id).then(({ data }) => gamesStore.importExclusions = data)
        driveStore.getFile(find(files, { name: 'Platforms.json' } ).id).then(({ data }) => gamesStore.platforms = data)
        driveStore.getFile(find(files, { name: 'Regions.json' } ).id).then(({ data }) => gamesStore.regions = data)
        driveStore.getFile(find(files, { name: 'Series.json' } ).id).then(({ data }) => gamesStore.series = data)
        driveStore.getFile(find(files, { name: 'Sources.json' } ).id).then(({ data }) => gamesStore.sources = data)
        driveStore.getFile(find(files, { name: 'Tags.json' } ).id).then(({ data }) => gamesStore.tags = data)
      })
    })

    return { }
  }
})
</script>
