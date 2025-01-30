import { defineStore } from 'pinia';

interface State {
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
    },
    async logUserOut() {
      this.authenticated = false;
      this.admin = false;
      this.editor = false;
      this.disabled = false;
      this.rol = '';
      this.roles = [];
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