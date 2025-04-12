<script setup lang="ts">
import { Menu } from 'primevue'
import { useTemplateRef, computed } from 'vue'
import { GroupableField, groupableFieldTranslations } from '@/types/GroupTypes'
import { useAppStore } from '@/stores/appStore'
import FieldIcon from '@/components/elements/FieldIcon.vue'

const appStore = useAppStore()

const menu = useTemplateRef('menu')

const groupKeys = Object.keys(GroupableField).filter(k => isNaN(Number(k))) as (keyof typeof GroupableField)[]
const groupOptions = computed(() => groupKeys.map((key) => ({
  label: groupableFieldTranslations[GroupableField[key]],
  command: () => appStore.currentFilter.GroupingOrder = GroupableField[key],
  value: GroupableField[key],
  class: appStore.currentFilter.GroupingOrder === GroupableField[key] 
    ? 'bg-(--p-menu-item-focus-background)/50 rounded font-medium text-primary' 
    : ''
})))

defineExpose({ menu })
</script>
<template>
  <Menu
    ref="menu"
    :model="groupOptions"
    :popup="true"
    class="max-h-[50vh] overflow-y-scroll"
  >
    <template #itemicon="slotProps">
      <div :class="appStore.currentFilter.GroupingOrder === slotProps.item.value ? 'text-primary' : 'text-surface'">
        <FieldIcon :group="slotProps.item.value" />
      </div>
    </template>
  </Menu>
</template>
