<script setup>

const config = useRuntimeConfig()
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

// const slug = route.params.slug;

const requestProjectsUrl = `${config.public.strapi.url}/api/projects?pLevel=3`;

const requestDistrictsUrl = `${config.public.strapi.url}/api/districts?locale=${locale.value}`;
const { data, error } = await useAsyncData(
    'districtsData',
    () => $fetch(requestDistrictsUrl)
)

const projects = ref([]);
const totalProjects = ref(0);
const isLoading = ref(false);

const limit = 2;
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

const selectedDistrict = ref(route.query.district || null);

const selectDistrict = (value) => {
  selectedDistrict.value = value
  router.push({ query: { ...route.query, district: value } });
}

const filteredProjects = computed(() => {
  if (!selectedDistrict.value) return projects.value;
  return projects.value.filter((project) => project.district.slug === selectedDistrict.value);
});

const isActiveDistrict = (value) => {
  return selectedDistrict.value === value
}

</script>

<template>
  <section class="project-map">
    <div  v-if="isLoading">Loading...</div>
    <div class="container" v-else>
      <div v-if="allDistricts && allDistricts.length > 0" class="district-wrap">
        <button class="btn btn--white btn--lg"
                :class="{'btn--active': isActiveDistrict(district.slug)}"
                v-for="district in allDistricts"
                :key="district.documentId"
                @click="selectDistrict(district.slug)">
          {{ district.name }}
        </button>
      </div>

      <div v-if="filteredProjects.length > 0" class="project-wrap">
        <div class="project" v-for="entity in filteredProjects" :key="entity.documentId">
          <div class="project__left">
            <NuxtImg v-if="entity.photo.url" class="project__img" :src="entity.photo.url"/>
            <p v-if="entity.location" class="project__location"><img src="public/icons/pin.svg">{{entity.location}}</p>
          </div>

          <div class="project__content">
            <h2 class="project__title text-primary text-bold">{{ entity.name }}</h2>
            <p v-if="entity.accomplished" class="project__item"> <img src="public/icons/tick.svg">{{entity.accomplished}}</p>
            <p v-if="entity.notAccomplished"  class="project__item"><img src="public/icons/minus.svg"> {{entity.notAccomplished}}</p>
          </div>
        </div>
      </div>

    </div>

<!--    <button v-if="start < totalProjects && !isLoading" @click="loadProjects">-->
<!--      Show More-->
<!--    </button>-->
  </section>

</template>

<style scoped lang="scss">
@import "assets/scss/base/_variables";

.project-map {
  padding: 72px 0 220px;
}
.project {
  display: flex;
  gap: 56px;
  padding: 60px;
  box-shadow: 0px 4px 40px $box-shadow;
  border-radius: 24px;
  &__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 24px;
  }
  &__left {
    width: 458px;
    max-width: 50%;
  }
  &__img {
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    aspect-ratio: calc(458/331);
  }
  &__title {
    margin-bottom: 36px;
  }
  &__content{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__location {
    display: flex;
    margin-top: 30px;
    align-items: center;
    gap: 12px;
    font-size: 18px;
  }

}

.district-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 25px;
  margin-bottom: 72px;
}

.project-wrap {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

@media all and (max-width: 1024px) {
  .project {
    flex-direction: column;
    gap: 24px;
    padding: 16px;
  }
}

</style>
