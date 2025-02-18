<script setup>

const config = useRuntimeConfig()
const route = useRoute();
const slug = route.params.slug;

const requestProjectsUrl = `${config.public.strapi.url}/api/projects?pLevel=3`;

const requestDistrictsUrl = `${config.public.strapi.url}/api/districts?`;
const { data, status, error } = await useAsyncData(
    'districtsData',
    () => $fetch(requestDistrictsUrl)
)

const projects = ref([]);
const totalProjects = ref(0);
const isLoading = ref(false);
const { locale } = useI18n();
console.log(locale)

const limit = 1;
const start = ref(0);

const loadProjects = async () => {
  isLoading.value = true;
  try {

    const response = await $fetch(`${requestProjectsUrl}&pagination[start]=${start.value}&pagination[limit]=${limit}&locale=${locale.value}`);

    if (response?.data) {
      projects.value.push(...response.data);
      totalProjects.value = response.meta.pagination.total;
      start.value += limit;
    }
  } catch (err) {
    error.value = "Failed to load projects.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

await loadProjects();


const allDistricts = computed(() => data.value?.data || []);


const selectedDistrict = ref(null);

const selectDistrict = (value) => {
  selectedDistrict.value = value
}

const filteredProjects = computed(() => {
  if (!selectedDistrict.value) return projects.value;
  return projects.value.filter((project) => project.district.documentId === selectedDistrict.value);
});

</script>

<template>
  <div>
    <div>
      <div v-for="district in allDistricts" :key="district.documentId" @click="selectDistrict(district.documentId)">
        {{ district.name }}
      </div>
    </div>
  </div>

  <div v-if="filteredProjects.length > 0">
    <div v-for="entity in filteredProjects" :key="entity.documentId || entity.documentId">
      <h3>{{ entity.name }}</h3>
      <div>{{entity.accomplished}}</div>
      <div>{{entity.notAccomplished}}</div>
      <div>{{entity.location}}</div>
      <NuxtImg :src="entity.photo.url"/>
    </div>
  </div>
  <button v-if="start < totalProjects && !isLoading" @click="loadProjects">
    Show More
  </button>

  <p v-if="isLoading">Loading more projects...</p>

</template>
