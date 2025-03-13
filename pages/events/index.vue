<script setup>

const config = useRuntimeConfig()
const route = useRoute();
const router = useRouter();

const slug = route.params.slug;

const requestUrl = `${config.public.strapi.url}/api/events?pLevel=3`;

const entities = ref([]);
const totalEntities = ref(0);
const isLoading = ref(false);
const { locale } = useI18n();

const limit = 2;
const start = ref(0);

const loadEntities = async () => {
  isLoading.value = true;
  try {

    const response = await $fetch(`${requestUrl}&pagination[start]=${start.value}&pagination[limit]=${limit}&locale=${locale.value}`);

    if (response?.data) {
      entities.value.push(...response.data);
      totalEntities.value = response.meta.pagination.total;
      start.value += limit;
    }
  } catch (err) {
    error.value = "Failed to load projects.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

await loadEntities();
</script>

<template>
  <section class="events-section">
    <div class="container">
      <div v-if="entities.length > 0" class="event-wrap">
        <div class="event" v-for="entity in entities" :key="entity.documentId">
          <div class="event__left">
            <NuxtImg v-if="entity.photo.url" class="event__img" :src="entity.photo.url"/>
          </div>

          <div class="event__content">
            <h2 class="event__title text-primary text-bold">{{ entity.name }}</h2>
            <p v-if="entity.shortDescription" class="event__descr">{{entity.shortDescription}}</p>

            <div class="event__info">
              <div class="event__info-left">
                <p v-if="entity.location" class="event__item"><span class="text-primary text-bold">{{$t('where')}}:</span> {{entity.location}}</p>
                <p v-if="entity.date" class="event__item"><span class="text-primary text-bold">{{$t('when')}}:</span> {{entity.date}}</p>
              </div>
              <a v-if="entity.formLink" :href="`https://${entity.formLink}`" class="btn btn--primary">{{$t('registration')}}</a>

            </div>
             </div>
        </div>
      </div>

    </div>

<!--    <button v-if="start < totalProjects && !isLoading" @click="loadProjects">-->
<!--      Show More-->
<!--    </button>-->

    <p v-if="isLoading">Loading more projects...</p>
  </section>

</template>

<style scoped lang="scss">
@import "assets/scss/base/_variables";

.events-section {
  padding: 72px 0 220px;
}
.event-wrap {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.event {
  display: flex;
  gap: 56px;
  padding: 60px;
  box-shadow: 0px 4px 40px $box-shadow;
  border-radius: 24px;
  font-size: 24px;
  &__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;

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
  &__content{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: auto;
  }

}

@media all and (max-width: 1024px) {
  .event {
    flex-direction: column;
    gap: 24px;
    padding: 16px;
  }
}

</style>
