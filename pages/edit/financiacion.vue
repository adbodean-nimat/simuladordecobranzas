<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>EDITAR EL COSTO DE FINANCIACIÓN</h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="financiero1">
                        <template #visa-master-nativa v-if="data_visamasternativa">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <Toolbar class="mb-1 border-none">
                                    <template #start>
                                        <UButton @click="isOpenModal = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_visamasternativa" editMode="row" v-model:editingRows="editingRows" dataKey="id" @row-edit-save="onRowEditSave1"
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
                                    <Column field="cuotas" header="CUOTAS">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tasas_interes" header="%">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdVisaMasterNativa(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </UAccordion>
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
                                    <UInput id="cuotas" v-model="agregarDatos.cuotas" fluid />
                                </div>
                                <div class="col-span-6">
                                    <label for="tasas_interes" class="block font-bold mb-3">Tasa interés</label>
                                    <UInput id="tasas_interes" v-model="agregarDatos.tasas_interes" fluid />
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
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="financiero2">
                        <template #naranja v-if="data_naranja">
                            <div class="text-sea-green-900 dark:text-white">
                                <Toolbar class="mb-1 border-none">
                                    <template #start>
                                        <UButton @click="isOpenModal2 = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_naranja" editMode="row" v-model:editingRows="editingRows2" dataKey="id" @row-edit-save="onRowEditSave2"
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
                                    <Column field="cuotas" header="CUOTAS">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tasas_interes" header="%">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdNaranja(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </UAccordion>
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

                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-6">
                                    <label for="cuotas" class="block font-bold mb-3">Cuotas</label>
                                    <UInput id="cuotas" v-model="agregarDatos.cuotas" fluid />
                                </div>
                                <div class="col-span-6">
                                    <label for="tasas_interes" class="block font-bold mb-3">Tasa interés</label>
                                    <UInput id="tasas_interes" v-model="agregarDatos.tasas_interes" fluid />
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
                </div>
                <div>
                    <UAccordion default-open multiple variant="soft" size="xl" :items="financiero3">
                        <template #cuota-simple v-if="data_cuotasimple">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <Toolbar class="mb-1 border-none">
                                    <template #start>
                                        <UButton @click="isOpenModal3 = true" icon="i-material-symbols-add-circle" size="sm" square variant="soft">Agregar</UButton>
                                    </template>
                                </Toolbar>
                                <DataTable :value="data_cuotasimple" editMode="row" v-model:editingRows="editingRows3" dataKey="id" @row-edit-save="onRowEditSave3"
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
                                    <Column field="cuotas" header="CUOTAS">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column field="tasas_interes" header="%">
                                        <template #editor="{ data, field }">
                                            <UInput v-model="data[field]" fluid />
                                        </template>
                                    </Column>
                                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                                    <Column style="width: 5%;" bodyStyle="text-align:left">
                                        <template #body="{ data }">
                                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeIdCuotaSimple(data.id)"></UButton> 
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </UAccordion>
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

                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-6">
                                    <label for="cuotas" class="block font-bold mb-3">Cuotas</label>
                                    <UInput id="cuotas" v-model="agregarDatos.cuotas" fluid />
                                </div>
                                <div class="col-span-6">
                                    <label for="tasas_interes" class="block font-bold mb-3">Tasa interés</label>
                                    <UInput id="tasas_interes" v-model="agregarDatos.tasas_interes" fluid />
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
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Editar el costo de financiación',
    middleware: ['auth', '3-editor']
})
const {status: status_visamasternativa, data: data_visamasternativa, refresh: refresh_visamasternativa} = await useFetch('/api/visamasternativa')
const {status: status_naranja, data: data_naranja, refresh: refresh_naranja} = await useFetch('/api/naranja')
const {status: status_cuotasimple, data: data_cuotasimple, refresh: refresh_cuotasimple} = await useFetch('/api/cuotasimple')
const toast = useToast()
const editingRows = ref([]);
const editingRows2 = ref([]);
const editingRows3 = ref([]);
const isOpenModal = ref(false)
const isOpenModal2 = ref(false)
const isOpenModal3 = ref(false)
const agregarDatos = ref({
    cuotas: '',
    tasas_interes: ''
})
const onRowEditSave1 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    const ICuotas = newData.cuotas
    const ITasasInteres = newData.tasas_interes
    
    const res = await $fetch('/api/visamasternativa/'+Id , {
        method: 'PUT',
        body: {
            cuotas: ICuotas,
            tasas_interes: ITasasInteres
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_visamasternativa();
}
const onRowEditSave2 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    const ICuotas = newData.cuotas
    const ITasasInteres = newData.tasas_interes
    
    const res = await $fetch('/api/naranja/'+Id , {
        method: 'PUT',
        body: {
            cuotas: ICuotas,
            tasas_interes: ITasasInteres
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_naranja();
}
const onRowEditSave3 = async (e: any) => {
    let { newData, index } = e;
    
    const Id = newData.id
    const ICuotas = newData.cuotas
    const ITasasInteres = newData.tasas_interes
    
    const res = await $fetch('/api/cuotasimple/'+Id , {
        method: 'PUT',
        body: {
            cuotas: ICuotas,
            tasas_interes: ITasasInteres
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_cuotasimple();
}

const removeIdVisaMasterNativa = async (e: any) => {
    //console.log(e)
    const res = await $fetch('/api/visamasternativa/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_visamasternativa();
}

const removeIdNaranja = async (e: any) => {
    //console.log(e)
    const res = await $fetch('/api/naranja/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_naranja();
}

const removeIdCuotaSimple = async (e: any) => {
    //console.log(e)
    const res = await $fetch('/api/cuotasimple/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_cuotasimple();
}

const submitCreate1 = async ()=>{
    const res = await $fetch('/api/visamasternativa', {
        method: 'POST',
        body: {
            cuotas: agregarDatos.value?.cuotas,
            tasas_interes: agregarDatos.value?.tasas_interes
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal.value = false
    refresh_visamasternativa();
}

const submitCreate2 = async ()=>{
    const res = await $fetch('/api/naranja', {
        method: 'POST',
        body: {
            cuotas: agregarDatos.value?.cuotas,
            tasas_interes: agregarDatos.value?.tasas_interes
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal2.value = false
    refresh_naranja();
}

const submitCreate3 = async ()=>{
    const res = await $fetch('/api/cuotasimple', {
        method: 'POST',
        body: {
            cuotas: agregarDatos.value?.cuotas,
            tasas_interes: agregarDatos.value?.tasas_interes
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal3.value = false
    refresh_cuotasimple();
}

const financiero = [{
    label: "VISA-MASTERCARD-NATIVA",
    icon: "",
    slot: "visa-master-nativa"
  },{
    label: "NARANJA",
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
    label: "NARANJA",
    icon: "",
    slot: "naranja"
}]
const financiero3 = [{
    label: "CUOTA SIMPLE",
    icon: "",
    slot: "cuota-simple"
}]
</script>
<style scoped>
</style>