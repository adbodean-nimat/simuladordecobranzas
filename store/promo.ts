import { defineStore } from 'pinia';
import { DateTime } from 'luxon';
interface State {
    promoDia: boolean
    datapromodia: string
    diaHoy: number
}

export const usePromoStore = defineStore('promo',{
    state: (): State => ({
        promoDia: false,
        datapromodia: '',
        diaHoy: 0
    }),
    actions:{
        async getPromoDia(){
            const getData = await $fetch('/api/mediosdepagos')
            this.diaHoy = DateTime.now().weekday
            this.datapromodia = getData?.filter((element: any) => element.estado && element.dias.find((data : any)=> data.id == this.diaHoy)).map((data : any) => {
                const esHoy = data.dias.some((dia: any) => dia.id == this.diaHoy)
                if(esHoy){
                    this.promoDia = true
                    return data.nombre
                } else {
                    return ''
                }
            }).toString() ?? ''
        }
    }
})