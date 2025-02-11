<template>
    <div>
        <NuxtRouteAnnouncer />  
        <UContainer :ui="{ constrained: 'max-w-screen-sm' }">
            <div class="text-center p-4 text-lg font-bold">
                <h2>Inicio sesión</h2>
            </div>
            <div>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="login">
                    <UFormGroup label="Usuario" name="username">
                        <UInput v-model="state.username" />
                    </UFormGroup>

                    <UFormGroup label="Contraseña" name="password">
                        <UInput v-model="state.password" type="password" />
                    </UFormGroup>

                    <UButton variant="soft" type="submit">Ingresar</UButton>
                </UForm>
            </div>
        </UContainer>
    </div>
</template>
<script setup lang="ts">
import { number, z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const runtimeConfig = useRuntimeConfig()
definePageMeta({
    title: 'Login - Simulador de cobranzas'
})
const toast = useToast()
const { authenticateUser } = useAuthStore();
const { authenticated, roles} = storeToRefs(useAuthStore());
const router = useRouter();

const state = reactive({
    username: '',
    password: ''
})

const info = reactive({
    fullname: '',
    avatar: '',
    disabled: false
})

type Schema = z.output<typeof schema>
const form = ref<Form<Schema>>()
    const schema = z.object({
    username: z.string(),
    password: z.string()
})

const login = async (event: FormSubmitEvent<Schema>) => {
        const { data: data_auth, status: status_auth, error: error_auth } = await useFetch(runtimeConfig.public.apiBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: {
            username: state.username,
            password: state.password
            },
        });
        const {data: data_roles, status: status_roles} = await useFetch('/api/roles');
        const {data: data_usuarios, status: status_usuarios} = await useFetch('/api/usuarios');

        if (status_auth?.value === "success" && status_roles?.value === "success" && status_usuarios?.value === "success") {
            
            roles.value = (data_usuarios.value as any[])?.map((user: any) => {
                return {
                    ...user,
                    rol: (data_roles.value as any[])?.filter((rol: any) => rol.id === user.id_roles).map((rol: any) => rol.nombre) || []
                }
            }) || [];
            
            const isRol = roles.value.filter((user: any) => user.usuario_ad === state.username).map((user: any) => user.rol)[0]
            
            info.fullname = (data_auth.value as any).user.name
            info.avatar = (data_auth.value as any).avatar            
            info.disabled = isRol ? (isRol[0] === "Editor" ? true : false) : ''

            if (isRol === undefined){
                throw toast.add({title:'Acceso denegado', description: 'No tienes permisos para acceder a esta aplicación.', icon:'i-heroicons-exclamation-circle', color:"red"});
            }

            await authenticateUser({username: state.username, avatar: info.avatar, fullname: info.fullname, rol: isRol, disabled: info.disabled});
                
            if (authenticated) {
                router.push('/');
            }
        }

        if(error_auth.value?.statusCode === 400){
            return toast.add({title: 'Usuario o contraseña incorrectos', description: 'Por favor, verifique sus credenciales.', icon:'i-heroicons-exclamation-circle', color:"red"});           
        }
        
        if (error_auth.value?.statusCode === 500){
            return toast.add({title:'Error interno del servidor', description: 'Por favor, intente más tarde.', icon:'i-heroicons-exclamation-circle', color:"red"});
        }
};
</script>