<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import sanitizeHtml from 'sanitize-html'
import { Button } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { GameFields, type GameField } from '@/types/Game/GameField'
import { formatGameField } from '@/services/formatService'
import { useDriveStore } from '@/stores/driveStore'
// import { getYouTubeVideoId } from '@/services/youtubeService'
import GameCover from '@/components/elements/GameCover.vue'
import CriticScore from '../elements/data/CriticScore.vue'
import CommunityScore from '../elements/data/CommunityScore.vue'
import UserScore from '../elements/data/UserScore.vue'

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

  const fieldsConfiguration:GameField[] = [
    'CompletionStatus',
    'Favorite',
  ]
  
  const fieldsGenres:GameField[] = [
    'Genres',
    'Tags',
    'Features',
  ]
  
  const fieldsOther:GameField[] = [
    'Series',
    'Categories',
    'AgeRatings',
    'Regions',
  ]

  const fieldsInstallation:GameField[] = [
    'InstallDirectory',
    'Version',
    'IsInstalled',
    'InstallSize',
  ]

const updateDescription = () => {
  safeDescription.value = sanitizeHtml(
    formatGameField(gameOpen.value, 'Description'),
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    }
  )
}

const openLink = (url: string) => {
  window.open(url, '_blank')
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
        v-if="videoId"
        :style="{
          width: videoWidth + 'px',
          height: videoHeight + 'px',
        }"
        class="m-auto my-4"
      >
        <iframe
          id="ytplayer"
          :width="videoWidth"
          :height="videoHeight"
          :src="`https://www.youtube.com/embed/${videoId}`"
          frameborder="0"
          allowfullscreen
          class="pointer-events-none touch-none"
        />
      </div>
      <div class="flex flex-wrap mb-6">
        <Button
          v-for="link in gameOpen.Links || []"
          :key="`link-${link.Name}`"
          @click="() => openLink(link?.Url ?? '')"
          class="mr-2 mb-2 flex-grow"
          severity="secondary"
        >
          {{ link.Name }}
        </Button>
      </div>

      <div class="flex items-center justify-center space-x-4 my-6 flex-wrap">
        <CommunityScore />
        <UserScore />
        <CriticScore />
      </div>
      <div class="flex items-center justify-center space-x-4 my-6 flex-wrap">
        <template
          v-for="field in fieldsConfiguration"
          :key="field"
        >
          <div v-if="formatGameField(gameOpen, field)" class="bg-[#0003] p-3 rounded-md mb-4">
            <div class="font-light text-sm">
              {{ field }}  
            </div>
            <div>{{ formatGameField(gameOpen, field) }}</div>
          </div>
        </template>
        <div v-if="formatGameField(gameOpen, 'Playtime')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'Playtime' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'Playtime') }}</div>
        </div>
        <div v-if="formatGameField(gameOpen, 'ReleaseDate')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'ReleaseDate' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'ReleaseDate') }}</div>
        </div>
        <div v-if="formatGameField(gameOpen, 'Platforms')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'Platforms' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'Platforms') }}</div>
        </div>
        <div v-if="formatGameField(gameOpen, 'Source')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'Source' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'Source') }}</div>
        </div>
        <div v-if="formatGameField(gameOpen, 'Publishers')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'Publishers' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'Publishers') }}</div>
        </div>
        <div v-if="formatGameField(gameOpen, 'Developers')" class="bg-[#0003] p-3 rounded-md mb-4">
          <div class="font-light text-sm">
            {{ 'Developers' }}
          </div>
          <div>{{ formatGameField(gameOpen, 'Developers') }}</div>
        </div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="safeDescription" />
      
      <!-- fieldsGenres -->
       <template
        v-for="field in fieldsGenres"
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
      <!-- fieldsOther -->
       <template
        v-for="field in fieldsOther"
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
      <!-- fieldsInstallation -->
       <template
        v-for="field in fieldsInstallation"
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
