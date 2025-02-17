<template>
    <div>
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
        <div class="text-center p-4 text-base">
          <h2>CUENTAS A COBRAR</h2>
          <p>Varias facturas, varios medios de pago.</p>
        </div>
      </UContainer>
    </div>
</template>

<script setup lang="ts">
import type { MaskInputOptions} from 'maska'
import { useClipboard } from '@vueuse/core'
import { DateTime } from 'luxon'

const toast = useToast()
const isOpen = ref(false)

const optionsMask = reactive<MaskInputOptions>({
  number: {locale: 'es-US', fraction: 2}
})

definePageMeta({
  title: 'CUENTAS A COBRAR'
})

const itemsTabs = [{
  label: 'NPC-NPG',
  icon: 'i-heroicons-information-circle',
  slot: 'npc-npg'
}, {
  label: 'PAC',
  icon: 'i-heroicons-information-circle',
  slot: 'pac'
}]
    const fechaHoy = new Date().getTime();
    const {data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
    const {status: status_mediosdepagos, data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')
    const {status: status_cheques, data: data_cheques} = await useFetch('/api/parametroscheques')
    const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0
    const monto = ref()
    const cabacera = ref()
    const totalimporte = ref()
    const nrocuotas = ref()
    const formatter = new Intl.NumberFormat("es-US",{style: "currency", currency: "ARS", currencyDisplay: "symbol", minimumFractionDigits: 2})
    const formatterNumber = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
    const formData = ref(
      {
        monto: monto, 
        cabacera: cabacera,
        totalimporte: totalimporte,
        mediospago: [{
          nombre: '',
          cuota: '',
          importe: '',
          dto: '',
          impacto: '',
          calculable: '',
          fecha: '',
          dias: ''
        }]
      }
    )
    const remove = (i: number) => {
       formData.value.mediospago.splice(i, 1)
    }
    const addMore = () => {
      formData.value.mediospago.push({
        nombre: '',
        cuota: '',
        importe: '',
        dto: '',
        impacto: '',
        calculable: '',
        fecha: '',
        dias: ''
      })
    }
    const copyItem = (i: number) => {
      formData.value.mediospago = [
        ...formData.value.mediospago,
        {
          nombre: formData.value.mediospago[i].nombre,
          cuota: formData.value.mediospago[i].cuota,
          importe: formData.value.mediospago[i].importe,
          dto: formData.value.mediospago[i].dto,
          impacto: formData.value.mediospago[i].impacto,
          calculable: formData.value.mediospago[i].calculable,
          fecha: formData.value.mediospago[i].fecha,
          dias: formData.value.mediospago[i].dias
        },
      ]
    }
    watch(formData.value, async (newVal, oldVal)=>{
      let monto = formData.value.monto.replaceAll(",","");
      
      let totalImpacto = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.impacto), 0)
      let totalImporte = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.importe.replaceAll(",", "")), 0)
      
      cabacera.value = totalImporte ? Number(totalImporte) >= Number(monto) ? 0.00 : ((Number(monto) - Number(totalImporte)) / Number(monto) * 100) : ''
      totalimporte.value = totalImporte ? Number(totalImporte) : ''

      formData.value.mediospago.forEach(item =>
       { 
        
        const fechaHastaUltima = data_cheques.value?.findLast(data => data.hasta)?.hasta;
        console.log(fechaHastaUltima)
        
        const now = DateTime.now().toISODate()
        let fcheque = DateTime.fromISO(item.fecha)
        let fnow = DateTime.fromISO(now)
        let diff = fcheque.diff(fnow,['days']).toObject()
        console.log(diff?.days ?? '')
        item.dias = diff?.days ? Number(diff.days).toString() : ''
        const aviso = Number(item.dias) >= Number(fechaHastaUltima) ? isOpen.value = true : false
        let importe = item.importe.replaceAll(",", "");
        const TC = data_mediosdepagos.value?.filter(data => data.nombre == item.nombre).map(data => data.tipo_pago)[0]
        nrocuotas.value = ''
        
        const itemDto: any[] = []
        const dtoCheque = data_cheques.value?.filter((data:any) => {
          const itemDesde = Number(data?.desde)
          const itemHasta = Number(data?.hasta)
          const itemDia = Number(item.dias)
          const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
          return itemDto.push(S)
        })
        
        const itemDto2 = data_cheques.value?.find((element)=> Number(item.dias) >= Number(element.desde) && Number(item.dias) <= Number(element.hasta))
        
        item.dto = 
                TC == 'TC' && item.cuota ? data_mediosdepagos.value?.filter(data => data.nombre == item.nombre).map((data: any) => data.interes_base?.filter((x:any) => x?.nro_cuota == item.cuota)).map((data:any) => (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + data[0]?.interes_base / 100)*100)/100)).toFixed(2))[0]
                : TC == 'CHEQ' ? (itemDto2?.dto ? itemDto2?.dto : 0)
                : data_mediosdepagos.value?.filter(data => data.nombre == item.nombre).map(data => data.interes_base).map((data:any) => (100-((100 - (Number(maxdtofinanciero) / 100) * 100)*((1 + data[0]?.interes_base / 100)*100)/100)).toFixed(2))[0] as any


        item.impacto = 
                item.importe ?  (Number(importe) / (1 - Number(item.dto) / 100)).toFixed(2)
                : '' as any 
        
        item.calculable = Number(monto) && item.dto ? ((Number(monto) - Number(totalImpacto))*(1 - (Number(item.dto) / 100))).toFixed(2) : '';

      }
      )
    })
    const source = ref()
    const { text, copy, copied, isSupported } = useClipboard({ source })
</script>
<style>
</style>
  