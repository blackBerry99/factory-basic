<script setup>
const props = defineProps({content: Object})
const events = props.content.projects
</script>

<template>
  <div v-for="entity in projects" :key="entity.documentId">
      {{entity.name}}
      {{entity.shortDescription}}
      {{entity.acomplished}}
      {{entity.notAcomplished}}
      {{entity.location}}
<!--      <NuxtImg :src="event.photo.url"/>-->
  </div>
</template>

