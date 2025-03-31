import dayjs from 'dayjs'
import {
  InstallSizeGroup,
  PastTimeSegment,
  PlaytimeCategory,
  ScoreGroup,
} from '@/types/FilterTypes'

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1597
export function getScoreGroup(score: number): ScoreGroup {
  if (score >= 0 && score < 10) {
    return ScoreGroup.O0x
  }
  if (score >= 10 && score < 20) {
    return ScoreGroup.O1x
  }
  if (score >= 20 && score < 30) {
    return ScoreGroup.O2x
  }
  if (score >= 30 && score < 40) {
    return ScoreGroup.O3x
  }
  if (score >= 40 && score < 50) {
    return ScoreGroup.O4x
  }
  if (score >= 50 && score < 60) {
    return ScoreGroup.O5x
  }
  if (score >= 60 && score < 70) {
    return ScoreGroup.O6x
  }
  if (score >= 70 && score < 80) {
    return ScoreGroup.O7x
  }
  if (score >= 80 && score < 90) {
    return ScoreGroup.O8x
  }
  if (score >= 90) {
    return ScoreGroup.O9x
  }
  return ScoreGroup.None
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2367
export function getNameGroup(name: string): string {
  // TODO consider transforming name into sorting name
  return name.toUpperCase().trim().charAt(0)
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2384
export function getInstallSizeGroup(installSize: number): InstallSizeGroup {
  if (installSize == null || installSize == 0) {
    return InstallSizeGroup.None
  }
  if (installSize <= 0x6400000) {
    //100MB
    return InstallSizeGroup.S0_0MB_100MB
  }
  if (installSize <= 0x40000000) {
    //1GB
    return InstallSizeGroup.S1_100MB_1GB
  }
  if (installSize <= 0x140000000) {
    //5GB
    return InstallSizeGroup.S2_1GB_5GB
  }
  if (installSize <= 0x280000000) {
    //10GB
    return InstallSizeGroup.S3_5GB_10GB
  }
  if (installSize <= 0x500000000) {
    //20GB
    return InstallSizeGroup.S4_10GB_20GB
  }
  if (installSize <= 0xa00000000) {
    //40GB
    return InstallSizeGroup.S5_20GB_40GB
  }
  if (installSize <= 0x1900000000) {
    //100GB
    return InstallSizeGroup.S6_40GB_100GB
  }

  return InstallSizeGroup.S7_100GBPlus
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2441
export function getInstallDriveGroup(path: string): string {
  // The first letter is likely the install drive
  return getNameGroup(path)
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1531
export function getPastTimeSegment(dateString: string): PastTimeSegment {
  const date = dayjs(dateString)
  const now = dayjs()
  if (!date) {
    return PastTimeSegment.Never
  }
  if (date.isSame(now, 'day')) {
    return PastTimeSegment.Today
  }
  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return PastTimeSegment.Yesterday
  }
  if (date.isAfter(now.subtract(7, 'day'))) {
    return PastTimeSegment.PastWeek
  }
  if (date.isAfter(now.subtract(31, 'day'))) {
    return PastTimeSegment.PastMonth
  }
  if (date.isAfter(now.subtract(365, 'day'))) {
    return PastTimeSegment.PastYear
  }

  return PastTimeSegment.MoreThenYear
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1492C9-L1524C10
export function getPlaytimeCategory(seconds: number): PlaytimeCategory {
  if (seconds == 0) {
    return PlaytimeCategory.NotPlayed
  }

  const hours = seconds / 3600
  if (hours < 1) {
    return PlaytimeCategory.LessThenHour
  }
  if (hours >= 1 && hours <= 10) {
    return PlaytimeCategory.O1_10
  }
  if (hours >= 10 && hours <= 100) {
    return PlaytimeCategory.O10_100
  }
  if (hours >= 100 && hours <= 500) {
    return PlaytimeCategory.O100_500
  }
  if (hours >= 500 && hours <= 1000) {
    return PlaytimeCategory.O500_1000
  }
  return PlaytimeCategory.O1000plus
}
