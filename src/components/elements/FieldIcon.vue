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
    }
})
</script>
<template>
  <PhTextT
    v-if="
      sort === SortOrder.Name
        || group === GroupableField.Name
    "
  />
  <PhPackage
    v-else-if="
      sort === SortOrder.Platforms
        || group === GroupableField.Platform
    "
  />
  <PhStorefront
    v-else-if="
      sort === SortOrder.Library
        || group === GroupableField.Library
    "
  />
  <PhFolders
    v-else-if="
      sort === SortOrder.Categories
        || group === GroupableField.Category
    "
  />
  <PhClock
    v-else-if="
      sort === SortOrder.LastActivity
        || group === GroupableField.LastActivity
    "
  />
  <PhCar
    v-else-if="
      sort === SortOrder.Genres
        || group === GroupableField.Genre
    "
  />
  <PhCalendar
    v-else-if="
      sort === SortOrder.ReleaseDate
        || group === GroupableField.ReleaseYear
    "
  />
  <PhCode
    v-else-if="
      sort === SortOrder.Developers
        || group === GroupableField.Developer
    "
  />
  <PhCurrencyDollar
    v-else-if="
      sort === SortOrder.Publishers
        || group === GroupableField.Publisher
    "
  />
  <PhTag
    v-else-if="
      sort === SortOrder.Tags
        || group === GroupableField.Tag
    "
  />
  <PhCards
    v-else-if="
      sort === SortOrder.Series
        || group === GroupableField.Series
    "
  />
  <PhPerson
    v-else-if="
      sort === SortOrder.AgeRatings
        || group === GroupableField.AgeRating
    "
  />
  <PhAsterisk
    v-else-if="
      sort === SortOrder.Version
    "
  />
  <PhGlobe
    v-else-if="
      sort === SortOrder.Regions
        || group === GroupableField.Region
    "
  />
  <PhShoppingBag
    v-else-if="
      sort === SortOrder.Source
        || group === GroupableField.Source
    "
  />
  <PhPlusCircle
    v-else-if="
      sort === SortOrder.PlayCount
    "
  />
  <PhClock
    v-else-if="
      sort === SortOrder.Playtime
        || group === GroupableField.PlayTime
    "
  />
  <PhCheck
    v-else-if="
      sort === SortOrder.CompletionStatus
        || group === GroupableField.CompletionStatus
    "
  />
  <PhThumbsUp
    v-else-if="
      sort === SortOrder.UserScore
        || group === GroupableField.UserScore
    "
  />
  <PhStamp
    v-else-if="
      sort === SortOrder.CriticScore
        || group === GroupableField.CriticScore
    "
  />
  <PhSmiley
    v-else-if="
      sort === SortOrder.CommunityScore
        || group === GroupableField.CommunityScore
    "
  />
  <PhCalendarPlus
    v-else-if="
      sort === SortOrder.Added
        || group === GroupableField.Added
    "
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.Modified
        || group === GroupableField.Modified
    "
  />
  <PhDownload
    v-else-if="
      sort === SortOrder.IsInstalled
        || group === GroupableField.InstallationStatus
    "
  />
  <PhEyeSlash
    v-else-if="
      sort === SortOrder.Hidden
    "
  />
  <PhStar
    v-else-if="
      sort === SortOrder.Favorite
    "
  />
  <PhHardDrives
    v-else-if="
      sort === SortOrder.InstallDirectory
        || group === GroupableField.InstallDrive
    "
  />
  <PhGameController
    v-else-if="
      sort === SortOrder.Features
        || group === GroupableField.Feature
    "
  />
  <PhBoxArrowDown
    v-else-if="
      sort === SortOrder.InstallSize
        || group === GroupableField.InstallSize
    "
  />
  <PhPencil
    v-else-if="
      sort === SortOrder.RecentActivity
        || group === GroupableField.RecentActivity
    "
  />
  <PhJoystick
    v-else-if="
      sort === SortOrder.RomList
    "
  />
</template>