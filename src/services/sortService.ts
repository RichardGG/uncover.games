import type { Game } from '@/types/Game/Game';
import type { GameField } from '@/types/Game/GameField';
import { SortOrder, SortOrderDirection } from '@/types/SortTypes';

type SortStyle =
  | 'string'
  | 'number'
  | 'id'
  | 'collection'
  | 'date'
  | 'boolean'
  | null;

interface SortConfig {
  field: GameField | null;
  style: SortStyle;
}

export const sortConfigMap: Record<SortOrder, SortConfig> = {
  [SortOrder.Name]: {
    field: 'Name',
    style: 'string',
  },
  [SortOrder.Platforms]: {
    field: 'Platforms',
    style: 'collection',
  },
  [SortOrder.Library]: {
    field: null, // TODO plugin source
    style: null,
  },
  [SortOrder.Categories]: {
    field: 'Categories',
    style: 'collection',
  },
  [SortOrder.LastActivity]: {
    field: 'LastActivity',
    style: 'date',
  },
  [SortOrder.Genres]: {
    field: 'Genres',
    style: 'collection',
  },
  [SortOrder.ReleaseDate]: {
    field: 'ReleaseDate',
    style: 'date',
  },
  [SortOrder.Developers]: {
    field: 'Developers',
    style: 'collection',
  },
  [SortOrder.Publishers]: {
    field: 'Publishers',
    style: 'collection',
  },
  [SortOrder.Tags]: {
    field: 'Tags',
    style: 'collection',
  },
  [SortOrder.Series]: {
    field: 'Series',
    style: 'collection',
  },
  [SortOrder.AgeRatings]: {
    field: 'AgeRatings',
    style: 'collection',
  },
  [SortOrder.Version]: {
    field: 'Version',
    style: 'number',
  },
  [SortOrder.Regions]: {
    field: 'Regions',
    style: 'collection',
  },
  [SortOrder.Source]: {
    field: 'Source',
    style: 'collection',
  },
  [SortOrder.PlayCount]: {
    field: 'PlayCount',
    style: 'number',
  },
  [SortOrder.Playtime]: {
    field: 'Playtime',
    style: 'number',
  },
  [SortOrder.CompletionStatus]: {
    field: 'CompletionStatus',
    style: 'id',
  },
  [SortOrder.UserScore]: {
    field: 'UserScore',
    style: 'number',
  },
  [SortOrder.CriticScore]: {
    field: 'CriticScore',
    style: 'number',
  },
  [SortOrder.CommunityScore]: {
    field: 'CommunityScore',
    style: 'number',
  },
  [SortOrder.Added]: {
    field: 'Added',
    style: 'date',
  },
  [SortOrder.Modified]: {
    field: 'Modified',
    style: 'date',
  },
  [SortOrder.IsInstalled]: {
    field: 'IsInstalled',
    style: 'boolean',
  },
  [SortOrder.Hidden]: {
    field: 'Hidden',
    style: 'boolean',
  },
  [SortOrder.Favorite]: {
    field: 'Favorite',
    style: 'boolean',
  },
  [SortOrder.InstallDirectory]: {
    field: 'InstallDirectory',
    style: 'string',
  },
  [SortOrder.Features]: {
    field: 'Features',
    style: 'collection',
  },
  [SortOrder.InstallSize]: {
    field: 'InstallSize',
    style: 'string',
  },
  [SortOrder.RecentActivity]: {
    field: 'RecentActivity',
    style: 'date',
  },
  [SortOrder.RomList]: {
    field: 'Roms',
    style: 'collection',
  },
};

function compareGames(
  sortField: GameField,
  sortStyle: SortStyle,
  sortDesc: boolean,
  a: Game,
  b: Game
): number {
  if (!sortField) {
    return 0;
  }

  // TODO confirm if need to swap these
  if (a[sortField] === null) {
    return sortDesc ? -1 : 1;
  }
  if (b[sortField] === null) {
    return sortDesc ? 1 : -1;
  }

  if (sortStyle === 'string') {
    if (typeof a[sortField] !== 'string') {
      return 0;
    }
    if (typeof b[sortField] !== 'string') {
      return 0;
    }
    return a[sortField].localeCompare(b[sortField]);
  }
  if (sortStyle === 'number') {
    return a[sortField] > b[sortField] ? 1 : -1;
  }
  if (sortStyle === 'id') {
    // TODO need to evaluate the id
  }
  if (sortStyle === 'collection') {
    // TODO how?
  }
  if (sortStyle === 'date') {
    if (typeof a[sortField] !== 'string') {
      return 0;
    }
    if (typeof b[sortField] !== 'string') {
      return 0;
    }
    return Date.parse(a[sortField]) > Date.parse(b[sortField]) ? 1 : -1;
  }
  if (sortStyle === 'boolean') {
    return a[sortField] > b[sortField] ? 1 : -1;
  }

  // Unsupported sort
  return 0;
}

export function sortGames(
  games: Array<Game>,
  sortType: SortOrder | null,
  sortDirection: SortOrderDirection | null,
): Array<Game> {
  if (sortType === null) {
    return games;
  }

  const sortDesc = sortDirection === SortOrderDirection.Descending
  const sortConfig = sortConfigMap[sortType];
  if (!sortConfig) {
    return games;
  }

  const sortStyle = sortConfig.style;
  const sortField = sortConfig.field;

  if (!sortStyle) {
    // Not supported (consider using Name?)
    return games;
  }
  if (!sortField) {
    return games;
  }

  return games.sort((a: Game, b: Game) => {
    const result = compareGames(sortField, sortStyle, sortDesc, a, b);
    if (sortDesc) {
      return result * -1;
    }
    return result;
  });
}
