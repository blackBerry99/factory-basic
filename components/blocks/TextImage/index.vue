<script setup>
const props = defineProps({content: Object})
const block = props.content
</script>

<template>
  <div class="text-block" :class="{'text-block--dark': block.bgDark}">
    <div class="container" :class="{'container--left': block.ImageFirst}">
      <div class="text-block__info">
        <h2 v-if="block.title" class="text-block__title text-primary text-bold">    {{block.title}}</h2>
        <p v-if="block.description" class="text-block__desc">    {{block.description}}</p>
      </div>

      <NuxtImg class="text-block__img" v-if="block.image.url" :src="block.image.url" :alt="block.image.name || 'image'"/>
      <img class="text-block__icon text-block__icon--br" v-if="block.ImageFirst" src="public/icons/blue-wave.svg" alt="blue wave">
      <img class="text-block__icon text-block__icon--tr" v-if="!block.ImageFirst" src="public/icons/orange-figure.svg" alt="orange figure">
      <img class="text-block__icon text-block__icon--tl" v-if="block.ImageFirst" src="public/icons/red-star.svg" alt="red star">

    </div>
  </div>
</template>

<style lang="scss">
@import "assets/scss/base/_variables";

.text-block {
  width: 100%;
  padding: 80px 0;
  position: relative;

  .container {
    display: flex;
    gap: 60px;
    &--left {
      flex-direction: row-reverse;
    }
  }

  &__info {
    flex: 0.9;
  }

  &__img {
    flex: 1.1;
    max-width: 50%;
  }

  &__icon {
    z-index: 2;
    position: absolute;
    &--tr {
      top: -2vw;
      right: 7vw;
      max-width: 20vw;
    }
    &--tl {
      top: -1.4vw;
      left: 2vw;
      max-width: 10vw;
    }
    &--br {
      right: 10vw;
      bottom: -10vw;
      max-width: 20vw;
    }
  }

  &__title {
    margin-bottom: 32px;
  }

  &__desc {
    font-size: 28px;
  }

  &--dark {
    background: $grey-bg;
  }
}
@media all and (max-width: 1024px) {
  .text-block {
    padding: 40px 0;
    &__title {
      margin-bottom: 12px;
    }
    .container {
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>

