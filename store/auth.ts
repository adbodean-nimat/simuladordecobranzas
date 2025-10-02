import { defineStore } from "pinia";
interface State {
  dropitems: any[];
  roles: any[];
  rol: string;
  authenticated: boolean;
  admin: boolean;
  editor: boolean;
  disabled: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => {
    return {
      dropitems: [],
      roles: [],
      rol: "",
      authenticated: false,
      admin: false,
      editor: false,
      disabled: false,
    };
  },
  actions: {
    async authenticateUser({ fullname, username, avatar, rol = "" }: any) {
      const userName = useCookie("username");
      const fullName = useCookie("fullname");
      const isavatar = useCookie("avatar");
      const isRol = useCookie("rol");
      fullName.value = fullname ?? "";
      isavatar.value = avatar ?? "";
      userName.value = username ?? "";
      isRol.value = rol ?? "";
      this.rol = rol || "";
      this.roles = rol || [];
      if (
        rol &&
        (rol.includes("Administrador") ||
          rol.includes("Editor") ||
          rol.includes("Editor dólar"))
      ) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      this.admin = rol.includes("Administrador")!;
      this.editor = rol.includes("Editor")!;

      this.disabled = !this.rol.includes("Administrador");
      this.disabled = this.rol.includes("Editor")!;
      this.disabled = this.rol.includes("Editor dólar")!;

      /* rol?.includes("Administrador") ? (this.disabled = false) : this.disabled;
      rol?.includes("Editor") ? (this.disabled = true) : this.disabled;
      rol?.includes("Editor dólar") ? (this.disabled = true) : this.disabled; */

      rol?.includes("Administrador")
        ? (this.dropitems = [
            {
              label: "Configuración",
              icon: "i-heroicons-cog-solid",
              disabled: false,
              to: "/config",
            },
          ])
        : rol?.includes("Editor")
        ? (this.dropitems = [
            {
              label: "Configuración",
              icon: "i-heroicons-cog-solid",
              disabled: true,
              to: "/config",
            },
          ])
        : rol?.includes("Editor dólar")
        ? (this.dropitems = [
            {
              label: "Configuración",
              icon: "i-heroicons-cog-solid",
              disabled: true,
              to: "/config",
            },
          ])
        : (this.dropitems = []);
    },
    async logUserOut() {
      this.authenticated = false;
      this.admin = false;
      this.editor = false;
      this.disabled = false;
      this.rol = "";
      this.roles = [];
      this.dropitems = [];
      useCookie("fullname").value = null;
      useCookie("username").value = null;
      useCookie("avatar").value = null;
      useCookie("rol").value = null;
    },
  },
  persist: true,
});
