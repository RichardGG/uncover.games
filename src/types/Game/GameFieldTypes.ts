export type ReleaseDate = {
  ReleaseDate: string | null;
};

export type Link = {
  Name: string | null;
  Url: string | null;
};

export type Tag = {
  Id: string;
  Name: string;
};

export type Platform = {
  SpecificationId: string | null;
  Icon: string | null;
  Cover: string | null;
  Background: string | null;
  Id: string;
  Name: string;
};

export type GameFieldTypes = {
  BackgroundImage: string | null;
  Description: string | null;
  Notes: string | null;
  GenreIds: Array<string> | null;
  EnableSystemHdr: boolean;
  Hidden: boolean;
  Favorite: boolean;
  Icon: string | null;
  CoverImage: string | null;
  InstallDirectory: string | null;
  LastActivity: string | null;
  SortingName: string | null;
  GameId: string | null;
  PluginId: string | null;
  IncludeLibraryPluginAction: boolean;
  GameActions: string | null; // TODO
  PlatformIds: Array<string> | null;
  PublisherIds: Array<string> | null;
  DeveloperIds: Array<string> | null;
  ReleaseDate: ReleaseDate;
  CategoryIds: Array<string> | null;
  TagIds: Array<string> | null;
  FeatureIds: Array<string> | null;
  Links: Array<Link> | null;
  Roms: Array<string> | null;
  IsInstalling: boolean;
  IsUninstalling: boolean;
  IsLaunching: boolean;
  IsRunning: boolean;
  IsInstalled: boolean;
  OverrideInstallState: boolean;
  Playtime: number;
  Added: string | null;
  Modified: string | null;
  PlayCount: number;
  InstallSize: number | null;
  LastSizeScanDate: string | null;
  SeriesIds: Array<string> | null;
  Version: string | null;
  AgeRatingIds: Array<string> | null;
  RegionIds: Array<string> | null;
  SourceId: string | null;
  CompletionStatusId: string | null;
  UserScore: number | null;
  CriticScore: number | null;
  CommunityScore: number | null;
  PreScript: string | null;
  PostScript: string | null;
  GameStartedScript: string | null;
  UseGlobalPostScript: boolean;
  UseGlobalPreScript: boolean;
  UseGlobalGameStartedScript: boolean;
  Manual: string | null;
  Genres: Array<Tag> | null;
  Developers: Array<Tag> | null;
  Publishers: Array<Tag> | null;
  Tags: Array<Tag> | null;
  Features: Array<Tag> | null;
  Categories: Array<Tag> | null;
  Platforms: Array<Platform> | null;
  Series: Array<Tag> | null;
  AgeRatings: Array<Tag> | null;
  Regions: Array<Tag> | null;
  Source: Tag | null;
  CompletionStatus: Tag | null;
  ReleaseYear: number | null;
  RecentActivity: string | null;
  UserScoreRating: number | null;
  CommunityScoreRating: number | null;
  CriticScoreRating: number | null;
  UserScoreGroup: number | null;
  CommunityScoreGroup: number | null;
  CriticScoreGroup: number | null;
  LastActivitySegment: number | null;
  RecentActivitySegment: number | null;
  AddedSegment: number | null;
  ModifiedSegment: number | null;
  PlaytimeCategory: number | null;
  InstallSizeGroup: number | null;
  IsCustomGame: boolean;
  InstallationStatus: number | null;
  Id: string | null;
  Name: string | null;
};
