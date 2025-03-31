<script setup lang="ts">
import { IconField, InputIcon, InputText, OverlayBadge, Avatar } from 'primevue'
</script>
<template>
  <div class="flex items-center">
    <IconField class="mr-6">
      <InputIcon class="pi pi-search" />
      <InputText type="text" />
    </IconField>
    <OverlayBadge class="mr-5">
      <i class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!" />
    </OverlayBadge>
    <Avatar icon="pi pi-user" class="mr-2" shape="circle" />
  </div>
</template>
