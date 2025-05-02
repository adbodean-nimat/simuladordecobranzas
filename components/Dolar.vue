<template v-if="dolarHoy">
    <UTooltip class="w-full" v-if="!edit">
        <template #text>
                <span class="italic">{{ DateTime.fromISO(storeDolar.fechaDolar || '').toLocaleString(DateTime.DATETIME_SHORT) + ' - ' + storeDolar.usuarioDolar }}</span>
        </template>
        <UBadge size="lg" variant="soft">Dólar $ {{ formatterNumber.format(Number(storeDolar.dolarHoy)) }}</UBadge>
    </UTooltip>
    <template v-if="edit">
      <UInput icon="i-heroicons-currency-dollar" class="w-auto" type="text" size="sm" name="dolar" id="dolar" v-model="storeDolar.dolarHoy" />
      <UButton icon="i-heroicons-check" size="sm" variant="link" @click="onEditSave(storeDolar.dolarHoy, fullName)" :trailing="false"></UButton>
      <UButton icon="i-heroicons-x-mark-20-solid" size="sm" variant="link" @click="edit = !edit" :trailing="false"></UButton>
    </template>
    <div class="justify-items-end" v-if="authenticated">
      <template v-if="!edit">
        <UButton icon="i-heroicons-pencil-solid" size="sm" variant="link" @click="edit = !edit" :trailing="false"></UButton>
      </template>
    </div> 
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
import { useDolarStore } from '~/store/dolar'
import { useAuthStore } from '~/store/auth'
const { authenticated,  } = storeToRefs(useAuthStore());
const { getDolar, updateDolar } = useDolarStore()
import { useIntervalFn } from '@vueuse/core'
const fullName : any = authenticated ? useCookie('fullname') : ''
const formatterNumber = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
const storeDolar = useDolarStore()
await callOnce(storeDolar.getDolar)
useIntervalFn(() => {
  storeDolar.getDolar()
}, 100000)
const toast = useToast()
const edit = ref<boolean>(false)
const onEditSave = async (dolar: number, user: string) => {
  updateDolar(dolar, user);
  getDolar();
  edit.value = false;
  toast.add({title: "Modificado correctamente"})
}
</script>
