<template>
    <div>
<<<<<<< HEAD
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
        <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
          <h2>COSTO DE FINANCIACIÓN</h2>
          <div class="justify-items-end" v-if="authenticated && rol.includes('Administrador') || authenticated && rol.includes('Editor')">
                    <UButton icon="i-heroicons-pencil-square"
                            size="sm"
                            variant="soft"
                            square
                            label="Editar"
                            to="/edit/mediosdepago"
                            :trailing="false"></UButton>
          </div>
        </div>
        <div class="text-center p-4 text-base">
          <p>Recargos financieros</p>
        </div>
        <div class="tab">
          <template v-if="data_tarjetas">
                <UAccordion variant="soft" multiple size="xl" :items="data_tarjetas" class="grid grid-cols-3 gap-4">
                  <template v-for="row in data_tarjetas" :key="row.slot" #[row.slot]="{item}">
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
  definePageMeta({
    title: 'Costo de financiación'
    })
  console.log(rol.value[0])
  const data_tarjetas = ref()
  const data_tarjetas2 = ref()
  const sort = ref<{
      column: string;
      direction: 'asc' | 'desc';
  }>({
      column: 'nro_cuotas',
      direction: 'asc'
      })
  const {status: status_parametrosgrales, data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
  const {status: status_mediosdepagos, data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')
  
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
  
  let formatter_decimal = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
  
    const columns = [{
        key: 'nro_cuotas',
        label: 'NRO. CUOTAS',
        sortable: true
    }, {
        key: 'tasas_interes',
        label: 'Tasas interés'
    }]

    const selectedColumns = ref([...columns])
    
    const data_items : any = []
    
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

        if(element.dias == 0){
          cuotas?.forEach((itemCuotas:any) => {
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
        }
      });
      
      data_tarjetas.value = data_items
  
  </script>
  
=======
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>COSTO DE FINANCIACIÓN</h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero1">
                        <template #visa-master-nativa v-if="data_visamasternativa">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1"
                                    :rows="data_visamasternativa" 
                                    :loading="status_visamasternativa === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full"/>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero2">
                        <template #naranja v-if="data_naranja">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1" 
                                    :rows="data_naranja" 
                                    :loading="status_naranja === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full">
                                </UTable>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero3">
                        <template #cuota-simple v-if="data_cuotasimple">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1" 
                                    :rows="data_cuotasimple" 
                                    :loading="status_cuotasimple === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full">
                                </UTable>
                            </div>
                        </template>
                    </UAccordion>
                </div>
            </div>
            <!-- <UAccordion multiple color="sea-green" variant="solid" size="xl" :items="financiero">
                <template #visa-master-nativa v-if="data_visamasternativa">
                    <div class="text-sea-green-900 dark:text-white text-center">
                         <UTable 
                            :ui="tableUI"
                            :columns="columns1"
                            :rows="data_visamasternativa" 
                            :loading="status_visamasternativa === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full"/>
                    </div>
                </template>
                <template #naranja v-if="data_naranja">
                    <div class="text-sea-green-900 dark:text-white text-center">
                        <UTable 
                            :ui="tableUI"
                            :columns="columns1" 
                            :rows="data_naranja" 
                            :loading="status_naranja === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full">
                        </UTable>
                    </div>
                </template>
                <template #cuota-simple v-if="data_cuotasimple">
                    <div class="text-sea-green-900 dark:text-white text-center">
                        <UTable 
                            :ui="tableUI"
                            :columns="columns1" 
                            :rows="data_cuotasimple" 
                            :loading="status_cuotasimple === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full">
                        </UTable>
                    </div>
                </template>
            </UAccordion> -->
        </UContainer>
    </div>
</template>

<script setup lang="ts">
const {status: status_visamasternativa, data: data_visamasternativa} = await useFetch('/api/visamasternativa')
const {status: status_naranja, data: data_naranja} = await useFetch('/api/naranja')
const {status: status_cuotasimple, data: data_cuotasimple} = await useFetch('/api/cuotasimple')
const tableUI = {
    divide: 'divide-y divide-sea-green-300 dark:divide-sea-green',
    th: {
        base: 'text-center rtl:text-right',
        padding: 'px-4 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-md',
    },
    td: {
        base: 'whitespace-nowrap',
        padding: 'px-4 py-4',
        color: 'text-gray-500 dark:text-gray-400',
        font: 'font-semibold',
        size: 'text-md',
    },
}
const columns1 = [{
    key: 'cuotas',
    label: 'CUOTAS'
  }, {
    key: 'tasas_interes',
    label: '%'
  }]
const financiero = [{
    label: "VISA-MASTERCARD-NATIVA",
    icon: "",
    slot: "visa-master-nativa"
  },{
    label: "NARANJA (respecto de contado)",
    icon: "",
    slot: "naranja"
  },{
    label: "CUOTA SIMPLE",
    icon: "",
    slot: "cuota-simple"
}]
const financiero1 = [{
    label: "VISA-MASTERCARD-NATIVA",
    icon: "",
    slot: "visa-master-nativa"
}]
const financiero2 = [{
    label: "NARANJA (respecto de contado)",
    icon: "",
    slot: "naranja"
}]
const financiero3 = [{
    label: "CUOTA SIMPLE",
    icon: "",
    slot: "cuota-simple"
}]
</script>
>>>>>>> df1469f0 (Initial commit)
