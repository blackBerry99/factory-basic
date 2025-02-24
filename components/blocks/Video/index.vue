<script setup>
const props = defineProps({content: Object})
const block = props.content
console.log(block)
</script>

<template>
  <div v-if="block.videoUrl" class="container">
    <div class="video-container">
      <iframe width="1154" height="673" :src="`${block.videoUrl}?autoplay=0&showinfo=0&controls=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
</template>

<style lang="scss">
.video-container {
 padding: 120px 0 0;
  display: flex;
  justify-content: center;
}

@media all and (max-width: 1024px) {
  .video-container {
    padding: 40px 0 0;
  }
}
</style>

