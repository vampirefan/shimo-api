<script setup lang="ts">
const route = useRoute()

const layoutName = computed(() => {
  return route.path.startsWith('/Demo')
    ? 'demo'
    : 'default'
})
const pageTransition = computed(() => {
  return route.path.startsWith('/Demo')
    ? {
        name: 'slide',
        mode: 'out-in',
        appear: true,
      }
    : {}
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout :name="layoutName">
      <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
  </div>
</template>

<style>
.slide-enter-active,
.fade-enter-active,
.blur-enter-active,
.scale-enter-active {
  transition: all var(--t-transform);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter-from {
  opacity: 0;
}

.blur-enter-from {
  opacity: 0;
  filter: blur(0.5rem);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>
