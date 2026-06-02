<script setup lang="ts">
import { Avatar, IconField, InputIcon, InputText, OverlayBadge, Menu, Button } from 'primevue'
import { storeToRefs } from 'pinia'
import { computed, useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useDriveStore } from '@/stores/driveStore'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useCollectionsStore } from '@/stores/collectionsStore'
const appStore = useAppStore()
const driveStore = useDriveStore()
const googleAuthStore = useGoogleAuthStore()
const notificationStore = useNotificationStore()
const collectionsStore = useCollectionsStore()
const { isMobile } = storeToRefs(appStore)
const { notifications } = storeToRefs(notificationStore)
const userMenu = useTemplateRef('user-menu')
const notificationMenu = useTemplateRef('notification-menu')

const storageUsage = computed(() => {
  if (!driveStore.storageQuota) return 'Loading...'
  const appUsageInGB = (driveStore.storageQuota.usageInDrive / (1024 ** 3)).toFixed(1)
  const freeInGB = ((driveStore.storageQuota.limit - driveStore.storageQuota.usage) / (1024 ** 3)).toFixed(1)
  const limitInGB = (driveStore.storageQuota.limit / (1024 ** 3)).toFixed(1)
  return `${appUsageInGB} GB (app) / ${freeInGB} GB (free) / ${limitInGB} GB (total)`
})

const notificationItems = computed(() => {
  if (notifications.value.length === 0) {
    return [
      {
        label: 'No new notifications',
      }
    ]
  }
  return notifications.value.map(notification => ({
    label: notification,
  }))
})

const handleReset = () => {
  googleAuthStore.authenticated = false
}
</script>
<template>
  <div class="flex items-center">
    <IconField
      v-if="!isMobile"
      class="mr-2"
    >
      <InputIcon class="pi pi-search" />
      <InputText v-model="appStore.currentFilter.Settings.Name" type="text" />
    </IconField>

    <Button
      class="w-12 shrink-0"
      severity="secondary"
      text
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="notificationMenu?.toggle($event)"
    >
      <template #icon>
        <OverlayBadge v-if="notifications.length > 0" :value="notifications.length" severity="danger">
          <i class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!" />
        </OverlayBadge>
        <i v-else class="pi pi-bell text-xl! text-(--p-button-text-secondary-color)!" />
      </template>
    </Button>    
    <Menu
      ref="notification-menu"
      :model="notificationItems"
      :popup="true"

    />

    <Button
      class="w-12 shrink-0"
      severity="secondary"
      text
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="userMenu?.toggle($event)"
    >
      <template #icon>
        <Avatar
          icon="pi pi-user"
          shape="circle"
        />
      </template>
    </Button>    
    <Menu
      ref="user-menu"
      :model="[
        {
          label: (collectionsStore?.collections?.Games?.length || 0) + ' games',
        },
        {
          label: storageUsage,
        },
        {
          label: 'Back to Home',
          command: handleReset
        }
      ]"
      :popup="true"
    />
  </div>
</template>
