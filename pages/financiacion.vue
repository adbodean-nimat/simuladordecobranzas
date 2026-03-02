<template>
  <div>
    <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
      <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
        <h2>COSTO DE FINANCIACIÓN</h2>
        <div class="justify-items-end"
          v-if="authenticated && rol.includes('Administrador') || authenticated && rol.includes('Editor')">
          <UButton icon="i-heroicons-pencil-square" size="sm" variant="soft" square label="Editar"
            to="/edit/mediosdepago" :trailing="false"></UButton>
        </div>
      </div>
      <div class="text-center pb-4 text-base">
        <p>Recargos financieros</p>
      </div>
      <div class="tab">
        <template v-if="data_tarjetas">
          <UAccordion variant="soft" multiple size="xl" :items="data_tarjetas" class="grid grid-cols-3 gap-4">
            <template v-for="row in data_tarjetas" :key="row.slot" #[row.slot]="{ item }">
              <!-- <UButton style="float: right;" icon="i-heroicons-clipboard-document" size="sm" variant="soft" label="Copiar"
                  @click="copiarTexto(item.label, item.data)"></UButton> -->
              <div class="text-sea-green-900 dark:text-white">
                <UTable v-model:sort="sort" :columns="selectedColumns" :rows="item.data" class="w-full">
                  <template #tasas_interes-data="{ row }">
                    <UBadge :label="row.tasas_interes + '%'" variant="soft" color="gray" size="md" />
                  </template>
                </UTable>
              </div>
            </template>
          </UAccordion>
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { authenticated, rol } = storeToRefs(useAuthStore());
import type { JsonValue } from '@prisma/client/runtime/library';
import type { SerializeObject } from 'nitropack';
import { useClipboard } from '@vueuse/core'
definePageMeta({
  title: 'Costo de financiación'
})
const { copy } = useClipboard()
//console.log(rol.value[0])
const data_tarjetas = ref()
const data_tarjetas2 = ref()
const sort = ref<{
  column: string;
  direction: 'asc' | 'desc';
}>({
  column: 'nro_cuotas',
  direction: 'asc'
})
const { status: status_parametrosgrales, data: data_parametrosgrales } = await useFetch('/api/parametrosgenerales')
const { status: status_mediosdepagos, data: data_mediosdepagos } = await useFetch('/api/mediosdepagos')

const dias = ref([
  { id: 1, label: 'Lunes', value: 'Lunes' },
  { id: 2, label: 'Martes', value: 'Martes' },
  { id: 3, label: 'Miércoles', value: 'Miércoles' },
  { id: 4, label: 'Jueves', value: 'Jueves' },
  { id: 5, label: 'Viernes', value: 'Viernes' },
  { id: 6, label: 'Sábado', value: 'Sábado' },
  { id: 0, label: 'Domingo', value: 'Domingo' }
]);

let formatter_currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2
})

let formatter_percent = new Intl.NumberFormat('es-AR', {
  style: 'percent',
  minimumIntegerDigits: 2,
  minimumFractionDigits: 2,
})

let formatter_decimal = new Intl.NumberFormat("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function formatTarjetaToText(label: any, json: any) {
  if (!Array.isArray(json) || !json.length) return ''

  const slot = label.toUpperCase()

  const lineas = json
    .sort((a, b) => a.nro_cuotas - b.nro_cuotas)
    .map(item => {
      const cuota = item.nro_cuotas
      const interes = item.tasas_interes

      return `${cuota} cuota${cuota > 1 ? 's' : ''}: ${interes}%`
    })

  return `${slot}\n\n` +
  json
    .sort((a, b) => a.nro_cuotas - b.nro_cuotas)
    .map(i => `💳 ${i.nro_cuotas} cuota${i.nro_cuotas > 1 ? 's' : ''} → ${i.tasas_interes}% interés`)
    .join('\n')
}

const copiarTexto = (label: any, data: any) => {
  const texto = formatTarjetaToText(label, data)
  copy(texto)
}

const columns = [{
  key: 'nro_cuotas',
  label: 'NRO. CUOTAS',
  sortable: true
}, {
  key: 'tasas_interes',
  label: 'Tasas interés'
}]

const selectedColumns = ref([...columns])

const data_items: any = []

const resultados: {
  slot: string | null;
  data: SerializeObject<{
    id: number;
    estado: boolean | null;
    nombre: string | null;
    medio_pago: string | null;
    tipo_pago: string | null;
    interes_base: JsonValue[];
  }>;
  tasas_interes: JsonValue[];
  nro_cuotas: any;
}[] = [];

data_mediosdepagos.value?.filter(element => element.costo_financiacion == true).forEach((element, index, array) => {
  const cuotas = element.interes_base as any
  const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0


  cuotas?.forEach((itemCuotas: any) => {
    resultados.push({
      slot: element.medio_pago,
      data: itemCuotas,
      tasas_interes: itemCuotas.interes_base,
      nro_cuotas: itemCuotas.nro_cuota
    })
  })

  data_items.push({
    label: element.nombre,
    icon: 'heroicons:credit-card-20-solid',
    slot: element.medio_pago,
    data: resultados.filter(item => item.slot == element.medio_pago).map(data => data)
  })

});

data_tarjetas.value = data_items

</script>