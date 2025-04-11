<script setup lang="ts">
import { ref, watch } from 'vue'
import { Divider, InputText, SelectButton, ToggleSwitch } from 'primevue'
import type { Ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useCollectionsStore } from '@/stores/collectionsStore'
import IdItemFilterSelect from '@/components/elements/filters/IdItemFilterSelect.vue'
import StringFilterSelect from '@/components/elements/filters/StringFilterSelect.vue'
import EnumFilterSelect from '@/components/elements/filters/EnumFilterSelect.vue'
import {
  PastTimeSegment,
  pastTimeSegmentTranslations,
  ScoreGroup,
  scoreGroupTranslations,
  InstallSizeGroup,
  installSizeGroupTranslations,
  PlaytimeCategory,
  playtimeCategoryTranslations,
} from '@/types/FilterTypes'
import type { Tag } from '@/types/Game/GameFieldTypes'

const appStore = useAppStore()
const collectionsStore = useCollectionsStore()

const installed: Ref<string[]> = ref([])
let installedChangeFromComponent = false

watch(() => appStore.currentFilter.Settings.IsInstalled, (isInstalled) => {
  console.log('watch installed', isInstalled)
  const selectedInstalled = installed.value.indexOf('Installed') !== -1
  if (selectedInstalled && !isInstalled) {
    installed.value = installed.value.filter((item) => item !== 'Installed')
  } else if (!selectedInstalled && isInstalled) {
    installed.value.push('Installed')
  }
  console.log('in', installed.value)
}, { immediate: true })

watch(() => appStore.currentFilter.Settings.IsUnInstalled, (isUnInstalled) => {
  console.log('watch uninstalled', isUnInstalled)
  const selectedUninstalled = installed.value.indexOf('Uninstalled') !== -1
  if (selectedUninstalled && !isUnInstalled) {
    installed.value = installed.value.filter((item) => item !== 'Uninstalled')
  } else if (!selectedUninstalled && isUnInstalled) {
    installed.value.push('Uninstalled')
  }
  console.log('un', installed.value)
}, { immediate: true })

watch(installed, (newVals, oldVals) => {
  // When selected manually, change to single item
  if (installedChangeFromComponent && newVals.length === 2) {
    installedChangeFromComponent = false
    const newItem = newVals.find((val) => oldVals.indexOf(val) === -1)
    if (newItem) {
      installed.value = [newItem]
    }
  } else {
    // Save to store values
    appStore.currentFilter.Settings.IsInstalled = newVals.indexOf('Installed') !== -1
    appStore.currentFilter.Settings.IsUnInstalled = newVals.indexOf('Uninstalled') !== -1
  }
})

const onInstalledChanged = () => {
  installedChangeFromComponent = true
}

const pastTimeOptions = (Object.keys(PastTimeSegment).filter(k => isNaN(Number(k))) as (keyof typeof PastTimeSegment)[]).map(
  (key: keyof typeof PastTimeSegment) => ({
    label: pastTimeSegmentTranslations[PastTimeSegment[key]],
    value: PastTimeSegment[key]
  })
)
const scoreOptions = (Object.keys(ScoreGroup).filter(k => isNaN(Number(k))) as (keyof typeof ScoreGroup)[]).map(
  (key: keyof typeof ScoreGroup) => ({
    label: scoreGroupTranslations[ScoreGroup[key]],
    value: ScoreGroup[key]
  })
)
const installSizeOptions = (Object.keys(InstallSizeGroup).filter(k => isNaN(Number(k))) as (keyof typeof InstallSizeGroup)[]).map(
  (key: keyof typeof InstallSizeGroup) => ({
    label: installSizeGroupTranslations[InstallSizeGroup[key]],
    value: InstallSizeGroup[key]
  })
)
const playtimeOptions = (Object.keys(PlaytimeCategory).filter(k => isNaN(Number(k))) as (keyof typeof PlaytimeCategory)[]).map(
  (key: keyof typeof PlaytimeCategory) => ({
    label: playtimeCategoryTranslations[PlaytimeCategory[key]],
    value: PlaytimeCategory[key]
  })
)
</script>

<template>
  <div class="px-4 pb-4">
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i
          class="pi pi-download mr-2"
          @click="installed = ['Installed', 'Uninstalled']"
        />
      </span>
      <SelectButton
        v-model="installed"
        :options="['Installed', 'Uninstalled']"
        multiple
        @change="onInstalledChanged"
      />
    </div>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i class="pi pi-eye-slash mr-2" />
        Hidden
      </span>
      <ToggleSwitch v-model="appStore.currentFilter.Settings.Hidden" />
    </div>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i class="pi pi-star mr-2" />
        Favorite
      </span>
      <ToggleSwitch v-model="appStore.currentFilter.Settings.Favorite" />
    </div>
    <Divider />
    <div class="mt-4 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-search mr-2" />
        Name
      </label>
      <InputText
        v-model="appStore.currentFilter.Settings.Name"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-asterisk mr-2" />
        Version
      </label>
      <InputText
        v-model="appStore.currentFilter.Settings.Version"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-calendar mr-2" />
        Release year
      </label>
      <!-- TODO do we want to filter the options by what's available in the current games? -->
      <StringFilterSelect
        v-model="appStore.currentFilter.Settings.ReleaseYear"
        :options="appStore.releaseYears.map((year: number) => ({ label: `${year}`, value: `${year}` }))"
      />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-car mr-2" />
        Genre
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Genre"
        :options="collectionsStore.collections.Genres.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-box mr-2" />
        Platform
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Platform"
        :options="collectionsStore.collections.Platforms.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-dollar mr-2" />
        Publishser
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Publisher"
        :options="collectionsStore.collections.Companies.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-code mr-2" />
        Developer
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Developer"
        :options="collectionsStore.collections.Companies.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-folder mr-2" />
        Category
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Category"
        :options="collectionsStore.collections.Categories.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-tag mr-2" />
        Tag
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Tag"
        :options="collectionsStore.collections.Tags.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-clone mr-2" />
        Series
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Series"
        :options="collectionsStore.collections.Series.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-globe mr-2" />
        Region
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Region"
        :options="collectionsStore.collections.Regions.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-cart-arrow-down mr-2" />
        Source
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Source"
        :options="collectionsStore.collections.Sources.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-user mr-2" />
        Age rating
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.AgeRating"
        :options="collectionsStore.collections.AgeRatings.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-book mr-2" />
        Library
      </label>
      <!-- <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Library"
        :options="collectionsStore.collections.Librarys.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      /> -->
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-discord mr-2" />
        Feature
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.Feature"
        :options="collectionsStore.collections.Features.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-thumbs-up mr-2" />
        User score
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.UserScore"
        :options="scoreOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-briefcase mr-2" />
        Critic score
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.CriticScore"
        :options="scoreOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-face-smile mr-2" />
        Community score
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.CommunityScore"
        :options="scoreOptions"
      />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-history mr-2" />
        Last played
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.LastActivity"
        :options="pastTimeOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-file-edit mr-2" />
        Recent activity
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.RecentActivity"
        :options="pastTimeOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-plus-circle mr-2" />
        Date added
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.Added"
        :options="pastTimeOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-pencil mr-2" />
        Date modified
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.Modified"
        :options="pastTimeOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-clock mr-2" />
        Time played
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.PlayTime"
        :options="playtimeOptions"
      />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-download mr-2" />
        Install size
      </label>
      <EnumFilterSelect
        v-model="appStore.currentFilter.Settings.InstallSize"
        :options="installSizeOptions"
      />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-check mr-2" />
        Completion status
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.CompletionStatuses"
        :options="collectionsStore.collections.CompletionStatuses.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
  </div>
</template>
