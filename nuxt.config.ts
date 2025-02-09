// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-31',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/image', 'nuxt-swiper'],

  strapi: {
    // Options
  },

  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_API_URL,
        cookie: { maxAge: 60 * 60 * 24 * 30 },
        cookieName: 'XYZ',
        auth: { populate: ['role'] },
      },
    },
  },

  image: {
    domains: ['localhost', '127.0.0.1'],
    strapi: {
      baseURL: process.env.STRAPI_URL || 'http://localhost:1337',
    },
    provider: 'strapi'
  }
})