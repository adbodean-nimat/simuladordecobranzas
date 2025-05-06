<template>
    <UContainer :ui="{ constrained: 'max-w-screen-2xl'}">
<<<<<<< HEAD
      <nav class="flex flex-row items-center justify-between h-16"> 
            <div>
                <UHorizontalNavigation :ui="navbar" :links="links" />
            </div>
            
            <div class="flex justify-end">
              <Dolar />
              <ClientOnly>
                <UButton
                  :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                  color="gray"
                  variant="ghost"
                  aria-label="Theme"
                  class="px-2.5"
                  @click="isDark = !isDark"
                />
                <template #fallback>
                  <div class="w-5 h-5" />
                </template>   
              </ClientOnly>
                <template v-if="!authenticated" style="float: right">
                  <UHorizontalNavigation :links="linkLogin"/>
                </template>
                <template v-if="authenticated" style="float: right">
                    <UDropdown :items="dropItems" :popper="{ placement: 'bottom-start' }">
                      <template v-if="avatar">
                        <UAvatar :src="'data:image/png;base64,'+ avatar" alt="Avatar" icon="i-material-symbols-account-circle" size="sm" color="gray" variant="ghost" :label="fullName" aria-label="Theme" />
                      </template>
                      <template v-else>
                        <UButton :icon="'i-material-symbols-account-circle'" color="gray" variant="ghost" size="md" aria-label="Theme" />
                      </template>
                      
                      <template #account="{ item }">
                        <div class="text-left">
                          <p>
                            Inició sesión como
                          </p>
                          <p class="truncate font-medium text-gray-900 dark:text-white">
                            {{ item.label }}
                          </p>
                        </div>
                      </template>

                      <template #item="{ item }">
                        <span class="truncate">{{ item.label }}</span>

                        <UIcon :name="item.icon" size="sm" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                      </template>
                    </UDropdown>
                    <UModal v-model="isOpenModal">
                        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                      
                                      Mi perfil
                                    </h3>
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal = false" />
                                </div>
                            </template>

                            <div class="grid gap-4">
                                <div class="col">
                                    <!-- <UFormGroup label="Avatar:" description="Cambiar avatar">
                                      <UInput id="avatar" size="sm" type="file"  icon="i-heroicons-folder" fluid />
                                    </UFormGroup> -->
                                </div>
                                <div class="col">
                                  <UFormGroup>
                                    <div>
                                      <label for="Nombre">Nombre completo:</label>
                                      {{ fullName }}
                                    </div>
                                    <div>
                                      <label for="Rol">Rol:</label>
                                      {{ isRol?.toString() }}
                                    </div>
                                  </UFormGroup>
                                </div>
                            </div>

                            <template #footer>
                                <div class="float-end pb-4">
                                    <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal = false" variant="link" color="black" />
                                    <!-- <UButton label="Guardar" icon="i-heroicons-check" @click=""  variant="soft"/> -->
                                </div>
                            </template>
                        </UCard>
                    </UModal>
                  <!-- <UHorizontalNavigation :links="linkLogout"/> -->
                </template>
=======
        <nav class="flex flex-row items-center justify-between h-16"> 
            <div>
                <UHorizontalNavigation :ui="navbar" :links="links" />
            </div>
            <div class="flex">
                <ClientOnly>
                    <UButton
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        class="px-2.5"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-5 h-5" />
                    </template>
                    
                </ClientOnly>
<<<<<<< HEAD
>>>>>>> df1469f0 (Initial commit)
=======
                <template v-if="!authenticated" style="float: right">
                  <UHorizontalNavigation :links="linkLogin"/>
                </template>
                <template v-if="authenticated" style="float: right">
                    <UDropdown :items="DropItems" :popper="{ placement: 'bottom-start' }">
                      <template v-if="authStore.avatar">
                        <UAvatar :src="'data:image/png;base64,'+ authStore.avatar" alt="Avatar" icon="i-material-symbols-account-circle" size="sm" color="gray" variant="ghost" :label="fullName" aria-label="Theme" />
                      </template>
                      <template v-else>
                        <UButton :icon="'i-material-symbols-account-circle'" color="gray" variant="ghost" size="md" aria-label="Theme" />
                      </template>
                      
                        <template #account="{ item }">
                          <div class="text-left">
                            <p>
                              Inició sesión como
                            </p>
                            <p class="truncate font-medium text-gray-900 dark:text-white">
                              {{ item.label }}
                            </p>
                          </div>
                        </template>

                        <template #item="{ item }">
                          <span class="truncate">{{ item.label }}</span>

                          <UIcon :name="item.icon" size="sm" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                        </template>
                    </UDropdown>
                    <UModal v-model="isOpenModal">
                        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                      
                                      Mi perfil
                                    </h3>
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModal = false" />
                                </div>
                            </template>

                            <div class="grid gap-4">
                                <div class="col">
                                    <!-- <UFormGroup label="Avatar:" description="Cambiar avatar">
                                      <UInput id="avatar" size="sm" type="file"  icon="i-heroicons-folder" fluid />
                                    </UFormGroup> -->
                                </div>
                                <div class="col">
                                  <UFormGroup>
                                    <div>
                                      <label for="Nombre">Nombre completo:</label>
                                      {{ fullName }}
                                    </div>
                                    <div>
                                      <label for="Rol">Rol:</label>
                                      {{ isRol.toString() }}
                                    </div>
                                  </UFormGroup>
                                </div>
                            </div>

                            <template #footer>
                                <div class="float-end pb-4">
                                    <UButton label="Cancelar" icon="i-heroicons-x-mark-20-solid" @click="isOpenModal = false" variant="link" color="black" />
                                    <!-- <UButton label="Guardar" icon="i-heroicons-check" @click=""  variant="soft"/> -->
                                </div>
                            </template>
                        </UCard>
                    </UModal>
                  <!-- <UHorizontalNavigation :links="linkLogout"/> -->
                </template>
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
            </div>
        </nav>
    </UContainer>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
import { storeToRefs } from 'pinia'; 
import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore);
const { logUserOut } = useAuthStore();

const router = useRouter();
const isOpenModal = ref(false)

const logout = () => {
  logUserOut();
  dropItems.push()
  router.push('/');
};

const fullName : any = authenticated ? useCookie('fullname') : ''
const userName : any = authenticated ? useCookie('username') : ''
const avatar : any = authenticated ? useCookie('avatar') : ''
const isRol : any = authenticated ? useCookie('rol') : ''

=======
>>>>>>> df1469f0 (Initial commit)
=======
import { storeToRefs } from 'pinia'; 
import { useAuthStore } from '~/store/auth'; 
const router = useRouter();
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const authStore = useAuthStore()
const isOpenModal = ref(false)
const logout = () => {
  logUserOut();
  router.push('/login');
};
await callOnce(authStore.getAvatar)
const fullName : any = authenticated ? useCookie('fullname') : ''
const userName : any = authenticated ? useCookie('username') : ''
const isRol : any = authenticated ? useCookie('rol') : ''

>>>>>>> fbe786fb (Actualizado al 30-01-2025)
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
<<<<<<< HEAD
<<<<<<< HEAD
const dropItems = reactive([
    [{
      label: fullName,
      slot: 'account',
      disabled: true
    }],
    [{
      label: 'Mi perfil',
      icon: 'i-heroicons-user-circle-solid',
      click: () => {
        isOpenModal.value = true
      }
    }], [{
      label: 'Cerrar sesión',
      icon: 'i-material-symbols-logout-rounded',
      click: logout
    }]
  ])

  if(authStore.authenticated){
    dropItems.splice(2, 0, authStore.dropitems)
  }
=======

const DropItems = [
  [{
    label: fullName,
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Mi perfil',
    icon: 'i-heroicons-user-circle-solid',
    click: () => {
      isOpenModal.value = true
    }
  }], [{
    label: 'Configuración',
    icon: 'i-heroicons-cog-solid',
    click: () => {
      console.log('Edit')
    },
    disabled: authStore.disabled,
    to: '/config'
  }], [{
    label: 'Cerrar sesión',
    icon: 'i-material-symbols-logout-rounded',
    click: logout
  }]
]
>>>>>>> fbe786fb (Actualizado al 30-01-2025)

const linkLogin = [
  [{
    label: 'Iniciar sesión',
    icon: 'i-material-symbols-login-rounded',
    to: '/login'
  }]
]

const linkLogout = [
  [{
    label: fullName,
    icon: 'i-material-symbols-account-circle'
  },
  {
    label: 'Cerrar sesión',
    icon: 'i-material-symbols-logout-rounded',
    click: logout
  }]
]

<<<<<<< HEAD
=======
>>>>>>> df1469f0 (Initial commit)
=======
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
const links = [
  [{
    label: '',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '',
<<<<<<< HEAD
<<<<<<< HEAD
    icon: 'i-heroicons-adjustments-horizontal-solid',
    to: '/parametros'
  },
  {
    label: 'Costo de financiación',
=======
    icon: 'i-heroicons-cog-solid',
=======
    icon: 'i-heroicons-adjustments-horizontal-solid',
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
    to: '/parametros'
  },
  {
    label: '',
>>>>>>> df1469f0 (Initial commit)
    icon: 'i-heroicons-percent-badge-solid',
    to: '/financiacion'
  },
  {
<<<<<<< HEAD
    label: 'Tarjetas',
=======
    label: '',
>>>>>>> df1469f0 (Initial commit)
    icon: 'i-heroicons-credit-card',
    to: '/tarjetas'
  },
  {
<<<<<<< HEAD
    label: 'Ventas / Acopios (con PRE)',
    icon: 'i-heroicons-currency-dollar-solid',
    to: '/simulador'
  },
  {
    label: 'Cuentas a Cobrar',
    icon: 'i-heroicons-currency-dollar',
    to: '/simulador2'
  }]
]

const navbar = {
  wrapper: 'relative w-full flex items-center justify-between',
  container: 'flex items-center min-w-0',
  inner: 'min-w-0',
  base: 'group relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75',
  before: 'before:absolute before:inset-x-0 before:inset-y-2 before:inset-px before:rounded-md hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
  after: 'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
  active: 'text-bg-sea-green-900 dark:text-white after:bg-sea-green-500 dark:after:bg-sea-green-400 after:rounded-full',
  inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
  label: 'truncate relative'
}
=======
    label: '',
    icon: 'i-heroicons-currency-dollar-solid',
    to: '/simulador'
  }]
]
<<<<<<< HEAD
>>>>>>> df1469f0 (Initial commit)
=======

const navbar = {
  wrapper: 'relative w-full flex items-center justify-between',
  container: 'flex items-center min-w-0',
  inner: 'min-w-0',
  base: 'group relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75',
  before: 'before:absolute before:inset-x-0 before:inset-y-2 before:inset-px before:rounded-md hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
  after: 'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
  active: 'text-bg-sea-green-900 dark:text-white after:bg-sea-green-500 dark:after:bg-sea-green-400 after:rounded-full',
  inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
  label: 'truncate relative'
}

>>>>>>> fbe786fb (Actualizado al 30-01-2025)
</script>