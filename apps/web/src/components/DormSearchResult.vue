<script>
import DormBrief from './DormBrief.vue'
export default {
  props: {
    queryText: {
      type: String,
      required: true,
    },
    dorms: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      resultInSearch: this.dorms,
    }
  },
  watch: {
    queryText(newText) {
      if (newText === '') {
        this.resultInSearch = dorms
      } else {
        this.resultInSearch = this.dorms.filter((dorm) => {
          return dorm.name.contains(query)
        })
      }
    },
  },
  components: {
    DormBrief,
  },
}
</script>

<template>
  <div class="dorms--top"></div>
  <DormBrief v-for="dorm in resultInSearch" :dormData="dorm" />
</template>

<style scoped></style>
