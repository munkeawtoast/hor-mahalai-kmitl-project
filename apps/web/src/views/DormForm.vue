<script>
import DormCreateRoomTab from '../components/DormCreateRoomTab.vue'
import { IconBed, IconSquarePlus } from '@tabler/icons-vue'

export default {
  data: () => ({
    defaultDorm: {
      name: '',
      images: [],
      description: '',
      location: '',
      
    },
        currentRoom: 0,
    rooms: [
      {
        name: 'test',
        price: 0,
        water: '5',
        waterMode: 'number',
        electricity: '5',
        accomodations: {
          bed: true,
          ac: true,
          fan: true,
          microwave: true,
          waterheater: true,
          cookingarea: true,
          wardrobe: true,
        },
      },
      {
        name: 'testttat',
      },
    ],
  }),
  methods: {
    backFunction() {
      this.$router.push({ path: '/' })
    },
    onSubmit() {},
  },
  components: {
    DormCreateRoomTab,
    IconBed,
    IconSquarePlus,
  },
}
</script>
<template>
  <div class="d">
    <span>เพิ่มหอใหม่</span>

    <div>
      <ul
        class="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
      >
        <li class="mr-2" v-for="(room, index) in rooms" :key="index">
          <button
            @click="this.currentRoom = index"
            :aria-current="currentRoom === index ? 'room' : undefined"
            :class="currentRoom === index ? ['active'] : []"
            class="flex space-x-1 rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500"
          >
            <IconBed width="20" height="20" />
            <span>
              {{ room.name }}
            </span>
          </button>
        </li>
        <li class="mr-2">
          <button
            class="flex space-x-1 rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500"
          >
            <IconSquarePlus width="20" height="20" />
            <span> เพิ่มหอใหม่</span>
          </button>
        </li>
      </ul>
    </div>
    <template v-for="(room, index) in rooms" :key="index">
      <div class="flex overflow-hidden">
        <DormCreateRoomTab :room="room" />
      </div>
    </template>
  </div>
</template>
