<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { DataTable, Column } from 'primevue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/appStore.ts'
import { useCollectionsStore } from '@/stores/collectionsStore.ts'
import { formatGameField } from '@/services/formatService'

const appStore = useAppStore()
const collectionsStore = useCollectionsStore()
const { isMobile, gameOpen, games } = storeToRefs(appStore)

type Game = {
  code: string
  name: string
  category: string
  quantity: number
}

const selectedGame: Ref<Game | null> = ref(null)

const selectGame = () => {
  if (gameOpen.value !== null) {
    selectedGame.value = gameOpen.value
  } else {
    selectedGame.value = null
  }
}

watch(gameOpen, () => selectGame(), { immediate: true })

watch(selectedGame, (selected: Game | null) => {
  appStore.setGame(selected)
})
</script>

<template>
  <div class="w-full h-full relative">
    <DataTable
      v-model:selection="selectedGame"
      selection-mode="single"
      :value="games"
      scrollable
      scroll-height="flex"
      :virtual-scroller-options="{
        itemSize: 44,
        numToleratedItems: 30,
        showLoader: true,
        showSpacer: false,
      }"
      class="absolute! w-full! text-nowrap!"
      :table-class="isMobile ? 'pb-[40vh]' : ''"
    >
      <Column
        field="Name"
        header="Name"
        frozen
        class="border-r!"
        :class="isMobile ? 'min-w-[45vw]' : 'min-w-80'"
      ></Column>
      <Column field="Platforms" header="Platform"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Platforms')
        }}</template></Column
      >
      <Column field="Developers" header="Developer"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Developers')
        }}</template></Column
      >
      <Column field="Publishers" header="Publisher"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Publishers')
        }}</template></Column
      >
      <Column field="ReleaseDate" header="Release Date"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'ReleaseDate')
        }}</template></Column
      >
      <Column field="Genres" header="Genre"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Genres')
        }}</template></Column
      >
      <Column field="Categories" header="Category"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Categories')
        }}</template></Column
      >
      <Column field="Features" header="Features"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Features')
        }}</template></Column
      >
      <Column field="Tags" header="Tag"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Tags')
        }}</template></Column
      >
      <Column field="IsInstalled" header="Installed"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'IsInstalled')
        }}</template></Column
      >
      <Column field="InstallDirectory" header="Installation Folder"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'InstallDirectory')
        }}</template></Column
      >
      <Column field="InstallSize" header="Install Size"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'InstallSize')
        }}</template></Column
      >
      <Column field="Roms" header="Image, ROM, or ISO Path"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Roms')
        }}</template></Column
      >
      <Column field="LastActivity" header="Last Played"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'LastActivity')
        }}</template></Column
      >
      <Column field="RecentActivity" header="Recent Activity"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'RecentActivity')
        }}</template></Column
      >
      <Column field="Playtime" header="Time Played"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Playtime')
        }}</template></Column
      >
      <Column field="PlayCount" header="Play Count"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'PlayCount')
        }}</template></Column
      >
      <Column field="CompletionStatus" header="Completion Status"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'CompletionStatus')
        }}</template></Column
      >
      <Column field="Series" header="Series"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Series')
        }}</template></Column
      >
      <Column field="Version" header="Version"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Version')
        }}</template></Column
      >
      <Column field="AgeRatings" header="Age Rating"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'AgeRatings')
        }}</template></Column
      >
      <Column field="Regions" header="Region"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Regions')
        }}</template></Column
      >
      <Column field="Source" header="Source"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Source')
        }}</template></Column
      >
      <Column field="Added" header="Added"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Added')
        }}</template></Column
      >
      <Column field="Modified" header="Modified"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'Modified')
        }}</template></Column
      >
      <Column field="UserScore" header="User Score"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'UserScore')
        }}</template></Column
      >
      <Column field="CriticScore" header="Critic Score"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'CriticScore')
        }}</template></Column
      >
      <Column field="CommunityScore" header="Community Score"
        ><template #body="slotProps">{{
          formatGameField(slotProps.data, 'CommunityScore')
        }}</template></Column
      >
    </DataTable>
  </div>
</template>
