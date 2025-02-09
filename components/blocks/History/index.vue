<script setup>
const props = defineProps({content: Object})
const history = props.content.history_items
</script>

<template>
  <div v-for="item in history" :key="item.documentId">
      {{item.shortDescription}}
      {{item.year.value}}
      <!--      <NuxtImg :src="item.photo.url"/>-->
  </div>
</template>


