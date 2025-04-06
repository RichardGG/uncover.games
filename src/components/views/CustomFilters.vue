<script setup lang="ts">
import { Divider, InputText, SelectButton, ToggleSwitch } from 'primevue'
</script>

<template>
  <div class="px-4 pb-4">
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i class="pi pi-download mr-2" />
      </span>
      <SelectButton :options="['Installed', 'Uninstalled', 'Default']" />
    </div>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i class="pi pi-eye-slash mr-2" />
        Hidden
      </span>
      <ToggleSwitch />
    </div>
    <div class="flex w-full items-center justify-between my-4">
      <span>
        <i class="pi pi-star mr-2" />
        Favorite
      </span>
      <ToggleSwitch />
    </div>
    <Divider />
    <div class="mt-4 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-search mr-2" />
        Name
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-asterisk mr-2" />
        Version
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-calendar mr-2" />
        Release year
      </label>
      <InputText id="username" />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-car mr-2" />
        Genre
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-box mr-2" />
        Platform
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-dollar mr-2" />
        Publishser
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-code mr-2" />
        Developer
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-folder mr-2" />
        Category
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-tag mr-2" />
        Tag
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-clone mr-2" />
        Series
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-globe mr-2" />
        Region
      </label>
      <InputText id="username" />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-cart-arrow-down mr-2" />
        Source
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-user mr-2" />
        Age rating
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-book mr-2" />
        Library
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-discord mr-2" />
        Feature
      </label>
      <InputText id="username" />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-thumbs-up mr-2" />
        User score
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-briefcase mr-2" />
        Critic score
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-face-smile mr-2" />
        Community score
      </label>
      <InputText id="username" />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-history mr-2" />
        Last played
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-file-edit mr-2" />
        Recent activity
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-plus-circle mr-2" />
        Date added
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-pencil mr-2" />
        Date modified
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-clock mr-2" />
        Time played
      </label>
      <InputText id="username" />
    </div>
    <Divider />
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-download mr-2" />
        Install size
      </label>
      <InputText id="username" />
    </div>
    <div class="mt-1 flex items-center justify-between">
      <label
        for="username"
        class="block mb-2"
      >
        <i class="pi pi-check mr-2" />
        Completion status
      </label>
      <InputText id="username" />
    </div>
  </div>
</template>
