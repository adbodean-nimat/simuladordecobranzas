<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>EDITAR LOS MEDIOS DE PAGO</h2>
            </div>
            <div class="grid gap-4">
                <Toolbar class="mb-1">
                    <template #start>
                        <UButton @click="isOpenModalGeneral = true" icon="i-material-symbols-add-circle" size="md" square variant="soft">Agregar medio de pago</UButton>
                    </template>
                </Toolbar>
                <UModal v-model="isOpenModalGeneral">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Agregar medio de pago
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModalGeneral = false" />
                            </div>
                        </template>
                        <div class="flex flex-col gap-6">
                            <div>
                                <label for="nombre" class="block font-bold mb-3">Nombre</label>
                                <UInput id="nombre" v-model="agregarDatosMP.nombre" fluid />
                            </div>
                            <div>
                                <label for="tasas_interes" class="block font-bold mb-3">Tipo de pago</label>
                                <UInput id="tasas_interes" v-model="agregarDatosMP.tipodepago" fluid />
                            </div>
                            <div>
                                <label for="estado" class="block font-bold mb-3">Estado</label>
                                <USelect v-model="agregarDatosMP.estado" :options="statuses" option-attribute="label" value-attribute="value" />
                            </div>
                        </div>
                        <template #footer>
                            <div class="float-end pb-4">
                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModalGeneral = false" variant="link" color="black" />
                                <UButton label="Guardar" icon="i-heroicons-check" @click="createMedioPago()"  variant="soft"/>
                            </div>
                        </template>
                    </UCard>
                </UModal>
                <DataTable :expandedRows="expandedRows" @update:expandedRows="onExpandedRows" sortField="tipo_pago" :sortOrder="1" v-model:editingRows="editingRows" :value="data_mediosdepagos" @row-expand="onRowExpand" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
                                    :pt="{
                                        table: { class: 'w-full'},
                                        columnHeaderContent: { class: '!text-gray-500 dark:!text-gray-400'},
                                        headerrow: { class: 'border-solid border-b border-sea-green-300 dark:border-sea-green' },
                                        bodyrow: { class: 'border-solid border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
                                        column: {
                                            bodycell: ({ state } : any) => ({
                                                style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                                            })
                                        }
                                    }">
                                    <Column expander style="width: 5rem" />
                                    <Column field="nombre" header="Nombre">
                                        <template #editor="{ data, field}">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tipo_pago" header="Tipo de pago" sortable>
                                        <template #editor="{ data, field}">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="estado" header="Estado">
                                        <template #editor="{ data, field }">
                                            <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Seleccione un estado" fluid>
                                                <template #option="slotProps">
                                                    <Tag :value="slotProps.option.value == true ? 'HABILITADO' : 'INHABILITADO'" :severity="getStatusLabel(slotProps.option.value)" />
                                                </template>
                                            </Select>
                                        </template>
                                        <template #body="slotProps">
                                            <Tag :value="slotProps.data.estado == true ? 'HABILITADO' : 'INHABILITADO'" :severity="getStatusLabel(slotProps.data.estado)" />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeId(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                    <template #expansion="slotProps">
                                        <div class="p-4">
                                            <Toolbar class="mb-1">
                                                <template #start>
                                                    <UButton @click="isOpenModal = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                                </template>
                                            </Toolbar>
                                            <DataTable :value="slotProps.data.interes_base" resizableColumns columnResizeMode="expand" stripedRows sortField="nro_cuota" :sortOrder="1" editMode="cell" v-model:editingRows="editingRowsGroup" :dataKey="slotProps.data.id.toString()" @cell-edit-complete="onCellEditComplete">
                                                <Column field="nro_cuota" header="Nro. cuota" sortable>
                                                    <template #editor="{ data, field}">
                                                        <UInput v-model="data[field]" fluid />
                                                    </template>
                                                </Column>
                                                <Column field="interes_base" header="Interés sobre base c/ máx. dto. financ.">
                                                    <template #body="{ data, field }">
                                                        {{ formatter_percent(data[field]) }}
                                                    </template>
                                                    <template #editor="{ data, field}">
                                                        <UInput v-model="data[field]" fluid />
                                                    </template>
                                                </Column>
                                                <Column header="Una fact. y varios medios pago">
                                                    <template #body="{data, field}">
                                                        <Tag :value="geUnaFactVariosMP(data.interes_base)" :severity="getStatus(data.interes_base)" />
                                                    </template>
                                                </Column>
                                                <Column style="width: 5%;" bodyStyle="text-align:left">
                                                    <template #body="{ data, index }">
                                                        <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdInteresBase(data.uuid)"></UButton> 
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

                                                    <div class="grid grid-cols-12 gap-4">
                                                        <div class="col-span-6">
                                                            <label for="cuotas" class="block font-bold mb-3">Cuotas</label>
                                                            <UInput id="cuotas" v-model="agregarDatos.nro_cuota" fluid />
                                                        </div>
                                                        <div class="col-span-6">
                                                            <label for="tasas_interes" class="block font-bold mb-3">Tasa interés</label>
                                                            <UInput id="tasas_interes" v-model="agregarDatos.interes_base" fluid />
                                                        </div>
                                                    </div>

                                                    <template #footer>
                                                        <div class="float-end pb-4">
                                                            <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal = false" variant="link" color="black" />
                                                            <UButton label="Guardar" icon="i-heroicons-check" @click="createInteresBase(slotProps.data.id)"  variant="soft"/>
                                                        </div>
                                                    </template>
                                                </UCard>
                                            </UModal>
                                        </div>
                                    </template>
                                </DataTable>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})
const toast = useToast()
const {data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
const {data: data_mediosdepagos, refresh: refresh_mediosdepagos} = await useFetch('/api/mediosdepagos')
const editingRows = ref()
const expandedRows = ref([])
const editingRowsGroup = ref([])
const statuses = ref([
    { label: 'HABILITADO', value: true },
    { label: 'INHABILITADO', value: false }
]);
const isOpenModal = ref(false)
const isOpenModalGeneral = ref(false)
const agregarDatos = ref({
    nro_cuota: '',
    interes_base: ''
})
const agregarDatosMP = ref({
    nombre: '',
    tipodepago: '',
    estado: ''
})
const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0

const geUnaFactVariosMP = (e : number) => {
    return (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + e / 100)*100)/100)).toFixed(2) + '%'
}

const getStatus = (e : number) => {
    const status = (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + e / 100)*100)/100))
    if(status > 0){
        return 'success';
    } else {
        return 'danger'
    }
}

const formatter_percent = (value: number) => { 
    return new Intl.NumberFormat('es-US', {minimumIntegerDigits: 2, minimumFractionDigits: 2}).format(value) + '%'
}

const getStatusLabel = (status : any) => {
    switch (status) {
        case true:
            return 'success';

        case false:
            return 'danger';

        default:
            return ;
    }
};

const createMedioPago = async () => {
    console.log(agregarDatosMP)
    const res = await $fetch('/api/mediosdepagos', {
        method: 'POST',
        body: {
            estado: JSON.parse(agregarDatosMP.value?.estado),
            nombre: agregarDatosMP.value?.nombre,
            medio_pago: agregarDatosMP.value?.nombre,
            tipo_pago: agregarDatosMP.value?.tipodepago,
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModalGeneral.value = false
    refresh_mediosdepagos();
}

const onRowEditSave = async (e: any) => {
    let { newData, index} = e;
    const Id = newData.id

    const res = await $fetch('/api/mediosdepagos/'+Id , {
        method: 'PUT',
        body: {
            estado: newData.estado,
            nombre: newData.nombre,
            medio_pago: newData.medio_pago,
            tipo_pago: newData.tipo_pago
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_mediosdepagos();
}
const removeId = async (e: any) => {
    const res = await $fetch('/api/mediosdepagos/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_mediosdepagos();
}

const onExpandedRows = (newValue: any) => {
    //console.log(newValue)
}

const onCellEditComplete = async (e: any) => {
    let { data, newValue, field, index } = e;
    const datatoJson = JSON.stringify(field) + ': '+ newValue
    console.log(JSON.parse(JSON.stringify(datatoJson)))
    console.log(data.uuid)
    console.log(newValue)
    console.log(field)

    const res = await $fetch('/api/mediosdepagos/interesbase/'+data.uuid, {
        method: 'PUT',
        body: { 
            nro_cuota: field == 'nro_cuota' ? newValue : '',
            interes_base: field == 'interes_base' ? newValue : ''
         }
        
    })

    toast.add({title: "Modificado correctamente"})
    refresh_mediosdepagos();
}

const removeIdInteresBase = async (e: string) => {
    const res = await $fetch('/api/mediosdepagos/interesbase/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_mediosdepagos();
}

const createInteresBase = async (id: any) => {
    console.log(id)
    const res = await $fetch('/api/mediosdepagos/interesbase/', {
        method: 'POST',
        body: {
            id: id,
            nro_cuota: agregarDatos.value?.nro_cuota,
            interes_base: agregarDatos.value?.interes_base
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal.value = false
    agregarDatos.value.nro_cuota = '';
    agregarDatos.value.interes_base = '';
    refresh_mediosdepagos();
}

const onRowExpand = (event: any) => {
    //console.log(event.data)
}
</script>