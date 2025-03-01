<template>
  <div v-if="game" style="width: 100%;" @click="() => game = null">
    <iframe
      v-if="videoId"
      id="ytplayer"
      style="margin: 20px"
      type="text/html"
      :width="videoWidth"
      :height="videoHeight"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&controls=0&playsinline=1&`"
      frameborder="0"
    ></iframe>
    <div style="padding: 20px; z-index: 100; position: relative; margin-top: 20px;">
      <Cover :title="game.Name" :file-name="game.CoverImage" :width="200" />
      <h2>{{formatGameField(game, 'Name') }}</h2>
      <div v-html="formatGameField(game, 'Description')" />
      <table>
        <template v-for="field in GameFields" :key="field" >
          <tr v-if="!['Description', 'Name'].includes(field) && formatGameField(game, field) ">
            <td><strong>{{ field }}</strong></td>
            <td>{{ formatGameField(game, field) }}</td>
          </tr>
        </template>
      </table>
      <pre>{{ JSON.stringify(game) }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useUIStore } from 'src/stores/uiStore';
import { GameFields } from 'src/types/Game/GameField';
import { formatGameField } from 'src/services/formatService';
import { computed, defineComponent, ref, watch } from 'vue'
import Cover from '../Cover.vue';
import { useDriveStore } from 'src/stores/driveStore';


export default defineComponent({
  name: 'GameView',
  components: { Cover },
  setup () {
    const filtersStore = useUIStore()
    const driveStore = useDriveStore()
    const { game } = storeToRefs(filtersStore)
    const videoId = ref('')
    const videoWidth = computed(() => window.innerWidth < 600 ? window.innerWidth - 40 : 600)
    const videoHeight = computed(() => videoWidth.value * (9/16))
    watch(
      () => game.value?.Name,
      (name) => {
        if (name) {
          driveStore.getYouTubeVideoId(`${name} trailer}`)
            .then((id: string|null) => {videoId.value = id || ''})
        }
      },
      { immediate: true },
    )

    return { game, GameFields, formatGameField, videoId, videoWidth, videoHeight }
  }
})
</script>
