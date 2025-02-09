<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <NuxtLink v-for="item in menu" :key="item.id" :to="item.path">{{item.title}}</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: menuData, error } = await useFetch(`${config.public.strapi.url}/api/navigation/render/navigation`);

if (error?.value) {
  console.error("Failed to load navigation:", error.value);
}

const menu = menuData.value || [];
</script>

<style scoped>

</style>
