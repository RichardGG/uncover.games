import {
  type EnumFilterItemProperties,
  type FilterSettings,
  type IdItemFilterItemProperties,
  ScoreGroup,
} from '@/types/FilterTypes'
import type { Game } from '@/types/Game/Game'
import { getNameGroup } from '@/services/groupService'
import type { Tag } from '@/types/Game/GameFieldTypes'

// https://learn.microsoft.com/en-us/dotnet/api/system.guid.empty?view=net-9.0
const GuidEmpty = '00000000-0000-0000-0000-000000000000'
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Constants.cs#L30
const ListSeparator = ','
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/ViewModels/SearchViewModel.cs#L383
const defaultMinimumJaronWinklerSimilarity = 0.9
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L30C1-L30C112
const defaultWinklerWeightThreshold = 0.7 //Winkler's paper used a default value of 0.7
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L31
const winklerNumChars = 4 //Size of the prefix to be considered by the Winkler modification.
// https://github.com/JosefNemec/Playnite/blob/master/source/Playnite/ViewModels/SearchViewModel.cs#L370
const textMatchSplitter = ' ' // Note: string.split() in JS does not accept an array
// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Settings/FilterSettings.cs#L314
const MissingFieldString = '{}'

/**
 * The functions in this service are mostly a port of the GameDatabase_Filters functions from Playnite
 * Code parity is preserved as much as possible to keep maintenance simpler
 * https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Database/GameDatabase_Filters.cs#L672
 */

// TODO consider renaming Tag to DatabaseObject

function GetGameMatchesFilter(
  game: Game,
  filterSettings: FilterSettings,
  useFuzzyNameMatch: boolean
): boolean {
  if (!filterSettings) {
    if (game.Hidden) {
      return false
    } else {
      return true
    }
  }

  if (filterSettings.UseAndFilteringStyle) {
    return FilterByStyleAnd(game, filterSettings, useFuzzyNameMatch)
  } else {
    return FilterByStyleOr(game, filterSettings, useFuzzyNameMatch)
  }
}

export function GetFilteredGames(
  games: Array<Game>,
  filterSettings: FilterSettings|null,
  useFuzzyNameMatch: boolean
): Array<Game> {
  if (!filterSettings) {
    return games
  }
  const filteredGames: Array<Game> = []
  for (const game of games) {
    if (GetGameMatchesFilter(game, filterSettings, useFuzzyNameMatch)) {
      filteredGames.push(game)
    }
  }
  return filteredGames
}

function IsFilterMatching(
  filter: IdItemFilterItemProperties,
  idData: Array<string>,
  objectData: Array<Tag>
): boolean {
  if (objectData == null && (filter == null || !filter)) {
    return true
  }

  if (filter.Text) {
    if (objectData == null) {
      return false
    }

    return TextToTexts(filter.Text).some((text: string) =>
      objectData.some((tag: Tag) => tag.Name === text)
    )
  } else if (filter.Ids?.length) {
    if (filter.Ids.includes(GuidEmpty) && !idData.length) {
      return true
    } else if (!idData.length) {
      return false
    } else {
      return filter.Ids.some((id: string) => idData.includes(id))
    }
  } else {
    return true
  }
}

function IsFilterMatchingSingleOnly(
  filter: IdItemFilterItemProperties,
  idData: string,
  objectData: Tag
): boolean {
  if (objectData == null && (filter == null || !filter)) {
    return true
  }

  if (filter.Text) {
    if (objectData == null) {
      return false
    }

    return TextToTexts(filter.Text).every((t) =>
      objectData.Name?.toLowerCase().includes(t)
    )
  }
  if (filter.Ids?.length) {
    if (filter.Ids.length != 1) {
      return false
    }

    if (filter.Ids.includes(idData)) {
      return true
    }
  } else if (idData == GuidEmpty) {
    return true
  }

  return false
}

function IsFilterMatchingList(
  filter: IdItemFilterItemProperties,
  listData: Array<string>,
  objectData: Array<Tag>
): boolean {
  if (objectData == null && (filter == null || !filter)) {
    return true
  }

  if (filter.Text) {
    if (objectData == null) {
      return false
    }

    return TextToTexts(filter.Text).every((t) =>
      objectData.some((o: Tag) =>
        o.Name?.toLowerCase().includes(t.toLowerCase())
      )
    )
  }
  if (filter.Ids?.length) {
    if (
      filter.Ids.length == 1 &&
      filter.Ids[0] == GuidEmpty &&
      !listData.length
    ) {
      return true
    } else if (listData == null || !listData.length) {
      return false
    } else if (
      filter.Ids.filter((id: string) => listData.includes(id)).length !=
      filter.Ids.length
    ) {
      return false
    }
  } else if (listData != null && listData.length) {
    return false
  }

  return true
}

function IsFilterMatchingSingle(
  filter: IdItemFilterItemProperties,
  idData: string,
  objectData: Tag
): boolean {
  if (objectData == null && (filter == null || !filter)) {
    return true
  }

  if (filter.Text) {
    if (objectData == null) {
      return false
    }

    return (
      !objectData.Name ||
      ContainsPartOfString(TextToTexts(filter.Text), objectData.Name)
    )
  } else if (filter.Ids?.length) {
    if (filter.Ids?.includes(GuidEmpty) && idData == GuidEmpty) {
      return true
    } else if (idData == GuidEmpty) {
      return false
    } else {
      return filter.Ids.includes(idData)
    }
  } else {
    return true
  }
}

function IsScoreFilterMatching(
  filter: EnumFilterItemProperties,
  score: ScoreGroup
): boolean {
  return filter.Values?.includes(score) || false
}

function IsScoreFilterMatchingSingle(
  filter: EnumFilterItemProperties,
  score: ScoreGroup
): boolean {
  if (filter.Values?.length != 1) {
    return false
  }
  return filter.Values.includes(score)
}

function FilterByStyleAnd(
  game: Game,
  filterSettings: FilterSettings,
  useFuzzyNameMatch: boolean
) {
  // ------------------ Installed
  let installedResult = false
  if (
    (filterSettings.IsInstalled && filterSettings.IsUnInstalled) ||
    (!filterSettings.IsInstalled && !filterSettings.IsUnInstalled)
  ) {
    installedResult = true
  } else {
    if (filterSettings.IsInstalled && game.IsInstalled) {
      installedResult = true
    } else if (filterSettings.IsUnInstalled && !game.IsInstalled) {
      installedResult = true
    }
  }

  if (!installedResult) {
    return false
  }

  // ------------------ Hidden
  if (filterSettings.Hidden != game.Hidden) {
    return false
  }

  // ------------------ Favorite
  if (filterSettings.Favorite && !game.Favorite) {
    return false
  }

  // ------------------ Providers
  if (filterSettings.Library) {
    if (filterSettings.Library.Ids?.length != 1) {
      return false
    } else {
      if (
        game.PluginId &&
        filterSettings.Library.Ids?.includes(game.PluginId) == false
      ) {
        return false
      }
    }
  }

  // ------------------ Name filter
  if (!GetNameFilterResult(game, filterSettings, useFuzzyNameMatch)) {
    return false
  }

  // ------------------ Release Year
  if (filterSettings.ReleaseYear) {
    if (filterSettings.ReleaseYear.Values?.length != 1) {
      return false
    } else if (
      game.ReleaseDate == null ||
      !game.ReleaseYear ||
      !filterSettings.ReleaseYear.Values?.includes(`${game.ReleaseYear}`)
    ) {
      return false
    }
  }

  // ------------------ Playtime
  if (filterSettings.PlayTime) {
    if (filterSettings.PlayTime.Values?.length != 1) {
      return false
    } else if (filterSettings.PlayTime.Values[0] !== game.PlaytimeCategory) {
      return false
    }
  }

  // ------------------ InstallSize
  if (filterSettings.InstallSize) {
    if (filterSettings.InstallSize.Values?.length != 1) {
      return false
    } else if (filterSettings.InstallSize.Values[0] !== game.InstallSizeGroup) {
      return false
    }
  }

  // ------------------ Version
  if (
    filterSettings.Version &&
    game.Version?.toLowerCase()?.includes(
      filterSettings.Version?.toLowerCase()
    ) != true
  ) {
    return false
  }

  // ------------------ Completion Status
  if (filterSettings.CompletionStatuses) {
    if (
      !game.CompletionStatusId ||
      !game.CompletionStatus ||
      !IsFilterMatchingSingleOnly(
        filterSettings.CompletionStatuses,
        game.CompletionStatusId,
        game.CompletionStatus
      )
    ) {
      return false
    }
  }

  // ------------------ Last Activity
  if (filterSettings.LastActivity) {
    if (filterSettings.LastActivity.Values?.length != 1) {
      return false
    } else if (
      game.LastActivitySegment !== null &&
      !filterSettings.LastActivity.Values?.includes(game.LastActivitySegment)
    ) {
      return false
    }
  }

  // ------------------ Recent Activity
  if (filterSettings.RecentActivity) {
    if (filterSettings.RecentActivity.Values?.length != 1) {
      return false
    } else if (
      game.RecentActivitySegment !== null &&
      !filterSettings.RecentActivity.Values?.includes(
        game.RecentActivitySegment
      )
    ) {
      return false
    }
  }

  // ------------------ Added
  if (filterSettings.Added) {
    if (filterSettings.Added.Values?.length != 1) {
      return false
    } else if (
      game.AddedSegment !== null &&
      !filterSettings.Added.Values?.includes(game.AddedSegment)
    ) {
      return false
    }
  }

  // ------------------ Modified
  if (filterSettings.Modified) {
    if (filterSettings.Modified.Values?.length != 1) {
      return false
    } else if (
      game.ModifiedSegment !== null &&
      !filterSettings.Modified.Values?.includes(game.ModifiedSegment)
    ) {
      return false
    }
  }

  // ------------------ User Score
  if (filterSettings.UserScore != null) {
    if (
      !game.UserScoreGroup ||
      !IsScoreFilterMatchingSingle(
        filterSettings.UserScore,
        game.UserScoreGroup
      )
    ) {
      return false
    }
  }

  // ------------------ Community Score
  if (filterSettings.CommunityScore != null) {
    if (
      !game.CommunityScoreGroup ||
      !IsScoreFilterMatchingSingle(
        filterSettings.CommunityScore,
        game.CommunityScoreGroup
      )
    ) {
      return false
    }
  }

  // ------------------ Critic Score
  if (filterSettings.CriticScore != null) {
    if (
      !game.CriticScoreGroup ||
      !IsScoreFilterMatchingSingle(
        filterSettings.CriticScore,
        game.CriticScoreGroup
      )
    ) {
      return false
    }
  }

  // ------------------ Series filter
  if (filterSettings.Series) {
    if (
      !game.SeriesIds ||
      !game.Series ||
      !IsFilterMatchingList(filterSettings.Series, game.SeriesIds, game.Series)
    ) {
      return false
    }
  }

  // ------------------ Region filter
  if (filterSettings.Region) {
    if (
      !game.RegionIds ||
      !game.Regions ||
      !IsFilterMatchingList(filterSettings.Region, game.RegionIds, game.Regions)
    ) {
      return false
    }
  }

  // ------------------ Source filter
  if (filterSettings.Source) {
    if (
      !game.SourceId ||
      !game.Source ||
      !IsFilterMatchingSingleOnly(
        filterSettings.Source,
        game.SourceId,
        game.Source
      )
    ) {
      return false
    }
  }

  // ------------------ AgeRating filter
  if (filterSettings.AgeRating) {
    if (
      !game.AgeRatingIds ||
      !game.AgeRatings ||
      !IsFilterMatchingList(
        filterSettings.AgeRating,
        game.AgeRatingIds,
        game.AgeRatings
      )
    ) {
      return false
    }
  }

  // ------------------ Genre
  if (filterSettings.Genre) {
    if (
      !game.GenreIds ||
      !game.Genres ||
      !IsFilterMatchingList(filterSettings.Genre, game.GenreIds, game.Genres)
    ) {
      return false
    }
  }

  // ------------------ Platform
  if (filterSettings.Platform) {
    if (
      !game.PlatformIds ||
      !game.Platforms ||
      !IsFilterMatchingList(
        filterSettings.Platform,
        game.PlatformIds,
        game.Platforms
      )
    ) {
      return false
    }
  }

  // ------------------ Publisher
  if (filterSettings.Publisher) {
    if (
      !game.PublisherIds ||
      !game.Publishers ||
      !IsFilterMatchingList(
        filterSettings.Publisher,
        game.PublisherIds,
        game.Publishers
      )
    ) {
      return false
    }
  }

  // ------------------ Developer
  if (filterSettings.Developer) {
    if (
      !game.DeveloperIds ||
      !game.Developers ||
      !IsFilterMatchingList(
        filterSettings.Developer,
        game.DeveloperIds,
        game.Developers
      )
    ) {
      return false
    }
  }

  // ------------------ Category
  if (filterSettings.Category) {
    if (
      !game.CategoryIds ||
      !game.Categories ||
      !IsFilterMatchingList(
        filterSettings.Category,
        game.CategoryIds,
        game.Categories
      )
    ) {
      return false
    }
  }

  // ------------------ Tags
  if (filterSettings.Tag) {
    if (
      !game.TagIds ||
      !game.Tags ||
      !IsFilterMatchingList(filterSettings.Tag, game.TagIds, game.Tags)
    ) {
      return false
    }
  }

  // ------------------ Features
  if (filterSettings.Feature) {
    if (
      !game.FeatureIds ||
      !game.Features ||
      !IsFilterMatchingList(
        filterSettings.Feature,
        game.FeatureIds,
        game.Features
      )
    ) {
      return false
    }
  }

  return true
}

function FilterByStyleOr(
  game: Game,
  filterSettings: FilterSettings,
  useFuzzyNameMatch: boolean
): boolean {
  // ------------------ Installed
  let installedResult = false
  if (
    (filterSettings.IsInstalled && filterSettings.IsUnInstalled) ||
    (!filterSettings.IsInstalled && !filterSettings.IsUnInstalled)
  ) {
    installedResult = true
  } else {
    if (filterSettings.IsInstalled && game.IsInstalled) {
      installedResult = true
    } else if (filterSettings.IsUnInstalled && !game.IsInstalled) {
      installedResult = true
    }
  }

  if (!installedResult) {
    return false
  }

  // ------------------ Hidden
  let hiddenResult = true
  if (filterSettings.Hidden && game.Hidden) {
    hiddenResult = true
  } else if (!filterSettings.Hidden && game.Hidden) {
    return false
  } else if (filterSettings.Hidden && !game.Hidden) {
    return false
  }

  if (!hiddenResult) {
    return false
  }

  // ------------------ Favorite
  let favoriteResult = false
  if (filterSettings.Favorite && game.Favorite) {
    favoriteResult = true
  } else if (!filterSettings.Favorite) {
    favoriteResult = true
  }

  if (!favoriteResult) {
    return false
  }

  // ------------------ Providers
  let librariesFilter = false
  if (filterSettings.Library) {
    librariesFilter =
      game.PluginId !== null &&
      filterSettings.Library.Ids?.includes(game.PluginId) == true
  } else {
    librariesFilter = true
  }

  if (!librariesFilter) {
    return false
  }

  // ------------------ Name filter
  if (!GetNameFilterResult(game, filterSettings, useFuzzyNameMatch)) {
    return false
  }

  // ------------------ Release Year
  if (filterSettings.ReleaseYear) {
    if (
      game.ReleaseDate == null &&
      !filterSettings.ReleaseYear.Values?.includes(MissingFieldString)
    ) {
      return false
    } else if (
      game.ReleaseDate != null &&
      (!game.ReleaseYear ||
        !filterSettings.ReleaseYear.Values?.includes(`${game.ReleaseYear}`))
    ) {
      return false
    }
  }

  // ------------------ Playtime
  if (
    filterSettings.PlayTime &&
    (!game.PlaytimeCategory ||
      !filterSettings.PlayTime.Values?.includes(game.PlaytimeCategory))
  ) {
    return false
  }

  // ------------------ InstallSize
  if (
    filterSettings.InstallSize &&
    (!game.InstallSizeGroup ||
      !filterSettings.InstallSize.Values?.includes(game.InstallSizeGroup))
  ) {
    return false
  }

  // ------------------ Version
  if (
    filterSettings.Version &&
    game.Version?.toLowerCase().includes(
      filterSettings.Version.toLowerCase()
    ) != true
  ) {
    return false
  }

  // ------------------ Completion Status
  if (filterSettings.CompletionStatuses) {
    if (
      !game.CompletionStatusId ||
      !game.CompletionStatus ||
      !IsFilterMatchingSingle(
        filterSettings.CompletionStatuses,
        game.CompletionStatusId,
        game.CompletionStatus
      )
    ) {
      return false
    }
  }

  // ------------------ Last Activity
  if (
    !game.LastActivitySegment ||
    (filterSettings.LastActivity &&
      !filterSettings.LastActivity.Values?.includes(game.LastActivitySegment))
  ) {
    return false
  }

  // ------------------ Recent Activity
  if (
    !game.RecentActivitySegment ||
    (filterSettings.RecentActivity &&
      !filterSettings.RecentActivity.Values?.includes(
        game.RecentActivitySegment
      ))
  ) {
    return false
  }

  // ------------------ Added
  if (
    !game.AddedSegment ||
    (filterSettings.Added &&
      !filterSettings.Added.Values?.includes(game.AddedSegment))
  ) {
    return false
  }

  // ------------------ Modified
  if (
    !game.ModifiedSegment ||
    (filterSettings.Modified &&
      !filterSettings.Modified.Values?.includes(game.ModifiedSegment))
  ) {
    return false
  }

  // ------------------ User Score
  if (filterSettings.UserScore != null) {
    if (
      !game.UserScoreGroup ||
      !IsScoreFilterMatching(filterSettings.UserScore, game.UserScoreGroup)
    ) {
      return false
    }
  }

  // ------------------ Community Score
  if (filterSettings.CommunityScore != null) {
    if (
      !game.CommunityScoreGroup ||
      !IsScoreFilterMatching(
        filterSettings.CommunityScore,
        game.CommunityScoreGroup
      )
    ) {
      return false
    }
  }

  // ------------------ Critic Score
  if (filterSettings.CriticScore != null) {
    if (
      !game.CriticScoreGroup ||
      !IsScoreFilterMatching(filterSettings.CriticScore, game.CriticScoreGroup)
    ) {
      return false
    }
  }

  // ------------------ Series filter
  if (filterSettings.Series) {
    if (
      !game.SeriesIds ||
      !game.Series ||
      !IsFilterMatching(filterSettings.Series, game.SeriesIds, game.Series)
    ) {
      return false
    }
  }

  // ------------------ Region filter
  if (filterSettings.Region) {
    if (
      !game.RegionIds ||
      !game.Regions ||
      !IsFilterMatching(filterSettings.Region, game.RegionIds, game.Regions)
    ) {
      return false
    }
  }

  // ------------------ Source filter
  if (filterSettings.Source) {
    if (
      !game.SourceId ||
      !game.Source ||
      !IsFilterMatchingSingle(filterSettings.Source, game.SourceId, game.Source)
    ) {
      return false
    }
  }

  // ------------------ AgeRating filter
  if (filterSettings.AgeRating) {
    if (
      !game.AgeRatingIds ||
      !game.AgeRatings ||
      !IsFilterMatching(
        filterSettings.AgeRating,
        game.AgeRatingIds,
        game.AgeRatings
      )
    ) {
      return false
    }
  }

  // ------------------ Genre
  if (filterSettings.Genre) {
    if (
      !game.GenreIds ||
      !game.Genres ||
      !IsFilterMatching(filterSettings.Genre, game.GenreIds, game.Genres)
    ) {
      return false
    }
  }

  // ------------------ Platform
  if (filterSettings.Platform) {
    if (
      !game.PlatformIds ||
      !game.Platforms ||
      !IsFilterMatching(
        filterSettings.Platform,
        game.PlatformIds,
        game.Platforms
      )
    ) {
      return false
    }
  }

  // ------------------ Publisher
  if (filterSettings.Publisher) {
    if (
      !game.PublisherIds ||
      !game.Publishers ||
      !IsFilterMatching(
        filterSettings.Publisher,
        game.PublisherIds,
        game.Publishers
      )
    ) {
      return false
    }
  }

  // ------------------ Developer
  if (filterSettings.Developer) {
    if (
      !game.DeveloperIds ||
      !game.Developers ||
      !IsFilterMatching(
        filterSettings.Developer,
        game.DeveloperIds,
        game.Developers
      )
    ) {
      return false
    }
  }

  // ------------------ Category
  if (filterSettings.Category) {
    if (
      !game.CategoryIds ||
      !game.Categories ||
      !IsFilterMatching(
        filterSettings.Category,
        game.CategoryIds,
        game.Categories
      )
    ) {
      return false
    }
  }

  // ------------------ Tags
  if (filterSettings.Tag) {
    if (
      !game.TagIds ||
      !game.Tags ||
      !IsFilterMatching(filterSettings.Tag, game.TagIds, game.Tags)
    ) {
      return false
    }
  }

  // ------------------ Features
  if (filterSettings.Feature) {
    if (
      !game.FeatureIds ||
      !game.Features ||
      !IsFilterMatching(filterSettings.Feature, game.FeatureIds, game.Features)
    ) {
      return false
    }
  }

  return true
}

function GetNameFilterResult(
  game: Game,
  filterSettings: FilterSettings,
  useFuzzyMatch: boolean
): boolean {
  if (!filterSettings.Name) {
    return true
  }

  if (!game.Name) {
    return false
  }

  if (filterSettings.Name?.length >= 2 && filterSettings.Name[0] == '^') {
    return getNameGroup(game.Name) == filterSettings.Name[1]
  }

  if (!useFuzzyMatch || (filterSettings.Name[0] == '!' && useFuzzyMatch)) {
    return (
      game.Name.toLowerCase().indexOf(
        filterSettings.Name.substring(1).toLowerCase()
      ) >= 0
    )
  }

  return MatchTextFilter(filterSettings.Name, game.Name, true)
}

// https://github.com/JosefNemec/Playnite/blob/master/source/Playnite/ViewModels/SearchViewModel.cs#L659
function MatchTextFilter(
  filter: string,
  toMatch: string,
  matchTargetAcronymStart: boolean,
  minimumJaronWinklerSimilarity: number = defaultMinimumJaronWinklerSimilarity
): boolean {
  if (IsNullOrWhiteSpace(filter)) {
    return true
  }

  if (!IsNullOrWhiteSpace(filter) && IsNullOrWhiteSpace(toMatch)) {
    return false
  }

  if (IsNullOrWhiteSpace(filter) && IsNullOrWhiteSpace(toMatch)) {
    return true
  }

  if (
    GetJaroWinklerSimilarityIgnoreCase(filter, toMatch) >=
    minimumJaronWinklerSimilarity
  ) {
    return true
  }

  if (filter.length > toMatch.length) {
    return false
  }

  if (matchTargetAcronymStart && IsStartOfStringAcronym(filter, toMatch)) {
    return true
  }

  const filterSplit: Array<string> = filter
    .split(textMatchSplitter)
    .filter((entry) => entry)
  const toMatchSplit = toMatch.split(textMatchSplitter).filter((entry) => entry)
  let allMatch = true
  // This is pretty crude, but it works for most cases and provides relatively good results.
  // TODO definitely could use some improvements for better fuzzy results.
  for (const word in filterSplit) {
    if (
      !toMatchSplit.some((a: string) =>
        ContainsInvariantCulture(a, word, {
          IgnoreCase: true,
          IgnoreSymbols: true,
          IgnoreNonSpace: true,
        })
      )
    ) {
      allMatch = false
      break
    }
  }

  return allMatch
}

type CompareOptions = {
  IgnoreCase: boolean
  IgnoreSymbols: boolean
  IgnoreNonSpace: boolean
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L360
function ContainsInvariantCulture(
  source: string,
  value: string,
  compareOptions: CompareOptions
): boolean {
  // https://learn.microsoft.com/en-us/dotnet/api/system.globalization.compareoptions?view=net-9.0
  if (compareOptions.IgnoreCase) {
    source = source.toLowerCase()
    value = value.toLowerCase()
  }
  if (compareOptions.IgnoreSymbols) {
    source = OnlyLettersOrDigits(source)
    value = OnlyLettersOrDigits(value)
  }
  if (compareOptions.IgnoreNonSpace) {
    // TODO
  }
  return source.indexOf(value) >= 0
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L105
function IsStartOfStringAcronym(acronymStart: string, input: string): boolean {
  if (
    IsNullOrEmpty(input) ||
    IsNullOrEmpty(acronymStart) ||
    acronymStart.length < 2 ||
    acronymStart.length > input.length
  ) {
    return false
  }

  for (let i = 0; i < acronymStart.length; i++) {
    if (!IsLetterOrDigit(acronymStart[i])) {
      return false
    }
  }

  let acronymIndex = 0
  for (let i = 0; i < input.length; i++) {
    if (IsLetterOrDigit(input[i]) && (i == 0 || input[i - 1] == ' ')) {
      if (input[i].toUpperCase() != acronymStart[acronymIndex].toUpperCase()) {
        return false
      } else {
        acronymIndex++
        // If the acronym index and acronym start length is the same
        // it means all the characters have been matched
        if (acronymIndex == acronymStart.length) {
          return true
        }
      }
    }
  }

  return false
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/PlayniteSDK/Extensions/ListExtensions.cs#L191C113-L191C123
function ContainsPartOfString(source: Array<string>, value: string): boolean {
  // TODO consider support for: comparison: StringComparison = StringComparison.InvariantCultureIgnoreCase
  return source?.some((a: string) => value?.indexOf(a) >= 0) == true
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Settings/FilterSettings.cs#L213
function TextToTexts(text: string): Array<string> {
  if (text?.includes(ListSeparator) == true) {
    return text
      .split(ListSeparator)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length)
  } else {
    return [text]
  }
}

function OnlyLettersOrDigits(str: string): string {
  return str.replace(RegExp(/^\p{L}/u, 'u'), '')
}

function IsLetterOrDigit(str: string): boolean {
  return RegExp(/^\p{L}/u, 'u').test(str)
}

function IsNullOrEmpty(source: string): boolean {
  return !source
}

function IsNullOrWhiteSpace(text: string): boolean {
  return !text || !text.trim()
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L14
function charCaseInsensitiveComparer(x: string, y: string): boolean {
  return x.toUpperCase() === y.toUpperCase()
}

// function charDefaultComparer(x: string, y: string): boolean {
//   return x === y
// }

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L439C1-L447C10
function GetJaroWinklerSimilarityIgnoreCase(
  str: string,
  str2: string,
  winklerWeightThreshold: number = defaultWinklerWeightThreshold
): number {
  return GetJaroWinklerSimilarity(
    str,
    str2,
    charCaseInsensitiveComparer,
    winklerWeightThreshold
  )
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L439C1-L447C10
// function GetJaroWinklerSimilarityRespectCase(
//   str: string,
//   str2: string,
//   winklerWeightThreshold: number = defaultWinklerWeightThreshold
// ): number {
//   return GetJaroWinklerSimilarity(
//     str,
//     str2,
//     charDefaultComparer,
//     winklerWeightThreshold
//   )
// }

interface IEqualityComparer {
  (a: string, b: string): boolean
}

// https://github.com/JosefNemec/Playnite/blob/0d6ecf6e0aa1f613c05411a8a1f94b4ba13ded6e/source/Playnite/Common/Extensions/StringExtensions.cs#L459
function GetJaroWinklerSimilarity(
  str: string,
  str2: string,
  comparer: IEqualityComparer,
  winklerWeightThreshold: number = defaultWinklerWeightThreshold
): number {
  const lLen1 = str.length
  const lLen2 = str2.length
  if (lLen1 == 0) {
    return lLen2 == 0 ? 1.0 : 0.0
  }

  const lSearchRange = Math.max(0, Math.max(lLen1, lLen2) / 2 - 1)

  const lMatched1: Array<boolean> = [!!lLen1]
  const lMatched2: Array<boolean> = [!!lLen2]

  let lNumCommon = 0
  for (let i = 0; i < lLen1; ++i) {
    const lStart = Math.max(0, i - lSearchRange)
    const lEnd = Math.min(i + lSearchRange + 1, lLen2)
    for (let j = lStart; j < lEnd; ++j) {
      if (lMatched2[j]) {
        continue
      }

      if (!comparer(str[i], str2[j])) {
        continue
      }

      lMatched1[i] = true
      lMatched2[j] = true
      ++lNumCommon
      break
    }
  }

  if (lNumCommon == 0) {
    return 0.0
  }

  let lNumHalfTransposed = 0
  let k = 0
  for (let i = 0; i < lLen1; ++i) {
    if (!lMatched1[i]) {
      continue
    }

    while (!lMatched2[k]) {
      ++k
    }

    if (!comparer(str[i], str2[k])) {
      ++lNumHalfTransposed
    }

    ++k
  }

  const lNumTransposed = lNumHalfTransposed / 2
  const lNumCommonD: number = lNumCommon
  const lWeight =
    (lNumCommonD / lLen1 +
      lNumCommonD / lLen2 +
      (lNumCommon - lNumTransposed) / lNumCommonD) /
    3.0

  if (lWeight <= winklerWeightThreshold) {
    return lWeight
  }

  const lMax = Math.min(winklerNumChars, Math.min(str.length, str2.length))
  let lPos = 0
  while (lPos < lMax && comparer(str[lPos], str2[lPos])) {
    ++lPos
  }

  if (lPos == 0) {
    return lWeight
  }

  return lWeight + 0.1 * lPos * (1.0 - lWeight)
}
