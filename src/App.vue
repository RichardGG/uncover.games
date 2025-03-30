<script setup lang="ts">
import MobileHeader from './components/toolbars/MobileHeader.vue'
import MobileFooter from './components/toolbars/MobileFooter.vue'
import DesktopHeader from './components/toolbars/DesktopHeader.vue'
import GamesView from './components/views/GamesView.vue'
import DesktopSplitPanels from './components/panels/DesktopSplitPanels.vue'

import { useAppStore } from './stores/appStore'
import { storeToRefs } from 'pinia'
import MobileBottomSheet from './components/panels/MobileBottomSheet.vue'

const appStore = useAppStore()
const { isMobile } = storeToRefs(appStore)

window.addEventListener('popstate', () => {
  appStore.loadFromUrl()
})

appStore.loadFromUrl()
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
