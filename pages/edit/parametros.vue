<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>EDITAR LOS PARAMETROS GENERALES</h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros1">
                        <template #datos1 v-if="data_parametros">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <Toolbar class="mb-1">
                                    <template #start>
                                        <UButton @click="isOpenModal = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_parametros" editMode="row" v-model:editingRows="editingRows" dataKey="id" @row-edit-save="onRowEditSave1"
                                    :pt="{
                                        table: { class: 'w-full'},
                                        columnHeaderContent: { class: '!text-gray-500 dark:!text-gray-400'},
                                        headerrow: { class: 'border-solid border-b border-sea-green-600 dark:border-sea-green-900' },
                                        bodyrow: { class: 'border-solid border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
                                        column: {
                                            bodycell: ({ state } : any) => ({
                                                style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                                            })
                                        }
                                    }">
                                    <Column field="max_dto_financiero" header="MAXIMO DTO.FINANCIERO">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tolerncia_dif" header="TOLERENCIA DIFERENCIA PARA CERRAR PAGOS">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="unidad_tiempo_cheq" header="UNIDAD DE TIEMPO PARA CHEQUES">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="unidad_tiempo_tc" header="UNIDAD DE TIEMPO PARA TARJETAS DE CREDITO">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="abv_tarjetas_credito" header="ABREVIATURA PARA TARJETAS DE CREDITO">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="abv_tarjetas_debito" header="ABREVIATURA PARA TARJETAS DE DEBITO">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tasa_iva" header="TASA IVA">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="interes_diario" header="INTERÉS DIARIO PARA ACTUALIZAR FACTURAS">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="dolar" header="DÓLAR">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdParametros(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                                <UModal v-model="isOpenModal">
                                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                        <template #header>
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                Agregar datos
                                                </h3>
                                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal = false" />
                                            </div>
                                        </template>

                                        <div class="grid grid-rows-7 gap-4">
                                            <div class="col-span">
                                                <label for="max_dto_financiero" class="block font-bold mb-3">MAXIMO DTO.FINANCIERO</label>
                                                <UInput id="max_dto_financiero" v-model="agregarDatos.max_dto_financiero" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tolerncia_dif" class="block font-bold mb-3">TOLERENCIA DIFERENCIA PARA CERRAR PAGOS</label>
                                                <UInput id="tolerncia_dif" v-model="agregarDatos.tolerncia_dif" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="unidad_tiempo_cheq" class="block font-bold mb-3">UNIDAD DE TIEMPO PARA CHEQUES</label>
                                                <UInput id="unidad_tiempo_cheq" v-model="agregarDatos.unidad_tiempo_cheq" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="unidad_tiempo_tc" class="block font-bold mb-3">UNIDAD DE TIEMPO PARA TARJETAS DE CREDITO</label>
                                                <UInput id="unidad_tiempo_tc" v-model="agregarDatos.unidad_tiempo_tc" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="abv_tarjetas_credito" class="block font-bold mb-3">ABREVIATURA PARA TARJETAS DE CREDITO</label>
                                                <UInput id="abv_tarjetas_credito" v-model="agregarDatos.abv_tarjetas_credito" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="abv_tarjetas_debito" class="block font-bold mb-3">ABREVIATURA PARA TARJETAS DE DEBITO</label>
                                                <UInput id="abv_tarjetas_debito" v-model="agregarDatos.abv_tarjetas_debito" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tasa_iva" class="block font-bold mb-3">TASA IVA</label>
                                                <UInput id="tasa_iva" v-model="agregarDatos.tasa_iva" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tasa_iva" class="block font-bold mb-3">INTERÉS DIARIO PARA ACTUALIZAR FACTURAS</label>
                                                <UInput id="tasa_iva" v-model="agregarDatos.interes_diario" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tasa_iva" class="block font-bold mb-3">DÓLAR</label>
                                                <UInput id="tasa_iva" v-model="agregarDatos.dolar" fluid />
                                            </div>
                                        </div>
                                        <template #footer>
                                            <div class="float-end pb-4">
                                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal = false" variant="link" color="black" />
                                                <UButton label="Guardar" icon="i-heroicons-check" @click="submitCreate1"  variant="soft"/>
                                            </div>
                                        </template>
                                    </UCard>
                                </UModal>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros2">
                        <template #datos2 v-if="data_parametrosfacturas">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <Toolbar class="mb-1">
                                    <template #start>
                                        <UButton @click="isOpenModal2 = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_parametrosfacturas" editMode="row" v-model:editingRows="editingRows2" dataKey="id" @row-edit-save="onRowEditSave2"
                                    :pt="{
                                        table: { class: 'w-full'},
                                        columnHeaderContent: { class: '!text-gray-500 dark:!text-gray-400'},
                                        headerrow: { class: 'border-solid border-b border-sea-green-600 dark:border-sea-green-900' },
                                        bodyrow: { class: 'border-solid border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
                                        column: {
                                            bodycell: ({ state } : any) => ({
                                                style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                                            })
                                        }
                                    }">
                                    <Column field="desde" header="DESDE">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="hasta" header="HASTA">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="dto" header="DTO.">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdParametrosFacturas(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                                <UModal v-model="isOpenModal2">
                                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                        <template #header>
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                Agregar datos
                                                </h3>
                                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal2 = false" />
                                            </div>
                                        </template>

                                        <div class="grid grid-rows-7 gap-4">
                                            <div class="col-span">
                                                <label for="max_dto_financiero" class="block font-bold mb-3">DESDE</label>
                                                <UInput id="max_dto_financiero" v-model="agregarDatos2.desde" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tolerncia_dif" class="block font-bold mb-3">HASTA</label>
                                                <UInput id="tolerncia_dif" v-model="agregarDatos2.hasta" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="unidad_tiempo_cheq" class="block font-bold mb-3">DESCUENTO</label>
                                                <UInput id="unidad_tiempo_cheq" v-model="agregarDatos2.dto" fluid />
                                            </div>
                                        </div>

                                        <template #footer>
                                            <div class="float-end pb-4">
                                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal2 = false" variant="link" color="black" />
                                                <UButton label="Guardar" icon="i-heroicons-check" @click="submitCreate2"  variant="soft"/>
                                            </div>
                                        </template>
                                    </UCard>
                                </UModal>
                                    <div class="flex justify-around text-left px-3 py-3.5 border-t border-sea-green-600 dark:border-sea-green-900">
                                        <span>INTERES DIARIO a aplicar sobre base CONTADO EFECTIVO, para actualizar facturas con 61 días o más</span>
                                        <span>0.417000%</span>
                                    </div>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="parametros3">
                        <template #datos3 v-if="data_parametroscheques">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <Toolbar class="mb-1">
                                    <template #start>
                                        <UButton @click="isOpenModal3 = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_parametroscheques" editMode="row" v-model:editingRows="editingRows3" dataKey="id" @row-edit-save="onRowEditSave3"
                                    :pt="{
                                        table: { class: 'w-full'},
                                        columnHeaderContent: { class: '!text-gray-500 dark:!text-gray-400'},
                                        headerrow: { class: 'border-solid border-b border-sea-green-600 dark:border-sea-green-900' },
                                        bodyrow: { class: 'border-solid border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
                                        column: {
                                            bodycell: ({ state } : any) => ({
                                                style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                                            })
                                        }
                                    }">
                                    <Column field="desde" header="DESDE">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="hasta" header="HASTA">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="dto" header="DTO.">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdParametrosCheques(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                                <UModal v-model="isOpenModal3">
                                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                        <template #header>
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                Agregar datos
                                                </h3>
                                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal3 = false" />
                                            </div>
                                        </template>

                                        <div class="grid grid-rows-7 gap-4">
                                            <div class="col-span">
                                                <label for="max_dto_financiero" class="block font-bold mb-3">DESDE</label>
                                                <UInput id="max_dto_financiero" v-model="agregarDatos3.desde" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="tolerncia_dif" class="block font-bold mb-3">HASTA</label>
                                                <UInput id="tolerncia_dif" v-model="agregarDatos3.hasta" fluid />
                                            </div>
                                            <div class="col-span">
                                                <label for="unidad_tiempo_cheq" class="block font-bold mb-3">DESCUENTO</label>
                                                <UInput id="unidad_tiempo_cheq" v-model="agregarDatos3.dto" fluid />
                                            </div>
                                        </div>

                                        <template #footer>
                                            <div class="float-end pb-4">
                                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal3 = false" variant="link" color="black" />
                                                <UButton label="Guardar" icon="i-heroicons-check" @click="submitCreate3"  variant="soft"/>
                                            </div>
                                        </template>
                                    </UCard>
                                </UModal>
                            </div>
                        </template>
                    </UAccordion>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})
const {status: status_parametros, data: data_parametros, refresh: refresh_parametros} = await useFetch('/api/parametrosgenerales')
const {status: status_facturas, data: data_parametrosfacturas, refresh: refresh_parametrosfacturas} = await useFetch('/api/parametrosfacturas')
const {status: status_cheques, data: data_parametroscheques, refresh: refresh_parametroscheques} = await useFetch('/api/parametroscheques')
const toast = useToast()
const isOpenModal = ref(false)
const editingRows = ref([]);
const agregarDatos = ref({
        max_dto_financiero: '',
        tolerncia_dif: '',
        unidad_tiempo_cheq: '',
        unidad_tiempo_tc: '',
        abv_tarjetas_credito: '',
        abv_tarjetas_debito: '',
        tasa_iva: '',
        interes_diario: '',
        fecha_alta: new Date(),
        dolar: ''
})

const isOpenModal2 = ref(false)
const editingRows2 = ref([]);
const agregarDatos2 = ref({
    desde: '',
    hasta: '',
    dto: ''
})

const isOpenModal3 = ref(false)
const editingRows3 = ref([]);
const agregarDatos3 = ref({
    desde: '',
    hasta: '',
    dto: ''
})

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

const onRowEditSave1 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    
    const res = await $fetch('/api/parametrosgenerales/'+Id, {
        method: 'PUT',
        body: {
            max_dto_financiero: newData.max_dto_financiero,
            tolerncia_dif: newData.tolerncia_dif,
            unidad_tiempo_cheq: newData.unidad_tiempo_cheq,
            unidad_tiempo_tc: newData.unidad_tiempo_tc,
            abv_tarjetas_credito: newData.abv_tarjetas_credito,
            abv_tarjetas_debito: newData.abv_tarjetas_debito,
            tasa_iva: newData.tasa_iva,
            fecha_alta: newData.fecha_alta,
            interes_diario: newData.interes_diario,
            dolar: newData.dolar
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_parametros();
    await preloadComponents('header')
}

const removeIdParametros = async (e: any) => {
    const res = await $fetch('/api/parametrosgenerales/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_parametros();
}

const submitCreate1 = async () => {
    const res = await $fetch('/api/parametrosgenerales', {
        method: 'POST',
        body: {
            max_dto_financiero: agregarDatos.value?.max_dto_financiero,
            tolerncia_dif: agregarDatos.value?.tolerncia_dif,
            unidad_tiempo_cheq: agregarDatos.value?.unidad_tiempo_cheq,
            unidad_tiempo_tc: agregarDatos.value?.unidad_tiempo_tc,
            abv_tarjetas_credito: agregarDatos.value?.abv_tarjetas_credito,
            abv_tarjetas_debito: agregarDatos.value?.abv_tarjetas_debito,
            tasa_iva: agregarDatos.value?.tasa_iva,
            fecha_alta: agregarDatos.value?.fecha_alta,
            interes_diario: agregarDatos.value?.interes_diario,
            dolar: agregarDatos.value?.dolar
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal.value = false
    refresh_parametros();
}

const onRowEditSave2 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    const Desde = newData.desde
    const Hasta = newData.hasta
    const Dto = newData.dto
    
    const res = await $fetch('/api/parametrosfacturas/'+Id , {
        method: 'PUT',
        body: {
            desde: Desde,
            hasta: Hasta,
            dto: Dto
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_parametrosfacturas();
}

const removeIdParametrosFacturas = async (e: any) => {
    const res = await $fetch('/api/parametrosfacturas/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_parametrosfacturas();
}

const submitCreate2 = async () => {
    const res = await $fetch('/api/parametrosfacturas', {
        method: 'POST',
        body: {
            desde: agregarDatos2.value?.desde,
            hasta: agregarDatos2.value?.hasta,
            dto: agregarDatos2.value?.dto
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal2.value = false
    refresh_parametrosfacturas();
}

const onRowEditSave3 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    const Desde = newData.desde
    const Hasta = newData.hasta
    const Dto = newData.dto
    
    const res = await $fetch('/api/parametroscheques/'+Id , {
        method: 'PUT',
        body: {
            desde: Desde,
            hasta: Hasta,
            dto: Dto
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_parametroscheques();
}

const removeIdParametrosCheques = async (e: any) => {
    const res = await $fetch('/api/parametroscheques/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_parametroscheques();
}

const submitCreate3 = async () => {
    const res = await $fetch('/api/parametroscheques', {
        method: 'POST',
        body: {
            desde: agregarDatos3.value?.desde,
            hasta: agregarDatos3.value?.hasta,
            dto: agregarDatos3.value?.dto
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal3.value = false
    refresh_parametroscheques();
}
</script>