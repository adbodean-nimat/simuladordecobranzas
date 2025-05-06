<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
<<<<<<< HEAD
<<<<<<< HEAD
            <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
                <h2>PARAMETROS GENERALES</h2>
                <div class="justify-items-end" v-if="authenticated && rol.includes('Administrador') || authenticated && rol.includes('Editor')">
                    <UButton icon="i-heroicons-pencil-square"
                            size="sm"
                            variant="soft"
                            square
                            label="Editar"
                            to="/edit/parametros"
                            :trailing="false"></UButton>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros1">
                        <template #datos1 v-if="data_parametros">
                            <div class="text-sea-green-800 dark:text-white text-center">
=======
            <div class="text-center p-4 text-base">
=======
            <div class="flex justify-center gap-2 items-center text-center p-4 text-base">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
                <h2>PARAMETROS GENERALES</h2>
                <div class="justify-items-end" v-if="authenticated">
                    <UButton icon="i-heroicons-pencil-square"
                            size="sm"
                            variant="soft"
                            square
                            label="Editar"
                            to="/edit/parametros"
                            :trailing="false"></UButton>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros1">
                        <template #datos1 v-if="data_parametros">
<<<<<<< HEAD
                            <div class="text-sea-green-900 dark:text-white text-center">
>>>>>>> df1469f0 (Initial commit)
=======
                            <div class="text-sea-green-800 dark:text-white text-center">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1"
                                    :rows="resultadosYes" 
                                    :loading="status_parametros === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full"/>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros2">
                        <template #datos2 v-if="data_parametrosfacturas">
                            <div class="text-black dark:text-white text-center">
=======
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="parametros2">
                        <template #datos2 v-if="data_parametrosfacturas">
                            <div class="text-sea-green-900 dark:text-white text-center">
>>>>>>> df1469f0 (Initial commit)
=======
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros2">
                        <template #datos2 v-if="data_parametrosfacturas">
                            <div class="text-black dark:text-white text-center">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns2" 
                                    :rows="dataYes2" 
                                    :loading="status_facturas === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full" />
<<<<<<< HEAD
<<<<<<< HEAD
                                    <div class="flex justify-around text-left px-3 py-3.5 border-t border-primary dark:border-sea-green-900">
                                        <span>INTERES DIARIO a aplicar sobre base CONTADO EFECTIVO, para actualizar facturas con 61 días o más</span>
                                        <span>{{ interesDiario +'%'}}</span>
=======
                                    <div class="flex justify-around text-left px-3 py-3.5 border-t border-sea-green-300 dark:border-sea-green">
=======
                                    <div class="flex justify-around text-left px-3 py-3.5 border-t border-primary dark:border-sea-green-900">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
                                        <span>INTERES DIARIO a aplicar sobre base CONTADO EFECTIVO, para actualizar facturas con 61 días o más</span>
                                        <span>0.417000%</span>
>>>>>>> df1469f0 (Initial commit)
                                    </div>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros3">
                        <template #datos3 v-if="data_parametroscheques">
                            <div class="text-sea-green-800 dark:text-white text-center">
=======
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="parametros3">
                        <template #datos3 v-if="data_parametroscheques">
                            <div class="text-sea-green-900 dark:text-white text-center">
>>>>>>> df1469f0 (Initial commit)
=======
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros3">
                        <template #datos3 v-if="data_parametroscheques">
                            <div class="text-sea-green-800 dark:text-white text-center">
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns3" 
                                    :rows="dataYes3" 
                                    :loading="status_cheques === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full">
                                </UTable>
                            </div>
                        </template>
                    </UAccordion>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const { authenticated, rol } = storeToRefs(useAuthStore());
=======
>>>>>>> df1469f0 (Initial commit)
=======
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const { authenticated } = storeToRefs(useAuthStore());
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
const {status: status_parametros, data: data_parametros} = await useFetch('/api/parametrosgenerales')
const {status: status_facturas, data: data_parametrosfacturas} = await useFetch('/api/parametrosfacturas')
const {status: status_cheques, data: data_parametroscheques } = await useFetch('/api/parametroscheques')
const tableUI = {
<<<<<<< HEAD
<<<<<<< HEAD
    divide: 'divide-y divide-sea-green-600 dark:divide-sea-green-900',
=======
    divide: 'divide-y divide-sea-green-300 dark:divide-sea-green',
>>>>>>> df1469f0 (Initial commit)
=======
    divide: 'divide-y divide-sea-green-600 dark:divide-sea-green-900',
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
    th: {
        base: 'text-left rtl:text-right',
        padding: 'px-4 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-sm',
    },
    td: {
        base: 'text-left whitespace-nowrap',
        padding: 'px-4 py-4',
        color: 'text-gray-500 dark:text-gray-400',
        font: 'font-semibold',
        size: 'text-sm',
    },
}
const columns1 = [
  {
    key: 'nombre_modificado',
    label: 'DESCRIPCIÓN',
<<<<<<< HEAD
=======
    
>>>>>>> df1469f0 (Initial commit)
  },
  {
    key: 'datos',
    label: ''
  }
]
const columns2 = [{
    key: 'desde',
    label: 'DESDE'
  }, {
    key: 'hasta',
    label: 'HASTA'
  }, {
    key: 'dias',
    label: ''
  },{
    key: 'dto',
    label: '%'
  }
]
const columns3 = [{
    key: 'desde',
    label: 'DESDE'
  }, {
    key: 'hasta',
    label: 'HASTA'
  }, {
    key: 'dias',
    label: ''
  }, {
    key: 'dto',
    label: '%'
  }
]

const parametros1 = [{
    label: "Parametros generales",
    icon: "",
    slot: "datos1"
}]
const parametros2 = [{
    label: "Escala de descuentos para actualizar FACTURAS",
    icon: "",
    slot: "datos2"
}]
const parametros3 = [{
    label: "Escala de descuentos en facturas, para cobrar con cheques",
    icon: "",
    slot: "datos3"
}]
<<<<<<< HEAD
const interesDiario = data_parametros.value?.map(data=> data.interes_diario)[0];
const data_parametrosgrales_rtl = data_parametros.value ? data_parametros.value : {}
const dataNameModify = ["ID","MAXIMO DTO.FINANCIERO", "TOLERENCIA DIFERENCIA PARA CERRAR PAGOS", "UNIDAD DE TIEMPO PARA CHEQUES", "UNIDAD DE TIEMPO PARA TARJETAS DE CREDITO", "ABREVIATURA PARA TARJETAS DE CREDITO", "ABREVIATURA PARA TARJETAS DE DEBITO", "TASA IVA", "INTERÉS DIARIO PARA FACTURAS", "DÓLAR", "FECHA DÓLAR", "USUARIO DÓLAR"]
=======

const data_parametrosgrales_rtl = data_parametros.value ? data_parametros.value : {}
const dataNameModify = ["ID","MAXIMO DTO.FINANCIERO", "TOLERENCIA DIFERENCIA PARA CERRAR PAGOS", "UNIDAD DE TIEMPO PARA CHEQUES", "UNIDAD DE TIEMPO PARA TARJETAS DE CREDITO", "ABREVIATURA PARA TARJETAS DE CREDITO", "ABREVIATURA PARA TARJETAS DE DEBITO", "TASA IVA", "FECHA DE ALTA"]
>>>>>>> df1469f0 (Initial commit)
const parametrosNombre = data_parametros.value?.map(f => Object.keys(f))[0];

const newData2 = dataNameModify?.map((v)=>{
    let dataName = {
        nombre_modificado: ''
    }
    dataName.nombre_modificado = v
    return dataName
})

const newData = parametrosNombre?.map((f) => {    
    let dataName = {
        nombre: '',
        datos: ''
    }
<<<<<<< HEAD
    dataName.nombre = f
    data_parametros.value?.forEach((d:any)=>{
        const percent = f == "max_dto_financiero" || f == "tolerncia_dif" || f == "tasa_iva" || f == "interes_diario" ? '%' : ''
        dataName.datos = d[f] + percent 
    });
    
=======

    dataName.nombre = f
    data_parametros.value?.forEach((d:any)=>{
        const percent = f == "max_dto_financiero" || f == "tolerncia_dif" || f == "tasa_iva" ? '%' : ''
        dataName.datos = d[f] + percent
    });

>>>>>>> df1469f0 (Initial commit)
    return dataName
});

const dataYes = []
<<<<<<< HEAD
newData?.splice(0,1)
newData2?.splice(0,1)
newData?.splice(9,2)
newData2?.splice(9,2)
for(let i = 0; i < (newData ? newData.length : 0); i++){
    
=======
for(let i = 0; i < (newData ? newData.length : 0); i++){
>>>>>>> df1469f0 (Initial commit)
    dataYes.push({
        nombre: newData ? newData[i].nombre : '',
        nombre_modificado: newData2[i].nombre_modificado,
        datos: newData ? newData[i].datos : ''
    })
<<<<<<< HEAD
    
}
const resultadosYes = dataYes
=======
}
const resultadosYes = dataYes.slice(1,8)
>>>>>>> df1469f0 (Initial commit)

const dataYes2: any[] = []
data_parametrosfacturas.value?.forEach(item => dataYes2.push({
    desde: item.desde,
    hasta: item.hasta,
    dias: 'DIAS',
    dto: item.dto
}))

const dataYes3: any[] = []
data_parametroscheques.value?.forEach(item => dataYes3.push({
    desde: item.desde,
    hasta: item.hasta,
    dias: 'DIAS',
    dto: item.dto
}))


</script>