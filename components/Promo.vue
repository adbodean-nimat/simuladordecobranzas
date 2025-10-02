<template v-if="promoDia">
  <div class="marquee bg-sea-green-800" @mouseenter="pauseMarquee" @mouseleave="playMarquee">
    <div class="marquee-container overflow-hidden">
      <div ref="marqueeContent" class="marquee-content whitespace-nowrap">
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <span class="marquee_part">
          <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
        </span>
        <!-- Duplicate content for seamless loop -->
      </div>
    </div>

  </div>

  <!--  <section class="marquee">
    <div class="marquee_inner">
      <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'linear' }" class="marquee_part">
        <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
      </div>
      <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'linear' }" class="marquee_part">
        <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
      </div>
      <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'linear' }" class="marquee_part">
        <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
      </div>
      <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'linear' }" class="marquee_part">
        <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
      </div>
      <div v-gsap.to="{ xPercent: -100, repeat: -1, duration: 20, ease: 'linear' }" class="marquee_part">
        <UIcon name="fxemoji:loudspeaker" /> PROMO DEL DÍA: {{ datapromodia }}
      </div>
    </div>
  </section> -->
</template>
<script setup lang="ts">
import { gsap } from 'gsap';
import { usePromoStore } from '~/store/promo';
import { useIntervalFn } from '@vueuse/core'
const storePromoDia = usePromoStore()
await callOnce(storePromoDia.getPromoDia)
const { datapromodia } = storeToRefs(usePromoStore())

useIntervalFn(() => {
  storePromoDia.getPromoDia()
}, 10000000)


const marqueeContent = ref<HTMLElement | null>(null);
const gsapTimeline = ref<GSAPTween | null>(null);

onMounted(() => {
  const contentWidth = marqueeContent.value ? marqueeContent.value.scrollWidth / 2 : 0; // Assuming content is duplicated once
  gsapTimeline.value = gsap.to(marqueeContent.value, {
    x: -contentWidth,
    duration: 80, // Adjust duration for speed
    ease: 'linear',
    repeat: -1, // Infinite loop
  })
});

const pauseMarquee = () => {
  if (gsapTimeline.value) {
    gsapTimeline.value.pause();
  }
};

const playMarquee = () => {
  if (gsapTimeline.value) {
    gsapTimeline.value.play();
  }
};

</script>
<style scoped>
.marquee-container {
  width: 100%;
}

.marquee-content {
  display: inline-block;
  /* Allows content to flow horizontally */
}

.marquee_part {
  flex-shrink: 0;
  padding: 0 4px;
  font-smooth: always;
}

.marquee {
  font-style: normal;
  color: #EEE;
  text-transform: uppercase;
  font-weight: 600;
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