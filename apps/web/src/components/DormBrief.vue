<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'
export default {
  props: {
    dormData: {
      type: Object,
      required: true,
    },
    search: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      amenities: Object.entries({
        ...this.dormData.dormAmenities,
        ...this.dormData.roomAmenities,
      }),
      rating: 8,
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
  >
    <img
      :src="dormData.images[0]"
      class="aspect-[4/3] w-72 object-cover"
      :alt="`รูปหอพัก${dormData.name}`"
    />
    <div class="p-4">
      <div class="">
        <div>ห่าง {{ search }}</div>
        <router-link :to="`/dorms/${dormData.id}`">
          <div class="text-3xl font-bold">หอพัก {{ dormData.name }}</div>
        </router-link>
        <div class="rating"></div>
      </div>
      <div class="text-md"></div>
    </div>
  </div>
</template>
