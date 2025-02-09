<script setup>
const props = defineProps({content: Object})
const events = props.content.events

const containerRef = ref(null)
const swiper = useSwiper(containerRef)
</script>

<template>
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
              v-for="(event) in events"
              :key="event.documentId"
              style="background-color: rgb(32, 233, 70); color: white;"
          >
            {{event.name}}
            {{event.formLink}}
            {{event.photo.url}}
            <NuxtImg :src="event.sliderImage.url"/>
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
