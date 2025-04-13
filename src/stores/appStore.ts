import { defineStore } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { nextTick } from 'vue'
import type { Game } from '@/types/Game/Game'
import { emptyFilter, type FilterPreset } from '@/types/FilterTypes'
import { useCollectionsStore } from '@/stores/collectionsStore'
import { GetFilteredGames } from '@/services/filterService'
import { sortGames } from '@/services/sortService'
import { GroupableField } from '@/types/GroupTypes'
import { SortOrder, SortOrderDirection } from '@/types/SortTypes'
import { getGroups, type GameGroup } from '@/services/groupService'

export type AppState = {
  gameOpen: Game | null
  customFilterOpen: boolean
  gameExpanded: boolean
  preferredCoverSize: number
  coversPerRow: number
  lastSelectedCoversPerRow: number
  layout: 'table' | 'covers'
  currentFilter: FilterPreset
}

const { width } = useWindowSize()

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    gameOpen: null,
    customFilterOpen: false,
    gameExpanded: false,
    preferredCoverSize: 200,
    coversPerRow: 4,
    lastSelectedCoversPerRow: 4,
    layout: 'covers',
    currentFilter: {
      Settings: emptyFilter,
      Id: null,
      Name: null,
      GroupingOrder: GroupableField.None,
      SortingOrder: SortOrder.Name,
      SortingOrderDirection: SortOrderDirection.Ascending,
    },
  }),
  getters: {
    isMobile: () => width.value < 768,
    games(state) {
      const collectionsStore = useCollectionsStore()
      if (!collectionsStore.collections?.Games?.length) {
        return []
      }
      let games = GetFilteredGames(
        collectionsStore.collections?.Games,
        state.currentFilter.Settings,
        false
      )
      games = sortGames(
        games,
        state.currentFilter.SortingOrder,
        state.currentFilter.SortingOrderDirection,
      )
      return games
    },
    groupedGames(state): GameGroup[] {
      if (!this.games) {
        return []
      }
      return getGroups(this.games, state.currentFilter.GroupingOrder)
    },
    releaseYears: () => {
      const collectionsStore = useCollectionsStore()
      if (!collectionsStore.collections?.Games?.length) {
        return []
      }
      return collectionsStore.collections.Games.reduce((uniqueArray: number[], game: Game) => {
        if (game.ReleaseYear && uniqueArray.indexOf(game.ReleaseYear) == -1) {
          uniqueArray.push(game.ReleaseYear)
        }
        return uniqueArray
      }, []).sort((a, b) => b - a)
    }
  },
  actions: {
    init() {
      // Load current state from local storage
      const storeJson = window.localStorage.getItem('appStore');
      if (storeJson) {
        const previousState = JSON.parse(storeJson)

        this.preferredCoverSize = previousState.preferredCoverSize
        this.coversPerRow = previousState.coversPerRow
        this.layout = previousState.layout
        this.currentFilter = previousState.currentFilter
      }

      // On state change, update local storage
      this.$subscribe((_mutation, state) => {
      window.localStorage.setItem(
        'appStore',
        JSON.stringify({
          preferredCoverSize: state.preferredCoverSize,
          coversPerRow: state.coversPerRow,
          layout: state.layout,
          currentFilter: state.currentFilter,
        })
      )
      })
    },
    loadFromUrl() {
      const matches: string[] | null =
        window.location.pathname.match(/^\/game\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/)
      if (matches) {
        // We will open a game route, but we should make sure the view without the game is loaded initially
        window.history.replaceState({}, '', '/')
        // this.setGame(this.gamesatches[1])
        // TODO we will need to wait until the games are loaded, maybe set the uuid in the store
      } else {
        this.gameOpen = null
      }
    },
    updateUrl(push: boolean = false) {
      // General rule, only pushState when navigating deeper, when switching within the same view: replaceState
      let path = '/'
      if (this.gameOpen !== null) {
        path = `/game/${this.gameOpen.Id}`
      }
      if (push) {
        nextTick(() => window.history.pushState({}, '', path))
      } else {
        window.history.replaceState({}, '', path)
      }
    },
    setGame(game: Game | null) {
      // Push to history if game isn't currently open
      const push = this.gameOpen === null
      this.gameOpen = game

      if (this.gameOpen === null) {
        // Remove game from history when closing game details
        // Note: This potentially could cause unintended behaviours
        window.history.back()
      } else {
        this.updateUrl(push)
      }
    },
    // setCustomFilter (filter) {
    //   this.customFilter = filter
    // }
  },
})
