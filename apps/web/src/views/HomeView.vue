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
  <div class="flex w-full flex-col items-stretch gap-4">
    <DormSearchResult :dorms="dormData" :query-text="queryText" />
  </div>
</template>
<style scoped></style>
