import { defineStore } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { nextTick } from 'vue'
import type { Game } from '@/types/Game/Game'

export type AppState = {
  gameOpen: Game | null
  customFilterOpen: boolean
  gameExpanded: boolean
  preferredCoverSize: number
  coversPerRow: number
  lastSelectedCoversPerRow: number
  layout: 'table' | 'covers'
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
  }),
  getters: {
    isMobile: () => width.value < 768,
  },
  actions: {
    loadFromUrl() {
      const matches: string[] | null =
        window.location.pathname.match(/^\/game\/([0-9]*)/)
      if (matches) {
        // We will open a game route, but we should make sure the view without the game is loaded initially
        window.history.replaceState({}, '', '/')
        this.setGame(parseInt(matches[1]))
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
