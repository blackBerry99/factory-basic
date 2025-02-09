<script setup>
const props = defineProps({content: Object})
const partners = props.content.partners

const containerRef = ref(null)
const swiper = useSwiper(containerRef)
</script>

<template>
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
              v-for="(item) in partners"
              :key="item.documentId"
          >
            <NuxtImg :src="item.photo.url"/>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <button @click="swiper.prev()">
        Prev
      </button>
      <button @click="swiper.next()">
        Next
      </button>
</template>
