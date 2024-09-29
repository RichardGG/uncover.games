<template>
  <!-- <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: calc(100vh - 100px);" v-if="loading">
    <div style="font-size: 26px;">
      Loading...
    </div>
    <table style="margin-top: 20px;">
      <tr v-for="(status, type) in loadingStatus" :key="type">
        <td>{{ type }}</td>
        <td style="min-width: 100px; text-align: right;">{{ status.loading ? status.progress : '✅' }}</td>
      </tr>
    </table>
  </div> -->
  <LibraryPanel/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useDriveStore } from 'src/stores/driveStore'
import LibraryPanel from 'src/components/LibraryPanel.vue'

export type LoadingStatus = {
  loading: boolean,
  progress: string,
}

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {
    onMounted(() => {
      const driveStore = useDriveStore()

      if (!driveStore.token) {
        driveStore.startAuth()
        return
      }

      

      // Let's plan how this caching is going to work:

      // Things we need to do:
      // Load/Cache File List
      // Load/Cache Files

      // Cache process:
      // - Check if cached
      //  - Load from cache
      //   - Save to gameStore
      //   - Fetch (see below)
      //  - Fetch
      //   - Store in cache
      //   - Save to gameStore

      // driveStore handles cache
      // saving to gameStore handled here 
      
      // Create file map
      // On files changed, update the file map, trigger update of any changed ids?
      // 

      driveStore.initGamesStore()

    })

    // return { loading, loadingStatus }
  }
})
</script>
