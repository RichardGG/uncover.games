<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import sanitizeHtml from 'sanitize-html'
import { useAppStore } from '@/stores/appStore'
import { GameFields } from '@/types/Game/GameField'
import { formatGameField } from '@/services/formatService'
import { computed, defineComponent, ref, watch } from 'vue'
import { useDriveStore } from '@/stores/driveStore'
import { getYouTubeVideoId } from '@/services/youtubeService'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'
import GameCover from '@/components/elements/GameCover.vue'

const googleAuthStore = useGoogleAuthStore()
const appStore = useAppStore()
const driveStore = useDriveStore()
const { gameOpen } = storeToRefs(appStore)
const videoId = ref('')
const bgUrl = ref('')
const videoWidth = computed(() =>
  window.innerWidth < 600 ? window.innerWidth - 40 : 600
)
const videoHeight = computed(() => videoWidth.value * (9 / 16))
const description = sanitizeHtml(
  formatGameField(gameOpen.value, 'Description'),
  {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  }
)

watch(
  () => gameOpen.value?.Name,
  (name) => {
    if (name) {
      getYouTubeVideoId(googleAuthStore.getToken(), `${name} trailer}`).then(
        (id: string | null) => {
          videoId.value = id || ''
        }
      )
    }
  },
  { immediate: true }
)

watch(
  () => gameOpen.value?.CoverImage,
  (fileName) => {
    if (fileName) {
      driveStore
        .getImage(googleAuthStore.getToken(), fileName)
        .then((dataUri) => {
          if (dataUri) {
            bgUrl.value = dataUri
          }
        })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="gameOpen" style="width: 100%" @click="() => (gameOpen = null)">
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
      <GameCover
        :title="gameOpen.Name"
        :file-name="gameOpen.CoverImage"
        :width="200"
      />
      <h2>{{ formatGameField(gameOpen, 'Name') }}</h2>
      <div v-html="description" />
      <table>
        <template v-for="field in GameFields" :key="field">
          <tr
            v-if="
              !['Description', 'Name'].includes(field) &&
              formatGameField(gameOpen, field)
            "
          >
            <td>
              <strong>{{ field }}</strong>
            </td>
            <td>{{ formatGameField(gameOpen, field) }}</td>
          </tr>
        </template>
      </table>
      <pre>{{ JSON.stringify(gameOpen) }}</pre>
    </div>
  </div>
</template>
