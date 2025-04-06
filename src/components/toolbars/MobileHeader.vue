<script setup lang="ts">
import UserControls from '../controls/UserControls.vue'
import BrandControls from '../controls/BrandControls.vue'
</script>

<template>
  <div
    class="flex justify-between items-center h-16 border-b-1 border-(--p-content-border-color)"
  >
    <BrandControls class="ml-4" />
    <UserControls />
  </div>
</template>
