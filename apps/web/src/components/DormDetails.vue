<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DormImageCarousel from './DormImageCarousel.vue'
import { googleMapsApiKey, center } from '../utils/google_maps'
import DescriptionDisplay from './DescriptionDisplay.vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { generateUsers } from '@helper/data-gen'
import {
  IconPhone,
  IconBrandFacebook,
  IconBrandLine,
  IconDroplet,
  IconBolt,
  IconCheckbox,
} from '@tabler/icons-vue'
import { IconStarFilled } from '@tabler/icons-vue'

export default {
  props: {
    // dormData: {
    //   type: Object,
    //   required: true,
    // },
    dorminfo: Object,
  },
  data() {
    return {
      // amenities: Object.entries({
      //   ...this.dormData.dormAmenities,
      //   ...this.dormData.roomAmenities,
      // }),
      // rooms: [{ ...this.dormData }, { ...this.dormData }, { ...this.dormData }],
      description: this.dorminfo?.description,
      googleMapsApiKey,
      dormaccommodations: this.dorminfo.Accommodations.map(
        acc => acc.AccommodationType.accommodationName,
      ),
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
    DescriptionDisplay,
    GoogleMap,
    IconStarFilled
},
}
</script>

<template>
  <div class="flex">
    <DormImageCarousel
      :images="dorminfo.DormImages.map(img => img.url)"
      class="my-4"
    />
    <div class="my-4 w-1/2 bg-white p-4">
      <div class="flex w-full justify-between align-bottom">
        <h1 class="text-2xl font-bold text-black">{{ dorminfo?.name }}</h1>
      </div>
      <div class="flex justify-between">
        <div>
          <p class="w-3/4">{{ dorminfo.address }}</p>
          <div class="flex">
            <IconPhone></IconPhone>
            <p>{{ dorminfo.contactTelnum }}</p>
          </div>
          <div class="flex gap-2">
            <a class="flex" :href="dorminfo.contactFacebook" target="_blank"
              ><IconBrandFacebook></IconBrandFacebook>หน้า Facebook</a
            >
            <div class="flex">
              <IconBrandLine class="text-primary"></IconBrandLine>
              <p>{{ dorminfo.contactLine }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <IconDroplet></IconDroplet>
          <p>
            {{ dorminfo.waterRate }}
          </p>
          <IconBolt></IconBolt>
          <p>{{ dorminfo.electricityRate }}</p>
        </div>
      </div>
      <div class="gap-1 items-center flex text-xl text-primary-soft">
        <IconStarFilled />
        <span class="text-primary">{{
          dorminfo.Ratings.length
            ? dorminfo.Ratings.map(rate => rate.score).reduce(
                (acc, b) => acc + b,
                0,
              )
            : 0
        }}</span>
        <span class="font-light text-lesser-gray">/</span>
        <span>5</span>
      </div>
      <GoogleMap
        :api-key="googleMapsApiKey"
        :center="{
          lat: dorminfo.latitude,
          lng: dorminfo.longitude,
        }"
        draggable-cursor="pointer"
        dragging-cursor="grab"
        :clickable-icons="false"
        :zoom="15.5"
        class="w-full h-[256px] md:h-[400px] relative border-lesser-gray border"
        ref="mapElement"
        @click="moveMarkerToClick"
      >
        <Marker
          ref="marker"
          :options="{
            position: { lat: dorminfo.latitude, lng: dorminfo.longitude },
          }"
        />
      </GoogleMap>
    </div>
  </div>
  <div class="flex flex-col w-full bg-white p-4">
    <div>
      <p class="text-2xl">Description</p>
      <DescriptionDisplay v-model="description"> </DescriptionDisplay>
    </div>
    <div class="flex text-lg items-center">
      <p>Accommodations:</p>
      <div
        class="w-24 border border-black aspect-video flex flex-row justify-center items-center m-4 text-xs"
        v-for="(accom, index) in dormaccommodations"
        :key="index"
      >
        <IconCheckbox></IconCheckbox>
        <p>{{ accom }}</p>
      </div>
    </div>
  </div>
</template>
