<template>
  <div style="width: 100%">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="type in CollectionTypes"
        :key="type"
        expand-icon-toggle
        expand-separator
        icon="perm_identity"
        :label="type"
      >
        <q-card>
          <q-card-section>
            <pre v-if="type === 'Games'">{{ JSON.stringify(collectionsStore.collections[type]?.slice(0, 10), null, 2) }}</pre>
            <pre v-else>{{ JSON.stringify(collectionsStore.collections[type], null, 2) }}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCollectionsStore, CollectionTypes } from 'src/stores/collectionsStore'

export default defineComponent({
  name: 'StorageView',
  setup () {
    const collectionsStore = useCollectionsStore()

    return { collectionsStore, CollectionTypes }
  }
})
</script>
