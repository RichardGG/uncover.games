<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'
import { Column, DataTable } from 'primevue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore.ts'
import { formatGameField } from '@/services/formatService'
import type { Game } from '@/types/Game/Game'

const appStore = useAppStore()
const { isMobile, gameOpen, games } = storeToRefs(appStore)

const selectedGame: Ref<Game | null> = ref(null)
const columnClasses = "w-[45vw] max-h-[46px] h-[46px] overflow-hidden text-wrap flex pl-2 p-1 items-center leading-[1.2] text-xs font-medium"

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
        itemSize: 49,
        numToleratedItems: 30,
        showLoader: true,
        showSpacer: false,
      }"
      class="absolute! w-full! text-nowrap!"
      :table-class="{
        'pb-[40vh]': isMobile
      }"
    >
      <Column
        field="Name"
        header="Name"
        frozen
        class="border-r!"
        :class="isMobile ? 'min-w-[45vw] max-w-[45vw]' : 'min-w-80'"
        :body-class="isMobile ? 'p-0!' : ''"
      >
        <template #body="slotProps">
          <div
            :class="columnClasses"
          >
            {{
              formatGameField(slotProps.data, 'Name')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Platforms"
        header="Platform"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Platforms')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Developers"
        header="Developer"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Developers')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Publishers"
        header="Publisher"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Publishers')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="ReleaseDate"
        header="Release Date"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'ReleaseDate')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Genres"
        header="Genre"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Genres')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Categories"
        header="Category"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Categories')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Features"
        header="Features"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Features')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Tags"
        header="Tag"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Tags')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="IsInstalled"
        header="Installed"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'IsInstalled')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="InstallDirectory"
        header="Installation Folder"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'InstallDirectory')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="InstallSize"
        header="Install Size"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'InstallSize')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Roms"
        header="Image, ROM, or ISO Path"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Roms')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="LastActivity"
        header="Last Played"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'LastActivity')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="RecentActivity"
        header="Recent Activity"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'RecentActivity')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Playtime"
        header="Time Played"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Playtime')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="PlayCount"
        header="Play Count"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'PlayCount')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="CompletionStatus"
        header="Completion Status"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'CompletionStatus')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Series"
        header="Series"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Series')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Version"
        header="Version"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Version')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="AgeRatings"
        header="Age Rating"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'AgeRatings')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Regions"
        header="Region"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Regions')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Source"
        header="Source"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Source')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Added"
        header="Added"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Added')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="Modified"
        header="Modified"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'Modified')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="UserScore"
        header="User Score"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'UserScore')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="CriticScore"
        header="Critic Score"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'CriticScore')
            }}
          </div>
        </template>
      </Column>
      <Column
        field="CommunityScore"
        header="Community Score"
        class="p-0!"
      >
        <template #body="slotProps">
          <div :class="columnClasses">
            {{
              formatGameField(slotProps.data, 'CommunityScore')
            }}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
