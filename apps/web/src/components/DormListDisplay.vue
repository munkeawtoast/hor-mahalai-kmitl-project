<script>
import DormBrief from './DormBrief.vue'

export default {
  props: {
    dorms: {
      type: Array,
      required: true,
    },
  },
  components: {
    DormBrief,
  },
}
</script>
<template>
  <DormBrief v-for="dorm in this.dorms" :dorm-data="dorm" :key="dorm.name" />
</template>

<style scoped></style>
