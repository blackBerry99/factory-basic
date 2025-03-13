<script setup>
const props = defineProps({content: Object})
const logos = props.content.image

const containerRef = ref(null)

const swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: {
    delay: 100,
  },
})

</script>

<template>
  <div class="logos">
    <div class="container">
  <h3 class="text-primary text-bold text-center" v-if="props.content.title">{{props.content.title}}</h3>

  <ClientOnly>
    <div v-if="logos && logos.length > 0" class="swiper">
        <swiper-container ref="containerRef">
          <swiper-slide
              v-for="(entity) in logos"
              :key="entity.documentId"
          >
            <NuxtImg v-if="entity.url" :src="entity.url" :alt="entity.name || 'partner'"/>
          </swiper-slide>
        </swiper-container>
    </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss">
.logos {
  padding: 128px 0 80px;
  swiper-slide {
    height: 107px;
    width: 183px;
    img {
      width: 100%;
      object-fit: contain;
      height: 100%;
    }
  }

  h3 {
    margin-bottom: 28px;
  }
}

@media all and (max-width: 1024px) {
  .logos {
    padding: 40px 0;
  }
}
</style>
