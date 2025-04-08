<script setup lang="ts">
import {
  PhTextT,
  PhPackage,
  PhStorefront,
  PhFolders,
  PhClock,
  PhCar,
  PhCalendar,
  PhCode,
  PhCurrencyDollar,
  PhTag,
  PhCards,
  PhPerson,
  PhAsterisk,
  PhGlobe,
  PhShoppingBag,
  PhPlusCircle,
  PhCheck,
  PhThumbsUp,
  PhStamp,
  PhSmiley,
  PhCalendarPlus,
  PhPencil,
  PhDownload,
  PhEyeSlash,
  PhStar,
  PhHardDrives,
  PhGameController,
  PhBoxArrowDown,
  PhJoystick,
} from '@phosphor-icons/vue'
import { Menu, SelectButton } from 'primevue'
import { useTemplateRef, computed } from 'vue'
import { SortOrder, SortOrderDirection, sortOrderTranslations } from '@/types/SortTypes'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const menu = useTemplateRef('menu')

const sortKeys = Object.keys(SortOrder).filter(k => isNaN(Number(k))) as (keyof typeof SortOrder)[]
const sortOptions = computed(() => sortKeys.map((key) => ({
  label: sortOrderTranslations[SortOrder[key]],
  command: () => appStore.currentFilter.SortingOrder = SortOrder[key],
  value: SortOrder[key],
  class: appStore.currentFilter.SortingOrder === SortOrder[key] 
    ? 'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary' 
    : ''
})))

const scrollToTop = () => {
  if (menu.value) {
    // TODO this doesn't work
    // console.log('open menu', menu.value.$el)
    // menu.value.$el.querySelector('.overflow-y-scroll')[0].scrollTop = 0
  }
}

defineExpose({ menu })
</script>
<template>
  <Menu
    ref="menu"
    :model="sortOptions"
    :popup="true"
    class="max-h-[50vh] overflow-y-scroll"
    @show="scrollToTop"
  >
    <template #start>
      <SelectButton
        v-model="appStore.currentFilter.SortingOrderDirection"
        option-label="name"
        option-value="value"
        :options="[
          {
            value: SortOrderDirection.Ascending,
            name: 'Ascending', 
          },
          {
            value: SortOrderDirection.Descending,
            name: 'Descending'
          }
        ]"
      />
    </template>
    <template #itemicon="slotProps">
      <div :class="appStore.currentFilter.SortingOrder === slotProps.item.value ? 'text-primary' : 'text-surface'">
        <PhTextT v-if="slotProps.item.value === SortOrder.Name" />
        <PhPackage v-if="slotProps.item.value === SortOrder.Platforms" />
        <PhStorefront v-if="slotProps.item.value === SortOrder.Library" />
        <PhFolders v-if="slotProps.item.value === SortOrder.Categories" />
        <PhClock v-if="slotProps.item.value === SortOrder.LastActivity" />
        <PhCar v-if="slotProps.item.value === SortOrder.Genres" />
        <PhCalendar v-if="slotProps.item.value === SortOrder.ReleaseDate" />
        <PhCode v-if="slotProps.item.value === SortOrder.Developers" />
        <PhCurrencyDollar v-if="slotProps.item.value === SortOrder.Publishers" />
        <PhTag v-if="slotProps.item.value === SortOrder.Tags" />
        <PhCards v-if="slotProps.item.value === SortOrder.Series" />
        <PhPerson v-if="slotProps.item.value === SortOrder.AgeRatings" />
        <PhAsterisk v-if="slotProps.item.value === SortOrder.Version" />
        <PhGlobe v-if="slotProps.item.value === SortOrder.Regions" />
        <PhShoppingBag v-if="slotProps.item.value === SortOrder.Source" />
        <PhPlusCircle v-if="slotProps.item.value === SortOrder.PlayCount" />
        <PhClock v-if="slotProps.item.value === SortOrder.Playtime" />
        <PhCheck v-if="slotProps.item.value === SortOrder.CompletionStatus" />
        <PhThumbsUp v-if="slotProps.item.value === SortOrder.UserScore" />
        <PhStamp v-if="slotProps.item.value === SortOrder.CriticScore" />
        <PhSmiley v-if="slotProps.item.value === SortOrder.CommunityScore" />
        <PhCalendarPlus v-if="slotProps.item.value === SortOrder.Added" />
        <PhPencil v-if="slotProps.item.value === SortOrder.Modified" />
        <PhDownload v-if="slotProps.item.value === SortOrder.IsInstalled" />
        <PhEyeSlash v-if="slotProps.item.value === SortOrder.Hidden" />
        <PhStar v-if="slotProps.item.value === SortOrder.Favorite" />
        <PhHardDrives v-if="slotProps.item.value === SortOrder.InstallDirectory" />
        <PhGameController v-if="slotProps.item.value === SortOrder.Features" />
        <PhBoxArrowDown v-if="slotProps.item.value === SortOrder.InstallSize" />
        <PhPencil v-if="slotProps.item.value === SortOrder.RecentActivity" />
        <PhJoystick v-if="slotProps.item.value === SortOrder.RomList" />
      </div>
    </template>
  </Menu>
</template>
