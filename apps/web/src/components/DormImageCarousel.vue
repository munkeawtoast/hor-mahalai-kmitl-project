<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentImage: 0,
    }
  },
  watch: {
    currentImage(newVal) {
      if (newVal < 0) {
        this.currentImage = this.images.length - 1
      }
      if (newVal + 1 > this.images.length) {
        this.currentImage %= this.images.length
      }
    },
  },
  methods: {
    focusOn(index) {
      this.currentImage = index
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<template>
  <div class="relative flex aspect-video w-1/2 overflow-hidden rounded-2xl">
    <img
      v-for="(img, index) in images"
      :style="{
        transform: `translateX(${currentImage * -100}%)`,
      }"
      class="transition-transform duration-500 ease-in-out"
      :key="index"
      :src="img"
      :alt="`Dorm Image ${index + 1}`"
    />
    <!-- Left Arrow -->
    <div
      class="absolute left-0 flex h-full items-center justify-center px-2 text-white"
    >
      <button
        class="flex aspect-square items-center justify-center rounded-xl bg-white bg-opacity-0 transition-all duration-200 hover:bg-opacity-25"
        @click="
          () => {
            this.currentImage -= 1
          }
        "
      >
        <FontAwesomeIcon
          icon="fa-solid fa-play"
          flip="horizontal"
          size="4x"
          :fixed-width="true"
        />
      </button>
    </div>
    <!-- Right Arrow -->
    <div
      class="absolute right-0 flex h-full items-center justify-center px-2 text-white"
    >
      <button
        class="flex aspect-square items-center justify-center rounded-xl bg-white bg-opacity-0 transition-all duration-200 hover:bg-opacity-25"
        @click="
          () => {
            this.currentImage += 1
          }
        "
      >
        <FontAwesomeIcon
          icon="fa-solid fa-play"
          size="4x"
          :fixed-width="true"
        />
      </button>
    </div>

    <div class="absolute left-1/2 bottom-0 mb-1 flex -translate-x-1/2 gap-1">
      <button
        v-for="(_, index) in images"
        :key="index"
        class="h-3 w-3 rounded-full bg-white bg-opacity-25 transition-all duration-200"
        :class="{
          'bg-opacity-100': index === currentImage,
        }"
        @click="
          () => {
            focusOn(index)
          }
        "
      ></button>
    </div>
  </div>
</template>
