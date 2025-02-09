<script setup>

const config = useRuntimeConfig()
import { useRoute } from '#imports';

const route = useRoute();
const slug = route.params.slug;

const { data: pageData, error } = await useAsyncData(
    `page-${slug}`,
    () =>
        $fetch(`${config.public.strapi.url}/api/pages`, {
          query: {
            'filters[slug]': slug,
            populate: '*',
          },
        })
);

if (error?.value || !pageData.value || pageData.value.data.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const page = pageData.value.data[0];</script>

<template>
  <div v-if="page">
    <div class="container mx-auto">
      <h1 v-if="page.title">{{ page.title }}</h1>
      <p v-if="page.description">{{ page.description }}</p>

      <block-manager :blocks="page.blocks" v-if="page.blocks && page.blocks.length > 0"/>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
