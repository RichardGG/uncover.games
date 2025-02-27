// https://github.com/JosefNemec/Playnite/blob/master/source/PlayniteSDK/Models/FilterPreset.cs#L11
export enum SortType {
  Name = 0, // Name
  Platforms = 1, // Platforms
  Library = 2, // PluginId // Unchangeable field (which plugin)
  Categories = 3, // Categories
  LastActivity = 4, // LastActivity
  Genres = 5, // Genres
  ReleaseDate = 6, // ReleaseDate
  Developers = 7, // Developers
  Publishers = 8, // Publishers
  Tags = 9, // Tags
  Series = 10, // Series
  AgeRatings = 11, // AgeRatings
  Version = 12, // Version
  Regions = 13, // Regions
  Source = 14, // Source // eg Oculus Steam Origin
  PlayCount = 15, // PlayCount
  Playtime = 16, // Playtime
  CompletionStatus = 17, // CompletionStatus
  UserScore = 18, // UserScore
  CriticScore = 19, // CriticScore
  CommunityScore = 20, // CommunityScore
  Added = 21, // Added
  Modified = 22, // Modified
  IsInstalled = 23, // IsInstalled
  Hidden = 24, // Hidden
  Favorite = 25, // Favorite
  InstallDirectory = 26, // InstallDirectory
  Features = 27, // Features
  InstallSize = 28, // InstallSize
  RecentActivity = 29, // RecentActivity
  RomList = 30, // Roms
}

export const sortTranslations: Record<SortType, string> = {
  [SortType.Name]: 'Name',
  [SortType.Platforms]: 'Platform',
  [SortType.Library]: 'Library',
  [SortType.Categories]: 'Category',
  [SortType.LastActivity]: 'Last Played',
  [SortType.Genres]: 'Genre',
  [SortType.ReleaseDate]: 'Release Date',
  [SortType.Developers]: 'Developer',
  [SortType.Publishers]: 'Publisher',
  [SortType.Tags]: 'Tag',
  [SortType.Series]: 'Series',
  [SortType.AgeRatings]: 'Age Rating',
  [SortType.Version]: 'Version',
  [SortType.Regions]: 'Region',
  [SortType.Source]: 'Source',
  [SortType.PlayCount]: 'Play Count',
  [SortType.Playtime]: 'Time Played',
  [SortType.CompletionStatus]: 'Completion Status',
  [SortType.UserScore]: 'User Score',
  [SortType.CriticScore]: 'Critic Score',
  [SortType.CommunityScore]: 'Community Score',
  [SortType.Added]: 'Date Added',
  [SortType.Modified]: 'Date Modified',
  [SortType.IsInstalled]: 'Installation Status',
  [SortType.Hidden]: 'Hidden',
  [SortType.Favorite]: 'Favorite',
  [SortType.InstallDirectory]: 'Installation Folder',
  [SortType.Features]: 'Feature',
  [SortType.InstallSize]: 'Install Size',
  [SortType.RecentActivity]: 'Recent Activity',
  [SortType.RomList]: 'Image, ROM or ISO Path',
}
