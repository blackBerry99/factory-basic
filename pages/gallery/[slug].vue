<script setup>

const config = useRuntimeConfig()
const route = useRoute();
const slug = route.params.slug;
const { locale } = useI18n();
const requestUrl = `${config.public.strapi.url}/api/history-items?filters[year]=${slug}&locale=${locale.value}&pLevel`;
const { data, error } = await useFetch(requestUrl)

if (error?.value || !data.value || data.value.data.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Gallery data Not Found" });
}
const entity = data.value.data[0];
console.log(entity)

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);
</script>

<template>
 <section class="gallery">
   <div class="container">
     <div class="gallery__wrap" v-if="entity.gallery && entity.gallery.length > 0">
       <NuxtImg
           v-for="(img, i)  in entity.gallery"
           class="gallery__wrap-item"
           :src="img.url"
           :alt="entity.year.value || 'year'"
           @click="() => showImg(i)"/>
     </div>
   </div>
   <VueEasyLightbox
       :visible="visibleRef"
       :imgs="entity.gallery.map(img => `${config.public.strapi.url}${img.url}`)"
       :index="indexRef"
       @hide="onHide"
   />
 </section>
</template>

<style lang="scss" scoped>
  .gallery__wrap {
    display: grid;
    gap: 24px;
    padding: 120px 0;
    grid-template-columns: repeat(4, 1fr);
    &-item {
      aspect-ratio: calc(300 / 200);
      width: 100%;
    }
  }
</style>
