<template>
    <div>
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
        <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
          <h2>TARJETAS VISTA GENERAL</h2>
          <div class="justify-items-end" v-if="authenticated">
                    <UButton icon="i-heroicons-pencil-square"
                            size="sm"
                            variant="soft"
                            square
                            label="Editar"
                            to="/edit/mediosdepago"
                            :trailing="false"></UButton>
          </div>
        </div>

        <div class="flex justify-center">
          <UInput :ui="{rounded: 'rounded-lg'}" size="xl" icon="clarity:dollar-line" class="mb-8 max-w-2xl " placeholder="Ingresar monto" v-model="monto"
          v-maska="optionsMask">
            <template #trailing>
              <span class="text-xs">ARS</span>
            </template>
          </UInput>
        </div>
        
        <div class="tab">
          <template v-if="promoDia">
            <UDivider label="PROMOCIONES DEL DÍA" type="dashed" :ui="{ label: 'text-sea-green-600 dark:text-sea-green-400 text-lg mb-2' }"/>
            <UAccordion multiple variant="soft" size="xl" :items="data_tarjetas2">
              <template v-for="row in data_tarjetas2" :key="row.slot" #[row.slot]="{item}">
                    <div class="text-sea-green-900 dark:text-white">
                      <UTable v-model:sort="sort" :columns="selectedColumns" :rows="item.data" class="w-full">
                        <template #porc_dto_deb-data="{ row }">
                          <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'green' : 'red'" />
                        </template>
                        <template #dto_deb-data="{ row }">
                          <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'green' : 'red'" />
                        </template>
                      </UTable>
                    </div>
                  </template>
            </UAccordion>
            <UDivider icon="i-heroicons-sparkles-solid" type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
          </template>
          <template v-if="data_tarjetas">
                <UAccordion variant="soft" multiple size="xl" :items="data_tarjetas" class="grid grid-cols-2 gap-2">
                  <template v-for="row in data_tarjetas" :key="row.slot" #[row.slot]="{item}">
                    <div class="text-sea-green-900 dark:text-white">
                      <UTable v-model:sort="sort" :columns="selectedColumns" :rows="item.data" class="w-full">
                        <template #porc_dto_deb-data="{ row }">
                          <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'green' : 'red'" />
                        </template>
                        <template #dto_deb-data="{ row }">
                          <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'green' : 'red'" />
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
  const { authenticated } = storeToRefs(useAuthStore());
  import type { JsonValue } from '@prisma/client/runtime/library';
  import type { MaskInputOptions} from 'maska'
  import type { SerializeObject } from 'nitropack';
  import { DateTime } from 'luxon';
  import gsap from 'gsap';
  const optionsMask = reactive<MaskInputOptions>({
    number: {locale: 'es-US', fraction: 2}
  })
  definePageMeta({
    title: 'Tarjetas vista general'
    })
  const monto = ref()
  const data_tarjetas = ref()
  const data_tarjetas2 = ref()
  const sort = ref<{
      column: string;
      direction: 'asc' | 'desc';
  }>({
      column: 'nro_cuotas',
      direction: 'asc'
      })
  const diaHoy = ref(DateTime.now().weekday)
  const promoDia = ref(false)
  const {data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
  const {data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')

  const datos_medios_de_pagos = data_mediosdepagos.value ? data_mediosdepagos.value : ''
  
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
  
  const columns = [
  {
    key: 'nro_cuotas',
    label: 'NRO. CUOTAS',
    sortable: true
  }, {
    key: 'cuota',
    label: 'CUOTA'
  }, {
    key: 'total',
    label: 'TOTAL'
  }, {
    key: 'porc_dto_deb',
    label: '%'
  }, {
    key: 'dto_deb',
    label: 'DTO. DEB.'
  }]

  const selectedColumns = ref([...columns])

  watch(monto, async (newVal, oldVal)=>{

    if(newVal.length > 0){
        gsap.to(".tab", {duration: 1.4, x: 0, y: 10})
    }

    const data_items : any = []
    const data_items2 : any = []
    
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
      nro_cuotas: any;
      cuota: string;
      total: string;
      porc_dto_deb: string;
      dto_deb: string;
      }[] = [];

    const resultados2: {
      slot: string | null;
      data: SerializeObject<{
        id: number;
        estado: boolean | null;
        nombre: string | null;
        medio_pago: string | null;
        tipo_pago: string | null;
          interes_base: JsonValue[];
      }>;
      nro_cuotas: any;
      cuota: string;
      total: string;
      porc_dto_deb: string;
      dto_deb: string;
      }[] = [];
      
      
      data_mediosdepagos.value?.filter(element => element.tipo_pago == "TC" && element.estado == true).forEach((element, index, array) => {
        const cuotas = element.interes_base as any
        const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0
        const dias = new Array(element.dias)
        const esHoy = dias.map((dia : any) => dia.map((data : any) => data.id).includes(diaHoy.value))
        
        if(esHoy.includes(true)){
          cuotas?.forEach((itemCuotas:any) => {
            resultados2.push({
              slot: element.medio_pago,
              data: itemCuotas,
              nro_cuotas: itemCuotas.nro_cuota,
              cuota: '$ ' + formatter_decimal.format(((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100)) / itemCuotas.nro_cuota)),
              total: '$ ' + formatter_decimal.format((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))),
              porc_dto_deb: (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2),
              dto_deb: (monto.value.replaceAll(",","") - (monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))).toFixed(2)
            })
          })

          data_items2.push({
            label: element.nombre,
            icon: 'heroicons:credit-card-20-solid',
            slot: element.medio_pago,
            data: resultados2.filter(item => item.slot == element.medio_pago).map(data => data)
          })
          promoDia.value = true
        }

        if(element.dias == 0){
          cuotas?.forEach((itemCuotas:any) => {
            resultados.push({
              slot: element.medio_pago,
              data: itemCuotas,
              nro_cuotas: itemCuotas.nro_cuota,
              cuota: '$ ' + formatter_decimal.format(((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100)) / itemCuotas.nro_cuota)),
              total: '$ ' + formatter_decimal.format((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))),
              porc_dto_deb: (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2),
              dto_deb: (monto.value.replaceAll(",","") - (monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))).toFixed(2)
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
      data_tarjetas2.value = data_items2
      //console.log(data_tarjetas.value)
      //console.log(data_tarjetas2.value)
    }
  )
  
  </script>
  