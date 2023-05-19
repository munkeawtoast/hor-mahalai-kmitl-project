<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'
import { axios } from '../utils'
import { useUserStore } from '../stores'
export default {
  props: {
    // dormData: {
    //   type: Object,
    //   required: true,
    // },
    // search: {
    //   type: Object,
    //   required: false,
    //   default: () => {
    //     return {}
    //   },
    // },
  },
  data() {
    return {
      // amenities: Object.entries({
      //   ...this.dormData.dormAmenities,
      //   ...this.dormData.roomAmenities,
      // }),
      // rating: 8,
    }
  },
  components: {
    FontAwesomeIcon,
    RouterLink,
  },
}
</script>
<template>
  <div
    class="flex items-stretch overflow-hidden rounded-2xl bg-white shadow-md"
  ></div>
</template>
