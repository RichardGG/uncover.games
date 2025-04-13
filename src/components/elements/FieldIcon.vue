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
    }
})
</script>
<template>
  <PhTextT
    v-if="
      sort === SortOrder.Name
        || group === GroupableField.Name
    "
    :size="size"
  />
  <PhPackage
    v-else-if="
      sort === SortOrder.Platforms
        || group === GroupableField.Platform
    "
    :size="size"
  />
  <PhStorefront
    v-else-if="
      sort === SortOrder.Library
        || group === GroupableField.Library
    "
    :size="size"
  />
  <PhFolders
    v-else-if="
      sort === SortOrder.Categories
        || group === GroupableField.Category
    "
    :size="size"
  />
  <PhClock
    v-else-if="
      sort === SortOrder.LastActivity
        || group === GroupableField.LastActivity
    "
    :size="size"
  />
  <PhCar
    v-else-if="
      sort === SortOrder.Genres
        || group === GroupableField.Genre
    "
    :size="size"
  />
  <PhCalendar
    v-else-if="
      sort === SortOrder.ReleaseDate
        || group === GroupableField.ReleaseYear
    "
    :size="size"
  />
  <PhCode
    v-else-if="
      sort === SortOrder.Developers
        || group === GroupableField.Developer
    "
    :size="size"
  />
  <PhCurrencyDollar
    v-else-if="
      sort === SortOrder.Publishers
        || group === GroupableField.Publisher
    "
    :size="size"
  />
  <PhTag
    v-else-if="
      sort === SortOrder.Tags
        || group === GroupableField.Tag
    "
    :size="size"
  />
  <PhCards
    v-else-if="
      sort === SortOrder.Series
        || group === GroupableField.Series
    "
    :size="size"
  />
  <PhPerson
    v-else-if="
      sort === SortOrder.AgeRatings
        || group === GroupableField.AgeRating
    "
    :size="size"
  />
  <PhAsterisk
    v-else-if="
      sort === SortOrder.Version
    "
    :size="size"
  />
  <PhGlobe
    v-else-if="
      sort === SortOrder.Regions
        || group === GroupableField.Region
    "
    :size="size"
  />
  <PhShoppingBag
    v-else-if="
      sort === SortOrder.Source
        || group === GroupableField.Source
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
    "
    :size="size"
  />
  <PhCheck
    v-else-if="
      sort === SortOrder.CompletionStatus
        || group === GroupableField.CompletionStatus
    "
    :size="size"
  />
  <PhThumbsUp
    v-else-if="
      sort === SortOrder.UserScore
        || group === GroupableField.UserScore
    "
    :size="size"
  />
  <PhStamp
    v-else-if="
      sort === SortOrder.CriticScore
        || group === GroupableField.CriticScore
    "
    :size="size"
  />
  <PhSmiley
    v-else-if="
      sort === SortOrder.CommunityScore
        || group === GroupableField.CommunityScore
    "
    :size="size"
  />
  <PhCalendarPlus
    v-else-if="
      sort === SortOrder.Added
        || group === GroupableField.Added
    "
    :size="size"
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.Modified
        || group === GroupableField.Modified
    "
    :size="size"
  />
  <PhDownload
    v-else-if="
      sort === SortOrder.IsInstalled
        || group === GroupableField.InstallationStatus
    "
    :size="size"
  />
  <PhEyeSlash
    v-else-if="
      sort === SortOrder.Hidden
    "
    :size="size"
  />
  <PhStar
    v-else-if="
      sort === SortOrder.Favorite
    "
    :size="size"
  />
  <PhHardDrives
    v-else-if="
      sort === SortOrder.InstallDirectory
        || group === GroupableField.InstallDrive
    "
    :size="size"
  />
  <PhGameController
    v-else-if="
      sort === SortOrder.Features
        || group === GroupableField.Feature
    "
    :size="size"
  />
  <PhBoxArrowDown
    v-else-if="
      sort === SortOrder.InstallSize
        || group === GroupableField.InstallSize
    "
    :size="size"
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.RecentActivity
        || group === GroupableField.RecentActivity
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