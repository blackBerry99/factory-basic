<script setup>
const props = defineProps({content: Object})
const events = props.content.events

const containerRef = ref(null)

const swiper = useSwiper(containerRef, {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
})

</script>

<template>
      <ClientOnly>
<div v-if="events && events.length > 0" class="swiper">
  <swiper-container ref="containerRef">
    <swiper-slide
        v-for="(event) in events"
        :key="event.documentId"
    >
      <NuxtImg v-if="event.sliderImage" :src="event.sliderImage.url" :alt="event.sliderImage.name || 'event'"/>
      <a target="_blank" :href="event.formLink" class="btn btn--primary">{{$t('take_part')}}</a>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper-container>

  <button class="control control--prev" @click="swiper.prev()">
    <svg  class="icon" width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9067 0L20.6667 3.76L8.45333 16L20.6667 28.24L16.9067 32L0.906663 16L16.9067 0Z" fill="#272637" fill-opacity="0.4"/>
    </svg>
  </button>
  <button class="control control--next" @click="swiper.prev()">
    <svg class="icon" width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9067 0L20.6667 3.76L8.45333 16L20.6667 28.24L16.9067 32L0.906663 16L16.9067 0Z" fill="#272637" fill-opacity="0.4"/>
    </svg>
  </button>
</div>
      </ClientOnly>

</template>

<style lang="scss">
@import "assets/scss/base/_variables";
.swiper {
  margin: 24px 0 80px;
  position: relative;
}
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 540px;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  a {
    position: absolute;
    z-index: 2;
    bottom: 35px;
    left: 0;
    right: 0;
    width: fit-content;
    margin: auto;
  }
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background-color: $blue;
}

.control {
  z-index: 2;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 93px;
  background-color: rgba(39, 38, 55, 0.05);
  cursor: pointer;
  border: none;
  outline: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: -70px;

  &:hover {
    background-color: rgba(39, 38, 55, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
  &--next {
    left: auto;
    right: -70px;
    .icon {
      transform: rotate(180deg);
    }
  }
  .icon {
    color: rgba(#272637, .3);
  }
}
@media all and (max-width: 1024px) {
.control {
  display: none;
}
}
</style>
