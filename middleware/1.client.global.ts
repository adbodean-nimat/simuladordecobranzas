import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const fullName = useCookie("fullname");

  if (fullName.value) {
    authenticated.value = true;
  }
});
