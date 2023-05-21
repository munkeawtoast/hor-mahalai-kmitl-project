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
    dormData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      amenities: Object.entries({
        ...this.dormData.dormAmenities,
        ...this.dormData.roomAmenities,
      }),
      rooms: [{ ...this.dormData }, { ...this.dormData }, { ...this.dormData }],
    }
  },
  components: {
    DormImageCarousel,
    FontAwesomeIcon,
    IconPhone,
    IconBrandFacebook,
    IconBrandLine,
    IconDroplet,
    IconBolt,
    IconCheckbox,
  },
}
</script>

<template>
  <div class="flex">
    <DormImageCarousel :images="dormData.images" class="my-4" />
    <div class="my-4 w-1/2 bg-white p-4">
      <div class="flex w-full justify-between align-bottom">
        <h1 class="text-2xl font-bold text-black">หอมหาชัย</h1>
      </div>
      <div class="flex justify-between">
        <div>
          <p>Address</p>
          <div class="flex">
            <IconPhone></IconPhone>
            <p>0878789651</p>
          </div>
          <div class="flex">
            <a
              class="flex"
              href="https://www.facebook.com/groups/312966587409768"
              target="_blank"
              ><IconBrandFacebook></IconBrandFacebook>หน้า Facebook</a
            >
            <div class="flex">
              <IconBrandLine class="text-primary"></IconBrandLine>
              <p>line</p>
            </div>
          </div>
        </div>
        <div>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
        </div>
        <div>
          <p>ค่าเช่า</p>
          <p>5000</p>
          <div class="flex">
            <IconDroplet></IconDroplet> 50 <IconBolt></IconBolt> 50
          </div>
        </div>
      </div>
      <div class="gap-1 align-middle text-xl text-primary-soft">
        <FontAwesomeIcon icon="fa-solid fa-star" class="mr-2" />
        <span class="text-primary">20</span>
        <span class="font-light text-lesser-gray">/</span>
        <span>10</span>
      </div>
      <div class="w-full h-72 bg-primary">
        <p>Google maps</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full bg-white p-4">
    <div>
      <p>Description</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi velit
        veniam iste obcaecati laboriosam, tenetur placeat inventore magni
        provident dicta vitae ut, saepe, nulla minima impedit enim voluptatem.
        Hic, et.
      </p>
    </div>
    <div
      class="w-24 border border-black aspect-video flex flex-row justify-center items-center m-4"
    >
      <IconCheckbox></IconCheckbox>
      <p>Amenities</p>
    </div>
  </div>
</template>
