<template>
  <div v-for="block in blocks" :key="block.id">
    <component
        :is="componentMapping[block.__component]"
        :content="block"
    />
  </div>
</template>

<script setup>
const props = defineProps({blocks: Object})
const componentMapping = {
  'shared.seo': defineAsyncComponent(() => import('~/components/shared/Seo')),
  'blocks.event-slider': defineAsyncComponent(() => import('~/components/blocks/EventsSlider')),
  'blocks.text-image': defineAsyncComponent(() => import('~/components/blocks/TextImage')),
  'blocks.video': defineAsyncComponent(() => import('~/components/blocks/Video')),
  'blocks.events-list': defineAsyncComponent(() => import('~/components/blocks/Eventslist')),
  'blocks.history': defineAsyncComponent(() => import('~/components/blocks/History')),
  'blocks.logos-list': defineAsyncComponent(() => import('~/components/blocks/logosSlider')),
  // 'shared.media': () => import('~/components/shared/ImageSection.vue'),
};


</script>

<style scoped>

</style>
