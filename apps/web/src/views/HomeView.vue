<script>
import DormSearchResult from '../components/DormSearchResult.vue'
import { generateDorms } from '@helper/data-gen'
export default {
  data() {
    return {
      dormData: generateDorms(0, 20),
      queryText: '',
    }
  },
  components: {
    DormSearchResult,
  },
}
</script>
<template>
  <DormSearchResult :dorms="dormData" :queryText="queryText" />
</template>
<style scoped></style>
