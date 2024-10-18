import { defineStore } from 'pinia'

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
  value: string | null,
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

    arrayFilter(ids: Array<string> | null, filter: TagFilter | null): boolean | null {
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

    idFilter(id: string | null, filter: TagFilter | null): boolean | null {
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
      // Return early if using quick search and it doesn't match
      if (this.search && !(game.Name?.toLowerCase()?.includes(this.search.toLowerCase()) ?? false)) {
        return false
      }

      if (!this.currentFilter.Settings) {
        // Default to not showing Hidden
        return !game.Hidden
      }

      const keys = Object.keys(this.currentFilter.Settings) as Array<keyof typeof this.currentFilter.Settings>;
      let matchedKey = false

      // TODO change logic so it can be AND instead of OR
      for (const key of keys) {
        const value = this.currentFilter.Settings[key]
        if (!value) {
          continue
        }

        let result: boolean | null = null
        // UseAndFilteringStyle: boolean,
        if (key === 'IsUnInstalled' && this.currentFilter.Settings.IsUnInstalled) {
          result = !game.IsInstalled
          matchedKey = true
        }
        if (key === 'IsInstalled' && this.currentFilter.Settings.IsInstalled) {
          result = game.IsInstalled
          matchedKey = true
        }
        if (key === 'Hidden') {
          // TODO check if this matches the playnite behaviour
          if (this.currentFilter.Settings.Hidden) {
            result = game.Hidden
          } else {
            result = !game.Hidden
          }
        }
        if (key === 'Favorite' && this.currentFilter.Settings.Favorite) {
          matchedKey = true
          result = game.Favorite
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
          matchedKey = true
          result = this.arrayFilter(game.GenreIds, this.currentFilter.Settings.Genre)
        }
        if (key === 'Platform') {
          matchedKey = true
          result = this.arrayFilter(game.PlatformIds, this.currentFilter.Settings.Platform)
        }
        if (key === 'Publisher') {
          matchedKey = true
          result = this.arrayFilter(game.PublisherIds, this.currentFilter.Settings.Publisher)
        }
        if (key === 'Developer') {
          matchedKey = true
          result = this.arrayFilter(game.DeveloperIds, this.currentFilter.Settings.Developer)
        }
        if (key === 'Category') {
          matchedKey = true
          result = this.arrayFilter(game.CategoryIds, this.currentFilter.Settings.Category)
        }
        if (key === 'Tag') {
          matchedKey = true
          result = this.arrayFilter(game.TagIds, this.currentFilter.Settings.Tag)
        }
        if (key === 'Series') {
          matchedKey = true
          result = this.arrayFilter(game.SeriesIds, this.currentFilter.Settings.Series)
        }
        if (key === 'Region') {
          matchedKey = true
          result = this.arrayFilter(game.RegionIds, this.currentFilter.Settings.Region)
        }
        if (key === 'Source') {
          matchedKey = true
          result = this.idFilter(game.SourceId, this.currentFilter.Settings.Source)
        }
        if (key === 'AgeRating') {
          matchedKey = true
          result = this.arrayFilter(game.AgeRatingIds, this.currentFilter.Settings.AgeRating)
        }
        if (key === 'Library') {
          // TODO what is Library?
          // result = this.arrayFilter(game.Library, this.currentFilter.Settings.Library)
        }
        if (key === 'Feature') {
          matchedKey = true
          result = this.arrayFilter(game.FeatureIds, this.currentFilter.Settings.Feature)
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
          matchedKey = true
          result = this.idFilter(game.CompletionStatusId, this.currentFilter.Settings.CompletionStatuses)
        }

        // TODO handle early escape differently depending if AND or OR
        if (result === true) {
          return true
        } else {
        }
      }
      if (!matchedKey) {
        return true
      }
      return false
    }
  }
})
