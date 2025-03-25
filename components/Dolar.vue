<template v-if="dolarHoy">
    <UTooltip class="w-full">
        <template #text>
                <span class="italic">{{ DateTime.fromISO(fechaDolar || '').toLocaleString(DateTime.DATETIME_SHORT) }}</span> 
        </template>
        <UBadge size="lg" variant="soft">Dólar $ {{ formatterNumber.format(Number(dolarHoy)) }}</UBadge>
    </UTooltip>
</template>
<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { DateTime } from 'luxon'
const { status: status_parametrosgenerales, data: data_parametrosgenerales, refresh: refresh_parametrosgenerales } = await useFetch('/api/parametrosgenerales')
const fechaDolar = ref(data_parametrosgenerales.value?.map(data => data.fecha_actualizar_dolar)[0])
const dolarHoy = ref(data_parametrosgenerales.value?.map(data => data.dolar)[0])
const formatterNumber = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
useIntervalFn(() => {
  refresh_parametrosgenerales() 
  nextTick(() => {
    fechaDolar.value = data_parametrosgenerales.value?.map(data => data.fecha_actualizar_dolar)[0]
    dolarHoy.value = data_parametrosgenerales.value?.map(data => data.dolar)[0]
  })
}, 5000)
</script>
