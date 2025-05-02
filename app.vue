<script setup lang="ts">
useHead({
  title: 'Simulador de cobranza',
  meta: [
    { name: '', content: '' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>

<template>
  <NuxtLayout>
      <NuxtPage />
      <UNotifications />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>