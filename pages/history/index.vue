<script setup>
const config = useRuntimeConfig()

const requestUrl = `${config.public.strapi.url}/api/history-items?sort=year.value:desc&pLevel`;
const { data, status, error } = await useAsyncData(
    'data',
    () => $fetch(requestUrl)
)

const items = computed(() => data.value?.data || []);

</script>

<template>
  <div v-if="items.length > 0">
    <div v-for="entity in items" :key="entity.id || entity.documentId">
      <h3>{{ entity.shortDescription }}</h3>
      <div>{{ entity.year.value }}</div>
      <NuxtImg :src="entity.photo.url"/>
    </div>
  </div>

</template>
