<script>
import { generateDorms } from '@helper/data-gen'
import DormBrief from './DormBrief.vue';
export default {
  props: {
    query: String,
  },
  data() {
    return {
      dorms: generateDorms(5, 15),
    }
  },
  components: {
    DormBrief
  }
}
</script>

<template>
  <div class="dorms--top">
  </div>
  <DormBrief v-for="dorm in dorms" :dormData="dorm" />
</template>

<style scoped>

</style>
