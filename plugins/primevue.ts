import PrimeVue from 'primevue/config' 
import DataTable from 'primevue/datatable'

export default defineNuxtPlugin(nuxtApp => { 
    nuxtApp.vueApp.use(PrimeVue, { ripple: true }) 
    nuxtApp.vueApp.component('DataTable', DataTable)    
})