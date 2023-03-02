<script>
import DormDetails from '../components/DormDetails.vue'
export default {
  props: {
    dormID: {
      type: String,
      required: true,
    },
  },
  components: {
    DormDetails,
  },
}
</script>
<template>
  {{ dormID }}
  <DormDetails :dormData="{}" />
</template>
