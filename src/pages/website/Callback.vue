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
  import { useDriveStore } from 'stores/driveStore'
  import { useRoute, useRouter } from 'vue-router'
  
  export default defineComponent({
    name: 'IndexPage',
    components: { },
    setup () {
      const driveStore = useDriveStore()
      const route = useRoute()
      const router = useRouter()
      let error = null

      // Parse hash params as search params
      const url = new URL(route.hash.replace(/^#/g, '?'), process.env.BASE_URL)
      const token = url.searchParams.get('access_token')

      if (token) {
        driveStore.saveToken(token)
        router.push({ name: 'home' })
      } else {
        error = 'No access token provided'
      }

      const retry = () => driveStore.startAuth()

      return { error, retry }
    }
  })
  </script>
  