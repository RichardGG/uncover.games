import { filter, intersection } from 'lodash';
import {
  FilterPreset,
  FilterPresetSettings,
  InstallSizeGroup,
  PastTimeSegment,
  PlaytimeCategory,
  ScoreGroup,
  TagFilter,
} from 'src/types/FilterTypes';
import { Game } from 'src/types/Game/Game';
import { GameField } from 'src/types/Game/GameField';
import { Tag } from 'src/types/Game/GameFieldTypes';
import {
  getInstallSizeGroup,
  getPastTimeSegment,
  getPlaytimeCategory,
  getScoreGroup,
} from './groupService';

type FilterStyle =
  | 'true'
  | 'false'
  | 'string'
  | 'id'
  | 'collection'
  | 'score'
  | 'size'
  | 'date'
  | 'time'
  | null;

interface FilterConfig {
  field: GameField | null;
  style: FilterStyle;
}

const filterToFieldMap: Record<keyof FilterPresetSettings, FilterConfig> = {
  UseAndFilteringStyle: {
    field: null,
    style: null,
  },
  IsInstalled: {
    field: 'IsInstalled',
    style: 'true',
  },
  IsUnInstalled: {
    field: 'IsInstalled',
    style: 'false',
  },
  Hidden: {
    field: 'Hidden',
    style: 'true', // TODO confirm behaviour
  },
  Favorite: {
    field: 'Favorite',
    style: 'true',
  },
  Name: {
    field: 'Name',
    style: 'string',
  },
  Version: {
    field: 'Version',
    style: 'string',
  },
  ReleaseYear: {
    field: 'ReleaseYear',
    style: 'date',
  },
  Genre: {
    field: 'Genres',
    style: 'collection',
  },
  Platform: {
    field: 'Platforms',
    style: 'collection',
  },
  Publisher: {
    field: 'Publishers',
    style: 'collection',
  },
  Developer: {
    field: 'Developers',
    style: 'collection',
  },
  Category: {
    field: 'Categories',
    style: 'collection',
  },
  Tag: {
    field: 'Tags',
    style: 'collection',
  },
  Series: {
    field: 'Series',
    style: 'collection',
  },
  Region: {
    field: 'Regions',
    style: 'collection',
  },
  Source: {
    field: 'Source',
    style: 'id',
  },
  AgeRating: {
    field: 'AgeRatings',
    style: 'collection',
  },
  Library: {
    field: null, // TODO this is plugin source
    style: 'string',
  },
  Feature: {
    field: 'Features',
    style: 'collection',
  },
  UserScore: {
    field: 'UserScore',
    style: 'score',
  },
  CriticScore: {
    field: 'CriticScore',
    style: 'score',
  },
  CommunityScore: {
    field: 'CommunityScore',
    style: 'score',
  },
  LastActivity: {
    field: 'LastActivity',
    style: 'date',
  },
  RecentActivity: {
    field: 'RecentActivity',
    style: 'date',
  },
  Added: {
    field: 'Added',
    style: 'date',
  },
  Modified: {
    field: 'Modified',
    style: 'date',
  },
  PlayTime: {
    field: 'Playtime',
    style: 'time',
  },
  InstallSize: {
    field: 'InstallSize',
    style: 'size',
  },
  CompletionStatuses: {
    field: 'CompletionStatus',
    style: 'id',
  },
};

function idFilter(
  id: string | null,
  filter: TagFilter | null | undefined
): boolean | null {
  // Match single id style filters, eg Source or CompletionStatus
  if (!filter) {
    return null;
  }
  if (!id) {
    return false;
  }
  if (filter.Ids) {
    return filter.Ids.includes(id);
  }
  if (filter.Text) {
    // TODO implement
  }
  return false;
}

function arrayFilter(
  ids: Array<string> | null,
  filter: TagFilter | null | undefined
): boolean | null {
  // Check array style filters, eg Platforms or Genres
  if (!filter) {
    return null;
  }
  if (filter.Ids) {
    return intersection(ids, filter.Ids).length > 0;
  }
  if (filter.Text) {
    // TODO implement
  }
  return false;
}

function isStringArray(array: any): array is string[] {
  return (
    Array.isArray(array) &&
    typeof array === 'object' &&
    typeof array[0] === 'string' &&
    array.every((item: any) => typeof item === 'string')
  );
}

function isTagFilter(obj: any): obj is TagFilter {
  if (typeof obj !== 'object' || !('Ids' in obj) || !('Text' in obj)) {
    return false;
  }
  const validText = typeof obj.Text === 'string';
  const validIds =
    obj?.Ids !== null &&
    Array.isArray((obj as any).Ids) &&
    isStringArray((obj as any).Ids);

  return validIds || validText;
}

function isTag(obj: any): obj is Tag {
  if (typeof obj !== 'object' || !('Id' in obj) || !('Name' in obj)) {
    return false;
  }
  return typeof obj.Id === 'string' && typeof obj.Name === 'string';
}

function matchesCondition(
  game: Game,
  filterSettings: FilterPresetSettings,
  key: keyof FilterPresetSettings
): boolean {
  const filterConfig = filterToFieldMap[key];

  // For unknown filters, if AND: allow to pass, if OR: don't match
  const fallback = filterSettings?.UseAndFilteringStyle || false;

  if (!filterConfig.style || !filterConfig.field) {
    // Unsupported filter
    return fallback;
  }

  const value = game[filterConfig.field];
  const filter = filterSettings[key];

  if (filterConfig.style === 'true') {
    return !!value;
  }

  if (filterConfig.style === 'false') {
    return !value;
  }

  // TODO confirm if this should be partial match for all
  if (filterConfig.style === 'string') {
    if (typeof value !== 'string' || typeof filter !== 'string') {
      // Unexpected type
      return fallback;
    }
    return value.toLowerCase().includes(filter.toLowerCase());
  }

  if (filterConfig.style === 'id') {
    if (!isTag(value) || !value.Id || !isTagFilter(filter)) {
      // Unexpected type
      return fallback;
    }
    return idFilter(value.Id, filter) || false;
  }

  if (filterConfig.style === 'collection') {
    if (!isStringArray(value) || !isTagFilter(filter)) {
      return fallback;
    }
    return arrayFilter(value, filter) || false;
  }

  if (filterConfig.style === 'score') {
    if (typeof filter !== 'number' || !(filter in ScoreGroup)) {
      // Unexpected type
      return fallback;
    }
    if (filter === ScoreGroup.None) {
      return value === null;
    } else if (value === null) {
      return false;
    }
    if (typeof value !== 'number') {
      // Unexpected type
      return fallback;
    }
    return getScoreGroup(value) === filter;
  }

  if (filterConfig.style === 'size') {
    if (
      typeof value !== 'number' ||
      typeof filter !== 'number' ||
      !(filter in InstallSizeGroup)
    ) {
      return fallback;
    }
    return getInstallSizeGroup(value) === filter;
  }

  if (filterConfig.style === 'date') {
    if (
      typeof value !== 'string' ||
      typeof filter !== 'number' ||
      !(filter in PastTimeSegment)
    ) {
      return fallback;
    }
    return getPastTimeSegment(value) === filter;
  }

  if (filterConfig.style === 'time') {
    if (
      typeof value !== 'number' ||
      typeof filter !== 'number' ||
      !(filter in PlaytimeCategory)
    ) {
      return fallback;
    }
    return getPlaytimeCategory(value) === filter;
  }

  return fallback;
}

function matchesFilter(
  game: Game,
  currentFilter: FilterPreset,
  search: string
): boolean {
  // Checks if a game matches a filter set

  // Return early if using quick search and it doesn't match
  if (
    search &&
    !(game.Name?.toLowerCase()?.includes(search.toLowerCase()) ?? false)
  ) {
    return false;
  }

  if (!currentFilter.Settings) {
    // Default to not showing Hidden if no filter
    return !game.Hidden;
  }

  const keys = Object.keys(currentFilter.Settings) as Array<
    keyof typeof currentFilter.Settings
  >;
  const andStyle = currentFilter.Settings?.UseAndFilteringStyle;
  let appliedCondition = false;

  for (const key of keys) {
    const value = currentFilter.Settings[key];
    if (!value) {
      continue;
    }
    appliedCondition = true;

    const matches: boolean = matchesCondition(
      game,
      currentFilter.Settings,
      key
    );

    if (andStyle && !matches) {
      // AND style, stop searching if any condition doesn't match
      return false;
    }
    if (!andStyle && matches) {
      // OR style, stop searching if any condition matches
      return true;
    }
  }
  // If no conditions set, always pass
  // If AND and didn't previously fail return true
  // If OR and didn't previously pass return false
  return !appliedCondition || andStyle || false;
}

export function filterGames(
  games: Array<Game>,
  currentFilter: FilterPreset,
  search: string
): Array<Game> {
  return filter(games, (game: Game) =>
    matchesFilter(game, currentFilter, search)
  );
}
