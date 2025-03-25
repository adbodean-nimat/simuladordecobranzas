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

                    <UButton variant="soft" type="submit" @click="$emit('update')">Ingresar</UButton>
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
    title: 'Login - Simulador de cobranzas',
    layout: 'login'
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
    avatar: ''
})

type Schema = z.output<typeof schema>
const form = ref<Form<Schema>>()
    const schema = z.object({
    username: z.string(),
    password: z.string()
})
const login = async (event: FormSubmitEvent<Schema>) => {
        /* const { data: data_auth, status: status_auth, error: error_auth } = await useFetch(runtimeConfig.public.apiBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: {
            username: state.username,
            password: state.password
            },
        }); */
        const response : any = await $fetch(runtimeConfig.public.apiLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: {
                username: state.username,
                password: state.password
            },
            async onResponse({ request, response, options }) {
                //console.log("[fetch response]", request, response.status, response.body);
                if(response.status === 400){
                    toast.add({title: 'Usuario o contraseña incorrectos', description: 'Por favor, verifique sus credenciales.', icon:'i-heroicons-exclamation-circle', color:"red"});           
                }
                if (response.status === 500){
                    toast.add({title:'Error interno del servidor', description: 'Por favor, intente más tarde.', icon:'i-heroicons-exclamation-circle', color:"red"});
                }
                
            }
        }).then((response : any) => {
            return response
        }).catch((err)=> console.log(err));
        //const {data: data_roles, status: status_roles} = await useFetch('/api/roles');
        //const {data: data_usuarios, status: status_usuarios} = await useFetch('/api/usuarios');
        const response_roles = await $fetch('/api/roles');
        const response_usuarios = await $fetch('/api/usuarios');

        if (response && response_roles && response_usuarios) {
            
            roles.value = (response_usuarios as any[])?.map((user: any) => {
                return {
                    ...user,
                    rol: (response_roles as any[])?.filter((rol: any) => rol.id === user.id_roles).map((rol: any) => rol.nombre) || []
                }
            }) || [];
            
            const isRol = roles.value.filter((user: any) => user.usuario_ad === state.username).map((user: any) => user.rol)[0]
            
            info.fullname = response.user.name
            //(data_auth.value as any).user.name
            info.avatar = response.avatar
            //(data_auth.value as any).avatar            

            if (isRol === undefined){
                throw toast.add({title:'Acceso denegado', description: 'No tienes permisos para acceder a esta aplicación.', icon:'i-heroicons-exclamation-circle', color:"red"});
            }

            await authenticateUser({
                username: state.username, 
                avatar: info.avatar, 
                fullname: info.fullname, 
                rol: isRol
            });

            if (authenticated) {
                router.push('/');
                await nextTick();
            }
        }
};
</script>