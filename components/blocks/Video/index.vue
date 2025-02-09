<script setup>
const props = defineProps({content: Object})
const block = props.content
</script>

<template>
  <div>
<video :src="block.video.url"/>
  </div>
</template>

