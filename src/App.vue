<script setup lang="ts">
import {
  Toolbar,
  OverlayBadge,
  DataTable,
  Button,
  Avatar,
  Column,
  Menu,
  InputText,
  IconField,
  InputIcon,
  useToast,
  Toast,
  ScrollPanel,
  Splitter,
  SplitterPanel,
} from 'primevue'
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'
import {
  PhBookmarksSimple,
  PhCaretUpDown,
  PhFunnel,
  PhLayout,
  PhStack,
} from '@phosphor-icons/vue'
import { computed, ref, useTemplateRef } from 'vue'
import GameDetails from './views/GameDetails.vue'
import Filters from './views/Filters.vue'
import { useWindowSize } from '@vueuse/core'

const toast = useToast()

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
const filterMenu = useTemplateRef('filter-menu')
const showGame = ref(true)
const showFilters = ref(false)
const expandGame = ref(false)
const games = ref([
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
  {
    code: 'test',
    name: 'Test',
    category: 'cat',
    quantity: 6,
  },
])
const filters = ref([
  {
    label: 'Done',
  },
  {
    label: 'Play Next',
  },
  {
    label: 'VR',
  },
])

const bottomSheet = ref<InstanceType<typeof BottomSheet>>()

const openGame = () => {
  // bottomSheet.value?.open()
  showGame.value = true
}
const closeGame = () => {
  showGame.value = !showGame
  expandGame.value = false
}

const openFilters = (event: Event) => {
  filterMenu.value?.toggle(event)
}

const createToast = () => {
  toast.add({
    severity: 'info',
    summary: 'Info',
    detail: 'Message Content',
    life: 3000,
  })
}
</script>

<template>
  <Toast pt:root:class="mt-16" />
  <BottomSheet ref="bottomSheet">
    <GameDetails />
  </BottomSheet>
  <div
    v-if="isMobile"
    class="flex justify-between items-center h-14 border-b-1 border-(--p-content-border-color)"
  >
    <div class="flex items-center ml-4">
      <i class="pi pi-discord mx-2 !text-3xl"></i>
      <div class="mx-4">Uncover.Games</div>
    </div>
    <div class="flex items-center mr-2">
      <OverlayBadge class="mr-5">
        <i
          class="pi pi-bell !text-xl !text-(--p-button-text-secondary-color)"
        />
      </OverlayBadge>
      <Avatar
        icon="pi pi-user"
        class="mr-2"
        shape="circle"
        @click="createToast"
      />
    </div>
  </div>
  <div
    class="h-full flex flex-col shrink border-0 rounded-0"
    :class="{ 'p-4': !isMobile }"
  >
    <Toolbar class="mb-4" v-if="!isMobile">
      <template #start>
        <i class="pi pi-discord mx-2 !text-4xl"></i>
        <div class="mx-4">Uncover.Games</div>
        <Button
          v-tooltip.bottom="'Custom filter'"
          icon="pi pi-filter"
          severity="secondary"
          text
          @click="showFilters = true"
        />
        <Button
          v-tooltip.bottom="'Saved filters'"
          icon="pi pi-bookmark"
          severity="secondary"
          text
          @click="openFilters"
          class="relative"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu
          ref="filter-menu"
          id="filter_menu"
          :model="filters"
          :popup="true"
        />
        <Button
          v-tooltip.bottom="'Sort by'"
          icon="pi pi-sort-alt"
          severity="secondary"
          text
        />
        <Button
          v-tooltip.bottom="'Group by'"
          icon="pi pi-tags"
          severity="secondary"
          text
        />
        <Button
          v-tooltip.bottom="'View'"
          icon="pi pi-objects-column"
          severity="secondary"
          text
        />
      </template>
      <template #end>
        <IconField class="mr-6">
          <InputIcon class="pi pi-search" />
          <InputText type="text" />
        </IconField>
        <OverlayBadge class="mr-5">
          <i
            class="pi pi-bell !text-xl !text-(--p-button-text-secondary-color)"
          />
        </OverlayBadge>
        <Avatar
          icon="pi pi-user"
          class="mr-2"
          shape="circle"
          @click="createToast"
        />
      </template>
    </Toolbar>
    <div
      class="border border-(--p-content-border-color) h-full flex rounded-lg"
      :class="{
        '!border-0': isMobile,
      }"
    >
      <div
        v-if="!isMobile && showFilters && !expandGame"
        :min-size="20"
        class="flex flex-col w-100 shrink-0 border-r border-(--p-content-border-color)"
      >
        <div
          class="flex w-full items-center justify-between px-4 py-2 border-b border-(--p-content-border-color)"
        >
          Custom filter
          <Button
            icon="pi pi-times"
            severity="secondary"
            text
            class="-mr-2"
            @click="showFilters = false"
          />
        </div>
        <div class="relative h-full">
          <ScrollPanel class="absolute h-full w-full">
            <Filters />
          </ScrollPanel>
        </div>
      </div>
      <Splitter class="w-full !border-0" :gutter-size="1">
        <SplitterPanel
          v-if="!expandGame || !showGame"
          :min-size="20"
          class="relative w-full h-full"
          :class="{
            'pt-4 pl-4': !isMobile,
            'pt-1 pl-1': isMobile,
          }"
          :size="50"
        >
          <div class="w-full h-full relative">
            <DataTable
              :value="games"
              @row-click="openGame"
              scrollable
              scrollHeight="flex"
              class="!absolute w-full"
            >
              <Column field="name" header="Name" frozen></Column>
              <Column field="code" header="Code"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
              <Column field="aaa" header="aaa"></Column>
              <Column field="bbb" header="bbb"></Column>
              <Column field="ccc" header="ccc"></Column>
              <Column field="ddd" header="ddd"></Column>
            </DataTable>
          </div>
        </SplitterPanel>
        <SplitterPanel
          v-if="showGame && !isMobile"
          :min-size="20"
          class="relative w-100 shrink-0 border-l border-(--p-content-border-color)"
          :size="50"
        >
          <div
            class="!absolute top-0 left-0 flex space-x-1 p-1 w-full bg-black/20 z-10 justify-between"
          >
            <div>
              <Button
                @click="closeGame"
                icon="pi pi-times"
                severity="secondary"
                text
              />
              <Button
                @click="expandGame = !expandGame"
                icon="pi pi-expand"
                severity="secondary"
                text
              />
            </div>
            <div>
              <Button icon="pi pi-ellipsis-h" severity="secondary" text />
            </div>
          </div>
          <ScrollPanel class="absolute h-full w-full">
            <GameDetails />
          </ScrollPanel>
        </SplitterPanel>
      </Splitter>
    </div>
  </div>
  <div
    v-if="isMobile"
    class="flex justify-around items-center h-16 px-1 border-t border-(--p-content-border-color) z-10"
  >
    <Button
      label="Filter"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 !text-[14px]"
      size="small"
    >
      <template #icon>
        <PhFunnel weight="fill" :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Sort"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 !text-[14px]"
      size="small"
    >
      <template #icon>
        <PhCaretUpDown weight="fill" :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Saved"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 !text-[14px]"
      @click="openFilters"
    >
      <template #icon>
        <PhBookmarksSimple weight="fill" :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Menu ref="filter-menu" id="filter_menu" :model="filters" :popup="true" />
    <Button
      label="Group"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 !text-[14px]"
      size="small"
    >
      <template #icon>
        <PhStack weight="fill" :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
    <Button
      label="Layout"
      icon-pos="top"
      severity="secondary"
      text
      class="w-1/5 mx-2 h-14 !text-[14px]"
      size="small"
    >
      <template #icon>
        <PhLayout weight="fill" :size="24" class="shrink-0 -mb-2" />
      </template>
    </Button>
  </div>
</template>

<style lang="css">
:root {
  --vsbs-background: var(--p-content-background);
  --vsbs-handle-background: var(--p-content-border-color);
  --vsbs-padding-x: 0px;
}
</style>
