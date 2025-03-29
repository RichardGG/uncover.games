import { defineStore } from 'pinia'
import { useWindowSize } from '@vueuse/core'

export type AppState = {
  gameOpen: boolean
  customFilterOpen: boolean
  gameExpanded: boolean
}

const { width } = useWindowSize()

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    gameOpen: false,
    customFilterOpen: false,
    gameExpanded: false,
  }),
  getters: {
    isMobile: () => width.value < 768,
  },
})
