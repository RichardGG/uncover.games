<template>
  <div>
    <q-virtual-scroll
      v-slot="{ item, index: rowIndex }"
      style="max-height: calc(100vh - 100px);"
      :items="gameRows"
      separator
      :virtual-scroll-item-size="200"
    >
      <q-item
        :key="rowIndex"
        dense
      >
        <q-item-section>
          <div class="flex">
            <div v-for="(game, colIndex) in item" :key="colIndex">
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
    const rowSize = ref(5)
    const windowSize = ref(1000)
    const gameRows = computed(() => chunk(props.games, rowSize.value))
    const gameWidth = computed(() => (windowSize.value - 50) / rowSize.value)
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

    return { gameRows, gameWidth, windowSize }
  }
})
</script>