// TODO this is the wrong thing to use, probably should just use SortOrder directly and translate after
export type Sort = {
  label: string | null;
  value: SortOrder | null;
};


// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/PlayniteSDK/Models/FilterPreset.cs#L11C5-L44C6
export enum SortOrder
{
    Name = 0,
    Platforms = 1,
    Library = 2,
    Categories = 3,
    LastActivity = 4,
    Genres = 5,
    ReleaseDate = 6,
    Developers = 7,
    Publishers = 8,
    Tags = 9,
    Series = 10,
    AgeRatings = 11,
    Version = 12,
    Regions = 13,
    Source = 14,
    PlayCount = 15,
    Playtime = 16,
    CompletionStatus = 17,
    UserScore = 18,
    CriticScore = 19,
    CommunityScore = 20,
    Added = 21,
    Modified = 22,
    IsInstalled = 23,
    Hidden = 24,
    Favorite = 25,
    InstallDirectory = 26,
    Features = 27,
    InstallSize = 28,
    RecentActivity = 29,
    RomList = 30,
}

export const sortOrderTranslations: Record<SortOrder, string> =  {
  [SortOrder.Name]: 'Name',
  [SortOrder.Platforms]: 'Platform',
  [SortOrder.Library]: 'Library',
  [SortOrder.Categories]: 'Category',
  [SortOrder.LastActivity]: 'Last Played',
  [SortOrder.Genres]: 'Genre',
  [SortOrder.ReleaseDate]: 'Release Year',
  [SortOrder.Developers]: 'Developer',
  [SortOrder.Publishers]: 'Publisher',
  [SortOrder.Tags]: 'Tag',
  [SortOrder.Series]: 'Series',
  [SortOrder.AgeRatings]: 'Age Rating',
  [SortOrder.Version]: 'Version',
  [SortOrder.Regions]: 'Region',
  [SortOrder.Source]: 'Source',
  [SortOrder.PlayCount]: 'Play Count',
  [SortOrder.Playtime]: 'Time Played',
  [SortOrder.CompletionStatus]: 'Completion Status',
  [SortOrder.UserScore]: 'User Score',
  [SortOrder.CriticScore]: 'Critic Score',
  [SortOrder.CommunityScore]: 'Community Score',
  [SortOrder.Added]: 'Date Added',
  [SortOrder.Modified]: 'Date Modified',
  [SortOrder.IsInstalled]: 'Installation Status',
  [SortOrder.Hidden]: 'Hidden',
  [SortOrder.Favorite]: 'Favorite',
  [SortOrder.InstallDirectory]: 'Installation Folder',
  [SortOrder.Features]: 'Feature',
  [SortOrder.InstallSize]: 'Install Size',
  [SortOrder.RecentActivity]: 'Recent Activity',
  [SortOrder.RomList]: 'Image, ROM or ISO Path',
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/PlayniteSDK/Models/FilterPreset.cs#L46C1-L50C6
export enum SortOrderDirection
{
    Ascending = 0,
    Descending = 1
}

export const sortOrderDirectionTranslations: Record<SortOrderDirection, string> = {
  [SortOrderDirection.Ascending]: 'Ascending',
  [SortOrderDirection.Descending]: 'Descending',
}