<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import sanitizeHtml from 'sanitize-html'
import { computed, ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { GameFields } from '@/types/Game/GameField'
import { formatGameField } from '@/services/formatService'
import { useDriveStore } from '@/stores/driveStore'
// import { getYouTubeVideoId } from '@/services/youtubeService'
import GameCover from '@/components/elements/GameCover.vue'

const appStore = useAppStore()
const driveStore = useDriveStore()
const { gameOpen } = storeToRefs(appStore)
const videoId = ref('')
const bgUrl = ref('')
const showJson = ref(false)
const videoWidth = computed(() =>
  window.innerWidth < 600 ? window.innerWidth - 30 : 600
)
const videoHeight = computed(() => videoWidth.value * (9 / 16))
const safeDescription = ref('')

const updateDescription = () => {
  safeDescription.value = sanitizeHtml(
    formatGameField(gameOpen.value, 'Description'),
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    }
  )
}

watch(() => gameOpen.value?.Description, updateDescription, { immediate: true })

watch(
  () => gameOpen.value?.Name,
  (name) => {
    if (name) {
      // videoId.value = ''
      // getYouTubeVideoId(
      //   `${name} game trailer}`
      // ).then((id: string | void) => {
      //   videoId.value = id || ''
      // })
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
      class="p-4 relative z-10"
    >
      <GameCover
        class="w-80 mb-4 mx-auto"
        :file-name="gameOpen.CoverImage || undefined"
      />
      <div class="text-2xl font-bold mb-8">
        {{ formatGameField(gameOpen, 'Name') }}
      </div>
      <div
        :style="{
          width: videoWidth + 'px',
          height: videoHeight + 'px',
        }"
        class="m-auto my-4"
      >
        <iframe
          v-if="videoId"
          id="ytplayer"
          :width="videoWidth"
          :height="videoHeight"
          :src="`https://www.youtube.com/embed/${videoId}`"
          frameborder="0"
          allowfullscreen
          class="pointer-events-none touch-none"
        />
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="safeDescription" />
      <template
        v-for="field in GameFields"
        :key="field"
      >
        <div
          v-if="
            !['Description', 'Name'].includes(field) &&
              formatGameField(gameOpen, field)
          "
        >
          <div class="mt-4 font-light text-sm">
            {{ field }}
          </div>
          <div>{{ formatGameField(gameOpen, field) }}</div>
        </div>
      </template>
      <div
        class="mt-4 text-xs opacity-40"
        @click="showJson = !showJson"
      >
        Toggle JSON
      </div>
      <pre
        v-if="showJson"
        class="break-words whitespace-break-spaces text-xs bg-black p-2 rounded-xl mt-2 -mx-4 font-red!"
      >{{ JSON.stringify(gameOpen, null, ' ') }}</pre>
    </div>
  </div>
</template>
