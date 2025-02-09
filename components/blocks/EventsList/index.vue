<script setup>
const props = defineProps({content: Object})
const events = props.content.events
</script>

<template>
  <div v-for="event in events" :key="event.documentId">
      {{event.name}}
      {{event.shortDescription}}
      {{event.formLink}}
      {{event.date}}
      {{event.location}}
      {{event.time}}
      {{event.createdAt}}
<!--      <NuxtImg :src="event.photo.url"/>-->
  </div>
</template>

