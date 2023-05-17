<script>
import DormDetails from '../components/DormDetails.vue'
import { generateDorms } from '@helper/data-gen'

export default {
  props: {
    dormID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dormData: generateDorms(this.dormID, this.dormID + 1)[0],
    }
  },
  components: {
    DormDetails,
  },
}
</script>
<template>
  <DormDetails  :dormData="dormData" />
</template>
