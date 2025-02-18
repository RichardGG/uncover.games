import { defineStore } from 'pinia'
import { GameField } from 'src/types/Game/GameField'

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
  value: GameField | null,
}

export type FiltersState = {
  currentFilter: Filter,
  sort: Sort | null,
  sortDesc: boolean,
  search: string,
  view: string,
  game: Game|null,
}

import { intersection } from 'lodash'
import { Game } from 'src/types/Game/Game'

export const useFiltersStore = defineStore('filtersStore', {
  state: (): FiltersState => ({
    currentFilter: {
      Settings: null,
      Id: null,
      Name: null,
      GroupingOrder: null,
      SortingOrder: null,
      SortingOrderDirection: null,
    },
    sort: {
      label: 'Name',
      value: 'Name',
    },
    sortDesc: false,
    search: '',
    view: 'table',
    game: null,
  }),
  actions: {
    initStore() {
      // Load current state from local storage
      const filterJson = window.localStorage.getItem('currentFilter')
      if (filterJson) {
        this.currentFilter = JSON.parse(filterJson)
      }
      const sortJson = window.localStorage.getItem('sort')
      if (sortJson) {
        this.sort = JSON.parse(sortJson)
      }
      const sortDescJson = window.localStorage.getItem('sortDesc')
      if (sortDescJson) {
        this.sortDesc = JSON.parse(sortDescJson)
      }
      const viewJson = window.localStorage.getItem('view')
      if (viewJson) {
        this.view = JSON.parse(viewJson)
      }

      this.$subscribe((mutation, state) => {
        window.localStorage.setItem('currentFilter', JSON.stringify(state.currentFilter))
        window.localStorage.setItem('sort', JSON.stringify(state.sort))
        window.localStorage.setItem('sortDesc', JSON.stringify(state.sortDesc))
        window.localStorage.setItem('view', JSON.stringify(state.view))
      })
    },

    arrayFilter(ids: Array<string> | null, filter: TagFilter | null | undefined): boolean | null {
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
    },

    idFilter(id: string | null, filter: TagFilter | null | undefined): boolean | null {
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
    },

    matchesFilter(game: Game): boolean {
      // Checks if a game matches a filter set

      // Return early if using quick search and it doesn't match
      if (this.search && !(game.Name?.toLowerCase()?.includes(this.search.toLowerCase()) ?? false)) {
        return false
      }

      if (!this.currentFilter.Settings) {
        // Default to not showing Hidden
        // TODO should we remove this?
        return !game.Hidden
      }

      const keys = Object.keys(this.currentFilter.Settings) as Array<keyof typeof this.currentFilter.Settings>;
      const andStyle = this.currentFilter.Settings?.UseAndFilteringStyle

      for (const key of keys) {
        const value = this.currentFilter.Settings[key]
        if (!value) {
          continue
        }

        const matches: boolean = this.matchesCondition(game, key)

        if (andStyle && !matches) {
            // AND style, stop searching if any condition doesn't match
            return false
        }
        if (!andStyle && matches) {
          // OR style, stop searching if any condition matches
          return true
        }
      }
      // If AND and didn't previously fail return true
      // If OR and didn't previously pass return false
      return andStyle || false
    },

    matchesCondition(game: Game, key: keyof typeof this.currentFilter.Settings): boolean {
      if (key === 'IsUnInstalled' && this.currentFilter.Settings?.IsUnInstalled) {
        return !game.IsInstalled
      }
      if (key === 'IsInstalled' && this.currentFilter.Settings?.IsInstalled) {
        return game.IsInstalled
      }
      if (key === 'Hidden') {
        // TODO check if this matches the playnite behaviour
        if (this.currentFilter.Settings?.Hidden) {
          return game.Hidden
        } else {
          return !game.Hidden
        }
      }
      if (key === 'Favorite' && this.currentFilter.Settings?.Favorite) {
        return game.Favorite
      }
      if (key === 'Name') {
        // TODO check how this filter works contains?
      }
      if (key === 'Version') {
        // TODO check how this filter works === ?
      }
      if (key === 'ReleaseYear') {
        // TODO check how this filter works === ?
      }
      if (key === 'Genre') {
        return this.arrayFilter(game.GenreIds, this.currentFilter.Settings?.Genre) || false
      }
      if (key === 'Platform') {
        return this.arrayFilter(game.PlatformIds, this.currentFilter.Settings?.Platform) || false
      }
      if (key === 'Publisher') {
        return this.arrayFilter(game.PublisherIds, this.currentFilter.Settings?.Publisher) || false
      }
      if (key === 'Developer') {
        return this.arrayFilter(game.DeveloperIds, this.currentFilter.Settings?.Developer) || false
      }
      if (key === 'Category') {
        return this.arrayFilter(game.CategoryIds, this.currentFilter.Settings?.Category) || false
      }
      if (key === 'Tag') {
        return this.arrayFilter(game.TagIds, this.currentFilter.Settings?.Tag) || false
      }
      if (key === 'Series') {
        return this.arrayFilter(game.SeriesIds, this.currentFilter.Settings?.Series) || false
      }
      if (key === 'Region') {
        return this.arrayFilter(game.RegionIds, this.currentFilter.Settings?.Region) || false
      }
      if (key === 'Source') {
        return this.idFilter(game.SourceId, this.currentFilter.Settings?.Source) || false
      }
      if (key === 'AgeRating') {
        return this.arrayFilter(game.AgeRatingIds, this.currentFilter.Settings?.AgeRating) || false
      }
      if (key === 'Library') {
        // TODO what is Library?
        // return this.arrayFilter(game.Library, this.currentFilter.Settings?.Library) || false
      }
      if (key === 'Feature') {
        return this.arrayFilter(game.FeatureIds, this.currentFilter.Settings?.Feature) || false
      }
      if (key === 'UserScore') {
        // TODO
      }
      if (key === 'CriticScore') {
        // TODO
      }
      if (key === 'CommunityScore') {
        // TODO
      }
      if (key === 'LastActivity') {
        // TODO
      }
      if (key === 'RecentActivity') {
        // TODO
      }
      if (key === 'Added') {
        // TODO
      }
      if (key === 'Modified') {
        // TODO
      }
      if (key === 'PlayTime') {
        // TODO
      }
      if (key === 'InstallSize') {
        // TODO
      }
      if (key === 'CompletionStatuses') {
        return this.idFilter(game.CompletionStatusId, this.currentFilter.Settings?.CompletionStatuses) || false
      }

      // Unknown filter, if AND allow to pass, if OR don't match
      return this.currentFilter.Settings?.UseAndFilteringStyle || false
    }
  }
})
