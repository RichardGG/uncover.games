<template>
  <LibraryPanel/>
  <q-linear-progress v-if="loadingMessage" indeterminate size="25px" class="fixed-bottom z-top">
    <div class="absolute-full flex flex-center">
      <q-badge color="white" text-color="accent" :label="loadingMessage" />
    </div>
  </q-linear-progress>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useDriveStore } from 'src/stores/driveStore'
import LibraryPanel from 'src/components/LibraryPanel.vue'
import { storeToRefs } from 'pinia';
import { useUIStore } from 'src/stores/uiStore';
import { useGoogleAuthStore } from 'src/stores/googleAuthStore';
import { useCollectionsStore } from 'src/stores/collectionsStore';

export type LoadingStatus = {
  loading: boolean,
  progress: string,
}

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {
    const googleAuthStore = useGoogleAuthStore()
    const driveStore = useDriveStore()
    const uiStore = useUIStore()
    const collectionsStore = useCollectionsStore()

    onMounted(() => {
      const googleApiToken: string = googleAuthStore.getToken()
      uiStore.init()
      driveStore.init(googleApiToken)
      // Note: collectionsStore init uses driveStore
      collectionsStore.init(googleApiToken)
    })

    const { loadingMessage } = storeToRefs(collectionsStore)

    return {
      loadingMessage
    }
  }
})
</script>
