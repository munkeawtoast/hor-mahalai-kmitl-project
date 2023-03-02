<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  props: {
    dormData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      amenities: Object.entries({
        ...this.dormData.dormAmenities,
        ...this.dormData.roomAmenities,
      }),
    }
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>
<template>
  <!-- <img v-for="img in dormData.images" :src="img" alt="dorm image"> -->
</template>