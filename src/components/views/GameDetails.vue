<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import sanitizeHtml from 'sanitize-html'
import { computed, ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { GameFields } from '@/types/Game/GameField'
import { formatGameField } from '@/services/formatService'
import { useDriveStore } from '@/stores/driveStore'
import { getYouTubeVideoId } from '@/services/youtubeService'
import GameCover from '@/components/elements/GameCover.vue'

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
      getYouTubeVideoId(
        `${name} game trailer}`
      ).then((id: string | void) => {
        videoId.value = id || ''
      })
    }
  },
  { immediate: true }
)

watch(
  () => gameOpen.value?.CoverImage,
  (fileName) => {
    if (fileName) {
      driveStore
        .getImage(fileName)
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
  <div
    v-if="gameOpen"
    class="w-full overflow-x-hidden"
  >
    <img
      :src="bgUrl"
      class="w-full h-full absolute object-cover scale-110 blur-2xl"
      style="
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0)
        );
      "
    >
    <div
      class="p-4 relative mt-4 z-10"
    >
      <iframe
        v-if="videoId"
        id="ytplayer"
        :width="videoWidth"
        :height="videoHeight"
        :src="`https://www.youtube.com/embed/${videoId}`"
        frameborder="0"
        allowfullscreen
        class="m-4 pointer-events-none touch-none"
      />
      <GameCover
        class="w-50 my-4"
        :file-name="gameOpen.CoverImage || undefined"
      />
      <h2>{{ formatGameField(gameOpen, 'Name') }}</h2>
      <div v-html="description" />
      <table>
        <template
          v-for="field in GameFields"
          :key="field"
        >
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
      <pre class="break-words whitespace-break-spaces">{{ JSON.stringify(gameOpen, null, ' ') }}</pre>
    </div>
  </div>
</template>
