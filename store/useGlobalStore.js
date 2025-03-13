import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { useStrapi } from "~/composables/useStrapi";
import {useFetch} from "nuxt/app";
const config = useRuntimeConfig();
export const useGlobalStore = defineStore("global", {
  state: () => ({
    navigation: null,
    translations: null,
    locale: "en",
  }),

  actions: {
    async fetchGlobalData(locale) {
      try {
        const { fetchData } = useStrapi();

        const globalData = await fetchData('global', {locale: locale});

        // if (!globalData || !globalData.data) {
        //   throw new Error("Global data not found");
        // }
        //
        // this.translations = globalData.data.translations;
        // this.navigation = globalData.data.navigation;
        //
        // const { setLocaleMessage } = useI18n();
        // setLocaleMessage(locale, this.translations);
      } catch (error) {
        throw createError({ statusCode: 404, statusMessage: error.message || "Global data not found" });
      }
    },

    setLocale(locale) {
      this.locale = locale;
    },
  },

  getters: {
    getNavigation: (state) => state.navigation,
    getTranslations: (state) => state.translations,
    getLocale: (state) => state.locale,
  },
});
