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
<<<<<<< HEAD
<<<<<<< HEAD
              <UIcon name="i-heroicons-adjustments-horizontal-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
=======
              <UIcon name="i-heroicons-cog-solid" class="w-8 h-8 bg-sea-green-500 flex items-center" />
>>>>>>> df1469f0 (Initial commit)
=======
              <UIcon name="i-heroicons-adjustments-horizontal-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
<<<<<<< HEAD
<<<<<<< HEAD
              <UIcon name="i-heroicons-percent-badge-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
=======
              <UIcon name="i-heroicons-percent-badge-solid" class="w-8 h-8 bg-sea-green-500 flex items-center" />
>>>>>>> df1469f0 (Initial commit)
=======
              <UIcon name="i-heroicons-percent-badge-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
<<<<<<< HEAD
<<<<<<< HEAD
              <UIcon name="i-heroicons-credit-card-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
=======
              <UIcon name="i-heroicons-credit-card-solid" class="w-8 h-8 bg-sea-green-500 flex items-center" />
>>>>>>> df1469f0 (Initial commit)
=======
              <UIcon name="i-heroicons-credit-card-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
<<<<<<< HEAD
<<<<<<< HEAD
              <UIcon name="i-heroicons-currency-dollar-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
=======
              <UIcon name="i-heroicons-currency-dollar-solid" class="w-8 h-8 bg-sea-green-500 flex items-center" />
>>>>>>> df1469f0 (Initial commit)
=======
              <UIcon name="i-heroicons-currency-dollar-solid" class="w-8 h-8 bg-primary dark:bg-sea-green-600 flex items-center" />
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
            </template>

            
            <span class="text-3xl font-bold">Ventas / Acopios (con PRE)</span><br>
            <span>Una factura, varios medios de pago.</span>
            
            <template #footer>
              <span>1.0.0</span>
            </template>
          </UCard>
        </NuxtLink>
<<<<<<< HEAD
<<<<<<< HEAD
        <NuxtLink to="/simulador2">
=======
        <NuxtLink to="">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
<<<<<<< HEAD
          <template #header>
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />
=======
        <UCard :ui="Card" ref="wrapper">
          <template #header>
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-sea-green-500 flex items-center" />
>>>>>>> df1469f0 (Initial commit)
=======
          <template #header>
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
          </template>

          <template #footer>
            
          </template>
        </UCard>
        <UCard :ui="Card" ref="wrapper">
          <template #header >
<<<<<<< HEAD
<<<<<<< HEAD
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />  
=======
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-sea-green-500 flex items-center" />  
>>>>>>> df1469f0 (Initial commit)
=======
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 bg-primary dark:bg-sea-green-600 flex items-center" />  
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
          </template>

          <template #footer >
            
          </template>
<<<<<<< HEAD
<<<<<<< HEAD
        </UCard> -->
=======
        </UCard>
>>>>>>> df1469f0 (Initial commit)
=======
        </UCard> -->
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
      </div>
      
    </UContainer>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

=======
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
definePageMeta({
    title: 'Tablero - Simulador de cobranzas'
    })

const wrapper = ref<Array<HTMLElement | null>>([]);

const Card = { 
          base: '', 
          background: 'bg-sea-green-50 dark:bg-sea-green-900',
          divide: 'divide-y divide-sea-green-200 dark:divide-sea-green-800',
          ring: 'ring-2 ring-sea-green-200 dark:ring-sea-green-800',
<<<<<<< HEAD
          rounded: 'rounded-lg',
>>>>>>> df1469f0 (Initial commit)
=======
          rounded: 'rounded-md',
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
