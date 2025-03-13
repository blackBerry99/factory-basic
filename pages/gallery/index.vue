<script setup>
const config = useRuntimeConfig()
const  localePath  = useLocalePath()

const requestUrl = `${config.public.strapi.url}/api/history-items?sort=year:desc&pLevel`;
const { data, status, error } = await useAsyncData(
    'data',
    () => $fetch(requestUrl)
)

const items = computed(() => data.value?.data || []);
</script>

<template>
  <section class="gallery-section" v-if="items.length > 0">
    <div class="container">
<!--        <NuxtLink class="gallery-section__block" v-for="entity in items" :key="entity.id || entity.documentId"-->
<!--                  :to="localePath({-->
<!--      path: `/gallery/${ entity.year }`,-->
<!--    })">-->
        <div class="gallery-section__block" v-for="entity in items" :key="entity.id || entity.documentId">
          <template v-if="entity.gallery && entity.gallery.length > 0">
            <div class="gallery-section__year">{{ entity.year }}</div>
            <div class="gallery-section__photos" v-if="entity.gallery && entity.gallery.length > 0">
              <NuxtImg
                  v-for="(img, i)  in entity.gallery.slice(0, 2)"
                  class="gallery-section__photos-item"
                  :src="img.url"
                  :alt="entity.year.value || 'year'"/>
            </div>
          </template>
        </div>

<!--        </NuxtLink>-->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "assets/scss/base/_variables";

.gallery-section {
  padding: 102px 0;
  &__wrap {
    display: flex;
    flex-direction: column;
  }
  &__year {
    width: 180px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 45px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 48px;
    background: $blue;

  }
  &__block {
    display: flex;
    gap: 22px;
    font-size: 24px;
    position: relative;
    width: 100%;
  }
  &__photos {
    display: flex;
    gap: -48px;
    &-item {
        aspect-ratio: calc(300 / 385);
      max-width: 300px;
      flex-shrink: 0;
        object-fit: cover;
        border-radius: 24px;
        width: 100%;
      position: relative;
      &:nth-child(1)  {
        transform: rotate(3deg);
      }

      &:nth-child(2)  {
        transform: rotate(-7deg);
      }

      &:nth-child(3)  {
        transform: rotate(5deg);
      }

      &:last-child {
        transform: rotate(7deg);
        &:before {
          width: 100%;
          height: 100%;
          background: rgba(#000, 0.3);
          content: '';
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
}

</style>
