<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'primevue'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'

const googleAuthStore = useGoogleAuthStore()

const desktopOverview = new URL('../../../images/Uncover.Games desktop overview.png', import.meta.url).href
const desktopFilters = new URL('../../../images/Uncover.Games desktop features filters.png', import.meta.url).href
const desktopGrouping = new URL('../../../images/Uncover.Games desktop features grouping.png', import.meta.url).href
const desktopSavedFilters = new URL('../../../images/Uncover.Games desktop features saved filters.png', import.meta.url).href
const desktopSorting = new URL('../../../images/Uncover.Games desktop features sorting.png', import.meta.url).href
const mobileOverview = new URL('../../../images/Uncover.Games mobile overview.png', import.meta.url).href
const mobileDetails = new URL('../../../images/Uncover.Games mobile details.png', import.meta.url).href
const mobilePreview = new URL('../../../images/Uncover.Games mobile preview.png', import.meta.url).href

const desktopScreenshots = [
  {
    title: 'Desktop overview',
    src: desktopOverview,
  },
  {
    title: 'Filters',
    src: desktopFilters,
  },
  {
    title: 'Grouping',
    src: desktopGrouping,
  },
  {
    title: 'Saved filters',
    src: desktopSavedFilters,
  },
  {
    title: 'Sorting',
    src: desktopSorting,
  },
]

const mobileScreenshots = [
  {
    title: 'Mobile overview',
    src: mobileOverview,
  },
  {
    title: 'Mobile details',
    src: mobileDetails,
  },
  {
    title: 'Mobile preview',
    src: mobilePreview,
  },
]

const currentScreenshot = ref<{ title: string; src: string } | null>(null)

const openLightbox = (screenshot: { title: string; src: string }) => {
  currentScreenshot.value = screenshot
}

const closeLightbox = () => {
  currentScreenshot.value = null
}

const login = () => {
  googleAuthStore.startAuth()
}
</script>

<template>
  <div class="w-full overflow-y-scroll">
    <div class="prose prose-invert mx-auto px-4 py-10 max-w-5xl">
      <header class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Uncover.Games</p>
        <Button @click="login">Login</Button>
      </header>

      <section class="space-y-4">
        <h1 class="text-4xl font-bold">Browse your Playnite library from anywhere</h1>
        <p class="text-lg text-slate-300">
          Uncover.Games lets you view your Playnite game collection remotely by loading exported library data and cover images synced to Google Drive.
        </p>
      </section>

      <section class="mt-12 space-y-6">
        <h2 class="text-2xl font-semibold">What it does</h2>
        <p>
          The app loads a Playnite library export, including saved filters and cover artwork, from Google Drive so you can browse games, search metadata, and review your collection from any device.
        </p>
        <p>
          It is designed to work with the <a class="font-medium underline" href="https://playnite.link/addons.html#UncoverGamesExporter_d0ec6248-2b1f-421a-9ed4-722e5623f61f" target="_blank" rel="noopener noreferrer">UncoverGamesExporter</a> Playnite plugin, which exports your library and uploads the data to Google Drive for remote access.
        </p>
      </section>

      <section class="mt-12 grid gap-6 lg:grid-cols-2">
        <article class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          <h3 class="text-xl font-semibold">Library browsing</h3>
          <p>View titles, metadata, playtime, release dates, platforms, and more for every game in your Playnite collection.</p>
        </article>
        <article class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          <h3 class="text-xl font-semibold">Cover artwork</h3>
          <p>Includes your Playnite cover images synced from the exporter plugin, so your library looks the way you expect.</p>
        </article>
        <article class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          <h3 class="text-xl font-semibold">Saved filters</h3>
          <p>Apply the filters you already saved in Playnite and browse your library with the same custom views exported from the plugin.</p>
        </article>
        <article class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          <h3 class="text-xl font-semibold">Google Drive access</h3>
          <p>Sign in with Google to load your exported library data from Drive, without needing to host the library locally.</p>
        </article>
      </section>

      <section class="mt-12 space-y-6">
        <h2 class="text-2xl font-semibold">Desktop screenshots</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="screenshot in desktopScreenshots"
            :key="screenshot.title"
            class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer transition hover:scale-[1.01]"
            @click="openLightbox(screenshot)"
          >
            <img
              :src="screenshot.src"
              :alt="screenshot.title"
              class="h-72 w-full object-cover"
            />
            <div class="p-4 text-sm text-slate-300">{{ screenshot.title }}</div>
          </div>
        </div>
      </section>

      <section class="mt-12 space-y-6">
        <h2 class="text-2xl font-semibold">Mobile screenshots</h2>
        <div class="grid gap-6 lg:grid-cols-3">
          <div
            v-for="screenshot in mobileScreenshots"
            :key="screenshot.title"
            class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer transition hover:scale-[1.01]"
            @click="openLightbox(screenshot)"
          >
            <img
              :src="screenshot.src"
              :alt="screenshot.title"
              class="h-60 w-full object-cover"
            />
            <div class="p-4 text-sm text-slate-300">{{ screenshot.title }}</div>
          </div>
        </div>
      </section>

      <transition name="fade">
        <div
          v-if="currentScreenshot"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          @click="closeLightbox"
          @keydown.window.escape="closeLightbox"
        >
          <div class="relative max-w-[90vw] max-h-[90vh]" @click.stop>
            <button
              type="button"
              class="absolute right-0 top-0 z-20 m-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-100 transition hover:bg-slate-800"
              @click="closeLightbox"
              aria-label="Close lightbox"
            >
              ×
            </button>
            <img
              :src="currentScreenshot.src"
              :alt="currentScreenshot.title"
              class="max-h-[80vh] w-full rounded-3xl object-contain shadow-2xl"
            />
            <div class="mt-4 text-center text-sm text-slate-300">{{ currentScreenshot.title }}</div>
          </div>
        </div>
      </transition>

      <section class="mt-12 space-y-4">
        <h2 class="text-2xl font-semibold">Requirements</h2>
        <ul class="list-disc space-y-2 pl-5 text-slate-300">
          <li>A Google account to sign in and access Google Drive.</li>
          <li>Sufficient free storage on Google Drive for the exported library data and cover images.</li>
        </ul>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="text-2xl font-semibold">How to use</h2>
        <ol class="list-decimal space-y-2 pl-5 text-slate-300">
          <li>Export your Playnite library and cover images using the <a class="font-medium underline" href="https://playnite.link/addons.html#UncoverGamesExporter_d0ec6248-2b1f-421a-9ed4-722e5623f61f" target="_blank" rel="noopener noreferrer">UncoverGamesExporter</a> plugin.</li>
          <li>Sync the export data to Google Drive from within Playnite.</li>
          <li>Open Uncover.Games in your browser and <a class="font-medium underline" href="#" @click="login">sign in with Google</a> to load the exported library.</li>
        </ol>
        <p class="text-sm text-slate-400">
          Note: initial load may take a little longer while assets are fetched from Drive. Browser caching helps improve performance on subsequent visits.
        </p>
      </section>
    </div>
    <footer class="border-t border-white/10 bg-slate-950/80 text-sm text-slate-400">
    <div class="mx-auto flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between max-w-5xl">
      <p>© Uncover.Games</p>
      <div class="flex flex-wrap gap-4">
        <a href="/privacy-policy.html" class="underline hover:text-slate-100">Privacy policy</a>
        <a href="/terms-of-service.html" class="underline hover:text-slate-100">Terms of service</a>
      </div>
    </div>
  </footer>
  </div>
</template>
