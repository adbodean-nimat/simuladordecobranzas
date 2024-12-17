<template>
    <div>
        <UContainer :ui="{ constrained: 'max-w-screen-2xl' }">
            <div class="text-center p-4 text-base">
                <h2>COSTO DE FINANCIACIÓN</h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero1">
                        <template #visa-master-nativa v-if="data_visamasternativa">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1"
                                    :rows="data_visamasternativa" 
                                    :loading="status_visamasternativa === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full"/>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero2">
                        <template #naranja v-if="data_naranja">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1" 
                                    :rows="data_naranja" 
                                    :loading="status_naranja === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Cargando...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full">
                                </UTable>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <div>
                    <UAccordion default-open multiple color="sea-green" variant="solid" size="xl" open-icon="i-heroicons-null" close-icon="i-heroicons-null" :items="financiero3">
                        <template #cuota-simple v-if="data_cuotasimple">
                            <div class="text-sea-green-900 dark:text-white text-center">
                                <UTable 
                                    :ui="tableUI"
                                    :columns="columns1" 
                                    :rows="data_cuotasimple" 
                                    :loading="status_cuotasimple === 'pending'"
                                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                                    :progress="{ color: 'sea-green', animation: 'carousel' }"
                                    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                                    class="w-full">
                                </UTable>
                            </div>
                        </template>
                    </UAccordion>
                </div>
            </div>
            <!-- <UAccordion multiple color="sea-green" variant="solid" size="xl" :items="financiero">
                <template #visa-master-nativa v-if="data_visamasternativa">
                    <div class="text-sea-green-900 dark:text-white text-center">
                         <UTable 
                            :ui="tableUI"
                            :columns="columns1"
                            :rows="data_visamasternativa" 
                            :loading="status_visamasternativa === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full"/>
                    </div>
                </template>
                <template #naranja v-if="data_naranja">
                    <div class="text-sea-green-900 dark:text-white text-center">
                        <UTable 
                            :ui="tableUI"
                            :columns="columns1" 
                            :rows="data_naranja" 
                            :loading="status_naranja === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full">
                        </UTable>
                    </div>
                </template>
                <template #cuota-simple v-if="data_cuotasimple">
                    <div class="text-sea-green-900 dark:text-white text-center">
                        <UTable 
                            :ui="tableUI"
                            :columns="columns1" 
                            :rows="data_cuotasimple" 
                            :loading="status_cuotasimple === 'pending'"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'sea-green', animation: 'carousel' }"
                            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
                            class="w-full">
                        </UTable>
                    </div>
                </template>
            </UAccordion> -->
        </UContainer>
    </div>
</template>

<script setup lang="ts">
const {status: status_visamasternativa, data: data_visamasternativa} = await useFetch('/api/visamasternativa')
const {status: status_naranja, data: data_naranja} = await useFetch('/api/naranja')
const {status: status_cuotasimple, data: data_cuotasimple} = await useFetch('/api/cuotasimple')
const tableUI = {
    divide: 'divide-y divide-sea-green-300 dark:divide-sea-green',
    th: {
        base: 'text-center rtl:text-right',
        padding: 'px-4 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-md',
    },
    td: {
        base: 'whitespace-nowrap',
        padding: 'px-4 py-4',
        color: 'text-gray-500 dark:text-gray-400',
        font: 'font-semibold',
        size: 'text-md',
    },
}
const columns1 = [{
    key: 'cuotas',
    label: 'CUOTAS'
  }, {
    key: 'tasas_interes',
    label: '%'
  }]
const financiero = [{
    label: "VISA-MASTERCARD-NATIVA",
    icon: "",
    slot: "visa-master-nativa"
  },{
    label: "NARANJA (respecto de contado)",
    icon: "",
    slot: "naranja"
  },{
    label: "CUOTA SIMPLE",
    icon: "",
    slot: "cuota-simple"
}]
const financiero1 = [{
    label: "VISA-MASTERCARD-NATIVA",
    icon: "",
    slot: "visa-master-nativa"
}]
const financiero2 = [{
    label: "NARANJA (respecto de contado)",
    icon: "",
    slot: "naranja"
}]
const financiero3 = [{
    label: "CUOTA SIMPLE",
    icon: "",
    slot: "cuota-simple"
}]
</script>