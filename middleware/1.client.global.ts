import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuthStore());
<<<<<<< HEAD
=======

>>>>>>> fbe786fb (Actualizado al 30-01-2025)
    const fullName = useCookie('fullname');
    
    if (fullName.value) {
        authenticated.value = true;
    }

});