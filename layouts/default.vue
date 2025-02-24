<script setup>

const config = useRuntimeConfig()
const { locale, setLocaleMessage } = useI18n();

const requestUrl = `${config.public.strapi.url}/api/global?locale=${locale.value}`;
const { data: globalData, error } = await useFetch(requestUrl)
console.log(globalData.value.data)
if (error?.value || !globalData.value || globalData.value.data.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "globalData Not Found" });
}

const global = globalData.value.data;
const translations = global.translations
setLocaleMessage(locale.value, translations);

</script>

<template>
  <header-section/>
    <slot />
  <footer-section/>
</template>
