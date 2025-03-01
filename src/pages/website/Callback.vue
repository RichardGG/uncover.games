<template>
    <q-page class="column items-center justify-evenly">
      <div v-if="!error">
        Loading
      </div>
      <div v-else>
        {{ error }}
        <button @click="retry">Try Again</button>
      </div>
    </q-page>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGoogleAuthStore } from 'src/stores/googleAuthStore';

  export default defineComponent({
    name: 'IndexPage',
    components: { },
    setup () {
      const googleAuthStore = useGoogleAuthStore()
      const route = useRoute()
      const router = useRouter()
      let error = null

      // Parse hash params as search params
      const url = new URL(route.hash.replace(/^#/g, '?'), process.env.BASE_URL)
      const token = url.searchParams.get('access_token')

      if (token) {
        googleAuthStore.saveToken(token)
        router.push({ name: 'home' })
      } else {
        error = 'No access token provided'
      }

      const retry = () => googleAuthStore.startAuth()

      return { error, retry }
    }
  })
  </script>
