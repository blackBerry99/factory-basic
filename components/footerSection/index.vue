<script setup>
const config = useRuntimeConfig()
const { locale } = useI18n();

const requestUrl = `${config.public.strapi.url}/api/contact-info?locale=${locale.value}&pLevel`;
const { data: contactData, error } = await useFetch(requestUrl)
if (error?.value || !contactData.value || contactData.value.data.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "contactData Not Found" });
}

const contacts = contactData.value.data;
</script>

<template>
  <footer class="footer">
    <a v-if="contacts.phone" :href="`tel:${contacts.phone}`">{{contacts.phone}}</a>
    <a v-if="contacts.email" :href="`mailto:${contacts.email}`">{{contacts.email}}</a>
    <p v-if="contacts.address">   {{contacts.address}}</p>
    <nav class="">
      <!--      <NuxtLink v-for="item in menu" :key="item.id" :to="item.path">{{item.title}}</NuxtLink>-->
    </nav>
    <nav class="footer__nav" v-if="contacts.social && contacts.social.length > 0">
      <a v-for="link in contacts.social" :href="`https://${link.link}`" :key="link.id" target="_blank">
        svg
      </a>
    </nav>
    <p class="footer__policy">© Majsternia Mista 2025</p>
  </footer>
</template>

<style scoped lang="scss">
@import "assets/scss/base/_variables";
.footer {
  background: $blue;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 70px 0 40px;
  font-size: 18px;
  a {
    display: block;
  }
  &__nav {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 50px;
  }
}
</style>
