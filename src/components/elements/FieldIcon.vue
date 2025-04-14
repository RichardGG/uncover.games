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
import { SortOrder } from '@/types/SortTypes'
import { GroupableField } from '@/types/GroupTypes'
defineProps({
    sort: {
        type: Number,
        required: false,
        default: -1,
    },
    group: {
        type: Number,
        required: false,
        default: -1,
    },
    size: {
      type: Number,
      required: false,
      default: 24,
    },
    filter: {
      type: String,
      required: false,
      default: '',
    }
})
</script>
<template>
  <PhTextT
    v-if="
      sort === SortOrder.Name
        || group === GroupableField.Name
        || filter === 'Name'
    "
    :size="size"
  />
  <PhPackage
    v-else-if="
      sort === SortOrder.Platforms
        || group === GroupableField.Platform
        || filter === 'Platform'
    "
    :size="size"
  />
  <PhStorefront
    v-else-if="
      sort === SortOrder.Library
        || group === GroupableField.Library
        || filter === 'Library'
    "
    :size="size"
  />
  <PhFolders
    v-else-if="
      sort === SortOrder.Categories
        || group === GroupableField.Category
        || filter === 'Category'
    "
    :size="size"
  />
  <PhClock
    v-else-if="
      sort === SortOrder.LastActivity
        || group === GroupableField.LastActivity
        || filter === 'LastActivity'
    "
    :size="size"
  />
  <PhCar
    v-else-if="
      sort === SortOrder.Genres
        || group === GroupableField.Genre
        || filter === 'Genre'
    "
    :size="size"
  />
  <PhCalendar
    v-else-if="
      sort === SortOrder.ReleaseDate
        || group === GroupableField.ReleaseYear
        || filter === 'ReleaseYear'
    "
    :size="size"
  />
  <PhCode
    v-else-if="
      sort === SortOrder.Developers
        || group === GroupableField.Developer
        || filter === 'Developer'
    "
    :size="size"
  />
  <PhCurrencyDollar
    v-else-if="
      sort === SortOrder.Publishers
        || group === GroupableField.Publisher
        || filter === 'Publisher'
    "
    :size="size"
  />
  <PhTag
    v-else-if="
      sort === SortOrder.Tags
        || group === GroupableField.Tag
        || filter === 'Tag'
    "
    :size="size"
  />
  <PhCards
    v-else-if="
      sort === SortOrder.Series
        || group === GroupableField.Series
        || filter === 'Series'
    "
    :size="size"
  />
  <PhPerson
    v-else-if="
      sort === SortOrder.AgeRatings
        || group === GroupableField.AgeRating
        || filter === 'AgeRating'
    "
    :size="size"
  />
  <PhAsterisk
    v-else-if="
      sort === SortOrder.Version
        || filter === 'Version'
    "
    :size="size"
  />
  <PhGlobe
    v-else-if="
      sort === SortOrder.Regions
        || group === GroupableField.Region
        || filter === 'Region'
    "
    :size="size"
  />
  <PhShoppingBag
    v-else-if="
      sort === SortOrder.Source
        || group === GroupableField.Source
        || filter === 'Source'
    "
    :size="size"
  />
  <PhPlusCircle
    v-else-if="
      sort === SortOrder.PlayCount
    "
    :size="size"
  />
  <PhClock
    v-else-if="
      sort === SortOrder.Playtime
        || group === GroupableField.PlayTime
        || filter === 'PlayTime'
    "
    :size="size"
  />
  <PhCheck
    v-else-if="
      sort === SortOrder.CompletionStatus
        || group === GroupableField.CompletionStatus
        || filter === 'CompletionStatuses'
    "
    :size="size"
  />
  <PhThumbsUp
    v-else-if="
      sort === SortOrder.UserScore
        || group === GroupableField.UserScore
        || filter === 'UserScore'
    "
    :size="size"
  />
  <PhStamp
    v-else-if="
      sort === SortOrder.CriticScore
        || group === GroupableField.CriticScore
        || filter === 'CriticScore'
    "
    :size="size"
  />
  <PhSmiley
    v-else-if="
      sort === SortOrder.CommunityScore
        || group === GroupableField.CommunityScore
        || filter === 'CommunityScore'
    "
    :size="size"
  />
  <PhCalendarPlus
    v-else-if="
      sort === SortOrder.Added
        || group === GroupableField.Added
        || filter === 'Added'
    "
    :size="size"
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.Modified
        || group === GroupableField.Modified
        || filter === 'Modified'
    "
    :size="size"
  />
  <PhDownload
    v-else-if="
      sort === SortOrder.IsInstalled
        || group === GroupableField.InstallationStatus
        || filter === 'InstallationStatus'
    "
    :size="size"
  />
  <PhEyeSlash
    v-else-if="
      sort === SortOrder.Hidden
        || filter === 'Hidden'
    "
    :size="size"
  />
  <PhStar
    v-else-if="
      sort === SortOrder.Favorite
        || filter === 'Favorite'
    "
    :size="size"
  />
  <PhHardDrives
    v-else-if="
      sort === SortOrder.InstallDirectory
        || group === GroupableField.InstallDrive
        || filter === 'InstallDrive'
    "
    :size="size"
  />
  <PhGameController
    v-else-if="
      sort === SortOrder.Features
        || group === GroupableField.Feature
        || filter === 'Feature'
    "
    :size="size"
  />
  <PhBoxArrowDown
    v-else-if="
      sort === SortOrder.InstallSize
        || group === GroupableField.InstallSize
        || filter === 'InstallSize'
    "
    :size="size"
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.RecentActivity
        || group === GroupableField.RecentActivity
        || filter === 'RecentActivity'
    "
    :size="size"
  />
  <PhJoystick
    v-else-if="
      sort === SortOrder.RomList
    "
    :size="size"
  />
</template>