<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DormImageCarousel from './DormImageCarousel.vue'
import { generateUsers } from '@helper/data-gen'

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
      rooms: [{ ...this.dormData }, { ...this.dormData }, { ...this.dormData }],
    }
  },
  components: {
    DormImageCarousel,
    FontAwesomeIcon,
  },
}
</script>

<template>
  <DormImageCarousel :images="dormData.images" class="my-4" />
  <div class="my-4 w-full rounded-xl bg-white p-4">
    <div class="flex w-full justify-between align-bottom">
      <h1 class="text-2xl font-bold text-black">Title</h1>
      <div class="gap-1 align-middle text-xl text-primary-soft">
        <FontAwesomeIcon icon="fa-solid fa-star" class="mr-2" />
        <span class="text-primary">20</span>
        <span class="font-light text-lesser-gray">/</span>
        <span>10</span>
      </div>
    </div>
  </div>
</template>
