<template>
  <div v-if="game" style="width: 100%" @click="() => (game = null)">
    <img
      :src="bgUrl"
      style="
        position: absolute;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        filter: blur(20px);
        transform: scale(1.1);
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0)
        );
      "
    />
    <div
      style="padding: 20px; z-index: 100; position: relative; margin-top: 20px"
    >
      <iframe
        v-if="videoId"
        id="ytplayer"
        style="margin: 20px"
        type="text/html"
        :width="videoWidth"
        :height="videoHeight"
        :src="`https://www.youtube.com/embed/${videoId}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <Cover :title="game.Name" :file-name="game.CoverImage" :width="200" />
      <h2>{{ formatGameField(game, 'Name') }}</h2>
      <div v-html="formatGameField(game, 'Description')" />
      <table>
        <template v-for="field in GameFields" :key="field">
          <tr
            v-if="
              !['Description', 'Name'].includes(field) &&
              formatGameField(game, field)
            "
          >
            <td>
              <strong>{{ field }}</strong>
            </td>
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
import { computed, defineComponent, ref, watch } from 'vue';
import Cover from '../Cover.vue';
import { useDriveStore } from 'src/stores/driveStore';
import { getYouTubeVideoId } from 'src/services/youtubeService';
import { useGoogleAuthStore } from 'src/stores/googleAuthStore';

export default defineComponent({
  name: 'GameView',
  components: { Cover },
  setup() {
    const googleAuthStore = useGoogleAuthStore();
    const filtersStore = useUIStore();
    const driveStore = useDriveStore();
    const { game } = storeToRefs(filtersStore);
    const videoId = ref('');
    const videoWidth = computed(() =>
      window.innerWidth < 600 ? window.innerWidth - 40 : 600
    );
    const videoHeight = computed(() => videoWidth.value * (9 / 16));
    const bgUrl = ref('');
    watch(
      () => game.value?.Name,
      (name) => {
        if (name) {
          getYouTubeVideoId(
            googleAuthStore.getToken(),
            `${name} trailer}`
          ).then((id: string | null) => {
            videoId.value = id || '';
          });
        }
      },
      { immediate: true }
    );

    watch(
      () => game.value?.CoverImage,
      (fileName) => {
        if (fileName) {
          driveStore
            .getImage(googleAuthStore.getToken(), fileName)
            .then((dataUri) => {
              if (dataUri) {
                bgUrl.value = dataUri;
              }
            });
        }
      },
      { immediate: true }
    );

    return {
      game,
      GameFields,
      formatGameField,
      videoId,
      videoWidth,
      videoHeight,
      bgUrl,
    };
  },
});
</script>
