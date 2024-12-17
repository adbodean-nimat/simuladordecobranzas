<template>
    <div>
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
<<<<<<< HEAD
        <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
          <h2>TARJETAS VISTA GENERAL</h2>
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

        <div class="flex justify-center">
          <UInput :ui="{rounded: 'rounded-lg'}" size="xl" icon="clarity:dollar-line" class="mb-8 max-w-2xl " placeholder="Ingresar monto" v-model="monto"
          v-maska="optionsMask">
            <template #trailing>
              <span class="text-xs">ARS</span>
=======
        <div class="text-center p-4 text-base">
          <h2>TARJETAS VISTA GENERAL</h2>
        </div>

        <div class="flex justify-center">
          <UInput :ui="{rounded: 'rounded-lg'}" size="xl" icon="clarity:dollar-line" class="mb-8 max-w-2xl " placeholder="Ingresar monto" color="sea-green" v-model="monto"
          v-maska="optionsMask">
            <template #trailing>
              <span class="text-sea-green-500 sea-green:text-gray-400 text-xs">ARS</span>
>>>>>>> df1469f0 (Initial commit)
            </template>
          </UInput>
        </div>
        
<<<<<<< HEAD
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
=======
        <div class="flex flex-nowrap flex-row gap-4">
          <UAccordion
            multiple
            color="sea-green"
            variant="solid"
            size="xl"
            :items="items"
          >
          <template #visa v-if="data_visa">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_visa" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #mastercard v-if="data_mastercard">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_mastercard" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #americanexpress v-if="data_americanexpress">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_americanexpress" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb >= 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb >= 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #cuotasimple v-if="data_cuotasimple">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_cuotasimple" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #hipotecario v-if="data_hipotecario">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_hipotecario" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
        </UAccordion>
        <UAccordion
            multiple
            color="sea-green"
            variant="solid"
            size="xl"
            :items="items2"
          >
          <template #cabalcredito v-if="data_cabalcredito">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_cabalcredito" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #botonprisma v-if="data_botonprisma">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_botonprisma" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #clubdeleste v-if="data_clubdeleste">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_clubdeleste" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #creditoargentino v-if="data_creditoargentino">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_creditoargentino" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #consumaxplanmax v-if="data_consumaxplanmax">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_consumaxplanmax" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                    <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
        </UAccordion>
        <UAccordion
            multiple
            color="sea-green"
            variant="solid"
            size="xl"
            :items="items3"
          >
          <template #creditasso v-if="data_creditasso">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_creditasso" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                    <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #naranjaplanz v-if="data_naranjaplanz">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_naranjaplanz" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #naranjaplan v-if="data_naranjaplan">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_naranjaplan" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                  <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #nativa v-if="data_nativa">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_nativa" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                    <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
          <template #pymes v-if="data_pymes">
            <div class="text-sea-green-900 dark:text-white text-center">
              <UTable :columns="selectedColumns" :rows="data_pymes" class="w-full">
                <template #porc_dto_deb-data="{ row }">
                    <UBadge :label="row.porc_dto_deb + '%'" variant="soft" :color="row.porc_dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
                <template #dto_deb-data="{ row }">
                  <UBadge :label="'$ ' + formatter_decimal.format(row.dto_deb)" variant="soft" :color="row.dto_deb > 0 ? 'sea-green' : 'red'" />
                </template>
              </UTable>
            </div>
          </template>
        </UAccordion>
>>>>>>> df1469f0 (Initial commit)
        </div>
      </UContainer>
    </div>
  </template>
  
  <script setup lang="ts">
<<<<<<< HEAD
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '~/store/auth';
  const { authenticated, rol } = storeToRefs(useAuthStore());
  import type { JsonValue } from '@prisma/client/runtime/library';
  import type { MaskInputOptions} from 'maska'
  import type { SerializeObject } from 'nitropack';
  import { DateTime } from 'luxon';
  import gsap from 'gsap';
  const optionsMask = reactive<MaskInputOptions>({
    number: {locale: 'es-US', fraction: 2}
  })
=======
  import type { JsonValue } from '@prisma/client/runtime/library';
  import type { MaskInputOptions} from 'maska'
  import type { SerializeObject } from 'nitropack';

  const optionsMask = reactive<MaskInputOptions>({
    number: {locale: 'es-US', fraction: 2}
  })

>>>>>>> df1469f0 (Initial commit)
  definePageMeta({
    title: 'Tarjetas vista general'
    })
  const monto = ref()
<<<<<<< HEAD
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
=======
  const data_visa = ref()
  const data_mastercard = ref()
  const data_americanexpress = ref()
  const data_cabalcredito = ref()
  const data_botonprisma = ref()
  const data_clubdeleste = ref()
  const data_cuotasimple = ref()
  const data_creditoargentino = ref()
  const data_consumaxplanmax = ref()
  const data_creditasso = ref()
  const data_naranjaplanz = ref()
  const data_naranjaplan = ref()
  const data_nativa = ref()
  const data_pymes = ref()
  const data_hipotecario = ref()

>>>>>>> df1469f0 (Initial commit)
  const {data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
  const {data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')

  const datos_medios_de_pagos = data_mediosdepagos.value ? data_mediosdepagos.value : ''
<<<<<<< HEAD
  
  const dias = ref([
    { id: 1, label: 'Lunes', value: 'Lunes' },
    { id: 2, label: 'Martes', value: 'Martes' },
    { id: 3, label: 'Miércoles', value: 'Miércoles' },
    { id: 4, label: 'Jueves', value: 'Jueves' },
    { id: 5, label: 'Viernes', value: 'Viernes' },
    { id: 6, label: 'Sábado', value: 'Sábado' },
    { id: 0, label: 'Domingo', value: 'Domingo' }
  ]);
=======
>>>>>>> df1469f0 (Initial commit)

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
  
<<<<<<< HEAD
  const columns = [
  {
    key: 'nro_cuotas',
    label: 'NRO. CUOTAS',
    sortable: true
=======
  const columns = [{
    key: 'nro_cuotas',
    label: 'NRO. CUOTAS'
>>>>>>> df1469f0 (Initial commit)
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
<<<<<<< HEAD

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
=======
  
  const selectedColumns = ref([...columns])
  
  const items = [{
    label: "VISA",
    icon: "simple-icons:visa",
    slot: "visa"
  },{
    label: "MASTERCARD",
    icon: "simple-icons:mastercard",
    slot: "mastercard"
  },{
    label: "AMERICAN EXPRESS",
    icon: "simple-icons:americanexpress",
    slot: "americanexpress"
  },{
    label: "CUOTA SIMPLE",
    icon: "heroicons:credit-card-20-solid",
    slot: "cuotasimple"
  },{
    label: "HIPOTECARIO",
    icon: "heroicons:credit-card-20-solid",
    slot: "hipotecario"
  }]
  const items2 = [{
    label: "CABAL CREDITO",
    icon: "heroicons:credit-card-20-solid",
    slot: "cabalcredito"
  },{
    label: "BOTON PRISMA",
    icon: "heroicons:credit-card-20-solid",
    slot: "botonprisma"
  },{
    label: "CLUB DEL ESTE",
    icon: "heroicons:credit-card-20-solid",
    slot: "clubdeleste"
  },{
    label: "CREDITO ARGENTINO",
    icon: "heroicons:credit-card-20-solid",
    slot: "creditoargentino"
  },{
    label: "CONSUMAX PLAN MAX",
    icon: "heroicons:credit-card-20-solid",
    slot: "consumaxplanmax"
  }]
  const items3 = [{
    label: "CREDITASSO",
    icon: "heroicons:credit-card-20-solid",
    slot: "creditasso"
  },
  {
    label: "NARANJA PLAN Z",
    icon: "heroicons:credit-card-20-solid",
    slot: "naranjaplanz"
  },
  {
    label: "NARANJA PLAN",
    icon: "heroicons:credit-card-20-solid",
    slot: "naranjaplan"
  },
  {
    label: "NATIVA MASTERCARD",
    icon: "heroicons:credit-card-20-solid",
    slot: "nativa"
  },
  {
    label: "PYMES NACION",
    icon: "heroicons:credit-card-20-solid",
    slot: "pymes"
  },
]
  
  watch(
    monto, async (newVal, oldVal)=>{
      const resultados = [];
      const resultados2: {
        nombre_slot: string | null;
        data: SerializeObject<{
          id: number;
          estado: boolean | null;
          nombre: string | null;
          medio_pago: string | null;
          tipo_pago: string | null;
          interes_base: JsonValue[];}>;
        nro_cuotas: any;
        cuota: string;
        total: string;
        porc_dto_deb: string;
        dto_deb: string;
      }[] = [];
      data_mediosdepagos.value?.forEach(element => {
        if(element.estado == true && element.tipo_pago == "TC"){
          const cuotas = element.interes_base
          const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0
          cuotas.forEach((itemCuotas:any) => {
            resultados2.push({
              nombre_slot: element.medio_pago,
              data: element,
>>>>>>> df1469f0 (Initial commit)
              nro_cuotas: itemCuotas.nro_cuota,
              cuota: '$ ' + formatter_decimal.format(((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100)) / itemCuotas.nro_cuota)),
              total: '$ ' + formatter_decimal.format((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))),
              porc_dto_deb: (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2),
              dto_deb: (monto.value.replaceAll(",","") - (monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + itemCuotas.interes_base / 100)*100)/100)).toFixed(2))/100))).toFixed(2)
            })
          })
<<<<<<< HEAD

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
=======
        }
      });

      /* for(let i = 0; i < datos_medios_de_pagos.length; i++){
        if(datos_medios_de_pagos[i].estado == true && datos_medios_de_pagos[i].tipo_pago == "TC"){
          const cuotas = datos_medios_de_pagos[i].interes_base
          const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0
          for(let n = 0; n < cuotas.length; n++){
            resultados.push({
              nombre_slot: datos_medios_de_pagos[i].medio_pago,
              data: datos_medios_de_pagos[i],
              nro_cuotas: cuotas[n].nro_cuota,
              cuota: formatter_currency.format(((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + cuotas[n].interes_base / 100)*100)/100)).toFixed(2))/100)) / cuotas[n].nro_cuota)),
              total: formatter_currency.format((monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + cuotas[n].interes_base / 100)*100)/100)).toFixed(2))/100))),
              porc_dto_deb: (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + cuotas[n].interes_base / 100)*100)/100)).toFixed(2) + '%',
              dto_deb: formatter_currency.format((monto.value.replaceAll(",","") - (monto.value.replaceAll(",","") * (1-Number((100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + cuotas[n].interes_base / 100)*100)/100)).toFixed(2))/100))))
            })
          }
        }
      } */
      data_mastercard.value = resultados2.filter(item => item.nombre_slot == "mastercard").map(data => data)      
      data_americanexpress.value = resultados2.filter(item => item.nombre_slot == "americanexpress").map(data => data)
      data_visa.value = resultados2.filter(item => item.nombre_slot == "visa").map(data => data)
      data_cabalcredito.value = resultados2.filter(item => item.nombre_slot == "CABAL CREDITO").map(data => data)
      data_botonprisma.value = resultados2.filter(item => item.nombre_slot == "BOTON PRISMA").map(data => data)
      data_clubdeleste.value = resultados2.filter(item => item.nombre_slot == "CLUB DEL ESTE").map(data => data)
      data_cuotasimple.value = resultados2.filter(item => item.nombre_slot == "CUOTA SIMPLE").map(data => data)
      data_creditoargentino.value = resultados2.filter(item => item.nombre_slot == "CREDITO ARGENTINO").map(data => data)
      data_consumaxplanmax.value = resultados2.filter(item => item.nombre_slot == "CONSUMAX").map(data => data)
      data_creditasso.value = resultados2.filter(item => item.nombre_slot == "CREDITASSO").map(data => data)
      data_naranjaplanz.value = resultados2.filter(item => item.nombre_slot == "NARANJA PLAN Z").map(data => data)
      data_naranjaplan.value = resultados2.filter(item => item.nombre_slot == "NARANJA PLAN").map(data => data)
      data_nativa.value = resultados2.filter(item => item.nombre_slot == "NATIVA").map(data => data)
      data_pymes.value = resultados2.filter(item => item.nombre_slot == "PYMES").map(data => data)
      data_hipotecario.value = resultados2.filter(item => item.nombre_slot == "HIPOTECARIO").map(data => data)
>>>>>>> df1469f0 (Initial commit)
    }
  )
  
  </script>
  