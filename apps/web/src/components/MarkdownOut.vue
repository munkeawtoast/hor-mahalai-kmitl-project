<script>
import marked from 'marked'

marked.setOptions({
  breaks: true,
  gfm: true,
  mangle: true,
  sanitize: true,
  silent: true,
  smartypants: true,
})

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    markdown() {
      return marked.parse(this.content)
    },
  },
  mounted() {
    this.markdown = marked.parse(this.content)
  },
}
</script>
<template>
  {{ markdown }}
</template>
<style>
</style>
