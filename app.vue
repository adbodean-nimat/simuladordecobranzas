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
html {
  font-family: "Inter", sans-serif;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>