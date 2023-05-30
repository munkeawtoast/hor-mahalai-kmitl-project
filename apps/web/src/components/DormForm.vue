<script>
import {
  zPostDorm,
  dormAccommodations,
  roomAccomodations,
} from '@shared/validator'
import { useZorm, createCustomIssues } from 'vue-zorm'
import { axios } from '../utils'
import DescriptionTextEditor from './DescriptionTextEditor.vue'
import { useDraftCreateStore } from '../stores'
import ZormInput from './ZormInput.vue'
import ZormSelect from './ZormSelect.vue'
import MySelect from './MySelect.vue'
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from '@headlessui/vue'
import {
  IconBuildingEstate,
  IconInfoCircle,
  IconAlertCircle,
  IconBed,
  IconSquarePlus,
  IconAlertTriangleFilled,
} from '@tabler/icons-vue'

const defaultRoom = {
  name: '',
  images: [],
  accomodations: [],
}

//TODO test

export default {
  props: {
    action: {
      type: String,
      default: 'CREATE',
      validator(value) {
        return ['CREATE', 'EDIT'].includes(value)
      },
    },
  },
  data() {
    const validator = zPostDorm({ coerce: true })
    const zo = useZorm('dormpost', validator, {
      onValidSubmit(e) {
        e.preventDefault()
        console.log(e)
      },
      //   onFormData(e) {},
      //   // customIssues: serverSideIssues
    })

    const dormStore = useDraftCreateStore()
    const { dorm, rooms } = dormStore
    return {
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
      landmarkOptions: [],
      universityOptions: [],
      selectedUniversity: null,
      accomodations: dormAccommodations,
      roomAccomodations,
      defaultRoom,
      activeRoom: 0,
      dialogShow: {
        submit: false,
        deleteRoom: false,
      },
      dorm,
      rooms,
    }
  },

  mounted() {
    this.fetchUniversities()
  },
  watch: {
    selectedUniversity(newChoice) {
      this.fetchUniversities(newChoice)
    },
    dorm(newDorm) {
      console.log('a')
      if (newDorm.university !== this.dorm.university) {
        this.fetchLandmarks(newDorm.university.id)
      }
    },
  },
  methods: {
    getState(roomAction) {
      if (this.action === 'CREATE') {
        return 'create'
      }
      if (this.action === 'EDIT') {
        return roomAction
      }
    },
    async fetchLandmarks(id) {
      const response = await axios.get(`/universities/${id}`)
      this.landmarkOptions = response.data
    },
    async fetchUniversities() {
      const response = await axios.get(`/universities`)
      this.universityOptions = response.data
    },
    addNewRoom() {
      this.rooms.push({ ...defaultRoom })
    },
    deleteRoom() {
      this.dialogShow.deleteRoom = false
      this.rooms.splice(this.activeRoom, 1)
    },
  },
  components: {
    IconBed,
    IconSquarePlus,
    IconBuildingEstate,
    IconAlertCircle,
    IconAlertTriangleFilled,
    IconInfoCircle,
    DescriptionTextEditor,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    DialogDescription,
    ZormInput,
    ZormSelect,
    MySelect,
  },
}
</script>
<template>
  <div class="w-full">
    <form @change="zo.validate()" :ref="zo.getRef">
      <div class="">
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
        <div class="pt-2">
          <ZormInput
            label="ชื่อหอ"
            v-model="dorm.name"
            placeholder="หอพักไม่มีชื่อ"
            :id="zo.fields.name('id')"
            :field="zo.fields.name('name')"
            :error="zo.errors.name"
            required
          />
        </div>
        <div class="grid-cols-2 gap-3 sm:grid">
          <ZormInput
            label="ค่าน้ำ"
            v-model="dorm.waterrate"
            placeholder="X บาท"
            :id="zo.fields.waterrate('id')"
            :field="zo.fields.waterrate('name')"
            :error="zo.errors.waterrate"
            required
          />
          <ZormInput
            label="ค่าไฟ"
            v-model="dorm.electricityrate"
            placeholder="X บาท"
            :id="zo.fields.electricityrate('id')"
            :field="zo.fields.electricityrate('name')"
            :error="zo.errors.electricityrate"
            required
          />
        </div>
        <div class="grid-cols-2 gap-3 sm:grid">
          <MySelect
            v-model="dorm.university"
            id="dormform:landmark"
            name="landmark"
            label="กรุณาเลือกมหาลัย"
            placeholder="กรุณาเลือกมหาลัย"
            :options="universityOptions"
          />
          <ZormSelect
            v-model="dorm.landmark"
            :id="zo.fields.landmark('id')"
            :field="zo.fields.landmark('name')"
            :error="zo.errors.landmark"
            label="กรุณาเลือกโซนของหอ"
            placeholder="กรุณาเลือกโซนของหอ"
            :options="landmarkOptions"
          />
        </div>
        <div>
          <label for="first_name" class="mb-2 block font-medium"
            >สิ่งอำนวยความสะดวกในหอ</label
          >
          <div class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(acc, index) in dorm.accomodations" :key="index">
              <div
                class="flex items-center rounded-lg border border-lesser-gray bg-white pl-4"
              >
                <input
                  type="hidden"
                  v-model="acc.name"
                  checked
                  :id="zo.fields.accomodations(index).name('id')"
                  :name="zo.fields.accomodations(index).name('name')"
                />
                <input
                  type="checkbox"
                  :id="zo.fields.accomodations(index).value('id')"
                  :name="zo.fields.accomodations(index).value('name')"
                  :true-value="true"
                  :false-value="false"
                  v-model="acc.value"
                  class="h-4 w-4 rounded border-lesser-gray bg-gray-100 text-primary focus:ring-2 focus:ring-primary-soft"
                />
                <label
                  :for="zo.fields.accomodations(index).value('id')"
                  class="ml-2 w-full py-4 text-sm font-medium text-black dark:text-lesser-gray"
                  >{{ acc.name }}</label
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
                  {{ room.name ? room.name : 'ห้องไม่มีชื่อ' }}
                </label>
              </button>
            </li>
            <li>
              <button
                @click="addNewRoom"
                for="add-new-room"
                class="flex cursor-pointer items-center border-primary text-primary border bg-white space-x-2 rounded-md p-4 py-3"
              >
                <IconSquarePlus size="18" />
                <label class="cursor-pointer"> เพิ่มห้องใหม่ </label>
              </button>
            </li>
          </ul>
        </div>
        <template v-for="(room, index) in rooms" :key="index">
          <div
            v-show="index === activeRoom"
            class="mt-2 rounded-md border-lesser-white bg-white p-3"
          >
            <ZormInput
              v-model="rooms[index].name"
              :id="zo.fields.rooms(index).name('id')"
              :field="zo.fields.rooms(index).name('name')"
              required
              placeholder="หอพักซักอย่าง"
              label="ชื่อห้อง"
              :error="zo.errors.rooms(index).name"
            />

            <ZormInput
              v-model="rooms[index].price"
              type=""
              :id="zo.fields.rooms(index).price('id')"
              :field="zo.fields.rooms(index).price('name')"
              required
              placeholder="ชื่อห้อง"
              label="ชื่อห้อง"
              :error="zo.errors.rooms(index).price"
            />
          </div>
        </template>
      </div>
      <input type="hidden" name="" />
    </form>
  </div>
  <TransitionRoot
    :show="dialogShow.deleteRoom"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      @close="dialogShow.deleteRoom = false"
      class="bg-opacity-30 flex justify-center text-black items-center bg-black inset-0 fixed"
    >
      <DialogPanel class="max-w-md bg-white space-y-3 p-8 border rounded-lg">
        <DialogTitle>
          <div class="flex items-center space-x-2">
            <IconAlertCircle />
            <h1 class="font-bold text-2xl">แน่ใจแล้วว่าจะลบห้องนี้?</h1>
          </div>
        </DialogTitle>
        <DialogDescription>
          <p>หากยืนยัน จะไม่สามารถกู้คืนข้อมูลที่เขียนไว้ได้</p>
        </DialogDescription>
        <div class="flex justify-center items-center">
          <button
            class="p-3 px-4 mr-4 text-white rounded bg-danger"
            @click="deleteRoom()"
          >
            Deactivate
          </button>

          <button
            class="p-3 px-4 mr-4 rounded bg-white border"
            @click="dialogShow.deleteRoom = false"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  </TransitionRoot>
</template>
