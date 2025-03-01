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

export type LoadingStatus = {
  loading: boolean,
  progress: string,
}

export default defineComponent({
  name: 'IndexPage',
  components: { LibraryPanel },
  setup () {
    const driveStore = useDriveStore()
    const uiStore = useUIStore()

    onMounted(() => {
      uiStore.initStore()
      driveStore.initGamesStore()
    })

    const { loadingMessage } = storeToRefs(driveStore)

    return {
      loadingMessage
    }
  }
})
</script>
