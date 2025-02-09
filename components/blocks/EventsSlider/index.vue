<template>
</template>

<script setup>
const props = defineProps({content: Object})
if (props.content) {
  useHead({
    title: props.content.metaTitle,
    meta: [
      { name: 'description', content: props.content.metaDescription },
    ],
  });
}
</script>

