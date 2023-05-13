<script>
// import DormCreateRoomTab from '../components/DormCreateRoomTab.vue'
import {
  IconBuildingEstate,
  IconBed,
  IconSquarePlus,
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
import ZormSelect from '../components/ZormSelect.vue'

const defaultRoom = {
  name: '',
  images: [],
  accomodations: [],
}

//TODO test

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
    ZormSelect,
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
          :id="zo.fields.name('id')"
          :field="zo.fields.name('name')"
          :error="zo.errors.name"
          required
        />
        <div class="grid-cols-2 gap-3 sm:grid">
          <!-- <div> -->
          <!--   <label for="university-select" class="block mb-2 font-medium" -->
          <!--     >เลือกมหาลัย</label -->
          <!--   > -->
          <!--   <select -->
          <!--     required -->
          <!--     v-model="dorm.university" -->
          <!--     name="university-select" -->
          <!--     id="university-select" -->
          <!--     :class=" -->
          <!--       zo.errors.name( -->
          <!--         'ring-red-400  focus:border-red-400 focus:ring-red-400', -->
          <!--       ) -->
          <!--     " -->
          <!--     class="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-lesser-gray focus:border-primary focus:ring-primary" -->
          <!--   > -->
          <!--     <option :value="null" selected disabled> -->
          <!--       กรุณาเลือกมหาวิทยาลัยใกล้เคียง -->
          <!--     </option> -->
          <!--     <option -->
          <!--       v-for="lan in landmarkOptions" -->
          <!--       :name="zo.fields.landmark('name')" -->
          <!--       :value="lan.id" -->
          <!--       :key="lan.id" -->
          <!--     ></option> -->
          <!--   </select> -->
          <!--   <span class="flex items-center h-6 text-xs text-danger"> -->
          <!--     {{ zo.errors.name()?.message }} -->
          <!--   </span> -->
          <!-- </div> -->
          <!-- <ZormSelect -->
          <!--   v-model="dorm.landmark" -->
          <!--   :id="zo.fields.landmark('id')" -->
          <!--   :field="zo.fields.landmark('name')" -->
          <!--   :error="zo.errors.landmark" -->
          <!--   label="กรุณาเลือกมหาลัย" -->
          <!--   placeholder="กรุณา" -->
          <!--   :options="landmarkOptions" -->
          <!-- /> -->
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
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>
