import type { GroupableField } from './GroupTypes';
import type { SortOrder, SortOrderDirection } from './SortTypes';
import type { CollectionsData } from '@/stores/collectionsStore';

export type TagFilter = {
  Ids: Array<string> | null;
  Text: string | null;
};

// TODO consider localization support
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Localization/LocSource.xaml
// Maybe a tool to read or convert the raw files from playnite

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/FilterPreset.cs#L83
export type FilterPresetSettings = {
  UseAndFilteringStyle: boolean;
  IsInstalled: boolean;
  IsUnInstalled: boolean;
  Hidden: boolean;
  Favorite: boolean;
  Name: string | null;
  Version: TagFilter | null;
  ReleaseYear: number | null;
  Genre: TagFilter | null;
  Platform: TagFilter | null;
  Publisher: TagFilter | null;
  Developer: TagFilter | null;
  Category: TagFilter | null;
  Tag: TagFilter | null;
  Series: TagFilter | null;
  Region: TagFilter | null;
  Source: TagFilter | null;
  AgeRating: TagFilter | null;
  Library: TagFilter | null;
  Feature: TagFilter | null;
  UserScore: TagFilter | null;
  CriticScore: TagFilter | null;
  CommunityScore: TagFilter | null;
  LastActivity: TagFilter | null;
  RecentActivity: TagFilter | null;
  Added: TagFilter | null;
  Modified: TagFilter | null;
  PlayTime: TagFilter | null;
  InstallSize: TagFilter | null;
  CompletionStatuses: TagFilter | null;
};

export type IdItemFilterItemProperties = {
  Ids: Array<string> | null;
  Text: string | null;
};

// TODO consider removing nulls
export type EnumFilterItemProperties = {
  Values: Array<number>;
};

export type StringFilterItemProperties = {
  Values: Array<string>;
};

export type FilterSettings = {
  Name: string | null;
  Genre: IdItemFilterItemProperties | null;
  Platform: IdItemFilterItemProperties | null;
  ReleaseYear: StringFilterItemProperties | null;
  Version: string | null;
  Publisher: IdItemFilterItemProperties | null;
  Developer: IdItemFilterItemProperties | null;
  Category: IdItemFilterItemProperties | null;
  Tag: IdItemFilterItemProperties | null;
  Series: IdItemFilterItemProperties | null;
  Region: IdItemFilterItemProperties | null;
  Source: IdItemFilterItemProperties | null;
  AgeRating: IdItemFilterItemProperties | null;
  UseAndFilteringStyle: boolean;
  IsInstalled: boolean;
  IsUnInstalled: boolean;
  Hidden: boolean;
  Favorite: boolean;
  Library: IdItemFilterItemProperties | null;
  CompletionStatuses: IdItemFilterItemProperties | null;
  UserScore: EnumFilterItemProperties | null;
  CriticScore: EnumFilterItemProperties | null;
  CommunityScore: EnumFilterItemProperties | null;
  LastActivity: EnumFilterItemProperties | null;
  RecentActivity: EnumFilterItemProperties | null;
  Added: EnumFilterItemProperties | null;
  Modified: EnumFilterItemProperties | null;
  PlayTime: EnumFilterItemProperties | null;
  InstallSize: EnumFilterItemProperties | null;
  Feature: IdItemFilterItemProperties | null;
};

export const emptyFilter: FilterSettings = {
  UseAndFilteringStyle: false,
  IsInstalled: false,
  IsUnInstalled: false,
  Hidden: false,
  Favorite: false,
  Name: null,
  Version: null,
  ReleaseYear: null,
  Genre: null,
  Platform: null,
  Publisher: null,
  Developer: null,
  Category: null,
  Tag: null,
  Series: null,
  Region: null,
  Source: null,
  AgeRating: null,
  Library: null,
  Feature: null,
  UserScore: null,
  CriticScore: null,
  CommunityScore: null,
  LastActivity: null,
  RecentActivity: null,
  Added: null,
  Modified: null,
  PlayTime: null,
  InstallSize: null,
  CompletionStatuses: null,
};

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/FilterPreset.cs#L243
export type FilterPreset = {
  Settings: FilterSettings;
  Id: string | null;
  Name: string | null;
  GroupingOrder: GroupableField;
  SortingOrder: SortOrder;
  SortingOrderDirection: SortOrderDirection;
};

// TODO consider if we want the options here or set against type
// TODO consider if we want the type here or just in filterService
// interface FilterOptionConfig {
//   description: string;
//   options: [];
// }

export const filterTranslations: Record<keyof FilterSettings, string> = {
  UseAndFilteringStyle: 'Match all Filters',
  IsInstalled: 'Installed',
  IsUnInstalled: 'Not Installed',
  Hidden: 'Hidden',
  Favorite: 'Favorite',
  Name: 'Name',
  Version: 'Version',
  ReleaseYear: 'Release Year',
  Genre: 'Genre',
  Platform: 'Platform',
  Publisher: 'Publisher',
  Developer: 'Developer',
  Category: 'Category',
  Tag: 'Tag',
  Series: 'Series',
  Region: 'Region',
  Source: 'Source',
  AgeRating: 'Age Rating',
  Library: 'Library',
  Feature: 'Feature',
  UserScore: 'User Score',
  CriticScore: 'Critic Score',
  CommunityScore: 'Community Score',
  LastActivity: 'Last Played',
  RecentActivity: 'Recent Activity',
  Added: 'Date Added',
  Modified: 'Date Modified',
  PlayTime: 'Time Played',
  InstallSize: 'Install Size',
  CompletionStatuses: 'Completion Status',
};

export const filterOptionLists: Record<
  keyof FilterSettings,
  keyof CollectionsData | null
> = {
  UseAndFilteringStyle: null,
  IsInstalled: null,
  IsUnInstalled: null,
  Hidden: null,
  Favorite: null,
  Name: null,
  Version: null,
  ReleaseYear: null,
  Genre: 'Genres',
  Platform: 'Platforms',
  Publisher: 'Companies',
  Developer: 'Companies',
  Category: 'Categories',
  Tag: 'Tags',
  Series: 'Series',
  Region: 'Regions',
  Source: 'Sources',
  AgeRating: 'AgeRatings',
  Library: null,
  Feature: 'Features',
  UserScore: null,
  CriticScore: null,
  CommunityScore: null,
  LastActivity: null,
  RecentActivity: null,
  Added: null,
  Modified: null,
  PlayTime: null,
  InstallSize: null,
  CompletionStatuses: 'CompletionStatuses',
};

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/PastTimeSegment.cs
export enum PastTimeSegment {
  Today = 0,
  Yesterday = 1,
  PastWeek = 2,
  PastMonth = 3,
  PastYear = 4,
  MoreThenYear = 5,
  Never = 6,
}

export const pastTimeSegmentTranslations: Record<PastTimeSegment, string> = {
  [PastTimeSegment.Today]: 'Today',
  [PastTimeSegment.Yesterday]: 'Yesterday',
  [PastTimeSegment.PastWeek]: 'In past 7 days',
  [PastTimeSegment.PastMonth]: 'In past 31 days',
  [PastTimeSegment.PastYear]: 'In past 365 days',
  [PastTimeSegment.MoreThenYear]: 'More than 365 days ago',
  [PastTimeSegment.Never]: 'Never',
};

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/ScoreGroup.cs
export enum ScoreGroup {
  O0x = 0,
  O1x = 1,
  O2x = 2,
  O3x = 3,
  O4x = 4,
  O5x = 5,
  O6x = 6,
  O7x = 7,
  O8x = 8,
  O9x = 9,
  None = 10,
}

export const scoreGroupTranslations: Record<ScoreGroup, string> = {
  [ScoreGroup.O0x]: '0x',
  [ScoreGroup.O1x]: '1x',
  [ScoreGroup.O2x]: '2x',
  [ScoreGroup.O3x]: '3x',
  [ScoreGroup.O4x]: '4x',
  [ScoreGroup.O5x]: '5x',
  [ScoreGroup.O6x]: '6x',
  [ScoreGroup.O7x]: '7x',
  [ScoreGroup.O8x]: '8x',
  [ScoreGroup.O9x]: '9x',
  [ScoreGroup.None]: 'None',
};

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/InstallSizeGroup.cs
export enum InstallSizeGroup {
  None = 0,
  S0_0MB_100MB = 1,
  S1_100MB_1GB = 2,
  S2_1GB_5GB = 3,
  S3_5GB_10GB = 4,
  S4_10GB_20GB = 5,
  S5_20GB_40GB = 6,
  S6_40GB_100GB = 7,
  S7_100GBPlus = 8,
}

export const installSizeGroupTranslations: Record<InstallSizeGroup, string> = {
  [InstallSizeGroup.None]: 'None',
  [InstallSizeGroup.S0_0MB_100MB]: '0 to 100MB',
  [InstallSizeGroup.S1_100MB_1GB]: '100MB to 1GB',
  [InstallSizeGroup.S2_1GB_5GB]: '1GB to 5GB',
  [InstallSizeGroup.S3_5GB_10GB]: '5GB to 10GB',
  [InstallSizeGroup.S4_10GB_20GB]: '10GB to 20GB',
  [InstallSizeGroup.S5_20GB_40GB]: '20GB to 40GB',
  [InstallSizeGroup.S6_40GB_100GB]: '40GB to 100GB',
  [InstallSizeGroup.S7_100GBPlus]: '100GB or more',
};

// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/PlaytimeCategory.cs
export enum PlaytimeCategory {
  NotPlayed = 0,
  LessThenHour = 1,
  O1_10 = 2,
  O10_100 = 3,
  O100_500 = 4,
  O500_1000 = 5,
  O1000plus = 6,
}

export const playtimeCategoryTranslations: Record<PlaytimeCategory, string> = {
  [PlaytimeCategory.NotPlayed]: 'Not Played',
  [PlaytimeCategory.LessThenHour]: 'Less than an hour',
  [PlaytimeCategory.O1_10]: '1 to 10 hours',
  [PlaytimeCategory.O10_100]: '10 to 100 hours',
  [PlaytimeCategory.O100_500]: '100 to 500 hours',
  [PlaytimeCategory.O500_1000]: '500 to 1000 hours',
  [PlaytimeCategory.O1000plus]: 'Over 1000 hours',
};
