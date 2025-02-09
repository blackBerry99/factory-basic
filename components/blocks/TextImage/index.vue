

<script setup>
const props = defineProps({content: Object})

if (props.content) {
  console.log('props', props.content.events)
}
</script>

<template>
  <div v-for="event in props.content.events" :key="event.documentId">
    {{event.name}}
    {{event.formLink}}
    {{event.sliderImage.url}}
    <NuxtImg :src="event.sliderImage.url"/>
  </div>
</template>

