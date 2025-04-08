import { defineStore } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { nextTick } from 'vue'
import type { Game } from '@/types/Game/Game'
import type { FilterPreset } from '@/types/FilterTypes'
import { useCollectionsStore } from '@/stores/collectionsStore'
import { GetFilteredGames } from '@/services/filterService'
import { sortGames } from '@/services/sortService'

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
      Settings: null,
      Id: null,
      Name: null,
      GroupingOrder: null,
      SortingOrder: null,
      SortingOrderDirection: null,
    },
  }),
  getters: {
    isMobile: () => width.value < 768,
    games: (state) => {
      const collectionsStore = useCollectionsStore()
      if (!collectionsStore.collections?.Games?.length) {
        return []
      }
      let games = GetFilteredGames(
        collectionsStore.collections?.Games,
        state.currentFilter.Settings,
        false
      )
      console.log('order', state.currentFilter.SortingOrder)
      games = sortGames(
        games,
        state.currentFilter.SortingOrder,
        state.currentFilter.SortingOrderDirection,
      )
      return games
    },
  },
  actions: {
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
