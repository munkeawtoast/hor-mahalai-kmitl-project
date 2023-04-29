<script>
import { defineComponent } from 'vue'
const defaultRoom = {
  name: '',
  price: 0,
  description: '',
  water: '',
  waterMode: 'number',
  electricity: 0,
  images: [],
  accomodations: {
    bed: false,
    ac: false,
    fan: false,
    microwave: false,
    waterheater: false,
    cookingarea: false,
    wardrobe: false,
  },
}

export default {
  data: () => ({}),
  props: {
    name: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: null,
    },
    water: {
      type: null,
      default: null,
    },
    waterMode: {
      type: String,
      default: 'number',
    },
    electricity: {
      type: Number,
      default: null,
    },
    images: {
      type: Array,
      default: () => [],
    },
    accomodations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<template>
  <div></div>
</template>
