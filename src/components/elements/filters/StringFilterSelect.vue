<script setup lang="ts">
import { defineProps, defineModel, ref, watch } from 'vue'
import { MultiSelect } from 'primevue'
import type { Ref } from 'vue'
import type { StringFilterItemProperties } from '@/types/FilterTypes'

export type Option = {
    label: string,
    value: string,
}

defineProps({
  options: {
    type: Array<Option>,
    default: [],
  }
})
const model = defineModel<StringFilterItemProperties|null>({
  default: null
})

const selected: Ref<string[]> = ref(model.value?.Values || [])

watch(() => model.value, (properties: StringFilterItemProperties | null | undefined) => {
  if (properties?.Values?.length) {
    selected.value = properties.Values
  } else {
    selected.value = []
  }
})

watch(() => selected.value, (values: string[]) => {
  if (values.length) {
    model.value = {
      Values: values
    }
  } else {
    model.value = null
  }
})
</script>
<template>
  <MultiSelect
    v-model="selected"
    :options="options"
    option-label="label"
    option-value="value"
    filter
    display="chip"
    overlay-class="z-9999!"
  />
</template>