import { defineStore } from 'pinia';

interface State {
  dropitems: any[],
  roles: any[],
  rol: string,
  authenticated: boolean,
  admin : boolean,
  editor: boolean,
  disabled: boolean,
  avatar: string
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
      disabled: false,
      avatar: ''
    }
  },
  actions: {
    async authenticateUser({fullname, username, avatar, rol}: any) {
      const userName = useCookie('username');
      const fullName = useCookie('fullname');
      const getAvatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = fullname
      this.avatar = avatar
      userName.value = username
      isRol.value = rol
      this.rol = rol
      rol.includes('Administrador') ? this.disabled = false : this.disabled 
      rol.includes('Editor') ? this.disabled = true : this.disabled
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
      }] : this.dropitems = [] 
      if(rol.includes('Administrador') && rol.includes('Editor')){
        return this.authenticated = true;
      }
      console.log(this.dropitems)
    },
    async getAvatar(){
      if(this.authenticated){
        return this.avatar
      }
      return ''
    },
    async logUserOut() {
      this.authenticated = false;
      this.admin = false;
      this.editor = false;
      this.disabled = false;
      this.rol = '';
      this.roles = [];
      this.dropitems = [];
      this.avatar = '';
      const fullName = useCookie('fullname');
      const userName = useCookie('username');
      const getAvatar = useCookie('avatar');
      const isRol = useCookie('rol');
      fullName.value = '';
      userName.value = '';
      getAvatar.value = '';
      isRol.value = '';
    }
  },
  persist: true
});