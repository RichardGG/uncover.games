<script setup lang="ts">
import MobileHeader from './components/toolbars/MobileHeader.vue';
import MobileFooter from './components/toolbars/MobileFooter.vue';
import DesktopHeader from './components/toolbars/DesktopHeader.vue';
import GamesView from './components/views/GamesView.vue';
import DesktopSplitPanels from './components/panels/DesktopSplitPanels.vue';

import { useAppStore } from './stores/appStore';
import { storeToRefs } from 'pinia';
import MobileBottomSheet from './components/panels/MobileBottomSheet.vue';
import { useGoogleAuthStore } from './stores/googleAuthStore';
import { useDriveStore } from './stores/driveStore';
import { useCollectionsStore } from './stores/collectionsStore';
import { onMounted, watch } from 'vue';

const appStore = useAppStore();
const { isMobile } = storeToRefs(appStore);

window.addEventListener('popstate', () => {
  appStore.loadFromUrl();
});

appStore.loadFromUrl();

const googleAuthStore = useGoogleAuthStore();
const driveStore = useDriveStore();
// const uiStore = useUIStore();
const collectionsStore = useCollectionsStore();

const { files } = storeToRefs(driveStore);

onMounted(() => {
  if (window.location.pathname.startsWith('/website/callback')) {
    const url = new URL(
      window.location.hash.replace(/^#/g, '?'),
      import.meta.env.VITE_BASE_URL
    );
    const token = url.searchParams.get('access_token');
    // TODO consider remembering page on return
    window.history.replaceState({}, '', '/');

    if (token) {
      googleAuthStore.saveToken(token);
    }
  }

  const googleApiToken: string = googleAuthStore.getToken();
  watch(files, () => collectionsStore.init(googleApiToken));
  driveStore.init(googleApiToken);
});
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
