import { defineStore } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { nextTick } from 'vue'

export type AppState = {
  gameOpen: number | null
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
        path = `/game/${this.gameOpen}`
      }
      if (push) {
        console.log('pushing state')
        nextTick(() => window.history.pushState({}, '', path))
      } else {
        console.log('replacing state')
        window.history.replaceState({}, '', path)
      }
    },
    setGame(game: number | null) {
      // Push to history if game isn't currently open
      const push = this.gameOpen === null
      this.gameOpen = game

      console.log('shouldPush', push, game)

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
