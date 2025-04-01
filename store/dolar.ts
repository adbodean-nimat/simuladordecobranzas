import { defineStore } from 'pinia';
interface State {
    dolarHoy: string,
    fechaDolar: string
}

export const useDolarStore = defineStore('dolar',{
    state: (): State => ({
        dolarHoy: '',
        fechaDolar: ''
    }),
    actions:{
        async getDolar(){
            const getData = await $fetch('/api/parametrosgenerales')
            this.dolarHoy = getData?.map(data => data.dolar)[0] ?? ''
            this.fechaDolar = getData?.map(data => data.fecha_actualizar_dolar)[0] ?? ''            
        }
    }
})