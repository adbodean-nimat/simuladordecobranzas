<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>EDITAR TIPOS DE COMPROBANTES</h2>
            </div>

            <div class="grid gap-4">
                <Toolbar class="mb-1 border-none">
                    <template #start>
                        <UButton @click="isOpenModal = true" icon="i-material-symbols-add-circle" size="md" square
                            variant="soft">Agregar tipo</UButton>
                    </template>
                </Toolbar>
                <UModal v-model="isOpenModal">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Agregar tipo
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                    @click="isOpenModal = false" />
                            </div>
                        </template>
                        <div class="flex flex-col gap-6">
                            <div>
                                <label for="nombre" class="block font-bold mb-3">Código</label>
                                <UInput id="nombre" v-model="agregarTipo.codigo" fluid />
                            </div>
                            <div>
                                <label for="nombre" class="block font-bold mb-3">Nombre</label>
                                <UInput id="nombre" v-model="agregarTipo.nombre" fluid />
                            </div>
                            <div>
                                <label for="signo" class="block font-bold mb-3">Signo</label>
                                <USelect id="signo" v-model="agregarTipo.signo" :options="signos"
                                    placeholder="Selecciona un signo" fluid />
                            </div>
                        </div>
                        <template #footer>
                            <div class="float-end pb-4">
                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid"
                                    @click="isOpenModal = false" variant="link" color="black" />
                                <UButton label="Guardar" icon="i-heroicons-check" @click="createTipo()"
                                    variant="soft" />
                            </div>
                        </template>
                    </UCard>
                </UModal>
                <DataTable v-model:editingRows="editingRows" :value="data_tipos" editMode="row" dataKey="id"
                    @row-edit-save="onRowEditSave" :pt="{
                        table: { class: 'w-full' },
                        columnHeaderContent: { class: '!text-gray-500 dark:!text-gray-400' },
                        headerrow: { class: 'border-solid border-b border-sea-green-300 dark:border-sea-green' },
                        bodyrow: { class: 'border-solid border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400' },
                        column: {
                            bodycell: ({ state }: any) => ({
                                style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                            })
                        }
                    }">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between">
                            <!--                             <h4 class="m-0">Tipos de Comprobantes</h4> -->

                        </div>
                    </template>
                    <Column field="codigo" header="Código">
                        <template #editor="{ data, field }">
                            <UInput v-model="data[field]" fluid />
                        </template>
                    </Column>
                    <Column field="nombre" header="Nombre">
                        <template #editor="{ data, field }">
                            <UInput v-model="data[field]" fluid />
                        </template>
                    </Column>
                    <Column field="signo" header="Signo">
                        <template #editor="{ data, field }">
                            <USelect v-model="data[field]" :options="signos" placeholder="Selecciona un signo" fluid />
                        </template>
                    </Column>
                    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                    <Column style="width: 5%;" bodyStyle="text-align:left">
                        <template #body="{ data }">
                            <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link"
                                color="red" squre @click="removeId(data.id)"></UButton>
                        </template>
                    </Column>
                </DataTable>
            </div>

        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Tipos de Comprobantes - Simulador de cobranzas',
    middleware: ['auth', '3-editor']
})
const toast = useToast()
const editingRows = ref()
const { data: data_tipos, status: status_tipos, refresh: refresh_tipos } = await useFetch('/api/tiposdecomprobantes');
/* const {data: data_roles, status: status_roles, refresh: refresh_roles} = await useFetch('/api/roles');
const {data: data_usuarios, status: status_usuarios, refresh: refresh_usuarios} = await useFetch('/api/usuarios');
 */const isOpenModal = ref(false)
const agregarTipo = ref({
    nombre: '',
    codigo: '',
    signo: ''
})
const signos = [
    { label: 'Crédito', value: 'Crédito' },
    { label: 'Débito', value: 'Débito' }
]
const onRowEditSave = async (e: any) => {
    let { newData, index } = e;
    const Id = newData.id

    const res = await $fetch('/api/tiposdecomprobantes/' + Id, {
        method: 'PUT',
        body: {
            codigo: newData.codigo,
            nombre: newData.nombre,
            signo: newData.signo
        }
    })
    toast.add({ title: "Modificado correctamente" })
    refresh_tipos();
}

const removeId = async (e: any) => {
    const res = await $fetch('/api/tiposdecomprobantes/' + e, {
        method: 'DELETE'
    })
    toast.add({ title: "Eliminado correctamente" })
    refresh_tipos();
}

const createTipo = async () => {
    const res = await $fetch('/api/tiposdecomprobantes', {
        method: 'POST',
        body: {
            codigo: agregarTipo.value?.codigo,
            nombre: agregarTipo.value?.nombre,
            signo: agregarTipo.value?.signo
        }
    })
    toast.add({ title: "Agregado correctamente" })
    isOpenModal.value = false
    agregarTipo.value = {
        codigo: '',
        nombre: '',
        signo: ''
    }
    refresh_tipos();
}
</script>