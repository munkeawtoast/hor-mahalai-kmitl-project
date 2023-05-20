<script>
import { center, googleMapsApiKey } from '../utils/google_maps'
import {
  IconBuildingEstate,
  IconInfoCircle,
  IconAlertCircle,
  IconBed,
  IconSquarePlus,
  IconAlertTriangleFilled,
} from '@tabler/icons-vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import {
  zPostDorm,
  // dormAccommodations,
  // roomAccomodations,
} from '@shared/validator'
import { useZorm } from 'vue-zorm'
import { axios } from '../utils'
import { useDraftCreateStore } from '../stores'
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from '@headlessui/vue'
import ZormInput from '../components/ZormInput.vue'
import ZormSelect from '../components/ZormSelect.vue'
import MySelect from '../components/MySelect.vue'
import ZormEditor from '../components/ZormEditor.vue'
import { ref } from 'vue'
import ZormTextArea from '../components/ZormTextArea.vue'

const defaultRoom = {
  name: '',
  images: [],
  accomodations: [],
}

//TODO test

const validator = zPostDorm({ coerce: true })

const zo = useZorm('dormpost', validator, {
  onValidSubmit(e) {
    e.preventDefault()
    console.log('onValidSubmit')
  },
  onFormData(e) {
    console.log('onFormData')
  },
})

const dormStore = useDraftCreateStore()
const { dorm, rooms } = dormStore

export default {
  data: () => ({
    action: 'CREATE',
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
    // accomodations: dormAccommodations,
    // roomAccomodations,
    defaultRoom,
    activeRoom: 0,
    dialogShow: {
      submit: false,
      deleteRoom: false,
    },
    dorm,
    rooms,
    googleMapsApiKey,
    center,
  }),
  setup() {
    return {
      marker: ref(),
      submitButton: ref(),
      mapElement: ref(),
    }
  },
  mounted() {
    this.fetchUniversities()
  },
  watch: {
    selectedUniversity(newChoice) {
      console.log('uni change')
      this.fetchLandmarks(newChoice)
    },
  },
  methods: {
    moveMarker(event) {
      console.log(event.Va)
      console.log(this.marker)
    },
    submitForm() {
      this.submitButton.click()
    },
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
      console.log(response.data)
      this.landmarkOptions = response.data.map(landmark => ({
        id: landmark.id,
        label: landmark.name,
      }))
    },
    async fetchUniversities() {
      const response = await axios.get(`/universities`)
      console.log(response.data)
      this.universityOptions = response.data.map(uni => ({
        id: uni.id,
        label: uni.name,
      }))
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
    Dialog,
    DialogPanel,
    DialogTitle,
    IconAlertTriangleFilled,
    TransitionRoot,
    IconInfoCircle,
    DialogDescription,
    ZormInput,
    ZormSelect,
    MySelect,
    ZormEditor,
    ZormTextArea,
    GoogleMap,
    Marker,
  },
}
</script>
<template>
  {{ JSON.stringify(zo.validation) }}
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
            v-model="selectedUniversity"
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
          <ZormTextArea
            v-model="dorm.address"
            :id="zo.fields.address('id')"
            :field="zo.fields.address('name')"
            :error="zo.errors.address"
            label="ที่อยู่หอ"
          />
        </div>
        <div>
          <input
            type="hidden"
            v-model="dorm.lat"
            :id="zo.fields.lat('id')"
            :name="zo.fields.lat('name')"
          />
          <input
            type="hidden"
            v-model="dorm.lat"
            :id="zo.fields.lng('id')"
            :name="zo.fields.lng('name')"
          />
          <!-- <input -->
          <!--   type="hidden" -->
          <!--   v-model="dorm.position[1]" -->
          <!--   :name="zo.fields.position(1)('name')" -->
          <!--   :id="zo.fields.position(1)('id')" -->
          <!-- /> -->
          <GoogleMap
            :api-key="googleMapsApiKey"
            :center="{
              lat: dorm.lat ?? center.lat,
              lng: dorm.lng ?? center.lng,
            }"

            draggable-cursor="pointer"
            dragging-cursor="grab"
            :clickable-icons="false"
            :zoom="15.5"
            class="w-full h-40"
            ref="mapElement"
            @click="moveMarker"
          >
            <Marker
              ref="marker"
              :options="{
                position: lat ?? { lat: dorm.lat, lng: dorm.lng },
              }"
            />
          </GoogleMap>
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
        <ZormEditor
          label="คำอธิบายหอ"
          :id="zo.fields.description('id')"
          :field="zo.fields.description('name')"
          :error="zo.errors.description"
          v-model="dorm.description"
        />
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
                class="flex cursor-pointer items-center border-primary text-primary border bg-gray-50 space-x-2 rounded-md p-4 py-3"
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
            class="mt-2 rounded-md border-lesser-white bg-gray-50 p-3"
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
              type="number"
              :id="zo.fields.rooms(index).price('id')"
              :field="zo.fields.rooms(index).price('name')"
              required
              placeholder="ราคาหน่วย บาท"
              label="ราคาต่อเดือน"
              :error="zo.errors.rooms(index).price"
            />
            <ZormInput
              v-model="rooms[index].width"
              type="number"
              :id="zo.fields.rooms(index).width('id')"
              :field="zo.fields.rooms(index).width('name')"
              required
              placeholder="หน่วยเมตร"
              label="ความกว้างห้อง"
              :error="zo.errors.rooms(index).width"
            />
            <ZormInput
              v-model="rooms[index].length"
              type="number"
              :id="zo.fields.rooms(index).length('id')"
              :field="zo.fields.rooms(index).length('name')"
              required
              placeholder="หน่วยเมตร"
              label="ความยาวห้อง"
              :error="zo.errors.rooms(index).length"
            />
            <div>
              <label for="first_name" class="mb-2 block font-medium"
                >สิ่งอำนวยความสะดวกในหอ</label
              >
              <div
                class="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4"
              >
                <div
                  v-for="(acc, jindex) in room.accomodations"
                  :key="acc.name"
                >
                  <div
                    class="flex items-center rounded-lg border border-lesser-gray bg-gray-50 pl-4"
                  >
                    <input
                      type="hidden"
                      v-model="dorm.rooms[index].accomodations[jindex].name"
                      checked
                      :id="
                        zo.fields.rooms(index).accomodations(jindex).name('id')
                      "
                      :name="
                        zo.fields
                          .rooms(index)
                          .accomodations(jindex)
                          .name('name')
                      "
                    />
                    <input
                      type="checkbox"
                      :id="
                        zo.fields.rooms(index).accomodations(jindex).value('id')
                      "
                      :name="
                        zo.fields
                          .rooms(index)
                          .accomodations(jindex)
                          .value('name')
                      "
                      :true-value="true"
                      :false-value="false"
                      v-model="dorm.rooms[index].accomodations[jindex].value"
                      class="h-4 w-4 rounded border-lesser-gray bg-gray-100 text-primary focus:ring-2 focus:ring-primary-soft"
                    />
                    <label
                      :for="
                        zo.fields.rooms(index).accomodations(jindex).value('id')
                      "
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
          </div>
        </template>
      </div>
      <div>
        <button
          for="submit-form"
          class="flex bg-primary text-white cursor-pointer items-center space-x-2 rounded-md p-4 py-3"
          @click="dialogShow.submit = true"
        >
          <label class="submit-form"> สร้างหอ</label>
        </button>
        <input
          type="submit"
          ref="submitButton"
          class="hidden"
          aria-hidden
          id="submit-form"
        />
      </div>
    </form>
  </div>
  <TransitionRoot
    :show="dialogShow.submit"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      @close="dialogShow.submit = false"
      class="bg-opacity-30 flex justify-center text-black items-center bg-black inset-0 fixed"
    >
      <DialogPanel class="max-w-md bg-white space-y-3 p-8 border rounded-lg">
        <DialogTitle>
          <div class="flex items-center space-x-2">
            <IconAlertCircle />
            <h1 class="font-bold text-2xl">สร้างหอ</h1>
          </div>
        </DialogTitle>
        <DialogDescription>
          <p>
            หากยืนยันจะส่งคำขอไปให้ผู้ดูแลยืนยันก่อนสามารถเพิ่มหอพักเข้าในระบบ
            อาจใช้เวลาดำเนินการประมาณ 1 วัน
          </p>
        </DialogDescription>
        <div class="flex justify-center items-center">
          <button
            class="p-3 px-4 mr-4 text-white rounded bg-primary"
            @click="submitForm"
          >
            เพิ่มหอ
          </button>

          <button
            class="p-3 px-4 mr-4 rounded bg-white border"
            @click="dialogShow.submit = false"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  </TransitionRoot>
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
