import { filter, intersection } from 'lodash'
import { Filter, FilterSettings, TagFilter } from 'src/types/FilterTypes'
import { Game } from 'src/types/Game/Game'
import { GameField } from 'src/types/Game/GameField'
import { Tag } from 'src/types/Game/GameFieldTypes'

type FilterStyle = 'true' | 'false' | 'string' | 'number' | 'id' | 'collection' | 'date' | null;

interface FilterConfig {
  field: GameField|null;
  style: FilterStyle;
}

const filterToFieldMap: Record<keyof FilterSettings, FilterConfig> = {
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
    style: 'number',
  },
  CriticScore: {
    field: 'CriticScore',
    style: 'number',
  },
  CommunityScore: {
    field: 'CommunityScore',
    style: 'number',
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
    style: 'number',
  },
  InstallSize: {
    field: 'InstallSize',
    style: 'number',
  },
  CompletionStatuses: {
    field: 'CompletionStatus',
    style: 'id',
  },
}

function idFilter(id: string | null, filter: TagFilter | null | undefined): boolean | null {
  // Match single id style filters, eg Source or CompletionStatus
  if (!filter) {
    return null
  }
  if (!id) {
    return false
  }
  if (filter.Ids) {
    return filter.Ids.includes(id)
  }
  if (filter.Text) {
    // TODO implement
  }
  return false
}

function arrayFilter(ids: Array<string> | null, filter: TagFilter | null | undefined): boolean | null {
  // Check array style filters, eg Platforms or Genres
  if (!filter) {
    return null
  }
  if (filter.Ids) {
    return intersection(ids, filter.Ids).length > 0
  }
  if (filter.Text) {
    // TODO implement
  }
  return false
}

function isStringArray(array: any): array is string[] {
  return Array.isArray(array)
    && typeof array === 'object'
    && typeof array[0] === 'string'
    && array.every((item: any) => typeof item === 'string')
}

function isTagFilter(obj: any): obj is TagFilter {
  if (typeof obj !== 'object' || !('Ids' in obj) || !('Text' in obj)) {
    return false
  }
  const validText = typeof obj.Text === 'string'
  const validIds = obj?.Ids !== null
    && Array.isArray((obj as any).Ids)
    && isStringArray((obj as any).Ids)

  return validIds || validText
}

function isTag(obj: any): obj is Tag {
  if (typeof obj !== 'object' || !('Id' in obj) || !('Name' in obj)) {
    return false
  }
  return typeof obj.Id === 'string' && typeof obj.Name === 'string'
}

function matchesCondition(game: Game, filterSettings: FilterSettings, key: keyof FilterSettings): boolean {

  const filterConfig = filterToFieldMap[key]

  // Unknown filter, if AND allow to pass, if OR don't match
  const fallback = filterSettings?.UseAndFilteringStyle || false

  if (!filterConfig.style || !filterConfig.field)
  {
    // Unsupported filter
    return fallback
  }

  const value = game[filterConfig.field]
  const filter = filterSettings[key]

  if (filterConfig.style === 'true') {
    return !!value
  }

  if (filterConfig.style === 'false') {
    return !value
  }

  // TODO confirm if this should be partial match for all
  if (filterConfig.style === 'string') {
    if (typeof value !== 'string' || typeof filter !== 'string') {
      // Unexpected type
      return fallback
    }
    return value.toLowerCase().includes(filter.toLowerCase())
  }

  if (filterConfig.style === 'number') {
    // TODO
  }

  if (filterConfig.style === 'id') {
    if (!isTag(value) || !value.Id || !isTagFilter(filter)) {
      // Unexpected type
      return fallback
    }
    return idFilter(value.Id, filter) || false
  }

  if (filterConfig.style === 'collection') {
    if (!isStringArray(value) || !isTagFilter(filter)) {
      return fallback
    }
    return arrayFilter(value, filter) || false
  }

  if (filterConfig.style === 'date') {
    // TODO
  }

  return fallback
}

function matchesFilter(
  game: Game,
  currentFilter: Filter,
  search: string,
): boolean {
  // Checks if a game matches a filter set

  // Return early if using quick search and it doesn't match
  if (search && !(game.Name?.toLowerCase()?.includes(search.toLowerCase()) ?? false)) {
    return false
  }

  if (!currentFilter.Settings) {
    // Default to not showing Hidden if no filter
    return !game.Hidden
  }

  const keys = Object.keys(currentFilter.Settings) as Array<keyof typeof currentFilter.Settings>;
  const andStyle = currentFilter.Settings?.UseAndFilteringStyle
  let appliedCondition = false

  for (const key of keys) {
    const value = currentFilter.Settings[key]
    if (!value) {
      continue
    }
    appliedCondition = true

    const matches: boolean = matchesCondition(game, currentFilter.Settings, key)

    if (andStyle && !matches) {
      // AND style, stop searching if any condition doesn't match
      return false
    }
    if (!andStyle && matches) {
      // OR style, stop searching if any condition matches
      return true
    }
  }
  // If no conditions set, always pass
  // If AND and didn't previously fail return true
  // If OR and didn't previously pass return false
  return !appliedCondition || andStyle || false
}

export function filterGames(
  games: Array<Game>,
  currentFilter: Filter,
  search: string,
): Array<Game> {
  games = filter(games, (game: Game) => matchesFilter(game, currentFilter, search))

  // const sortType: GameField = sort?.value ?? 'Name'

  // const partitioned = partition(games, (game: Game) => formatGameField(game, sortType))
  // console.log(sortType)

  // games = sortBy(games, sortType)

  // TODO need to map sort fields to gamefields
  // games = sortBy(partitioned[0],  (game: Game) => {
  //     return formatGameField(game, sortType)
  //   })
  // if (sortDesc) {
  //   games = reverse(games)
  // }
  return games
  // return [...games, ...partitioned[1]]
}
