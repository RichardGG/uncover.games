// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/PlayniteSDK/Models/FilterPreset.cs#L52C5-L81C6
export enum GroupableField {
    None = 0,
    Platform = 1,
    Library = 2,
    Category = 3,
    LastActivity = 4,
    Genre = 5,
    ReleaseYear = 6,
    Developer = 7,
    Publisher = 8,
    Tag = 9,
    Series = 10,
    AgeRating = 11,
    Region = 12,
    Source = 13,
    PlayTime = 14,
    CompletionStatus = 15,
    UserScore = 16,
    CriticScore = 17,
    CommunityScore = 18,
    Added = 19,
    Modified = 20,
    Feature = 21,
    InstallationStatus = 22,
    Name = 23,
    InstallDrive = 24,
    InstallSize = 25,
    RecentActivity = 26
}

export const groupableFieldTranslations: Record<GroupableField, string> =  {
  [GroupableField.None]: 'Don\'t group',
  [GroupableField.Platform]: 'Platform',
  [GroupableField.Library]: 'Library',
  [GroupableField.Category]: 'Category',
  [GroupableField.LastActivity]: 'Last Played',
  [GroupableField.Genre]: 'Genre',
  [GroupableField.ReleaseYear]: 'Release Year',
  [GroupableField.Developer]: 'Developer',
  [GroupableField.Publisher]: 'Publisher',
  [GroupableField.Tag]: 'Tag',
  [GroupableField.Series]: 'Series',
  [GroupableField.AgeRating]: 'Age Rating',
  [GroupableField.Region]: 'Region',
  [GroupableField.Source]: 'Source',
  [GroupableField.PlayTime]: 'Time Played',
  [GroupableField.CompletionStatus]: 'Completion Status',
  [GroupableField.UserScore]: 'User Score',
  [GroupableField.CriticScore]: 'Critic Score',
  [GroupableField.CommunityScore]: 'Community Score',
  [GroupableField.Added]: 'Date Added',
  [GroupableField.Modified]: 'Date Modified',
  [GroupableField.Feature]: 'Feature',
  [GroupableField.InstallationStatus]: 'Installation Status',
  [GroupableField.Name]: 'Name',
  [GroupableField.InstallDrive]: 'Install Drive',
  [GroupableField.InstallSize]: 'Install Size',
  [GroupableField.RecentActivity]: 'Recent Activity',
}