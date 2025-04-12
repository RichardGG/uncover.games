<script setup lang="ts">
import {
  PhArrowDown,
  PhArrowUp,
  PhBookmarkSimple,
  PhSquaresFour,
  PhStackSimple,
  PhToggleLeft,
  PhToggleRight,
} from '@phosphor-icons/vue'

defineProps({
    button: {
        type: String,
        default: '',
    },
    size: {
        type: Number,
        default: 24,
    },
})
</script>
<template>
  <PhToggleLeft
    v-if="button === 'filter'"
    :size="size"
    v-bind="$attrs"
  />
  <PhToggleRight
    v-if="button === 'filterOn'"
    :size="size"
    v-bind="$attrs"
  />
  <PhArrowDown
    v-else-if="button === 'sort'"
    :size="size"
    v-bind="$attrs"
  />
  <PhArrowUp
    v-else-if="button === 'sortAsc'"
    :size="size"
    v-bind="$attrs"
  />
  <PhBookmarkSimple
    v-else-if="button === 'saved'"
    :size="size"
    v-bind="$attrs"
  />
  <PhStackSimple
    v-else-if="button === 'group'"
    :size="size"
    v-bind="$attrs"
  />
  <PhSquaresFour
    v-else-if="button === 'layout'"
    :size="size"
    v-bind="$attrs"
  />
</template>