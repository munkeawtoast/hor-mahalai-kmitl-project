<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'
import { axios } from '../utils'
import {
  IconPhone,
  IconBrandFacebook,
  IconBrandLine,
  IconDroplet,
  IconBolt,
  IconCheckbox,
  IconTrash,
} from '@tabler/icons-vue'
export default {
  props: {
    roomData: {
      type: Object,
      required: true,
    },
    // search: {
    //   type: Object,
    //   required: false,
    //   default: () => {
    //     return {}
    //   },
    // },
  },
  data() {
    // console.log(this.roomData)
    return {
      // amenities: Object.entries({
      //   ...this.dormData.dormAmenities,
      //   ...this.dormData.roomAmenities,
      // }),
      // rating: 8,
      
      roomPrices: this.roomData.Rooms.map(room => room.price),
    }
  },
  components: {
    RouterLink,
    IconDroplet,
    IconBolt,
    IconTrash,
  },
  methods: {
    async deleteDorm(dormID) {
      await axios.delete(`/dorms/${dormID}`)
      this.$router.go()
    },
  },
}
</script>
<template>
  <div
    class="flex items-stretch overflow-hidden rounded-2xl bg-white shadow-md my-8"
  >
    <img
      :src="roomData.DormImages[0]?.url"
      class="aspect-[4/3] w-72 object-cover"
      :alt="`รูปหอพัก${roomData.name}`"
    />
    <div class="p-4 flex justify-between w-full">
      <div class="flex flex-col gap-1">
        <router-link :to="`/dorms/${roomData.dormID}`">
          <div class="text-3xl font-bold">{{ roomData.name }}</div>
        </router-link>
        <div class="text-xl">{{ roomData.address }}</div>
        <div class="text-xl flex gap-2 items-center">
          <IconDroplet></IconDroplet> {{ roomData.waterRate }}
          <IconBolt></IconBolt> {{ roomData.electricityRate }}
        </div>
        <div class="rating"></div>
      </div>
      <div class="flex flex-col gap-1 items-center justify-between">
        <div class="text-xl">
          {{ Math.min(...roomPrices) }} - {{ Math.max(...roomPrices) }}
        </div>
        <div @click="deleteDorm(roomData.dormID)" class="cursor-pointer">
          <IconTrash :size="48"></IconTrash>
        </div>
      </div>
      <!-- <div class="text-md"></div> -->
    </div>
  </div>
</template>
