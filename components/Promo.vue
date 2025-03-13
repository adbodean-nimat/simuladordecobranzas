<template v-if="promoDia">
    <div class="w-full">
        <div class="marquee">
            <div class="marquee_inner">
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ alert }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { DateTime } from 'luxon'; 
const {status: status_mediosdepagos, data: data_mediosdepagos} = await useFetch('/api/mediosdepagos')
const diaHoy = ref(DateTime.now().weekday)
const promoDia = ref(false)
const data_promodia = ref()
const alert = status_mediosdepagos.value == 'success' ? data_mediosdepagos.value?.filter((element: any) => element.estado && element.dias.find((data : any)=> data.id == diaHoy.value)).map((data : any) => {
  const dias = new Array(data.dias)
  const esHoy = dias.map((dia : any) => dia.filter((data : any) => data.id == diaHoy.value))
  if(esHoy){
    promoDia.value = true
    data_promodia.value = data.nombre
    return data.nombre
  }
}).toString() : ''
if(import.meta.client) {  
  gsap.to(".marquee_part", {xPercent: -100, repeat: -1, duration: 20, ease: "none"}).totalProgress(0.5);
  gsap.set(".marquee_inner", {xPercent: -20});
}
</script>
<style scoped>
.marquee_part {
  flex-shrink: 0;
  padding: 0 4px;
  font-smooth: always;
}

.marquee {
  font-style: italic;
  background: darkorange;
  color: #EEE;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1vw;
  position: relative;
  overflow: hidden;
}

.marquee_inner {
  -webkit-font-smoothing: antialiased;
    width: fit-content;
    display: flex;
    flex: auto;
    flex-direction: row;
}
</style>