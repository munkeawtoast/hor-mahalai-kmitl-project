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
  IconCheckbox,
} from '@tabler/icons-vue'

export default {
  props: {
    roomData: Number,
  },
  data() {
    return {
      activeRoom: 0,
    }
  },
  components: {},
}
</script>

<template>
  <div class="space-y-2">
    <ul
      class="flex flex-wrap gap-2 text-center text-sm font-medium text-gray-500"
    >
      <li v-for="(item, index) in roomData" :key="index">
        <button
          @click="activeRoom = index"
          for="current-room-tab"
          class="flex cursor-pointer items-center space-x-2 rounded-md p-4 py-3"
          :class="{
            'bg-primary text-white': activeRoom === index,
            'border-lesser-gray': true,
          }"
        >
          <IconBed size="18" />
          <label class="cursor-pointer">
            <p>Hello</p>
          </label>
        </button>
      </li>
    </ul>
  </div>
  <template v-for="(room, index) in rooms" :key="index">
    <div
      v-show="index === activeRoom"
      class="mt-2 rounded-md border-lesser-white bg-white p-3"
    ></div>
  </template>
</template>
