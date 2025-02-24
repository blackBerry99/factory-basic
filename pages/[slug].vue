<script setup>

const config = useRuntimeConfig()
const route = useRoute();
const slug = route.params.slug;
const { locale } = useI18n();

const requestUrl = `${config.public.strapi.url}/api/pages?filters[slug][$eq]=${slug}&locale=${locale.value}&pLevel`;
const { data: pageData, error } = await useFetch(requestUrl)

if (error?.value || !pageData.value || pageData.value.data.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const page = pageData.value.data[0];

</script>

<template>
  <div v-if="page">

<!--      <h1 v-if="page.title">{{ page.title }}</h1>-->
<!--      <p v-if="page.description">{{ page.description }}</p>-->

      <block-manager :slug="slug" :blocks="page.blocks" v-if="page.blocks && page.blocks.length > 0"/>

  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
