<template v-if="dolarHoy">
  <div class="w-full flex flex-row justify-around items-center">
    <div>
      <UTooltip text="Actualizar Dólar">
        <UButton icon="pajamas:repeat" size="xs" variant="link" @click="storeDolar.getDolar()" :trailing="false">
        </UButton>
      </UTooltip>
    </div>
    <div>
      <UTooltip v-if="!edit">
        <template #text>
          <span class="italic">{{ DateTime.fromISO(storeDolar.fechaDolar || '').toLocaleString(DateTime.DATETIME_SHORT)
            + ' - ' + storeDolar.usuarioDolar }}</span>
        </template>
        <UBadge class="w-max" size="lg" variant="soft">Dólar $ {{ formatterNumber.format(Number(storeDolar.dolarHoy)) }}
        </UBadge>
      </UTooltip>
    </div>
    <template v-if="edit">
      <UInput icon="i-heroicons-currency-dollar" class="w-auto" type="text" size="sm" name="dolar" id="dolar"
        v-model="storeDolar.dolarHoy" />
      <UButton icon="i-heroicons-check" size="sm" variant="link"
        @click="onEditSave(storeDolar.dolarHoy, fullName || '')" :trailing="false"></UButton>
      <UButton icon="i-heroicons-x-mark-20-solid" size="sm" variant="link" @click="edit = !edit" :trailing="false">
      </UButton>
    </template>
    <div class="justify-items-end" v-if="authenticated">
      <template v-if="!edit">
        <UButton icon="i-heroicons-pencil-solid" size="sm" variant="link" @click="edit = !edit" :trailing="false">
        </UButton>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
import { storeToRefs } from 'pinia';
import { useDolarStore } from '~/store/dolar'
import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore);
//const { updateDolar } = useDolarStore()
// import { useIntervalFn } from '@vueuse/core'
const fullName = computed(() => authenticated.value ? useCookie('fullname').value : '');
const formatterNumber = new Intl.NumberFormat("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const storeDolar = useDolarStore()
await callOnce(storeDolar.getDolar)
const toast = useToast()
const edit = ref<boolean>(false)
const onEditSave = async (dolar: number, user: string) => {
  useDolarStore().updateDolar(dolar, user);
  storeDolar.getDolar();
  edit.value = false;
  toast.add({ title: "Modificado correctamente" })
}
defineShortcuts({
  enter: {
    usingInput: 'dolar',
    handler: () => {
      onEditSave(storeDolar.dolarHoy, fullName?.value || '');
    }
  }
})

onMounted(() => {
  useDolarStore().listenWs();
})
</script>
