<template v-if="promoDia">
    <div class="w-full">
        <div class="marquee">
            <div class="marquee_inner">
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
                <div class="marquee_part">
                <UIcon name="fxemoji:loudspeaker" />
                PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { usePromoStore } from '~/store/promo';
import { useIntervalFn } from '@vueuse/core'
const storePromoDia = usePromoStore()
await callOnce(storePromoDia.getPromoDia)
if(import.meta.client){
  gsap.to(".marquee_part", {xPercent: -100, repeat: -1, duration: 20, ease: "none"}).totalProgress(0.5);
  gsap.set(".marquee_inner", {xPercent: -20});
}
useIntervalFn(() => {
  storePromoDia.getPromoDia()
}, 100000)
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