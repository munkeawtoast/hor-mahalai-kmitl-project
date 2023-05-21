<script>
import { IconTrash } from '@tabler/icons-vue'
export default {
  components: {
    IconTrash,
  },
  data() {
    return {}
  },
}
</script>

<template>
  <div
    class="w-2/5 rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black flex"
  >
    <div class="w-12 h-12 bg-less-black"></div>
    <div>
      <p>Name time</p>
      <p>Comment</p>
    </div>
    <IconTrash></IconTrash>
  </div>
</template>
