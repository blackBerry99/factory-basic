<template>
  <header>
    <div class="container">
      <nav class="nav">
        <NuxtLink  to="/">
          <img src="/logo-uk.svg" alt="logo"/>
        </NuxtLink>
        <NuxtLink v-for="item in menu" :key="item.id" :to="localePath(item.path)">{{item.title}}</NuxtLink>

        <div class="nav__lang">
          <NuxtLink class="nav__lang-item" v-for="locale in locales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.code }}
          </NuxtLink>
        </div>

      </nav>
    </div>

  </header>
</template>

<script setup>
const config = useRuntimeConfig()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const  localePath  = useLocalePath()
const { data: menuData, error } = await useFetch(`${config.public.strapi.url}/api/navigation/render/navigation`);
if (error?.value) {
  console.error("Failed to load navigation:", error.value);
}

const menu = menuData.value || [];
</script>

<style scoped>

</style>
