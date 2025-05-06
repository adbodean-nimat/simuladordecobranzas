import { defineStore } from 'pinia';
<<<<<<< HEAD
interface State {
  dropitems: any[],
=======

interface State {
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
  roles: any[],
  rol: string,
  authenticated: boolean,
  admin : boolean,
  editor: boolean,
<<<<<<< HEAD
  disabled: boolean
=======
  disabled: boolean,
  avatar: string
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
<<<<<<< HEAD
      dropitems: [],
=======
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
      roles: [],
      rol: '',
      authenticated: false,
      admin: false,
      editor: false,
<<<<<<< HEAD
      disabled: false
    }
  },
  actions: {
    async authenticateUser({fullname, username, avatar, rol}: any) {
      const userName = useCookie('username');
      const fullName = useCookie('fullname');
      const isavatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = fullname
      isavatar.value = avatar
      userName.value = username
      isRol.value = rol
      this.rol = rol
      rol.includes('Administrador') ? this.disabled = false : this.disabled 
      rol.includes('Editor') ? this.disabled = true : this.disabled
      rol.includes('Editor dólar') ? this.disabled = true : this.disabled
      rol.includes('Administrador') ? this.dropitems = [{
          label: 'Configuración',
          icon: 'i-heroicons-cog-solid',
          disabled: false,
          to: '/config'
        }
      ] : rol.includes('Editor') ? this.dropitems = [{
        label: 'Configuración',
        icon: 'i-heroicons-cog-solid',
        disabled: true,
        to: '/config'
      }] : rol.includes('Editor dólar') ? this.dropitems = [{
        label: 'Configuración',
        icon: 'i-heroicons-cog-solid',
        disabled: true,
        to: '/config'
      }] : this.dropitems = [] 
      if(rol.includes('Administrador') && rol.includes('Editor') && rol.includes('Editor dólar')){
        return this.authenticated = true;
      }
=======
      disabled: false,
      avatar: ''
    }
  },
  actions: {
    async authenticateUser({fullname, username, avatar, rol, disabled}: any) {
      const userName = useCookie('username');
      const fullName = useCookie('fullname');
      const getAvatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = fullname
      this.avatar = avatar
      userName.value = username
      isRol.value = rol
      this.rol = rol
      this.disabled = disabled
      if(rol === undefined){
        this.authenticated = false;
        console.log('No tienes permisos para acceder a esta aplicación');
        return 
      }
      if(rol.includes('Administrador')){
        this.authenticated = true; 
        return
      }
      if(rol.includes('Editor')){
        this.authenticated = true;
        return
      }
    },
    async getAvatar(){
      if(this.authenticated){
        return this.avatar
      }
      return ''
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
    },
    async logUserOut() {
      this.authenticated = false;
      this.admin = false;
      this.editor = false;
      this.disabled = false;
      this.rol = '';
      this.roles = [];
<<<<<<< HEAD
      this.dropitems = [];
      const fullName = useCookie('fullname');
      const userName = useCookie('username');
      const isavatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = '';
      userName.value = '';
      isavatar.value = '';
=======
      this.avatar = '';
      const fullName = useCookie('fullname');
      const userName = useCookie('username');
      const getAvatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = '';
      userName.value = '';
      getAvatar.value = '';
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
      isRol.value = '';
    }
  },
  persist: true
});