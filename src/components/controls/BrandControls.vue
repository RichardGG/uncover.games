<script setup lang="ts">
import { PhGameController } from '@phosphor-icons/vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>
<template>
  <div class="flex items-center ml-2">
    <PhGameController
      weight="fill"
      :size="36"
      class="text-primary"
    />
    <div class="mx-4">
      <!-- Uncover.games -->
      {{ appStore.historyStack }}
    </div>
  </div>
</template>
