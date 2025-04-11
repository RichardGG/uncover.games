<script setup lang="ts">
import { defineProps, defineModel, ref, watch } from 'vue'
import { MultiSelect } from 'primevue'
import type { Ref } from 'vue'
import type { EnumFilterItemProperties } from '@/types/FilterTypes'

export type Option = {
    label: string,
    value: number,
}

defineProps({
  options: {
    type: Array<Option>,
    default: [],
  }
})
const model = defineModel<EnumFilterItemProperties|null>({
  default: null
})

const selected: Ref<number[]> = ref(model.value?.Values || [])

watch(() => model.value, (properties: EnumFilterItemProperties | null | undefined) => {
  if (properties?.Values?.length) {
    selected.value = properties.Values
  } else {
    selected.value = []
  }
})

watch(() => selected.value, (values: number[]) => {
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
    class="w-50 max-w-50"
    overlay-class="z-9999!"
    :virtual-scroller-options="{ itemSize: 44 }"
  />
</template>