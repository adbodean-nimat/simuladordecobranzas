<template>
    <div>
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
        <div class="text-center p-4 text-base">
          <h2>VENTAS / ACOPIOS (con PRE)</h2>
          <p>Una factura, varios medios de pago.</p>
        </div>

        <div class="flex justify-center">
          <UInput 
            :ui="{base: 'appearance-none m-0', rounded: 'rounded-lg', form: 'form-input'}" 
            size="xl" 
            icon="clarity:dollar-line" 
            class="mb-8 max-w-2xl" 
            placeholder="Ingresar monto c/IVA" 
            v-model="monto" 
            v-maska="optionsMask"
          >
            <template #trailing>
              <span class="text-xs">ARS</span>
            </template>
          </UInput>
        </div>
        <div class="flex justify-center">
          <template v-if="formData.mediospago?.map(item => item.calculable)[0] === '0.00'">
            <div class="flex flex-col w-full ">
              <UDivider label="¡¡PAGO CERRADO!!" type="dashed" :ui="{ label: 'text-sea-green-600 dark:text-sea-green-400 text-lg mb-2' }"/>
              <UTabs :items="itemsTabs">
                <template #npc-npg="{ item }">
                  <div class="grid grid-cols-2 w-auto h-auto rounded-md gap-4 items-center">
                    <div class="text-lg">
                      <span>Monto con IVA con descuentos comercial, SIN Dto. financiero</span>
                    </div>
                    <div class="rounded-md p-2 text-xl text-center bg-amber-500">
                      $ {{ formData.monto }}
                    </div>
                    <div class="text-lg">
                      <span>Ingresar en cabecera NPC-NPG, Dto. 2 -financiero-</span>
                    </div>
                    <div class=" rounded-md p-2 text-xl text-center bg-amber-500" @click="toast.add({ title: 'Copiado!' });copy(cabacera)">
                      {{ Number(cabacera).toFixed(2) }}%
                    </div>
                    <div><span>FINAL NPC-NPG</span></div>
                    <div class=" rounded-md p-2 text-xl text-center bg-amber-500">
                      $ {{ formatterNumber.format(formData.monto.replaceAll(",","")*(1-(cabacera/100))) }}
                    </div>
                    <template v-if="formData.totalimporte >= formData.monto.replaceAll(',', '')">
                      <div><span>En CAJA hacer Nota de DÉBITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-red-500 dark:bg-red-600">
                          $ {{ formatterNumber.format(formData.totalimporte - formData.monto.replaceAll(",", "")) }}
                      </div>
                    </template>
                    <div><span>FINAL A FACTURAR y A COBRAR</span></div>
                    <div class="rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                      $ {{ formatterNumber.format(formData.totalimporte) }}
                    </div>
                  </div>
                </template>
                <template #pac="{ item }">
                  <div class="grid grid-cols-2 w-auto h-auto rounded-md gap-4 items-center">
                    <div class="text-lg">
                      <span>Ingresar en cabecera NPC, Dto. 2 -financiero-</span>
                    </div>

                    <div class="rounded-md p-2 text-xl text-center bg-amber-500" @click="toast.add({ title: 'Copiado!' });copy(cabacera)">
                      {{ Number(cabacera).toFixed(2) }} %
                    </div>
                    <div><span>Monto PAC</span></div>
                    <div class=" rounded-md p-2 text-xl text-center bg-amber-500">
                      $ {{ formatterNumber.format(formData.monto.replaceAll(",","")*(1-(cabacera/100))) }}
                    </div>
                    <template v-if="formData.totalimporte >= formData.monto.replaceAll(',', '')">
                      <div><span>En CAJA hacer Nota de DÉBITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-red-500 dark:bg-red-600">
                          $ {{ formatterNumber.format(formData.totalimporte - formData.monto.replaceAll(",", "")) }}
                      </div>
                    </template>
                    <div><span>FINAL A FACTURAR y A COBRAR</span></div>
                    <div class=" rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                      $ {{ formatterNumber.format(formData.totalimporte) }}
                    </div>
                  </div>
                </template>
              </UTabs>
              <UDivider icon="i-heroicons-sparkles-solid" type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
            </div>              
            </template> 
        </div>
        <div class="tab">
          <template v-if="formData.monto">
            <UButton @click="addMore" icon="i-material-symbols-add-circle" size="md" square variant="soft" class="mb-4">Agregar</UButton>
            <div class="grid grid-rows-auto grid-flow-col gap-4">
              <div class="row-span-3">
                <div class="grid grid-flow-col auto-rows-auto auto-cols-max gap-4 mb-2 p-2 items-end" v-for="(item, i) in formData.mediospago" :key="i">
                  <template v-if="data_mediosdepagos">
                    <UFormGroup>        
                      <UBadge size="lg" variant="soft">{{ i + 1 }}</UBadge>
                    </UFormGroup>
                  </template>
                  <template v-if="data_mediosdepagos">
                    <UFormGroup label="Medio de pago">
                      <USelect color="white" variant="outline" placeholder="" :options="dataMediosPagos" option-attribute="name" v-model="item.nombre"/>
                    </UFormGroup>
                  </template>
                  <template v-if="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map(x => x.tipo_pago)[0] == 'TC'">
                    <UFormGroup label="Nro. cuota">
                      <USelect color="white" variant="outline" placeholder="" :options="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map((data : any) => data.interes_base)[0].map((x:any) => x.nro_cuota)" v-model="item.cuota"/>
                    </UFormGroup>
                  </template>
                  <template v-if="item.nombre == 'CHEQUE'">
                    <UFormGroup label="Fecha">
                      <UInput v-model="item.fecha" variant="outline" placeholder="" type="date"></UInput>
                    </UFormGroup>
                  </template>
                  <template v-if="item.nombre == 'CHEQUE'">
                    <template v-if="item.fecha">
                      <UFormGroup label="">
                        <UBadge size="lg">{{  item.dias + ' días' }}</UBadge>
                      </UFormGroup>
                    </template>
                    <template v-else>
                      <UFormGroup></UFormGroup>
                    </template>
                  </template>
                  <template v-if="item.nombre">
                    <UFormGroup label="Dto.">
                      <template v-if="Number(item.dto) < 0">
                        <UBadge size="lg" color="red">{{ item.dto +'%'}}</UBadge>
                      </template>
                      <template v-else>
                        <UBadge size="lg">{{ item.dto +'%'}}</UBadge>
                      </template>
                    </UFormGroup>
                  </template>
              
                  <UFormGroup label="Importe a pagar">
                    <UInput v-model="item.importe" variant="outline" placeholder="" icon="clarity:dollar-line" v-maska="optionsMask"></UInput>
                  </UFormGroup>
              
                  <UButton class="flex-none" title="Borrar item" @click="remove(i)" icon="i-heroicons-trash" size="sm" square variant="soft"></UButton>
                  <UButton class="flex-none" title="Duplicar item" @click="copyItem(i)" icon="i-heroicons-clipboard" size="sm" square variant="soft"></UButton>  
                </div>
              </div>
              <div class="col-span-2">
                <div class="grid grid-flow-col auto-rows-auto auto-cols-max gap-4 mb-2 p-2 items-end" v-for="(item, y) in formData.mediospago" :key="y">
                    <div class="col-start-1 col-end-4">
                      <template v-if="item.impacto">
                        <UFormGroup label="Impacto sobre el neto de facturas, antes de descuento financiero">
                          <UBadge size="lg" variant="solid">
                            {{ '$ '+ formatterNumber.format(Number(item.impacto)) }}
                          </UBadge>
                        </UFormGroup>
                      </template>
                    </div>
                    <div v-if="!item.importe">
                      <template v-if="formData.monto && item.dto">
                        <template v-if="Number(item.calculable) > 0">
                          <UFormGroup label="Importe deseable" @click="toast.add({ title: 'Copiado!' });copy(item.calculable)">
                            <UBadge size="lg">{{'$ ' + formatterNumber.format(Number(item.calculable)) }}</UBadge>
                          </UFormGroup>
                        </template>
                      </template>
                    </div>
                    <div>
                      <template v-if="item.importe">
                        <template v-if="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map(x => x.tipo_pago)[0] == 'TC'">              
                            <UBadge size="lg" color="amber">{{ !item.importe ? item.cuota +' CUOTAS DE $ ' + formatterNumber.format(Number(formData.monto.replaceAll(",","")) / Number(item.cuota)) : item.cuota + ' CUOTAS DE $ ' + formatterNumber.format((Number(item.importe.replaceAll(",","")) / Number(item.cuota)))}}</UBadge>
                        </template>
                        <template v-else-if="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map(x => x.tipo_pago)[0] !== 'TC'">
                            <UBadge size="lg" color="amber">{{ item.nombre == "MAESTRO" || item.nombre == "VISA ELECTRON" ||  item.nombre == "CABAL DEBITO" ? 'DÉBITO $ ' + item.importe : item.nombre + ' $ ' + item.importe }}</UBadge>
                        </template>
                      </template>
                    </div>
                    <div>
                      <template v-if="formData.mediospago?.map(item => item.calculable)[0] === '0.00'">
                        <template v-if="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map(x => x.tipo_pago)[0] == 'TC'">
                          <UButton class="flex-none" title="Copiar" @click="toast.add({ title: 'Copiado!' });copy(!item.importe ? item.nombre + '-' + item.cuota +' CUOTAS DE $ ' + formatterNumber.format(Number(formData.monto.replaceAll(',','')) / Number(item.cuota)) :  item.nombre + ' - Total $ ' + item.importe +  ' - Cada uno ' + item.cuota + ' CUOTAS DE $ ' + formatterNumber.format((Number(item.importe.replaceAll(',','')) / Number(item.cuota))))" icon="i-heroicons-clipboard-document" size="sm" square variant="soft"></UButton>
                        </template>
                        <template v-else-if="data_mediosdepagos?.filter(data => data.nombre == item.nombre).map(x => x.tipo_pago)[0] !== 'TC'">
                          <UButton class="flex-none" title="Copiar" @click="toast.add({ title: 'Copiado!' });copy(item.nombre == 'MAESTRO' || item.nombre == 'VISA ELECTRON' ||  item.nombre == 'CABAL DEBITO' ? 'DÉBITO $ ' + item.importe : item.nombre + ' $ ' + item.importe)" icon="i-heroicons-clipboard-document" size="sm" square variant="soft"></UButton>
                        </template>
                      </template>
                    </div>
                </div>
              </div>
              <!-- <div class="col-span-2 row-span-2">           
                <pre>
                  {{ formData }}
                </pre>
              </div> -->
            </div>
            <UModal v-model="isOpen" prevent-close>
              <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-base flex justify-center font-semibold leading-6 text-gray-900 dark:text-white">
                      <UIcon :name="'i-heroicons-exclamation-circle'" size="md" class="h-6 w-6 mr-2 text-red-400 dark:text-red-500"  />
                      Advertencia
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                  </div>
                </template>

                <div>
                  <span> No aceptamos más de 60 días.</span>
                </div>

                <template #footer>
                  <div class="float-end pb-4">
                    <UButton label="Ok" icon="" @click="isOpen = false" variant="soft" />
                  </div>
                </template>
              </UCard>
            </UModal>
          </template>
        </div>
      </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'VENTAS / ACOPIOS (con PRE)'
})

import type { MaskInputOptions} from 'maska'
import { useClipboard } from '@vueuse/core'
import { DateTime } from 'luxon'
import gsap from 'gsap'
const toast = useToast()
const isOpen = ref(false)
const diaHoy = ref(DateTime.now().weekday)
const optionsMask = reactive<MaskInputOptions>({
  number: {locale: 'es-US', fraction: 2}
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

    const dataMediosPagos: any = status_mediosdepagos.value == 'success' ? data_mediosdepagos.value?.filter(element =>  element.estado == true).map((data : any) => {
      
      const esHoy = data.dias.some((dia: any) => dia.id == diaHoy.value)

      console.log(esHoy)
      return {
        name: data.nombre,
        disabled: data.dias == 0 ? false : esHoy ? false : true ,
        value: data.nombre
      }
      
    }) : ''

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

      if(newVal.monto > 0){
        gsap.to(".tab", {duration: 1.4, x: 0, y: 10})
      }

      let monto = formData.value.monto.replaceAll(",","");
      
      let totalImpacto = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.impacto), 0)
      let totalImporte = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.importe.replaceAll(",", "")), 0)
      
      cabacera.value = totalImporte ? Number(totalImporte) >= Number(monto) ? 0.00 : ((Number(monto) - Number(totalImporte)) / Number(monto) * 100) : ''
      totalimporte.value = totalImporte ? Number(totalImporte) : ''

      formData.value.mediospago.forEach(item =>
       { 
        
        const fechaHastaUltima = data_cheques.value?.findLast(data => data.hasta)?.hasta;
        //console.log(fechaHastaUltima)
        
        const now = DateTime.now().toISODate()
        let fcheque = DateTime.fromISO(item.fecha)
        let fnow = DateTime.fromISO(now)
        let diff = fcheque.diff(fnow,['days']).toObject()
        //console.log(diff?.days ?? '')
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
  