import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.rol.includes("Editor dólar")) {
    abortNavigation();
    return navigateTo("/");
  }
});
