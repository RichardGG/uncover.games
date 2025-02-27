import { GameField } from 'src/types/Game/GameField'
import { SortType } from './SortTypes'

export type TagFilter = {
  Ids: Array<string> | null,
  Text: string | null,
}

export type FilterSettings = {
  UseAndFilteringStyle: boolean,
  IsInstalled: boolean,
  IsUnInstalled: boolean,
  Hidden: boolean,
  Favorite: boolean,
  Name: TagFilter | null,
  Version: TagFilter | null,
  ReleaseYear: TagFilter | null,
  Genre: TagFilter | null,
  Platform: TagFilter | null,
  Publisher: TagFilter | null,
  Developer: TagFilter | null,
  Category: TagFilter | null,
  Tag: TagFilter | null,
  Series: TagFilter | null,
  Region: TagFilter | null,
  Source: TagFilter | null,
  AgeRating: TagFilter | null,
  Library: TagFilter | null,
  Feature: TagFilter | null,
  UserScore: TagFilter | null,
  CriticScore: TagFilter | null,
  CommunityScore: TagFilter | null,
  LastActivity: TagFilter | null,
  RecentActivity: TagFilter | null,
  Added: TagFilter | null,
  Modified: TagFilter | null,
  PlayTime: TagFilter | null,
  InstallSize: TagFilter | null,
  CompletionStatuses: TagFilter | null,
}

export type Filter = {
  Settings: FilterSettings | null,
  Id: string | null,
  Name: string | null,
  GroupingOrder: number | null, // TODO should be an enum from export?
  SortingOrder: number | null, // TODO should be an enum from export?
  SortingOrderDirection: number | null, // TODO should be an enum from export?
}

export type Sort = {
  label: string | null,
  value: SortType | null,
}
