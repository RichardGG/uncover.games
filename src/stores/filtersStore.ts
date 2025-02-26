import { defineStore } from 'pinia'
import { Filter, Sort } from 'src/types/Filters'
import { Game } from 'src/types/Game/Game'

export type FiltersState = {
  currentFilter: Filter,
  sort: Sort | null,
  sortDesc: boolean,
  search: string,
  view: string,
  game: Game|null,
}

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
  }
})
