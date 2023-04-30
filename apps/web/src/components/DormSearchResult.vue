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
        this.resultInSearch = this.dorms
      } else {
        this.resultInSearch = this.dorms.filter((dorm) => {
          return dorm.name.contains(this.queryText)
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
  <DormBrief
    v-for="dorm in resultInSearch"
    :dorm-data="dorm"
    :key="dorm.name"
  />
</template>

<style scoped></style>
