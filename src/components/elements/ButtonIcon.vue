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

withDefaults(
  defineProps<{
    button?: string,
    size?: number,
    weight?: 'regular' | 'fill' | 'bold' | 'thin' | 'light' | 'duotone',
  }>(),
  {
    button: '',
    size: 24,
    weight: 'regular'
  }
)
</script>
<template>
  <PhToggleLeft
    v-if="button === 'filter'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhToggleRight
    v-if="button === 'filterOn'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhArrowDown
    v-else-if="button === 'sort'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhArrowUp
    v-else-if="button === 'sortAsc'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhBookmarkSimple
    v-else-if="button === 'saved'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhStackSimple
    v-else-if="button === 'group'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
  <PhSquaresFour
    v-else-if="button === 'layout'"
    :size="size"
    :weight="weight"
    v-bind="$attrs"
  />
</template>