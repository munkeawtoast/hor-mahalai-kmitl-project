<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DormImageCarousel from './DormImageCarousel.vue'
import { generateUsers } from '@helper/data-gen'
import {
  IconPhone,
  IconBrandFacebook,
  IconBrandLine,
  IconDroplet,
  IconBolt,
  IconBed,
  IconCurrencyDollar,
  IconArrowAutofitWidth,
  IconCheckbox,
} from '@tabler/icons-vue'

export default {
  props: {
    roomData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeRoom: 0,
      // roomaccom: this.room.Accommodations.map(
      //   acc => acc.AccommodationType.accommodationName,
      // ),
    }
  },
  components: {
    IconBed,
    IconCurrencyDollar,
    IconArrowAutofitWidth,
    IconCheckbox,
  },
}
</script>

<template>
  <div class="space-y-2">
    <ul
      class="flex flex-wrap gap-2 text-center text-sm font-medium text-gray-500"
    >
      <li v-for="(room, index) in roomData" :key="index">
        <button
          @click="activeRoom = index"
          for="current-room-tab"
          class="flex cursor-pointer items-center space-x-2 rounded-md p-4 py-3"
          :class="{
            'bg-primary text-white': activeRoom === index,
            'border-lesser-gray': true,
          }"
        >
          <IconBed :size="18" />
          <label class="cursor-pointer">
            {{ room.name ? room.name : 'ห้องไม่มีชื่อ' }}
          </label>
        </button>
      </li>
    </ul>
  </div>
  <template v-for="(room, index) in roomData" :key="index">
    <div
      v-show="index === activeRoom"
      class="mt-2 rounded-md border-lesser-white bg-white p-3"
    >
      <div class="flex items-center gap-4">
        <IconBed :size="18" />Room name: {{ room.name }}
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-4">
          <IconArrowAutofitWidth></IconArrowAutofitWidth>Room width:
          {{ room.width }}
        </div>
        <div>Room height: {{ room.length }}</div>
      </div>
      <div class="flex items-center gap-4">
        <IconCurrencyDollar></IconCurrencyDollar>Price: {{ room.price }}
      </div>
      <div class="flex text-lg items-center">
        <p>Accommodations:</p>
        <div
          class="w-24 border border-black aspect-video flex flex-row justify-center items-center m-4 text-xs"
          v-for="(accom, index) in room.Accommodations.map(
            acc => acc.AccommodationType.accommodationName,
          )"
          :key="index"
        >
          <IconCheckbox></IconCheckbox>
          <p>{{ accom }}</p>
        </div>
      </div>
    </div>
  </template>
</template>
