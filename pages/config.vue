<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>CONFIGURACIÓN</h2>
            </div>

            <div class="grid gap-4">
                <Toolbar class="mb-1 border-none">
                    <template #start>
                        <UButton @click="isOpenModal = true" icon="i-material-symbols-add-circle" size="md" square variant="soft">Agregar usuario</UButton>
                    </template>
                </Toolbar>
                <UModal v-model="isOpenModal">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Agregar usuario
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal = false" />
                            </div>
                        </template>
                        <div class="flex flex-col gap-6">
                            <div>
                                <label for="nombre" class="block font-bold mb-3">Nombre</label>
                                <UInput id="nombre" v-model="agregarUsuario.nombre" fluid />
                            </div>
                            <div>
                                <label for="usuario_ad" class="block font-bold mb-3">Usuario AD</label>
                                <UInput id="usuario_ad" v-model="agregarUsuario.usuario_ad" fluid />
                            </div>
                            <div>
                                <label for="roles" class="block font-bold mb-3">Rol</label>
                                <USelect v-model="agregarUsuario.roles" :options="roles" option-attribute="label" value-attribute="value" />
                            </div>
                        </div>
                        <template #footer>
                            <div class="float-end pb-4">
                                <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal = false" variant="link" color="black" />
                                <UButton label="Guardar" icon="i-heroicons-check" @click="createUsuario()"  variant="soft"/>
                            </div>
                        </template>
                    </UCard>
                </UModal>
                <DataTable v-model:editingRows="editingRows" :value="data_usuarios" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" 
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
                        <template #header>
                            <div class="flex flex-wrap gap-2 items-center justify-between">
                                <h4 class="m-0">Usuarios</h4>
                                
                            </div>
                        </template>
                        <Column field="nombre" header="Nombre">
                            <template #editor="{ data, field}">
                                <UInput v-model="data[field]" fluid />
                            </template>
                        </Column>
                        <Column field="usuario_ad" header="Usuario AD">
                            <template #editor="{ data, field}">
                                <UInput v-model="data[field]" fluid />
                            </template>
                        </Column>
                        <!-- <Column field="id_roles" header="Id Rol">
                            <template #editor="{ data, field}">
                                <UInput v-model="data[field]" fluid />
                            </template>
                        </Column> -->
                        <Column field="id_roles" header="Rol">
                            <template #editor="{ data, field }">
                                <Select v-model="data[field]" :options="roles" optionLabel="label" optionValue="value" placeholder="Seleccione un rol" fluid>
                                    <template #option="slotProps">
                                        <Tag :value="slotProps.option.value == 1 ? 'Administrador' : 'Editor'" />
                                    </template>
                                </Select>
                            </template>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.simulador_cobranzas_roles.nombre" />
                            </template>
                        </Column>
                        <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:right"></Column>
                        <Column style="width: 5%;" bodyStyle="text-align:left">
                            <template #body="{ data }">
                                <UButton class="flex-none" icon="i-heroicons-trash-solid" size="sm" variant="link" color="red" squre @click="removeId(data.id)"></UButton> 
                            </template>
                        </Column>
                </DataTable>
            </div>

        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Configuración de aplicación - Simulador de cobranzas',
    middleware: ['auth', '2-admin']
})
const toast = useToast()
const editingRows = ref()
const {data: data_roles, status: status_roles, refresh: refresh_roles} = await useFetch('/api/roles');
const {data: data_usuarios, status: status_usuarios, refresh: refresh_usuarios} = await useFetch('/api/usuarios');
const roles = ref([
    { label: 'Administrador', value: 1 },
    { label: 'Editor', value: 2 },
    { label: 'Editor Dólar', value: 3 },
]);
const isOpenModal = ref(false)
const agregarUsuario = ref({
    nombre: '',
    usuario_ad: '',
    roles: ''
})
const onRowEditSave = async (e: any) => {
    let { newData, index} = e;
    const Id = newData.id

    const res = await $fetch('/api/usuarios/'+Id , {
        method: 'PUT',
        body: {
            nombre: newData.nombre,
            usuario_ad: newData.usuario_ad,
            id_roles: newData.id_roles
        }
    })
    toast.add({title: "Modificado correctamente"})
    refresh_usuarios();
}

const removeId = async (e: any) => {
    const res = await $fetch('/api/usuarios/'+e, {
        method: 'DELETE'
    })
    toast.add({title: "Eliminado correctamente"})
    refresh_usuarios();
}

const createUsuario = async () => {
    const res = await $fetch('/api/usuarios', {
        method: 'POST',
        body: {
            nombre: agregarUsuario.value?.nombre,
            usuario_ad: agregarUsuario.value?.usuario_ad,
            id_roles: Number(agregarUsuario.value?.roles)
        }
    })
    toast.add({title: "Agregado correctamente"})
    isOpenModal.value = false
    agregarUsuario.value = {
        nombre: '',
        usuario_ad: '',
        roles: ''
    }
    refresh_usuarios();
}
</script>