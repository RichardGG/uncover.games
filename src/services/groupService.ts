import dayjs from 'dayjs';
import {
  InstallSizeGroup,
  installSizeGroupTranslations,
  PastTimeSegment,
  pastTimeSegmentTranslations,
  PlaytimeCategory,
  playtimeCategoryTranslations,
  ScoreGroup,
  scoreGroupTranslations,
} from '@/types/FilterTypes';
import type { Game } from '@/types/Game/Game';
import { GroupableField } from '@/types/GroupTypes';
import type { Tag } from '@/types/Game/GameFieldTypes';

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1597
export function getScoreGroup(score: number): ScoreGroup {
  if (score >= 0 && score < 10) {
    return ScoreGroup.O0x;
  }
  if (score >= 10 && score < 20) {
    return ScoreGroup.O1x;
  }
  if (score >= 20 && score < 30) {
    return ScoreGroup.O2x;
  }
  if (score >= 30 && score < 40) {
    return ScoreGroup.O3x;
  }
  if (score >= 40 && score < 50) {
    return ScoreGroup.O4x;
  }
  if (score >= 50 && score < 60) {
    return ScoreGroup.O5x;
  }
  if (score >= 60 && score < 70) {
    return ScoreGroup.O6x;
  }
  if (score >= 70 && score < 80) {
    return ScoreGroup.O7x;
  }
  if (score >= 80 && score < 90) {
    return ScoreGroup.O8x;
  }
  if (score >= 90) {
    return ScoreGroup.O9x;
  }
  return ScoreGroup.None;
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2367
export function getNameGroup(name: string): string {
  // TODO consider transforming name into sorting name
  return name.toUpperCase().trim().charAt(0);
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2384
export function getInstallSizeGroup(installSize: number): InstallSizeGroup {
  if (installSize == null || installSize == 0) {
    return InstallSizeGroup.None;
  }
  if (installSize <= 0x6400000) {
    //100MB
    return InstallSizeGroup.S0_0MB_100MB;
  }
  if (installSize <= 0x40000000) {
    //1GB
    return InstallSizeGroup.S1_100MB_1GB;
  }
  if (installSize <= 0x140000000) {
    //5GB
    return InstallSizeGroup.S2_1GB_5GB;
  }
  if (installSize <= 0x280000000) {
    //10GB
    return InstallSizeGroup.S3_5GB_10GB;
  }
  if (installSize <= 0x500000000) {
    //20GB
    return InstallSizeGroup.S4_10GB_20GB;
  }
  if (installSize <= 0xa00000000) {
    //40GB
    return InstallSizeGroup.S5_20GB_40GB;
  }
  if (installSize <= 0x1900000000) {
    //100GB
    return InstallSizeGroup.S6_40GB_100GB;
  }

  return InstallSizeGroup.S7_100GBPlus;
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L2441
export function getInstallDriveGroup(path: string): string {
  // The first letter is likely the install drive
  return getNameGroup(path);
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1531
export function getPastTimeSegment(dateString: string): PastTimeSegment {
  const date = dayjs(dateString);
  const now = dayjs();
  if (!date) {
    return PastTimeSegment.Never;
  }
  if (date.isSame(now, 'day')) {
    return PastTimeSegment.Today;
  }
  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return PastTimeSegment.Yesterday;
  }
  if (date.isAfter(now.subtract(7, 'day'))) {
    return PastTimeSegment.PastWeek;
  }
  if (date.isAfter(now.subtract(31, 'day'))) {
    return PastTimeSegment.PastMonth;
  }
  if (date.isAfter(now.subtract(365, 'day'))) {
    return PastTimeSegment.PastYear;
  }

  return PastTimeSegment.MoreThenYear;
}

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/Game.cs#L1492C9-L1524C10
export function getPlaytimeCategory(seconds: number): PlaytimeCategory {
  if (seconds == 0) {
    return PlaytimeCategory.NotPlayed;
  }

  const hours = seconds / 3600;
  if (hours < 1) {
    return PlaytimeCategory.LessThenHour;
  }
  if (hours >= 1 && hours <= 10) {
    return PlaytimeCategory.O1_10;
  }
  if (hours >= 10 && hours <= 100) {
    return PlaytimeCategory.O10_100;
  }
  if (hours >= 100 && hours <= 500) {
    return PlaytimeCategory.O100_500;
  }
  if (hours >= 500 && hours <= 1000) {
    return PlaytimeCategory.O500_1000;
  }
  return PlaytimeCategory.O1000plus;
}

export type GameGroup = {
  name: string,
  value: number|string, // TODO maybe this should be Tag or enum?
  games: Game[],
}

function addToGroup(groups: Record<string|number, GameGroup>, name: string|null|undefined, value: number|string|null|undefined, game: Game)
{
  if (!value || !name) {
    // TODO maybe need to handle ungrouped??
    return groups
  }
  if (! groups[value]) {
    groups[value] = {
      name,
      value,
      games: [],
    }
  }
  groups[value].games.push(game)
  return groups
}

function addTagsToGroup(groups: Record<string|number, GameGroup>, tags: Tag[]|null, game: Game)
{
  if (!tags) {
    // TODO maybe need to handle ungrouped??
    return groups
  }
  for (const tag of tags) {
    groups = addToGroup(groups, tag.Name, tag.Id, game)
  }
  return groups
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite.DesktopApp/DesktopCollectionView.cs#L28
// groupFields
// https://github.com/JosefNemec/Playnite/blob/master/source/Playnite/GamesCollectionViewEntry.cs#L43
// field mappings
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/PlayniteSDK/Models/Game.cs
// game group sources
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite.DesktopApp/DesktopCollectionView.cs#L302
// building groups
export function getGroups(games: Game[], order: GroupableField)
{
  let groups: Record<string|number, GameGroup> = {}
  for (const game of games) {
    // Multiple values per game
    // if (order === GroupableField.Library) {
    //   groups = addTagsToGroup(groups, game.Category, game)
    // }
    if (order === GroupableField.Category) {
      groups = addTagsToGroup(groups, game.Categories, game)
    }
    if (order === GroupableField.Genre) {
      groups = addTagsToGroup(groups, game.Genres, game)
    }
    if (order === GroupableField.Developer) {
      groups = addTagsToGroup(groups, game.Developers, game)
    }
    if (order === GroupableField.Publisher) {
      groups = addTagsToGroup(groups, game.Publishers, game)
    }
    if (order === GroupableField.Tag) {
      groups = addTagsToGroup(groups, game.Tags, game)
    }
    if (order === GroupableField.Platform) {
      groups = addTagsToGroup(groups, game.Platforms, game)
    }
    if (order === GroupableField.Series) {
      groups = addTagsToGroup(groups, game.Series, game)
    }
    if (order === GroupableField.AgeRating) {
      groups = addTagsToGroup(groups, game.AgeRatings, game)
    }
    if (order === GroupableField.Region) {
      groups = addTagsToGroup(groups, game.Regions, game)
    }
    if (order === GroupableField.Feature) {
      groups = addTagsToGroup(groups, game.Features, game)
    }

    // Single value per game
    if (order === GroupableField.Source) {
      groups = addToGroup(groups, game.Source?.Name, game.Source?.Id, game)
    }
    if (order === GroupableField.ReleaseYear) {
      groups = addToGroup(groups, `${game.ReleaseYear}`, game.ReleaseYear, game)
    }
    if (order === GroupableField.CompletionStatus) {
      groups = addToGroup(groups, game.CompletionStatus?.Name, game.CompletionStatus?.Id, game)
    }

    // Aggregated groups
    if (order === GroupableField.UserScore) {
      const val: ScoreGroup = getScoreGroup(game.UserScore || -1)
      groups = addToGroup(groups, scoreGroupTranslations[val], val, game)
    }
    if (order === GroupableField.CommunityScore) {
      const val: ScoreGroup = getScoreGroup(game.CommunityScore || -1)
      groups = addToGroup(groups, scoreGroupTranslations[val], val, game)
    }
    if (order === GroupableField.CriticScore) {
      const val: ScoreGroup = getScoreGroup(game.CriticScore || -1)
      groups = addToGroup(groups, scoreGroupTranslations[val], val, game)
    }
    if (order === GroupableField.LastActivity) {
      const val:PastTimeSegment = getPastTimeSegment(game.LastActivity || '')
      groups = addToGroup(groups, pastTimeSegmentTranslations[val], val, game)
    }
    if (order === GroupableField.RecentActivity) {
      const val:PastTimeSegment = getPastTimeSegment(game.RecentActivity || '')
      groups = addToGroup(groups, pastTimeSegmentTranslations[val], val, game)
    }
    if (order === GroupableField.Added) {
      const val:PastTimeSegment = getPastTimeSegment(game.Added || '')
      groups = addToGroup(groups, pastTimeSegmentTranslations[val], val, game)
    }
    if (order === GroupableField.Modified) {
      const val:PastTimeSegment = getPastTimeSegment(game.Modified || '')
      groups = addToGroup(groups, pastTimeSegmentTranslations[val], val, game)
    }
    if (order === GroupableField.PlayTime) {
      const val:PlaytimeCategory = getPlaytimeCategory(game.Playtime)
      groups = addToGroup(groups, playtimeCategoryTranslations[val], val, game)
    }
    if (order === GroupableField.InstallationStatus) {
      const val:number = game.InstallationStatus || 0
      groups = addToGroup(groups, val ? 'Installed' : 'Not installed', val, game)
    }
    if (order === GroupableField.Name) {
      const val:string = getNameGroup(game.Name || '')
      groups = addToGroup(groups, val, val, game)
    }
    if (order === GroupableField.InstallDrive) {
      const val:string = getNameGroup(game.InstallDirectory || '')
      groups = addToGroup(groups, val, val, game)
    }
    if (order === GroupableField.InstallSize) {
      const val = getInstallSizeGroup(game.InstallSize || -1)
      groups = addToGroup(groups, installSizeGroupTranslations[val], val, game)
    }
  }

  return Object.values(groups)
}