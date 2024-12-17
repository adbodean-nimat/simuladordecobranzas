<template>
    <UContainer :ui="{ constrained: 'max-w-screen-2xl'}">
        <nav class="flex flex-row items-center justify-between h-16"> 
            <div>
                <UHorizontalNavigation :links="links" />
            </div>
            <div>
                <!-- {{ new Date().toLocaleDateString() }} -->
                <ClientOnly>
                    <UButton
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-5 h-5" />
                    </template>
                </ClientOnly>
            </div>
        </nav>
    </UContainer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
const links = [
  [{
    label: '',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '',
    icon: 'i-heroicons-cog-solid',
    to: '/parametros'
  },
  {
    label: '',
    icon: 'i-heroicons-percent-badge-solid',
    to: '/financiacion'
  },
  {
    label: '',
    icon: 'i-heroicons-credit-card',
    to: '/tarjetas'
  },
  {
    label: '',
    icon: 'i-heroicons-currency-dollar-solid',
    to: '/simulador'
  }]
]
</script>