<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import DesktopHeader from '@/components/toolbars/DesktopHeader.vue'
import DesktopSplitPanels from '@/components/panels/DesktopSplitPanels.vue'
import GamesView from '@/components/views/GamesView.vue'
import MobileBottomSheet from '@/components/panels/MobileBottomSheet.vue'
import MobileFooter from '@/components/toolbars/MobileFooter.vue'
import MobileHeader from '@/components/toolbars/MobileHeader.vue'
import { useAppStore } from '@/stores/appStore'
import { useCollectionsStore } from '@/stores/collectionsStore'
import { useDriveStore } from '@/stores/driveStore'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'

const appStore = useAppStore()
const { isMobile } = storeToRefs(appStore)

appStore.init()

window.addEventListener('popstate', () => {
  appStore.historyStack.pop()
  appStore.loadFromUrl()
})

appStore.loadFromUrl()

const googleAuthStore = useGoogleAuthStore()
const driveStore = useDriveStore()
// const uiStore = useUIStore();
const collectionsStore = useCollectionsStore()

const { files } = storeToRefs(driveStore)

onMounted(() => {
  if (window.location.pathname.startsWith('/website/callback')) {
    const url = new URL(
      window.location.hash.replace(/^#/g, '?'),
      import.meta.env.VITE_BASE_URL
    )
    const token = url.searchParams.get('access_token')
    // TODO consider remembering page on return
    window.history.replaceState({}, '', '/')

    if (token) {
      googleAuthStore.saveToken(token)
    }
  }

  watch(files, () => collectionsStore.init())
  driveStore.init()
})
</script>

<template>
  <template v-if="isMobile">
    <MobileBottomSheet />
    <MobileHeader />
    <GamesView />
    <MobileFooter />
  </template>
  <template v-else>
    <DesktopHeader />
    <DesktopSplitPanels />
  </template>
</template>
