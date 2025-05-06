import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => { 
  const {authenticated} = storeToRefs(useAuthStore());

  const fullName = useCookie('fullname');
<<<<<<< HEAD

 /*  if (fullName.value && to?.name === 'login') {
    authenticated.value = true
    return navigateTo('/');
  } */
=======
  const userName = useCookie('username');

  if (fullName.value && to?.name === 'login') {
    authenticated.value = true
    return navigateTo('/');
  }
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
  
  if (!fullName.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  } 
  
  });