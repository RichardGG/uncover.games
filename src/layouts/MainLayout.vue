<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <TopPanel />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopPanel from 'src/components/TopPanel.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { TopPanel },

  setup() {
    return {};
  },
});
</script>
