import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => { 
  const {authenticated} = storeToRefs(useAuthStore());

  const fullName = useCookie('fullname');
  const userName = useCookie('username');

  if (fullName.value && to?.name === 'login') {
    authenticated.value = true
    return navigateTo('/');
  }
  
  if (!fullName.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  } 
  
  });