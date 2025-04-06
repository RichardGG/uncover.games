<script setup lang="ts">
import { Avatar, IconField, InputIcon, InputText, OverlayBadge } from 'primevue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
const { isMobile } = storeToRefs(appStore)
</script>
<template>
  <div class="flex items-center">
    <IconField
      v-if="!isMobile"
      class="mr-6"
    >
      <InputIcon class="pi pi-search" />
      <InputText type="text" />
    </IconField>
    <OverlayBadge class="mr-5">
      <i class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!" />
    </OverlayBadge>
    <Avatar
      icon="pi pi-user"
      class="mr-2"
      shape="circle"
    />
  </div>
</template>
