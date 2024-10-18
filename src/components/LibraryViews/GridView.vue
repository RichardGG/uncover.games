<template>
  <div>
    <q-virtual-scroll
      v-slot="{ item: row }"
      style="max-height: calc(100vh - 100px);"
      :items="gameRows"
      :virtual-scroll-item-size="rowHeight"
    >
      <q-item
        :key="getRowIndex(row)"
        dense
        style="padding-left: 0; padding-right: 0;"
      >
        <q-item-section>
          <div class="flex">
            <div v-for="(game, colIndex) in row" :key="colIndex" @click="() => filtersStore.game = game">
              <Cover :title="game.Name" :file-name="game.CoverImage" :width="gameWidth - 10" style="margin: 0 5px" />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-virtual-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { chunk } from 'lodash'
import Cover from 'src/components/Cover.vue'
import { Game } from 'src/types/Game/Game';
import { useFiltersStore } from 'src/stores/filtersStore';

export default defineComponent({
  name: 'GridView',
  components: { Cover },
  props: {
    games: {
      type: Array<Game>,
      default: [],
    }
  },
  setup (props) {
    const filtersStore = useFiltersStore()
    const windowSize = ref(1000)
    const rowSize = computed(() => Math.floor(windowSize.value / 130))
    const rowHeight = computed(() => (windowSize.value / rowSize.value) * 2)
    const gameRows = computed(() => chunk(props.games, rowSize.value))
    const gameWidth = computed(() => (windowSize.value - 20) / rowSize.value)
    const onResize = () => {
      windowSize.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', onResize)
      onResize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })

    const getRowIndex = (row: Game[]) => {
      return row.reduce<string>((prev: string, current: Game): string => `${prev}:${current.Id}`, '')
    }

    return { gameRows, gameWidth, windowSize, getRowIndex, rowHeight, filtersStore }
  }
})
</script>
