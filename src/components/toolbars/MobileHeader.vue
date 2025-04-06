<script setup lang="ts">
import { Avatar, OverlayBadge } from 'primevue'
import UserControls from '../controls/UserControls.vue'
import BrandControls from '../controls/BrandControls.vue'
</script>

<template>
  <div
    class="flex justify-between items-center h-16 border-b-1 border-(--p-content-border-color)"
  >
    <BrandControls class="ml-4" />
    <UserControls />
    <!-- <div class="flex items-center ml-4">
      <i class="pi pi-discord mx-2 text-3xl! text-primary"></i>
      <div class="mx-4">Uncover.Games</div>
    </div>
    <div class="flex items-center mr-2">
      <OverlayBadge class="mr-5">
        <i
          class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!"
        />
      </OverlayBadge>
      <Avatar icon="pi pi-user" class="mr-2" shape="circle" />
    </div> -->
  </div>
</template>
