<template>
  <LibraryPanel/>
  <q-linear-progress v-if="loadingMessage" indeterminate size="25px" class="fixed-bottom z-top">
    <div class="absolute-full flex flex-center">
      <q-badge color="white" text-color="accent" :label="loadingMessage" />
    </div>
  </q-linear-progress>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { CacheState, CacheStates, useDriveStore } from 'src/stores/driveStore'
import LibraryPanel from 'src/components/LibraryPanel.vue'
import { storeToRefs } from 'pinia';
import { CollectionTypes } from 'src/stores/collectionsStore';

export type LoadingStatus = {
  loading: boolean,
  progress: string,
}

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {
    const driveStore = useDriveStore()
    onMounted(() => {
      if (!driveStore.token) {
        driveStore.startAuth()
        return
      }
      driveStore.initGamesStore()
    })

    const { states } = storeToRefs(driveStore)
    const cachesLoading = computed(() => {
      const caches:Array<string> = []
      CollectionTypes.forEach((type:keyof CacheStates) => {
        const state:CacheState = states.value[type]
        if (state && state.state === 'loading-cache') {
          caches.push(type)
        }
      })
      return caches
    })
    const filesDownloading = computed(() => {
      const files:Array<string> = []
      CollectionTypes.forEach((type:keyof CacheStates) => {
        const state:CacheState = states.value[type]
        if (state && state.state === 'downloading') {
          files.push(type)
        }
      })
      return files
    })
    const loadingMessage = computed(() => {
      if (cachesLoading.value.length) {
        return 'Loading caches'
      }
      if (filesDownloading.value.length) {
        return 'Downloading files'
      }
      return null
    })

    return {
      loadingMessage, states
    }
  }
})
</script>
