<script setup>
const props = defineProps({content: Object})
const  localePath  = useLocalePath()
const entities = props.content.districts
</script>

<template>
  <div class="districts">
    <div class="container">
      <h2 class="text-primary text-bold" v-if="props.content.title">{{props.content.title}}</h2>
      <div v-if="entities &&entities.length > 0" class="districts__wrap">
        <NuxtLink v-for="entity in entities" :key="entity.documentId"
                  :to="localePath({
      path: '/projects-map',
      query: { district: entity.slug }
    })">{{entity.name}}</NuxtLink>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@import "assets/scss/base/_variables";
.districts{
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  min-height: 100vw;
  background: url("public/images/districts.svg");
  h2{
    margin-bottom: 148px;
    max-width: 908px;
  }
  &__wrap{
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    margin: auto;
    &:after {
      content: '';
      position: absolute;
      top: -133px;
      left: -198px;
      background: url("public/icons/arrow.svg");
      width: 198px;
      height: 198px;
    }
    a {
      background: white;
      justify-content: center;
      align-items: center;
      color: $primary;
      padding: 24px;
      border: 3px solid $primary;
      display: flex;
      font-size: 24px;
      width: 348px;
      font-weight: 500;
      border-radius: 16px;
      max-width: 90vw;
    }
  }
}
</style>

