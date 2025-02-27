<template>
  <div v-if="game" style="width: 100%; padding: 20px;" @click="() => game = null">
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
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useUIStore } from 'src/stores/uiStore';
import { GameFields } from 'src/types/Game/GameField';
import { formatGameField } from 'src/services/formatService';
import { defineComponent } from 'vue'
import Cover from '../Cover.vue';


export default defineComponent({
  name: 'GameView',
  components: { Cover },
  setup () {
    const filtersStore = useUIStore()
    const { game } = storeToRefs(filtersStore)

    return { game, GameFields, formatGameField }
  }
})
</script>
