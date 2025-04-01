<template v-if="dolarHoy">
    <UTooltip class="w-full">
        <template #text>
                <span class="italic">{{ DateTime.fromISO(storeDolar.fechaDolar || '').toLocaleString(DateTime.DATETIME_SHORT) }}</span>
        </template>
        <UBadge size="lg" variant="soft">Dólar $ {{ formatterNumber.format(Number(storeDolar.dolarHoy)) }}</UBadge>
    </UTooltip> 
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
import { useDolarStore } from '~/store/dolar'
import { useIntervalFn } from '@vueuse/core'
const formatterNumber = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
const storeDolar = useDolarStore()
await callOnce(storeDolar.getDolar)
useIntervalFn(() => {
  storeDolar.getDolar()
}, 100000)
</script>
