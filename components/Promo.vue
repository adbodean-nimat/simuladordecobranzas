<template v-if="promoDia">
      <section class="marquee">
        <div v-gsap.set="{xPercent: -20}" class="marquee_inner">
          <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'none' }" class="marquee_part">
            <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
          </div>
          <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'none' }" class="marquee_part">
            <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
          </div>
          <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'none' }" class="marquee_part">
            <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
          </div>
          <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'none' }" class="marquee_part">
            <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
          </div>
          <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'none' }" class="marquee_part">
            <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ storePromoDia.datapromodia }}
          </div>
        </div>
      </section>
</template>
<script setup lang="ts">
import { usePromoStore } from '~/store/promo';
import { useIntervalFn } from '@vueuse/core'
const storePromoDia = usePromoStore()
await callOnce(storePromoDia.getPromoDia)
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