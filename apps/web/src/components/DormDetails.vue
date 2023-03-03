<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DormImageCarousel from './DormImageCarousel.vue'
import { generateUsers } from '@helper/data-gen'

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
    }
  },
  components: {
    DormImageCarousel,
    FontAwesomeIcon,
  },
}
</script>

<template>
  <div class="img_viewer">
    <DormImageCarousel :images="dormData.images" style="margin-top: 40px;" />
  </div>
  <div class="dorm--container">
    <div class="dorm--name">{{ dormData.name }}</div>
    <div class="detail--container">
      <div class="detail--description">{{ dormData.description }}</div>
      <div class="detail--right">
        <div
          class="amenities--outer"
          v-for="(amens, key) in {
            dorm: dormData.dormAmenities,
            room: dormData.roomAmenities,
          }"
        >
          <div class="amenities--header">
            ใน{{ key === 'dorm' ? 'หอ' : 'ห้อง' }}มี
          </div>
          <div class="amenities--container">
            <div class="amenity--item" v-for="(value, key) in amens">
              <!-- <FontAwesomeIcon icon="" /> -->
              {{ key }}: {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="questions--outer">
    <div class="questions--text">คำถาม</div>
    <div class="question--container" v-for="ques in " >
      <div class="question--question">
        <div class="question--left"></div>
        <div class="question--row">
          <img class="question--profile_image" src="" alt="user" />
          <div class="question--user_name">{{ generateUsers(dormData.id * 4, dormData.id * 4 +3) }}</div>
        </div>
        <div class="question--title">Lorem</div>
        <div class="question--description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut culpa est quasi, possimus voluptatem facilis ut voluptas numquam doloremque autem fuga voluptates voluptatum in explicabo labore consequuntur porro sunt!</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dorm--name {
  font-size: 2em;
}
</style>
