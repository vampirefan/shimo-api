<script setup lang="ts">
const color = useColorMode()
function toggleColorScheme() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="cursor-pointer border-none rounded p-2 hover:bg-active" @click="toggleColorScheme">
    <div class="i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-2xl" />
  </button>
</template>
