<script>
// import DormCreateRoomTab from '../components/DormCreateRoomTab.vue'
import {
  IconBuildingEstate,
  IconBed,
  IconSquarePlus,
  IconX,
  IconAlertTriangleFilled,
} from '@tabler/icons-vue'
import {
  zPostDorm,
  dormAccommodations,
  roomAccomodations,
} from '@shared/validator'
import { useZorm, useValue, createCustomIssues } from 'vue-zorm'
import { IconAlertCircle } from '@tabler/icons-vue'
import { axios } from '../utils'
import DescriptionTextEditor from '../components/DescriptionTextEditor.vue'
import { useDraftCreateStore } from '../stores'
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { IconInfoCircle } from '@tabler/icons-vue'
import FormStep from '../components/FormStep.vue'
import ZormInput from '../components/ZormInput.vue'

const defaultRoom = {
  name: '',
  images: [],
  accomodations: [],
}

const validator = zPostDorm()

const serverSideIssues = createCustomIssues(validator) // Todo

const zo = useZorm('dormpost', validator, {
  onValidSubmit(e) {
    e.preventDefault()
    console.log(e)
  },
  onFormData(e) {
    console.log(e)
  },
  // customIssues: serverSideIssues
})

const value = useValue({
  zorm: zo,
  name: zo.fields.accomodations(),
})

const dormStore = useDraftCreateStore()
const { dorm, rooms } = dormStore

export default {
  data: () => ({
    zo,
    currentStep: 1,
    steps: [
      {
        title: 'ข้อมูลทั่วไป',
      },
      {
        title: 'เพิ่มห้อง',
      },
      {
        title: 'ตัวอย่าง',
      },
    ],
    value,
    landmarkOptions: [],
    universityOptions: [],
    selectedUniversity: null,
    accomodations: dormAccommodations,
    roomAccomodations,
    defaultRoom,
    activeRoom: 0,
    modalShow: {
      submit: false,
      deleteRoom: false,
    },
    dorm,
    rooms,
  }),
  watch: {
    selectedUniversity(newChoice) {
      this.fetchUniversities(newChoice)
    },
  },
  methods: {
    async fetchUniversities(id) {
      const response = await axios.get(`/universities${id}`)
      this.landmarkOptions = response.data
    },
    addNewRoom() {
      this.rooms.push({ ...defaultRoom })
      // this.activeRoom = this.rooms.length - 1
    },
  },
  components: {
    IconBed,
    IconSquarePlus,
    IconBuildingEstate,
    IconAlertCircle,
    DescriptionTextEditor,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
    IconAlertTriangleFilled,
    IconInfoCircle,
    DialogDescription,
    ZormInput,
  },
}
</script>
<template>
  {{ dorm.description }}
  <div class="w-full">
    <form :ref="zo.getRef">
      <div class="space-y-2">
        <div class="block justify-between sm:flex">
          <div class="inline-flex items-center space-x-3">
            <IconBuildingEstate width="30" height="30" />
            <h1 class="block text-4xl font-bold">เพิ่มหอใหม่</h1>
          </div>
          <div class="inline-block space-x-6 text-gray-500">
            <div class="inline-block space-x-2">
              <IconInfoCircle class="inline-block h-3 w-3 sm:h-4 sm:w-4" />
              <span class="text-[9px] sm:text-xs">ระบบมีการเซฟอัตโนมัติ</span>
            </div>
            <button
              type="reset"
              class="h-content inline-flex cursor-pointer items-center gap-2 rounded-md bg-danger p-4 py-3 text-white"
            >
              <IconAlertTriangleFilled size="20" />
              รีเซ็ตข้อมูล
            </button>
          </div>
        </div>
        <ZormInput
          label="ชื่อหอ"
          v-model="dorm.name"
          placeholder="หอพักไม่มีชื่อ"
          :validator="zo.fields.name"
          :error="zo.errors.name"
          required
        />
        <div>
          <label for="first_name" class="mb-2 block font-medium">ชื่อหอ</label>
          <input
            type="text"
            placeholder="หอพักไม่มีชื่อ"
            required
            v-model="dorm.name"
            :name="zo.fields.name('name')"
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
        <div class="grid-cols-2 gap-3 sm:grid">
          <div>
            <label for="university-select" class="mb-2 block font-medium"
              >เลือกมหาลัย</label
            >
            <select
              required
              v-model="dorm.university"
              name="university-select"
              id="university-select"
              :class="
                zo.errors.name(
                  'ring-red-400  focus:border-red-400 focus:ring-red-400',
                )
              "
              class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
            >
              <option :value="null" selected disabled>
                กรุณาเลือกมหาวิทยาลัยใกล้เคียง
              </option>
              <option
                v-for="lan in landmarkOptions"
                :name="zo.fields.landmark('name')"
                :value="lan.id"
                :key="lan.id"
              ></option>
            </select>
            <span class="flex h-6 items-center text-xs text-danger">
              {{ zo.errors.name()?.message }}
            </span>
          </div>
        </div>
        <div>
          <label for="first_name" class="mb-2 block font-medium"
            >สิ่งอำนวยความสะดวกในหอ</label
          >
          <div class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(acc, index) in accomodations" :key="index">
              <div
                class="flex items-center rounded border border-gray-200 bg-white pl-4"
              >
                <input
                  type="hidden"
                  :value="acc"
                  checked
                  :name="zo.fields.accomodations(index).name('name')"
                />
                <input
                  type="checkbox"
                  :id="zo.fields.accomodations(index).value('id')"
                  :name="zo.fields.accomodations(index).value('name')"
                  v-model="dorm.accomodations[index].value"
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
        <div>
          <DescriptionTextEditor v-model="dorm.description" />
        </div>
        <div class="space-y-2">
          <ul
            class="flex flex-wrap gap-2 text-center text-sm font-medium text-gray-500"
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
              <button
                type="button"
                for="add-new-room"
                required
                class="flex cursor-pointer items-center space-x-2 rounded-md p-4 py-3 text-primary ring-2 ring-primary"
              >
                <IconSquarePlus width="18" height="18" />
                <button
                  @click="addNewRoom"
                  type="button"
                  class="hidden"
                  id="add-new-room"
                  value="Bruh"
                ></button>
                <label for="add-new-room">เพิ่มห้อง</label>
              </button>
            </li>
          </ul>
          <template v-for="(room, index) in rooms" :key="index">
            <div
              v-show="activeRoom === index"
              class="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div>
                <label for="first_name" class="mb-2 block font-medium"
                  >ชื่อห้อง</label
                >
                <input
                  type="text"
                  :placeholder="`ห้องไม่มีชื่อ`"
                  required
                  v-model="rooms[index].name"
                  :name="zo.fields.rooms(index).name('name')"
                  :class="
                    zo.errors.name(
                      'ring-red-400  focus:border-red-400 focus:ring-red-400',
                    )
                  "
                  class="block w-full rounded-lg border border-lesser-gray bg-white p-2.5 text-sm text-black focus:border-primary focus:ring-primary"
                />
                <span class="flex h-6 items-center text-xs text-danger">
                  {{ zo.errors.rooms(index).name()?.message }}
                </span>
              </div>

              <label for="first_name" class="mb-2 block font-medium"
                >สิ่งอำนวยความสะดวกในห้อง</label
              >
              <div>
                <div
                  class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4"
                >
                  <div
                    v-for="(displayAcc, jndex) in roomAccomodations"
                    :key="jndex"
                  >
                    <div
                      class="flex items-center rounded border border-gray-200 bg-white pl-4 dark:border-gray-700"
                    >
                      <input
                        type="hidden"
                        :value="displayAcc"
                        checked
                        :name="
                          zo.fields
                            .rooms(index)
                            .accomodations(jndex)
                            .name('name')
                        "
                      />
                      <input
                        type="checkbox"
                        :value="true"
                        :id="
                          zo.fields
                            .rooms(index)
                            .accomodations(jndex)
                            .value('id')
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
                          zo.fields
                            .rooms(index)
                            .accomodations(jndex)
                            .value('id')
                        "
                        class="ml-2 w-full py-4 text-sm font-medium text-black dark:text-lesser-gray"
                        >{{ displayAcc }}</label
                      >
                    </div>
                  </div>
                </div>

                <span class="flex h-6 items-center text-xs text-danger">
                  {{ zo.errors.rooms(index).accomodations()?.message }}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  @click="modalShow.deleteRoom = true"
                  class="mb-2 mr-2 rounded-md bg-danger px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-soft-danger"
                >
                  ลบห้อง
                </button>
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
          <button
            @click="modalShow.submit = true"
            type="button"
            class="mb-2 mr-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-soft"
          >
            สร้างหอพัก
          </button>
        </div>
      </div>
      <Dialog
        @close="modalShow.deleteRoom = false"
        :open="modalShow.deleteRoom === true"
        class="relative w-full max-w-md rounded-md bg-white shadow"
      >
        <DialogBackdrop
          class="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <DialogPanel
            class="relative flex w-full max-w-md flex-col items-center rounded-md bg-white p-6 shadow"
          >
            <DialogTitle class="text-gray mb-5 text-lg font-normal">
              <div class="flex justify-center">
                <IconAlertCircle size="60" class="text-gray m-2" />
              </div>
              <h3 class="text-gray mb-5 text-center text-lg font-normal">
                แน่ใจแล้วใช่ไหมว่าจะลบ '{{ rooms[activeRoom].name }}'
              </h3>
            </DialogTitle>
            <div class="w-fit">
              <button
                type="button"
                @click="
                  () => {
                    this.removeCurrentroom()
                    this.modalShow = {}
                  }
                "
                class="mr-3 inline-flex items-center rounded-md bg-danger px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                ลบเลย
              </button>
              <button
                type="button"
                @click="modalShow = {}"
                class="rounded-md border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                ยังดีกว่า
              </button>
            </div>
          </DialogPanel>
        </DialogBackdrop>
      </Dialog>
      <Dialog
        @close="modalShow.submit = false"
        :open="modalShow.submit === true"
        class="relative w-full max-w-md rounded-md bg-white shadow"
      >
        <DialogBackdrop
          class="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <DialogPanel
            class="relative flex w-full max-w-md flex-col items-center rounded-md bg-white p-6 shadow"
          >
            <DialogTitle class="text-gray mb-5 text-lg font-normal">
              <div class="flex justify-center">
                <IconAlertCircle size="60" class="text-gray m-2" />
              </div>
              <h3 class="text-gray text-center text-lg font-normal">
                เพิ่มหอพัก
              </h3>
            </DialogTitle>
            <DialogDescription class="mb-5">
              หอพักจะต้องผ่านการยืนยันจากผู้ดูแลก่อน
            </DialogDescription>
            <div class="w-fit">
              <button
                type="submit"
                @submit="
                  () => {
                    this.modalShow.submit = false
                  }
                "
                class="mr-3 inline-flex items-center rounded-md bg-primary px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              >
                เพิ่มหอ
              </button>
              <button
                type="button"
                @click="modalShow.submit = false"
                class="rounded-md border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                ยังดีกว่า
              </button>
            </div>
          </DialogPanel>
        </DialogBackdrop>
      </Dialog>
    </form>

    <pre wrap="true">
        {{ JSON.stringify(zo.validation, null, 2) }}
      </pre
    >
  </div>
  {{ JSON.stringify(modalShow) }}
</template>
