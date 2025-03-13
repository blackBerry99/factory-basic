export const useStrapi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.strapi.url || "http://localhost:1337";


  const fetchData = async (endpoint, params = {},) => {
    try {
      const requestUrl = `${config.public.strapi.url}/api/global?locale=${locale.value}`;
      console.log(requestUrl)
      const { data: globalData, error } = await $fetch(requestUrl)
      // console.log(baseURL)
      console.log(globalData)
      // const { data, error } = await useFetch(`${baseURL}/api/${endpoint}`, {
      //   query: { ...params },
      // });

      console.log(globalData)

      if (error.value) {
        throw new Error(`Failed to fetch ${endpoint}: ${error.value.message}`);
      }

      return data.value;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      return null;
    }
  };

  return { fetchData };

}

