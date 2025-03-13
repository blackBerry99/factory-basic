<script setup>
const config = useRuntimeConfig()
const  localePath  = useLocalePath()
const { locale } = useI18n();

const requestUrl = `${config.public.strapi.url}/api/history-items?sort=year:desc&locale=${locale.value}&pLevel`;
const { data, status, error } = await useAsyncData(
    'data',
    () => $fetch(requestUrl)
)
const items = computed(() => data.value?.data || []);
</script>

<template>
  <section class="history">
    <div class="container">
      <div v-if="items.length > 0" class="history__wrap">
        <NuxtLink class="history__item" v-for="entity in items" :key="entity.id || entity.documentId"
                  :to="localePath({
      path: `/gallery/${ entity.year }`,
    })">
          <div class="history__item-icon">{{ entity.year }}</div>
          <div class="history__item-info">
            <NuxtImg class="history__item-img" :src="entity.photo.url" :alt="entity.year || 'year'" />
            <p class="">{{ entity.shortDescription }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "assets/scss/base/_variables";

.history {
  padding: 102px 0;
  &__wrap {
    display: flex;
    flex-direction: column;
  }
  &__item {
    display: flex;
    gap: 22px;
    font-size: 24px;
    position: relative;

    &:not(:last-child) {
      padding-bottom: 185px;
      &:before {
        content: '';
        position: absolute;
        left: 50px;
        bottom: 0;
        height: 100%;
        width: 2px;
        background: $blue;
      }
    }
    &-info {
      display: flex;
      gap: 30px;
      p{
        font-weight: 500;
      }
    }

    &-icon {
      width: 100px;
      height: 100px;
      flex-shrink: 0;
      border-radius: 50%;
      color: white;
      background: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
    }


    &-img {
      aspect-ratio: calc(373 / 235);
      border-radius: 12px;
      width: 100%;
      max-width: 373px;
    }
  }
}

</style>
