<script setup>
const props = defineProps({content: Object})
const block = props.content
</script>

<template>
  <div>
    {{block.title}}
    {{block.description}}
    <NuxtImg :src="block.image.url"/>
    dark- {{block.bgDark}}
  image first -   {{block.ImageFirst}}
  </div>
</template>

