import { reverse } from 'lodash';
import { Sort } from 'src/types/FilterTypes';
import { Game } from 'src/types/Game/Game';
import { GameField } from 'src/types/Game/GameField';
import { SortType } from 'src/types/SortTypes';

type SortStyle = 'string' | 'number' | 'id' | 'collection' | 'date' | 'boolean' | null;

interface SortConfig {
  field: GameField|null;
  style: SortStyle;
}

export const sortConfigMap: Record<SortType, SortConfig> = {
  [SortType.Name]: {
    field: 'Name',
    style: 'string',
  },
  [SortType.Platforms]: {
    field: 'Platforms',
    style: 'collection',
  },
  [SortType.Library]: {
    field: null, // TODO plugin source
    style: null,
  },
  [SortType.Categories]: {
    field: 'Categories',
    style: 'collection',
  },
  [SortType.LastActivity]: {
    field: 'LastActivity',
    style: 'date',
  },
  [SortType.Genres]: {
    field: 'Genres',
    style: 'collection',
  },
  [SortType.ReleaseDate]: {
    field: 'ReleaseDate',
    style: 'date',
  },
  [SortType.Developers]: {
    field: 'Developers',
    style: 'collection',
  },
  [SortType.Publishers]: {
    field: 'Publishers',
    style: 'collection',
  },
  [SortType.Tags]: {
    field: 'Tags',
    style: 'collection',
  },
  [SortType.Series]: {
    field: 'Series',
    style: 'collection',
  },
  [SortType.AgeRatings]: {
    field: 'AgeRatings',
    style: 'collection',
  },
  [SortType.Version]: {
    field: 'Version',
    style: 'number',
  },
  [SortType.Regions]: {
    field: 'Regions',
    style: 'collection',
  },
  [SortType.Source]: {
    field: 'Source',
    style: 'collection',
  },
  [SortType.PlayCount]: {
    field: 'PlayCount',
    style: 'number',
  },
  [SortType.Playtime]: {
    field: 'Playtime',
    style: 'number',
  },
  [SortType.CompletionStatus]: {
    field: 'CompletionStatus',
    style: 'id',
  },
  [SortType.UserScore]: {
    field: 'UserScore',
    style: 'number',
  },
  [SortType.CriticScore]: {
    field: 'CriticScore',
    style: 'number',
  },
  [SortType.CommunityScore]: {
    field: 'CommunityScore',
    style: 'number',
  },
  [SortType.Added]: {
    field: 'Added',
    style: 'date',
  },
  [SortType.Modified]: {
    field: 'Modified',
    style: 'date',
  },
  [SortType.IsInstalled]: {
    field: 'IsInstalled',
    style: 'boolean',
  },
  [SortType.Hidden]: {
    field: 'Hidden',
    style: 'boolean',
  },
  [SortType.Favorite]: {
    field: 'Favorite',
    style: 'boolean',
  },
  [SortType.InstallDirectory]: {
    field: 'InstallDirectory',
    style: 'string',
  },
  [SortType.Features]: {
    field: 'Features',
    style: 'collection',
  },
  [SortType.InstallSize]: {
    field: 'InstallSize',
    style: 'string',
  },
  [SortType.RecentActivity]: {
    field: 'RecentActivity',
    style: 'date',
  },
  [SortType.RomList]: {
    field: 'Roms',
    style: 'collection',
  },
}

function compareGames(sortField: GameField, sortStyle: SortStyle, sortDesc: boolean, a: Game, b: Game): number {
  if (!sortField) {
    return 0
  }

  // TODO confirm if need to swap these
  if (a[sortField] === null) {
    return sortDesc ? -1 : 1
  }
  if (b[sortField] === null) {
    return sortDesc ? 1 : -1
  }

  if (sortStyle === 'string') {
    if (typeof a[sortField] !== 'string') {
      return 0
    }
    if (typeof b[sortField] !== 'string') {
      return 0
    }
    console.log('actual sort')
    return a[sortField].localeCompare(b[sortField])
  }
  if (sortStyle === 'number') {
    return a[sortField] > b[sortField] ? 1 : -1
  }
  if (sortStyle === 'id') {
    // TODO need to evaluate the id
  }
  if (sortStyle === 'collection') {
    // TODO how?
  }
  if (sortStyle === 'date') {
    console.log('compare', a[sortField], b[sortField])
    if (typeof a[sortField] !== 'string') {
      return 0
    }
    if (typeof b[sortField] !== 'string') {
      return 0
    }
    return Date.parse(a[sortField]) > Date.parse(b[sortField]) ? 1 : -1
  }
  if (sortStyle === 'boolean') {
    return a[sortField] > b[sortField] ? 1 : -1
  }

  // Unsupported sort
  return 0
}

export function sortGames(
  games: Array<Game>,
  sort: Sort | null,
  sortDesc: boolean,
): Array<Game> {
  if (!sort) {
    return games
  }

  const sortType = sort.value
  if (!sortType) {
    return games
  }

  const sortConfig = sortConfigMap[sortType]
  if (!sortConfig) {
    return games
  }

  const sortStyle = sortConfig.style
  const sortField = sortConfig.field

  if (!sortStyle) {
    // Not supported (consider using Name?)
    return games
  }
  if (!sortField) {
    return games
  }

  return games.sort((a: Game, b: Game) => {
    const result = compareGames(sortField, sortStyle, sortDesc, a, b)
    if (sortDesc) {
      return result * -1
    }
    return result
  })
}
