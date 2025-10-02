<script setup lang="ts">
// ✅ correcto
useHead({
  title: 'Simulador de cobranza',
  meta: [
    { property: 'og:title', content: 'Simulador de cobranza' },
    { name: 'description', content: 'NIMAT | Materiales para la construcción' },
    { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
    { charset: 'utf-8' },
  ]
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