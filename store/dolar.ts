import { defineStore } from 'pinia';
interface State {
    dolarHoy: number
    fechaDolar: string
    usuarioDolar: string
}

export const useDolarStore = defineStore('dolar',{
    state: (): State => ({
        dolarHoy: 0,
        fechaDolar: '',
        usuarioDolar: ''
    }),
    actions:{
        async getDolar(){
            const getData = await $fetch('/api/parametrosgenerales')
            this.dolarHoy = getData?.map(data => Number(data.dolar))[0] ?? 0
            this.fechaDolar = getData?.map(data => data.fecha_actualizar_dolar)[0] ?? ''   
            this.usuarioDolar = getData?.map(data => data.usuario_dolar)[0] ?? ''           
        },
        async updateDolar(dolar: number, user: string){
            const palabras = user.split(" ");
            const nombre = palabras[0] 
            const updateData = await $fetch('/api/parametrosgenerales/'+ 1, {
                method: 'PUT',
                body: {
                    dolar: dolar,
                    usuario_dolar: nombre
                }
            })
            return updateData
        }
    }
})