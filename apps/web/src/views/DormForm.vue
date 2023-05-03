<script>
// import DormCreateRoomTab from '../components/DormCreateRoomTab.vue'
import { IconBuildingEstate, IconBed, IconSquarePlus } from '@tabler/icons-vue'
import {
  zPostDorm,
  dormAccommodations,
  roomAccomodations,
} from '@shared/validator'
import { useZorm, useValue } from 'vue-zorm'
import { z } from 'zod'

const defaultRoom = {
  name: '',
  images: [],
  accomodations: [],
}

const defaultDorm = {
  label: '',
  name: '',
  images: [],
  description: '',
  location: '',
  // accomodations: dormAccommodations,
  accomodations: [],
  rooms: [{ ...defaultRoom }],
}

const validator = zPostDorm()

const zo = useZorm('dormpost', validator, {
  onValidSubmit(e) {
    e.preventDefault()
    console.log(e)
  },
  onFormData(e) {
    console.log(e)
  },
})

const value = useValue({
  zorm: zo,
  name: zo.fields.accomodations(),
})

export default {
  data: () => ({
    zo,
    value,
    accomodations: dormAccommodations,
    roomAccomodations,
    defaultRoom,
    activeRoom: 0,
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
    ],
  }),
  methods: {
    backFunction() {
      this.$router.push({ path: '/' })
    },
    addNewRoom() {
      this.rooms.push({ ...defaultRoom })
      this.activeRoom = this.rooms.length - 1
    },
    setActiveRoomTo(event) {
      console.dir(event.target)
      this.activeRoom = event.target.value
    },
  },
  components: {
    // DormCreateRoomTab,
    IconBed,
    IconSquarePlus,
    IconBuildingEstate,
  },
}
</script>
<template>
  <div class="w-full">
    <form :ref="zo.getRef">
      <div class="space-y-2">
        <span class="inline-flex items-center space-x-3">
          <IconBuildingEstate width="30" height="30" />
          <h1 class="block text-4xl font-bold">เพิ่มหอใหม่</h1>
        </span>
        <div>
          <label for="first_name" class="mb-2 block font-medium">ชื่อหอ</label>
          <input
            type="text"
            placeholder="หอพักชานสวน"
            required
            :name="zo.fields.name()"
            :class="
              zo.errors.name(
                'ring-red-400  focus:border-red-400 focus:ring-red-400',
              )
            "
            class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
          />
          <span class="flex h-6 items-center text-xs text-danger">
            {{ zo.errors.name()?.message }}
          </span>
        </div>
        <div>
          <label for="first_name" class="mb-2 block font-medium"
            >สิ่งอำนวยความสะดวกในหอ</label
          >
          <div class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(acc, index) in accomodations" :key="index">
              <div
                class="flex items-center rounded border border-gray-200 bg-gray-50 pl-4 dark:border-gray-700"
              >
                <input
                  type="hidden"
                  :value="acc"
                  checked
                  :name="zo.fields.accomodations(index).name('name')"
                />
                <input
                  type="checkbox"
                  :value="true"
                  :id="zo.fields.accomodations(index).value('id')"
                  :name="zo.fields.accomodations(index).value('name')"
                  class="h-4 w-4 rounded border-lesser-gray bg-gray-100 text-primary focus:ring-2 focus:ring-primary-soft"
                />
                <label
                  :for="zo.fields.accomodations(index).value('id')"
                  class="ml-2 w-full py-4 text-sm font-medium text-black dark:text-lesser-gray"
                  >{{ acc }}</label
                >
              </div>
            </div>
          </div>
          <span class="flex h-6 items-center text-xs text-danger">
            {{ zo.errors.accomodations()?.message }}
          </span>
        </div>
        <div class="space-y-2">
          <ul
            class="flex flex-wrap gap-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            <li v-for="(room, index) in rooms" :key="room.name">
              <label
                @click="activeRoom = index"
                for="current-room-tab"
                class="flex cursor-pointer items-center space-x-2 rounded-md p-4 py-3"
                :class="activeRoom === index && ['bg-primary text-white']"
              >
                <IconBed width="18" height="18" />
                <label class="cursor-pointer">
                  {{ room.name || 'ห้องไม่มีชื่อ' }}
                </label>
              </label>
            </li>
            <li class="mr-2">
              <label
                for="add-new-room"
                class="flex cursor-pointer items-center space-x-2 rounded-md p-4 py-3 text-primary ring-2 ring-primary"
              >
                <IconSquarePlus width="18" height="18" />
                <button
                  @click="addNewRoom"
                  type="button"
                  class="hidden"
                  id="add-new-room"
                >
                  เพิ่มห้องใหม่
                </button>
              </label>
            </li>
          </ul>
          <template v-for="(room, index) in rooms" :key="index">
            <div
              v-if="activeRoom === index"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <label for="first_name" class="mb-2 block font-medium"
                >ชื่อห้อง</label
              >

              <div
                class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4"
              >
                <div
                  v-for="(displayAcc, jndex) in roomAccomodations"
                  :key="jndex"
                >
                  <div
                    class="flex items-center rounded border border-gray-200 bg-gray-50 pl-4 dark:border-gray-700"
                  >
                    <input
                      type="hidden"
                      :value="displayAcc"
                      checked
                      :name="
                        zo.fields.rooms(index).accomodations(jndex).name('name')
                      "
                    />
                    <input
                      type="checkbox"
                      :value="true"
                      :id="
                        zo.fields.rooms(index).accomodations(jndex).value('id')
                      "
                      :name="
                        zo.fields
                          .rooms(index)
                          .accomodations(jndex)
                          .value('name')
                      "
                      class="h-4 w-4 rounded border-lesser-gray bg-gray-100 text-primary focus:ring-2 focus:ring-primary-soft"
                    />
                    <label
                      :for="
                        zo.fields.rooms(index).accomodations(jndex).value('id')
                      "
                      class="ml-2 w-full py-4 text-sm font-medium text-black dark:text-lesser-gray"
                      >{{ displayAcc }}</label
                    >
                  </div>
                </div>
              </div>
              <!-- <input
                type="text"
                class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
                placeholder="ห้องธรรมดา"
                required
                :name="zo.fields.rooms(index).name()('name')"
                :class="zo.errors.name('bg-red-500')"
              /> -->
              <!-- <span class="flex h-6 items-center text-xs text-danger">
                {{ zo.errors.name()?.message }}
              </span> -->
            </div>
          </template>
        </div>
      </div>
      <pre wrap="true">
        <!-- {{ activeRoom }} -->
        {{ JSON.stringify(zo.validation, null, 2) }}
      </pre>
    </form>
  </div>
</template>
