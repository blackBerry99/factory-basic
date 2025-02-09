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
  // 'shared.media': () => import('~/components/shared/ImageSection.vue'),
};


</script>

<style scoped>

</style>
