import { defineStore } from 'pinia';
interface State {
  dropitems: any[],
  roles: any[],
  rol: string,
  authenticated: boolean,
  admin : boolean,
  editor: boolean,
  disabled: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      dropitems: [],
      roles: [],
      rol: '',
      authenticated: false,
      admin: false,
      editor: false,
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
    },
    async logUserOut() {
      this.authenticated = false;
      this.admin = false;
      this.editor = false;
      this.disabled = false;
      this.rol = '';
      this.roles = [];
      this.dropitems = [];
      const fullName = useCookie('fullname');
      const userName = useCookie('username');
      const isavatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = '';
      userName.value = '';
      isavatar.value = '';
      isRol.value = '';
    }
  },
  persist: true
});