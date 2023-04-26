<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    size: {
      type: String,
      default: '2xl',
    },
  },
}
</script>
<template>
  <div class="inline-block align-baseline text-2xl text-primary">
    <FontAwesomeIcon icon="fa-solid fa-city" :size="'xl'" />
    <span class="align-middle text-4xl font-bold">หอมหาลัย</span>
  </div>
</template>
