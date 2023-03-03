<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'
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
    FontAwesomeIcon,
    RouterLink,
  },
}
</script>
<template>
  <div class="dorm--container">
    <RouterLink :to="`/dorms/${dormData.id}`">
      <img :src="dormData.images[0]" class="dorm--image" alt="" />
    </RouterLink>
    <div class="dorm">
      <div class="dorm--row">
        <div class="dorm--secondary">
          <FontAwesomeIcon :icon="['fa-solid', 'fa-map-location-dot']" />
          <span>ใกล้ม. กระบัง</span>
        </div>
        <div class="dorm--secondary dorm--star"></div>
      </div>
      <RouterLink :to="`/dorms/${dormData.id}`">
        <div class="dorm--row">
          <div class="dorm--name">หอ {{ dormData.name }}</div>
        </div>
      </RouterLink>
      <div class="dorm--row">
        ราตา {{ dormData.price.from }} - {{ dormData.price.to }}
      </div>
      <div class="dorm--row">
        <div class="dorm--description">
          {{ dormData.description }}
        </div>
      </div>
      <div class="dorm--row">
        <div class="dorm--secondary">
          มี
          <span
            class="dorm--amenity"
            v-for="amenity in amenities.filter(([, has]) => has)"
          >
            {{ amenity[0] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dorm--container {
  display: flex;
  outline: 1px red solid;
  border-radius: 16px;
  overflow: hidden;
  width: 800px;
}

.dorm--description {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 50ch;
}

.dorm--name {
  font-size: 1.25em;
}

.dorm--image {
  height: 200px;
  aspect-ratio: 4/3;
}

.dorm--amenity {
  padding-right: 1ch;
}

.dorm--secondary {
}

.dorm {
  padding: 10px;
}
</style>
