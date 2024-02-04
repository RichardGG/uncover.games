<template>
    <div style="width: 50px; height: 75px; background: #eee;">
      <img :src="url" style="max-width: 50px; transition: opacity .3s;" :style="{ opacity: (url ? 1 : 0) }">
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { find } from 'lodash'
  import { useDriveStore } from 'src/stores/driveStore'
  import { useGamesStore } from 'src/stores/gamesStore'
  
  export default defineComponent({
    name: 'CoverImage',
    components: { },
    props: {
      fileName: String
    },
    setup (props) {
      const url = ref('')
      const driveStore = useDriveStore()
      const gamesStore = useGamesStore()

      onMounted(() => {
        // TODO need to implement lazy scroll so all don't load at once
        const file = find(gamesStore.files, { name: props.fileName?.replace('\\', '_') } )
        if (file) {
          driveStore.getFile(file.id, { responseType: "arraybuffer" }).then(({ data }) => {
            url.value = 'data:imaimgUrlge/jpeg;base64, ' + btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          })
        }
      })

      return { url }
    }
  })
</script>