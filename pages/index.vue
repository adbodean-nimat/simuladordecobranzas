<template>
  <div>
    <NuxtRouteAnnouncer />    
    <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
      <div class="text-center p-4 text-lg font-bold">
          <h2>SIMULADOR DE COBRANZAS</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 my-8">
        <NuxtLink to="/parametros">
          <UCard :ui="Card" ref="wrapper"> 
            <template #header>
              <UIcon name="i-heroicons-adjustments-horizontal-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
            </template>

            
            <span class="text-3xl font-bold">Parametros generales</span><br>
            <span>Vista general</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
        <NuxtLink to="/financiacion">
          <UCard :ui="Card" ref="wrapper"> 
            <template #header>
              <UIcon name="i-heroicons-percent-badge-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
            </template>

            
            <span class="text-3xl font-bold">Costo de Financiación</span><br>
            <span>Vista general</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
        <NuxtLink to="/tarjetas">
          <UCard :ui="Card" ref="wrapper"> 
            <template #header>
              <UIcon name="i-heroicons-credit-card-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
            </template>

            
            <span class="text-3xl font-bold">Tarjetas</span><br>
            <span>Vista general</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
        <NuxtLink to="/simulador">
          <UCard :ui="Card" ref="wrapper"> 
            <template #header>
              <UIcon name="i-heroicons-currency-dollar-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
            </template>

            
            <span class="text-3xl font-bold">Ventas / Acopios (con PRE)</span><br>
            <span>Una factura, varios medios de pago.</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
        <NuxtLink to="/simulador2">
          <UCard :ui="Card" ref="wrapper"> 
            <template #header>
              <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
            </template>

            
            <span class="text-3xl font-bold">Cuentas a cobrar</span><br>
            <span>Varias facturas, varios medios de pago.</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
        <!-- <UCard :ui="Card" ref="wrapper">
          <template #header>
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />
          </template>

          <template #footer>
            
          </template>
        </UCard>
        <UCard :ui="Card" ref="wrapper">
          <template #header >
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />  
          </template>

          <template #footer >
            
          </template>
        </UCard> -->
      </div>
      
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Tablero - Simulador de cobranzas'
    })
import { useAuthStore } from '~/store/auth'; 
const authStore = useAuthStore()
const attrs = useAttrs()
const wrapper = ref<Array<HTMLElement | null>>([]);
const Card = { 
          base: '', 
          background: 'bg-sea-green-50 dark:bg-sea-green-900',
          divide: 'divide-y divide-sea-green-200 dark:divide-sea-green-800',
          ring: 'ring-2 ring-sea-green-200 dark:ring-sea-green-800',
          rounded: 'rounded-md',
          shadow: 'shadow',
          body: {
            base: '',
            background: '',
            padding: 'px-4 py-5 sm:p-6',
          },
          header: {
            base: '',
            background: '',
            padding: 'px-2 py-2 sm:px-6',
          },
          footer: {
            base: '',
            background: '',
            padding: 'px-2 py-2 sm:px-6',
          },
        }
</script>

<style scoped>

</style>
