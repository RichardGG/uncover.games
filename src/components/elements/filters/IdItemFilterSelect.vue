<script setup lang="ts">
import { defineProps, defineModel, ref, computed, watch, useTemplateRef } from 'vue'
import { MultiSelect, Button } from 'primevue'
import type { Ref } from 'vue'
import type { MultiSelectFilterEvent } from 'primevue'
import type { IdItemFilterItemProperties } from '@/types/FilterTypes'

export type Option = {
    label: string|number,
    value: string|number,
}

const props = defineProps({
    options: {
        type: Array<Option>,
        default: [],
    }
})

const model = defineModel<IdItemFilterItemProperties|null>({
  default: null
})

const select = useTemplateRef('select')

const filter = ref('')
const customItems: Ref<string[]> = ref([])
const selected: Ref<string[]> = ref([])

const allOptions = computed(() => [
    ...customItems.value
        .reduce((uniqueItems: string[], item: string) => {
            if (uniqueItems.indexOf(item) === -1) {
                uniqueItems.push(item)
            }
            return uniqueItems
        }, [])
        .map((item: string) => ({
            label: item,
            value: item,
        })),
    ...structuredClone(props.options).sort((a, b) => `${a.label}`.localeCompare(`${b.label}`)),
])

const filterExists = computed(() => allOptions.value.some((item) => item.value === filter.value))

const filterChanged = (ev: MultiSelectFilterEvent) => {
    filter.value = ev.value
}

const addItem = () => {
  if (!filterExists.value) {
    customItems.value.push(filter.value)
    selected.value.push(filter.value)
    //
    console.log('select', select)
    select.value?.hide(true)
  }
}

// When model changed, update model selected and custom items
watch(() => model.value, (properties: IdItemFilterItemProperties | null | undefined) => {
  const newSelected: string[] = properties?.Ids || []
  const newCustomItems: string[] = properties?.Text?.split(', ') || []


  // If the filter matches the existing refs, don't update them
  if (JSON.stringify(selected.value) === JSON.stringify(newSelected) && JSON.stringify(customItems.value) === JSON.stringify(newCustomItems)) {
    return
  }

  selected.value = [...newSelected, ...newCustomItems]
  customItems.value = newCustomItems
}, { immediate: true })

// When selected changed, update model
watch(() => selected.value, (values: string[]) => {
  // Remove customItems that aren't selected
  customItems.value = customItems.value.filter((item) => values.indexOf(item) !== -1)

  // Convert the Ids and Text to expected format
  let newIds: string[]|null = values.filter((item) => customItems.value.indexOf(item) === -1)
  let newText: string|null = customItems.value.join(', ')
  newIds = newIds.length ? newIds : null
  newText = newText.length ? newText : null

  // If they match the existing filter, don't update it
  if (JSON.stringify(newIds) === JSON.stringify(model.value?.Ids) && JSON.stringify(model.value?.Text) === JSON.stringify(newText)) {
    return
  }

  // Update the filter
  if (newIds || newText) {
    model.value = {
      Ids: newIds,
      Text: newText,
    }
  } else {
    model.value = null
  }
}, { deep: true })

</script>
<template>
  <MultiSelect
    ref="select"
    v-model="selected"
    :options="allOptions"
    option-label="label"
    option-value="value"
    filter
    :show-toggle-all="false"
    reset-filter-on-hide
    class="w-50 max-w-50"
    overlay-class="z-9999!"
    :virtual-scroller-options="{ itemSize: 44 }"
    @filter="filterChanged"
  >
    <template #filtericon>
      <Button
        size="small"
        class="-mt-2 -mr-1.5"
        :disabled="filterExists || !filter.length"
        @click="addItem"
      >
        +
      </Button>
    </template>
  </MultiSelect>
</template>