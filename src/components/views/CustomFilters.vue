<script setup lang="ts">
import { PhBroom } from '@phosphor-icons/vue'
import { ref, watch } from 'vue'
import { Button, Divider, InputText, SelectButton, ToggleSwitch } from 'primevue'
import type { Ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useCollectionsStore } from '@/stores/collectionsStore'
import IdItemFilterSelect from '@/components/elements/filters/IdItemFilterSelect.vue'
import StringFilterSelect from '@/components/elements/filters/StringFilterSelect.vue'
import EnumFilterSelect from '@/components/elements/filters/EnumFilterSelect.vue'
import FieldIcon from '@/components/elements/FieldIcon.vue'
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
  const selectedInstalled = installed.value.indexOf('Installed') !== -1
  if (selectedInstalled && !isInstalled) {
    installed.value = installed.value.filter((item) => item !== 'Installed')
  } else if (!selectedInstalled && isInstalled) {
    installed.value = [...installed.value, 'Installed']
  }
}, { immediate: true })

watch(() => appStore.currentFilter.Settings.IsUnInstalled, (isUnInstalled) => {
  const selectedUninstalled = installed.value.indexOf('Uninstalled') !== -1
  if (selectedUninstalled && !isUnInstalled) {
    installed.value = installed.value.filter((item) => item !== 'Uninstalled')
  } else if (!selectedUninstalled && isUnInstalled) {
    installed.value = [...installed.value, 'Uninstalled']
  }
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

const clearFilters = () => {
  appStore.clearFilters()
}
</script>

<template>
  <div class="px-4 pb-4">
    <Button
      class="w-full mt-2"
      severity="secondary"
      @click="clearFilters"
    >
      <PhBroom :size="20" />
      Clear filters
    </Button>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <FieldIcon filter="InstallationStatus" />
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
        <FieldIcon
          filter="Hidden"
          class="inline mr-2"
        />
        Hidden
      </span>
      <ToggleSwitch v-model="appStore.currentFilter.Settings.Hidden" />
    </div>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <FieldIcon
          filter="Favorite"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Name"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Version"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="ReleaseYear"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Genre"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Platform"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Publisher"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Developer"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Category"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Tag"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Series"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Region"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Source"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="AgeRating"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Library"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Feature"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="UserScore"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="CriticScore"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="CommunityScore"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="LastActivity"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="RecentActivity"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Added"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="Modified"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="PlayTime"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="InstallSize"
          class="inline mr-2"
        />
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
        <FieldIcon
          filter="CompletionStatuses"
          class="inline mr-2"
        />
        Completion status
      </label>
      <IdItemFilterSelect
        v-model="appStore.currentFilter.Settings.CompletionStatuses"
        :options="collectionsStore.collections.CompletionStatuses.map((tag: Tag) => ({ label: tag.Name, value: tag.Id }))"
      />
    </div>
  </div>
</template>
