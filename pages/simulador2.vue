<template>
    <div>
      <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
        <div class="text-center p-4 text-base">
          <h2>CUENTAS A COBRAR</h2>
          <p>Varias facturas, varios medios de pago.</p>
        </div>
        <div class="flex justify-center mb-8">
          <UTooltip name="cambiarqr" :shortcuts="['Q']">
            <template #text>
              <span class="italic">Buscar por QR</span>
            </template>
            <UButton size="xl" icon="heroicons:qr-code" variant="link" @click="mostrarqr = true" />
          </UTooltip>
          <UTooltip name="buscarnombre" text="Buscar por nombre" :shortcuts="['S']">
            <UButton size="xl" icon="material-symbols:person-search-rounded" variant="link" @click="isOpen2 = true" />
            <UModal v-model="isOpen2">
              <UCommandPalette
                placeholder=""
                :autoselect="false"
                v-model="selected2"
                @update:model-value="onSelect"
                :groups="groups"
                :empty-state="{ icon: 'i-heroicons-magnifying-glass-20-solid', label: 'No pudimos encontrar ningún clientes.', queryLabel: 'No pudimos encontrar ningún cliente con ese término. Por favor inténtalo de nuevo.' }"
              />
            </UModal>
          </UTooltip>
          
              <USelectMenu icon="i-heroicons-funnel-solid" trailingIcon="i-heroicons-arrows-up-down-20-solid" color="primary" size="xl" variant="none" :options="['Cliente', 'Factura', 'Remito']" v-model="cambiarinput"></USelectMenu>
          
          <template v-if="cambiarinput == 'Factura'">
            <UButtonGroup size="xl" orientation="horizontal" :ui="{base: 'appearance-none', rounded: 'rounded-lg', form: 'form-input'}">
              <UInput 
                :ui="{base: 'w-64'}"
                size="xl"
                type="number" 
                icon="octicon:number-24"
                placeholder="Ingrese el nro. de factura"
                v-model="datainputfactura" 
              />
              <UButton icon="heroicons:play-solid" color="gray" @click="consultaSaldosFactura" />
            </UButtonGroup>
          </template>
          <template v-if="cambiarinput == 'Remito'">
            <UButtonGroup size="xl" orientation="horizontal" :ui="{base: 'appearance-none', rounded: 'rounded-lg', form: 'form-input'}">
              <UInput 
                :ui="{base: 'w-64'}"
                size="xl"
                padded
                type="number" 
                icon="octicon:number-24"
                placeholder="Ingrese el nro. de remito"
                v-model="datainputremito" 
              />
              <UButton padded icon="heroicons:play-solid" color="gray" @click="consultaSaldosRemito" />
            </UButtonGroup>
          </template>
          <template v-if="cambiarinput == 'Cliente'">
            <UButtonGroup size="xl" orientation="horizontal" :ui="{base: 'appearance-none', rounded: 'rounded-lg', form: 'form-input'}">
              <UInput 
                :ui="{base: 'w-64'}"
                size="xl"
                padded
                type="number" 
                icon="octicon:number-24"
                placeholder="Ingrese el nro. de cliente"
                v-model="datainputcliente" 
              />
              <UButton padded icon="heroicons:play-solid" color="gray" @click="consultaSaldosCliente" />
            </UButtonGroup>
          </template>
          <template v-if="getdata.data">
            <UTooltip name="clear-all" :shortcuts="['B']">
              <template #text>
                <span class="italic">Borrar todo</span>
              </template>
              <UButton size="lg" class="ml-2.5" icon="pajamas:clear-all" variant="link" color="gray" @click="reloadNuxtApp()"></UButton>
            </UTooltip>
          </template>
          <UModal v-model="mostrarqr" :ui="{base: 'w-96'}">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Buscar por QR
                  </h3>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="mostrarqr = false" />
                </div>
              </template>
              <div class="flex justify-center">
                <UButtonGroup size="xl" orientation="horizontal" :ui="{base: 'appearance-none m-0', rounded: 'rounded-lg', form: 'form-input'}">
                  <UInput icon="heroicons:qr-code" v-model="datainputqr" size="xl" />
                  <UButton icon="heroicons:magnifying-glass-20-solid" color="gray" @click="consultaSaldosQR" />
                </UButtonGroup>
              </div>
              <template #footer>
                <div class="float-end pb-4">
                  <UButton label="Cerrar" icon="" @click="mostrarqr = false" variant="soft" />
                </div>
              </template>
            </UCard>
          </UModal>
        </div>
        <div class="tab table-wrapper mb-4">
          <template v-if="getdata.data.length > 0">
            <UCard
              class="w-full"
              :ui="{
                base: '',
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                header: { padding: 'px-4 py-5' },
                body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                footer: { padding: 'p-4' }
              }"
            >
              <template #header>
                <div>
                  <h2 class="font-semibold text-md text-gray-900 dark:text-white leading-tight">
                    {{ getdata.data.map((data: any) => data.CVCL_CLIENTE + ' - ' + data.CLIE_NOMBRE)[0] }}
                  </h2>
                </div>
              </template>
              <UTable :ui="tableUI" v-model="selected" :rows="getdata.data" :columns="columns"  @select:all="onHandleSelectAll" @update:modelValue="onUpdateSelection">
                <template #caption>
                  <caption class="my-3">FACTURAS</caption>
                </template>
                <template #IMPORTE-data="{ row }">
                  {{'$ ' + formatterNumber.format(row.IMPORTE)}}
                </template>
                <template #SALDO-data="{ row }">
                  {{'$ ' + formatterNumber.format(row.SALDO)}}
                </template>
                <template #FECHA_DIFF-data="{ row }">
                  <UBadge size="lg" :label="row.FECHA_DIFF + ' días'" :color="'gray'" variant="soft" />
                </template>
                <template #DTO_FINANCIERO-data="{ row }">
                    <UBadge size="lg" :label="row.DTO_FINANCIERO + '%'" :color="row.DTO_FINANCIERO >= 0 ? 'emerald' : 'orange'" variant="soft" />
                </template>
                <template #MONTO_COBRAR-data="{ row }">
                    {{ '$ ' + formatterNumber.format(row.MONTO_COBRAR)}}
                </template>
                <template #MONTO-data="{ row }">
                    <UBadge size="lg" :label="row.MONTO == 0 ? '$ '+ row.MONTO : row.MONTO > 0 ? 'Descuentos $ ' + formatterNumber.format(row.MONTO) : 'Débitos $ ' + formatterNumber.format(row.MONTO)" :color="row.MONTO == 0 ? 'gray' : row.MONTO > 0 ? 'emerald' : 'orange'" variant="soft" />
                </template>
              </UTable>
              <template #footer>
                <div class="flex flex-wrap justify-between items-center">
                  <div>
                    <span>Total facturas: $ {{ formatterNumber.format(Number(formData.montofactura)) }}</span>
                  </div>
                  <div>
                    <span>Total descuentos: $ {{ formatterNumber.format(Number(formData.descuento_debitos)) }}</span>
                  </div>
                  <div>
                    <span>Dto. financiero: {{ formatterNumber.format(Number(formData.dtofinanciero)) }}%</span>
                  </div>
                  <div>
                    <span>Final «CONTADO EFECTIVO», antes considerar medios pago: $ {{ formatterNumber.format(formData.monto) }}</span>
                  </div>
                </div>
              </template>
            </UCard>
          </template>
          <template v-if="getdata.dataNC.length > 0">
            <UCard
              class="w-full"
              :ui="{
                base: 'mt-5',
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                header: { padding: 'px-4 py-5' },
                body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
                footer: { padding: 'p-4' }
              }"
            >
            
              <UTable :ui="tableUI" v-model="selectedNC" :rows="getdata.dataNC" :columns="columns2"  @select:all="onHandleSelectAll2" @update:modelValue="onUpdateSelection2">
                <template #caption>
                  <caption class="my-3">NOTA DE CRÉDITO</caption>
                </template>
                <template #IMPORTE-data="{ row }">
                  {{'$ ' + formatterNumber.format(row.IMPORTE)}}
                </template>
                <template #SALDO-data="{ row }">
                  {{'$ ' + formatterNumber.format(row.SALDO)}}
                </template>
                <template #FECHA_DIFF-data="{ row }">
                  <UBadge size="lg" :label="row.FECHA_DIFF + ' días'" :color="'gray'" variant="soft" />
                </template>
              </UTable>
              <template #footer>
                <div class="flex flex-wrap justify-end items-center">
                  <div>
                    <span>Total NC: $ {{ formatterNumber.format(Number(formData.montoNC)) }}</span>
                  </div>
                </div>
              </template>
            </UCard>
          </template>
          <template v-if="formData.montoNC">
            <Toolbar class="my-4 border-none dark:bg-transparent">
              <template #end>
                <div class="flex items-center">
                  <UBadge size="lg" variant="solid">Total FACTURA - NOTA DE CRÉDITO: $ {{ formatterNumber.format(Number(formData.monto)-Number(formData.montoNC)) }} </UBadge>
                </div>
              </template>
            </Toolbar>
          </template>
        </div>
        <div class="flex justify-center">
          <template v-if="pagocerrado">
            <div class="flex flex-col w-full ">
              <UDivider label="¡¡PAGO CERRADO!!" type="dashed" :ui="{ label: 'text-sea-green-600 dark:text-sea-green-400 text-lg mb-2' }"/>
              <UTabs :items="itemsTabs">
                <template #pago-cerrado="{ item }">
                  <div class="grid grid-cols-2 w-auto h-auto rounded-md gap-4 items-center">
                    <div class="text-lg">
                      <span>FINAL FACTURAS</span>
                    </div>
                    <div class="rounded-md p-2 text-xl text-center bg-amber-500">
                      $ {{ formatterNumber.format(Number(formData.montofactura)) }}
                    </div>
                   
                    <template v-if="formData.totalimporte >= formData.montofactura">
                      <div><span>Hacer Nota de DÉBITO por...</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-red-500 dark:bg-red-600">
                          $ {{ formatterNumber.format(formData.totalimporte - Number(formData.montofactura)) }}
                      </div>
                      <div><span>% DEL DÉBITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-red-500 dark:bg-red-600">
                        {{ formatterNumber.format((formData.totalimporte - Number(formData.montofactura))/Number(formData.montofactura)*100) }} % 
                      </div>
                      <div><span>FINAL FACTURAR + DÉBITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                        $ {{ formatterNumber.format(Number(formData.montofactura)+(formData.totalimporte - Number(formData.montofactura))) }}
                      </div>
                      <template v-if="formData.montoNC">
                        <UDivider type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
                        <UDivider type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
                        <div><span>FACTURAR + DÉBITO + NOTA DE CRÉDITO</span></div>
                        <div class="rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                          $ {{ formatterNumber.format(Number(formData.montofactura)+(formData.totalimporte - Number(formData.montofactura))-Number(formData.montoNC)) }}
                        </div>
                      </template>                      
                    </template>
                    <template v-else>
                      <div><span>Hacer Nota de CRÉDITO por...</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-amber-500">
                          $ {{ formatterNumber.format(formData.totalimporte - Number(formData.montofactura)) }}
                      </div>
                      <div><span>% DEL CRÉDITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-amber-500">
                        {{ formatterNumber.format((formData.totalimporte - Number(formData.montofactura))/Number(formData.montofactura)*100) }} % 
                      </div>
                      <div><span>FINAL FACTURAR + CRÉDITO</span></div>
                      <div class="rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                        $ {{ formatterNumber.format(Number(formData.montofactura)+(formData.totalimporte - Number(formData.montofactura))) }}
                      </div>
                      <template v-if="formData.montoNC">
                        <UDivider type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
                        <UDivider type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
                        <div><span>FACTURAR + CRÉDITO + NOTA DE CRÉDITO</span></div>
                        <div class="rounded-md p-2 text-xl text-center bg-primary-500 dark:bg-primary-400 text-white font-medium dark:text-gray-900">
                          $ {{ formatterNumber.format(Number(formData.montofactura)+(formData.totalimporte - Number(formData.montofactura))-Number(formData.montoNC)) }}
                        </div>
                      </template>
                    </template>
                  </div>
                </template>
              </UTabs>
              <UDivider icon="i-heroicons-sparkles-solid" type="dashed" :ui="{wrapper: {base: 'm-2'}}"/>
            </div>              
            </template> 
        </div>
        <template v-if="formData.monto">
          <UButton @click="addMore" icon="i-material-symbols-add-circle" size="md" square variant="soft" class="my-4">Agregar</UButton>
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
                  <UFormGroup label="Impacto sobre el neto de fra., antes de dto. financiero">
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
                <template v-if="pagocerrado">
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
      </UContainer>
    </div>
</template>

<script setup lang="ts">
import type { MaskInputOptions} from 'maska'
import { useClipboard } from '@vueuse/core'
import { formatDistanceStrict, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";
import { DateTime } from 'luxon'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)
const localeObject = {
  name: 'es', // name String
  weekdays: 'Domingo_Lunes ...'.split('_'), // weekdays Array
  weekdaysShort: 'Sun_M'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
  weekdaysMin: 'Su_Mo'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
  weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
  yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
  months: 'Enero_Febrero ... '.split('_'), // months Array
  monthsShort: 'Jan_F'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
  ordinal: (n:any) => `${n}º`, // ordinal Function (number) => return number + output
  formats: {
    // abbreviated format options allowing localization
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A'
  },
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: 'en %s', // e.g. in 2 hours, %s been replaced with 2hours
    past: 'hace %s',
    s: 'unos segundos',
    m: '1 minuto',
    mm: '%d minutos',
    h: '1 hora',
    hh: '%d horas', // e.g. 2 hours, %d been replaced with 2
    d: '1 día',
    dd: '%d días',
    M: '1 mes',
    MM: '%d meses',
    y: '1 año',
    yy: '%d años'
  },
  meridiem: (hour:any, minute:any, isLowercase:any) => {
    // OPTIONAL, AM/PM
    return hour > 12 ? 'PM' : 'AM'
  }
}
dayjs.locale('es-my-settings', localeObject);
import gsap from 'gsap'
const {data: data_parametrosgrales} = await useFetch('/api/parametrosgenerales')
const {status: status_mediosdepagos, data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')
const {status: status_facturas, data: data_facturas} = await useFetch('/api/parametrosfacturas') 
const {status: status_cheques, data: data_cheques} = await useFetch('/api/parametroscheques')
const formatter = new Intl.NumberFormat("es-US",{style: "currency", currency: "ARS", currencyDisplay: "symbol", minimumFractionDigits: 2})
const formatterNumber = new Intl.NumberFormat("es-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})
const config = useRuntimeConfig()
const toast = useToast()
const isOpen = ref(false)
const isOpen2 = ref(false)
const awesome = ref(false)
const mostrarqr = ref(false)
const pagocerrado = ref(false)
const cambiarinput = ref('Cliente')
const datainputcliente = ref('')
const datainputfactura = ref('')
const datainputremito = ref('')
const datainputqr = ref('')
const diaHoy = ref(DateTime.now().weekday)
var now = dayjs()
const maxdtofinanciero = data_parametrosgrales.value ? data_parametrosgrales.value[0].max_dto_financiero : 0
const interesdiario = data_parametrosgrales.value ? data_parametrosgrales.value[0].interes_diario : 0
const tolerencia = data_parametrosgrales.value ? data_parametrosgrales.value[0].tolerncia_dif : 0
const itemsTabs = [{
  label: 'PAGO CERRADO',
  icon: 'i-heroicons-information-circle',
  slot: 'pago-cerrado'
}]
const getdata = reactive({
  data: [],
  dataNC: []
})

const dataMediosPagos: any = status_mediosdepagos.value == 'success' ? data_mediosdepagos.value?.filter(element =>  element.estado == true).map((data : any) => {
      
      const esHoy = data.dias.some((dia: any) => dia.id == diaHoy.value)

      //console.log(esHoy)
      return {
        name: data.nombre,
        disabled: data.dias == 0 ? false : esHoy ? false : true ,
        value: data.nombre
      }
      
    }) : ''

const selected = ref([])
const selected2 = ref([])
const selectedNC = ref([])
const onHandleSelectAll = (isSelected: boolean) => {
  //console.log('All rows selected:', isSelected)
}
const onHandleSelectAll2 = (isSelected: boolean) => {
  //console.log('All rows selected:', isSelected)
}
const onUpdateSelection = (selectedRows: any[]) => {
  //console.log('Currently selected rows:', selectedRows)
  formData.value.montofactura = Number(selectedRows.reduce((acc : any, row : any) => acc + row.SALDO, 0)).toString()
  formData.value.monto = Number(selectedRows.reduce((acc : any, row : any) => acc + row.MONTO_COBRAR, 0)).toString()
  formData.value.descuento_debitos = Number(selectedRows.reduce((acc : any, row : any) => acc + row.MONTO, 0)).toString()
  formData.value.dtofinanciero = (((Number(formData.value.descuento_debitos) / Number(formData.value.montofactura)) * 100)).toString()
}
const onUpdateSelection2 = (selectedRows: any[]) => {
  console.log('Currently selected rows:', selectedRows)
  formData.value.montoNC = selectedRows.reduce((acc : any, row : any) => acc + row.SALDO, 0)
  formData.value.monto2 = Number(selectedRows.reduce((acc : any, row : any) => acc + row.MONTO_COBRAR, 0)).toString()
}

const resetSelection = () => {
  selected.value = []
  selected2.value = []
  formData.value.montofactura = ''
  formData.value.monto = ''
  formData.value.descuento_debitos = ''
  formData.value.dtofinanciero = ''
  formData.value.montoNC = ''
  formData.value.monto2 = ''
}

const optionsMask = reactive<MaskInputOptions>({
  number: {locale: 'es-US', fraction: 2}
})

definePageMeta({
  title: 'CUENTAS A COBRAR'
})
defineShortcuts({
  Q: {
    usingInput: false,
    handler: () => {
      mostrarqr.value = true
    }
  },
  W: {
    usingInput: false,
    handler: () => {
      awesome.value = !awesome.value
    }
  },
  enter: { 
    usingInput: true,
    handler: () => {
      cambiarinput.value == 'Cliente' ? consultaSaldosCliente() : cambiarinput.value == 'Factura' ? consultaSaldosFactura() : consultaSaldosRemito()
    }

  }
})
const tableUI = {
    th: {
        base: 'text-left',
        padding: 'px-4 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-sm',
    },
    td: {
        base: 'whitespace-nowrap',
        padding: 'px-4 py-4',
        color: 'text-gray-500 dark:text-gray-200',
        font: 'font-semibold',
        size: 'text-sm',
    },
}
const consultaSaldosCliente = async () =>{
  try {
    resetSelection()
    Object.assign(selected, [])
    Object.assign(getdata.data, {data: []})
    Object.assign(getdata.dataNC, {dataNC: []})
    Object.assign(formData.value, {
      montofactura: '',
      montoNC: '',
      monto: '', 
      monto2: '',
      cabacera: '',
      totalimporte: '',
      dtofinanciero: '',
      descuento_debitos: '',
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
    })
    
    if(datainputcliente.value == ''){
      toast.add({title: 'Nro. de cliente vacío', description: 'Por favor, ingrese un nro. de cliente.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    const response : any = await $fetch(config.public.apiBase +'/consultasaldosctacte', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + config.public.apiToken
      },
      query: {
        'codcliente': datainputcliente.value
      },
      async onResponseError({ request, response, options }) {
      // Log error
        console.log("[fetch response error]", request, response.status, response.body);
      },
    });
    const array = response.filter((data: any) => data.CVCL_TIPO_VAR == 'FCA' || data.CVCL_TIPO_VAR == 'FCB').map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
        return {
          FECHA_EMI: DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
          FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
          REMITO: data.MSMV_TIPO_MSVA + '-' + data.MSMV_NUMERO_MSVA,
          CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
          CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
          CVCL_CLIENTE: data.CVCL_CLIENTE,
          CLIE_NOMBRE: data.CLIE_NOMBRE,
          IMPORTE: data.IMPORTE,
          SALDO: data.SALDO,
          FECHA_DIFF: fechaDif,
          INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toString() : '',
          DTO_FINANCIERO:  dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100).toString() : 0,
          MONTO_COBRAR: ((data.SALDO) * (1- ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0) /100))),
          MONTO: ((data.SALDO) * ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0)/100))
        }
    })
    getdata.dataNC = response.filter((data: any) => data.CVCL_TIPO_VAR == 'NCA' || data.CVCL_TIPO_VAR == 'NCB' || data.CVCL_TIPO_VAR == 'CCA' || data.CVCL_TIPO_VAR == 'CCB' ).map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
        return {
          FECHA_EMI: DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
          FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
          CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
          CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
          CVCL_CLIENTE: data.CVCL_CLIENTE,
          CLIE_NOMBRE: data.CLIE_NOMBRE,
          IMPORTE: data.IMPORTE,
          SALDO: data.SALDO,
          FECHA_DIFF: fechaDif,
          INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toFixed(2) : '',
          DTO_FINANCIERO: 0,
          MONTO_COBRAR: -data.SALDO ,
          MONTO: 0
        }
    })
    if(array.length == 0){
      toast.add({title: 'No encuentro cliente con saldo.', description: 'Por favor, ingrese otro nro. de cliente.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    if(array.length > 0){
        gsap.to(".tab", {duration: 1.4, x: 0, y: 10})
    }
    return getdata.data = array
  }
  catch (error) {
    console.error('Error:', error);
  }
} 

const consultaSaldosRemito = async () => {
  try {
    resetSelection()
    Object.assign(selected, [])
    Object.assign(getdata.data, {data: []})
    Object.assign(getdata.dataNC, {dataNC: []})
    Object.assign(formData.value, {
      montofactura: '',
      montoNC: '',
      monto: '', 
      monto2: '',
      cabacera: '',
      totalimporte: '',
      dtofinanciero: '',
      descuento_debitos: '',
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
    })
    
    if(datainputremito.value == ''){
      toast.add({title: 'Nro. de cliente vacío', description: 'Por favor, ingrese un nro. de cliente.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    const response : any = await $fetch(config.public.apiBase +'/consultasaldosctacte', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + config.public.apiToken
      },
      query: {
        'remito': datainputremito.value
      },
      async onResponseError({ request, response, options }) {
      // Log error
        console.log("[fetch response error]", request, response.status, response.body);
      },
    });
    const array = response.filter((data: any) => data.CVCL_TIPO_VAR == 'FCA' || data.CVCL_TIPO_VAR == 'FCB').map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
        return {
          FECHA_EMI: DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
          FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
          REMITO: data.MSMV_TIPO_MSVA + '-' + data.MSMV_NUMERO_MSVA,
          CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
          CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
          CVCL_CLIENTE: data.CVCL_CLIENTE,
          CLIE_NOMBRE: data.CLIE_NOMBRE,
          IMPORTE: data.IMPORTE,
          SALDO: data.SALDO,
          FECHA_DIFF: fechaDif,
          INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toString() : '',
          DTO_FINANCIERO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100).toString() : 0,
          MONTO_COBRAR: ((data.SALDO) * (1- ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0) /100))),
          MONTO: ((data.SALDO) * ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0)/100))
        }
    })
    getdata.dataNC = response.filter((data: any) => data.CVCL_TIPO_VAR == 'NCA' || data.CVCL_TIPO_VAR == 'NCB' || data.CVCL_TIPO_VAR == 'CCA' || data.CVCL_TIPO_VAR == 'CCB' ).map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
        return {
          FECHA_EMI:DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
          FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
          CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
          CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
          CVCL_CLIENTE: data.CVCL_CLIENTE,
          CLIE_NOMBRE: data.CLIE_NOMBRE,
          IMPORTE: data.IMPORTE,
          SALDO: data.SALDO,
          FECHA_DIFF: fechaDif,
          INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toFixed(2) : '',
          DTO_FINANCIERO: 0,
          MONTO_COBRAR: -data.SALDO ,
          MONTO: 0
        }
    })
    if(array.length == 0){
      toast.add({title: 'No encuentro remito con saldo.', description: 'Por favor, ingrese otro nro. de cliente.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    if(array.length > 0){
        gsap.to(".tab", {duration: 1.4, x: 0, y: 10})
    }
    return getdata.data = array
  }
  catch (error) {
    console.error('Error:', error);
  }
} 

const consultaSaldosFactura = async () =>{
  try {
    resetSelection()
    Object.assign(selected, [])
    Object.assign(getdata.data, {data: []})
    Object.assign(formData.value, {
      montofactura: '',
      monto: '', 
      cabacera: '',
      totalimporte: '',
      dtofinanciero: '',
      descuento_debitos: '',
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
    })
    if(datainputfactura.value == ''){
      toast.add({title: 'Nro. de factura vacío', description: 'Por favor, ingrese un nro. de factura.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    const response : any = await $fetch(config.public.apiBase +'/consultasaldosctacte', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + config.public.apiToken
      },
      query: {
        'numerofactura': datainputfactura.value
      },
      async onResponseError({ request, response, options }) {
      // Log error
        console.log("[fetch response error]", request, response.status, response.body);
      },
    });
    const array = response.map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
      return {
        FECHA_EMI: DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
        FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
        REMITO: data.MSMV_TIPO_MSVA + '-' + data.MSMV_NUMERO_MSVA,
        CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
        CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
        CVCL_CLIENTE: data.CVCL_CLIENTE,
        CLIE_NOMBRE: data.CLIE_NOMBRE,
        IMPORTE: data.IMPORTE,
        SALDO: data.SALDO,
        FECHA_DIFF: fechaDif,
        INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toString() : '',
        DTO_FINANCIERO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100).toString() : 0,
        MONTO_COBRAR:  ((data.SALDO) * (1- ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0) /100))),
        MONTO:  ((data.SALDO) * ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0)/100))
      }
    })
    if(array.length == 0){
      toast.add({title: 'No encuentro factura con saldo.', description: 'Por favor, ingrese otro nro. de factura.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    return getdata.data = array
  }
  catch (error) {
    console.error('Error:', error);
  }
} 

const consultaSaldosQR = async () =>{
  try {
    resetSelection()
    Object.assign(selected, [])
    Object.assign(getdata.data, {data: []})
    Object.assign(formData.value, {
      montofactura: '',
      monto: '', 
      cabacera: '',
      totalimporte: '',
      dtofinanciero: '',
      descuento_debitos: '',
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
    })
    if(datainputqr.value == ''){
      toast.add({title: 'QR vacío', description: 'Por favor, ingrese un código QR.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    const response : any = await $fetch(config.public.apiBase +'/consultasaldosctacte', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + config.public.apiToken
      },
      query: {
        'qr': datainputqr.value
      },
      async onResponse({ request, response, options }) {
        //console.log("[fetch response]", request, response.status, response.body);
        if(response.status === 200){
          mostrarqr.value = false
        }
        if(response.status === 400){
          toast.add({title: 'QR no encontrado', description: 'Por favor, verifique el código QR.', icon:'i-heroicons-exclamation-circle', color:"red"});           
        }
        if (response.status === 500){
          toast.add({title:'Error interno del servidor', description: 'Por favor, intente más tarde.', icon:'i-heroicons-exclamation-circle', color:"red"});
        }
      },
      async onResponseError({ request, response, options }) {
      // Log error
        console.log("[fetch response error]", request, response.status, response.body);
      },
    });
    const array = response.map((data: any) => {
      const toNow = formatDistanceStrict(new Date(), data.FECHA_EMI, {
        unit: 'day',
        locale: es
      })
      const toNowNum = differenceInCalendarDays(
        new Date(),
        data.FECHA_EMI
      )
      const now = DateTime.now().toISODate()
      let ffactura = DateTime.fromISO(data.FECHA_EMI.replace('Z',''))
      let fnow = DateTime.fromISO(now)
      let diff = fnow.diff(ffactura,['days']).toObject()
      const fechaDif = diff?.days ? Number(diff.days) : 0
      const dtoFacturas : any = data_facturas.value?.filter((data:any) => {
        const itemDesde = Number(data?.desde)
        const itemHasta = Number(data?.hasta)
        const itemDia = fechaDif
        const S = itemDia >= itemDesde && itemDia <= itemHasta ? data?.dto : ''
        return S
      })
      const fechaHastaUltima = data_facturas.value?.findLast(data => data.hasta)?.hasta;
      return {
        FECHA_EMI: DateTime.fromISO(data.FECHA_EMI.replace('Z','')).toLocaleString(DateTime.DATE_SHORT),
        FACTURA: data.CVCL_TIPO_VAR + '-' + data.CVCL_NUMERO_CVCL,
        REMITO: data.MSMV_TIPO_MSVA + '-' + data.MSMV_NUMERO_MSVA,
        CVCL_TIPO_VAR: data.CVCL_TIPO_VAR,
        CVCL_NUMERO_CVCL: data.CVCL_NUMERO_CVCL,
        CVCL_CLIENTE: data.CVCL_CLIENTE,
        CLIE_NOMBRE: data.CLIE_NOMBRE,
        IMPORTE: data.IMPORTE,
        SALDO: data.SALDO,
        FECHA_DIFF: fechaDif,
        INTERES_MAX_DTO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? (Number(interesdiario) * fechaDif).toFixed(2) : 0,
        DTO_FINANCIERO: dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100).toFixed(2) : 0,
        MONTO_COBRAR: ((data.SALDO) * (1- ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0) /100))),
        MONTO: ((data.SALDO) * ((dtoFacturas[0]?.dto ? dtoFacturas[0]?.dto : fechaDif >= Number(fechaHastaUltima) ? ((1-((1-(Number(maxdtofinanciero) / 100)) * (1 + (Number(interesdiario) / 100) * fechaDif)))*100) : 0)/100))
      }
    })
    if(array.length == 0){
      toast.add({title: 'No encuentro QR con saldo.', description: 'Por favor, ingrese otro código QR.', icon:'i-heroicons-exclamation-circle', color:"red"});
      return
    }
    return getdata.data = array
  }
  catch (error) {
    console.error('Error:', error);
  }
}

const columns = [
  {
    key: 'FECHA_EMI', 
    label: 'Fecha de emisión'
  },
  {
    key: 'FACTURA',
    label: 'Nro. factura'
  },
  {
    key: 'REMITO',
    label: 'Nro. remito'
  },
  /* {
    key: 'CVCL_CLIENTE', 
    label: 'Nro. de cliente'
  },
  {
    key: 'CLIE_NOMBRE', 
    label: 'Nombre de cliente'
  }, */
  {
    key: 'IMPORTE', 
    label: 'Importe'
  },
  {
    key: 'SALDO', 
    label: 'Saldo'
  },
  {
    key: 'FECHA_DIFF', 
    label: 'Dif. fecha cobro'
  },/* 
  {
    key: 'INTERES_MAX_DTO',
    label: 'Interés sobre base c/máx.dto.financ.'
  }, */
  {
    key: 'DTO_FINANCIERO',
    label: 'Dto. a aplicar'
  },
  {
    key: 'MONTO_COBRAR',
    label: 'Monto a cobrar hoy c/dto incluídos'
  },
  {
    key: 'MONTO',
    label: ''
  }
]    
const columns2 = [
  {
    key: 'FECHA_EMI', 
    label: 'Fecha de emisión'
  },
  {
    key: 'FACTURA',
    label: 'Nro. nota de crédito'
  },
  {
    key: 'IMPORTE', 
    label: 'Importe'
  },
  {
    key: 'SALDO', 
    label: 'Saldo'
  },
  {
    key: 'FECHA_DIFF', 
    label: 'Dif. fecha cobro'
  }
]    

const monto = ref()
const montofactura_nc = ref()
const cabacera = ref()
const totalimporte = ref()
const nrocuotas = ref()
const formData = ref({
  montofactura: '',
  montoNC: '',
  monto: monto,
  montofactura_NC: montofactura_nc,
  monto2: '', 
  cabacera: cabacera,
  totalimporte: totalimporte,
  dtofinanciero: '',
  descuento_debitos: '',
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
})

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
  let monto = formData.value?.montofactura
  let totalImpacto = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.impacto), 0)
  let totalImporte = formData.value?.mediospago.reduce((acc, act)=> acc + Number(act.importe.replaceAll(",", "")), 0)
  let dtoFinanciero = Number(formData.value?.dtofinanciero).toFixed(2)
  cabacera.value = totalImporte ? Number(totalImporte) >= Number(monto) ? 0.00 : ((Number(monto) - Number(totalImporte)) / Number(monto) * 100).toFixed(2) : ''
  totalimporte.value = totalImporte ? Number(totalImporte) : ''
  pagocerrado.value = Number(monto) > 0 ? totalImpacto >= (Number(monto) * (1-Number(tolerencia)/100)) && totalImpacto <= (Number(monto) * (1+Number(tolerencia)/100)) ? true : false : false
  montofactura_nc.value = Number(formData.value?.monto)-Number(formData.value?.montoNC)
  formData.value.mediospago.forEach(item => { 
    const fechaHastaUltima = data_cheques.value?.findLast(data => data.hasta)?.hasta;
    const now = DateTime.now().toISODate()
    let fcheque = DateTime.fromISO(item.fecha)
    let fnow = DateTime.fromISO(now)
    let diff = fcheque.diff(fnow,['days']).toObject()
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
        
    item.dto = TC == 'TC' && item.cuota ? 
    data_mediosdepagos.value?.filter(data => data.nombre == item.nombre).map((data:any) => data.interes_base?.filter((x:any) => x?.nro_cuota == item.cuota)).map((data:any) => 
    (100-((100 - (Number(dtoFinanciero) / 100) * 100)*((1 + data[0]?.interes_base / 100)*100)/100)).toFixed(2))[0]
               : TC == 'CHEQ' ? 
               (100-((100 - (Number(dtoFinanciero) / 100) * 100)*(1 + ((((1-(Number(itemDto2?.dto)/100))/(1-(Number(maxdtofinanciero)/100))-1)*100)) / 100))).toFixed(2)
               : data_mediosdepagos.value?.filter(data => data.nombre == item.nombre).map(data => data.interes_base).map((data:any) =>           
               (100-((100 - (Number(dtoFinanciero) / 100) * 100)*((1 + data[0]?.interes_base / 100)*100)/100)).toFixed(2))[0] as any

    item.impacto = item.importe ? (Number(importe) / (1 - Number(item.dto) / 100)).toString() : '' as any 
        
    item.calculable = monto && item.dto && totalImpacto ? ((Number(monto) - Number(totalImpacto))*(1 - (Number(item.dto) / 100))).toString() 
    : monto && item.dto ? ((Number(monto))*(1 - (Number(item.dto) / 100))).toString() : '';
  })
})
const source = ref()
const { text, copy, copied, isSupported } = useClipboard({ source })
/* const clientePlataforma: any = await $fetch(config.public.apiBase + '/listaclientesplataforma', {
  method: 'GET',
  headers: {
    Accept: "application/json",
    'Authorization': 'Bearer ' + config.public.apiToken
  }
});
people.value = clientePlataforma.map((data:any)=> {
  return {
    id: data.CLIE_CLIENTE,
    label: data.CLIE_NOMBRE
  }
}) */
const groups = [{
  key: 'users',
  label: (q: any) => q && `Clientes encontrados “${q}”...`,
  search: async (q: any) => {
    if (!q) {
      return []
    }

    const users: any = await $fetch(config.public.apiBase +'/consultaclientes/'+q, { 
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + config.public.apiToken
      }
    });
    

    const result: any[] = users.map((user: any) => { 
      return { id: user.CVCL_CLIENTE, label: user.CLIE_NOMBRE, suffix: user.CVCL_CLIENTE }
    })
    
    return result
  }
}]
function onSelect(option:any) {
  //console.log(option)
  if (option.id) {
    datainputcliente.value = option.id
    consultaSaldosCliente()
  }
  isOpen2.value = false
}
</script>
<style>
</style>
  