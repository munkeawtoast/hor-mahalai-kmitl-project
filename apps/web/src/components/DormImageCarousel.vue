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
  <div class="carousel--container">
    <img
      v-for="(img, index) in images"
      class="carousel--image"
      :style="{
        transform: `translateX(${(this.currentImage - index) * -100}%)`,
      }"
      :src="img"
      :alt="`Dorm Image ${index + 1}`"
    />
    <div
      class="go--container"
      style="left: 0"
      @click="
        () => {
          this.currentImage -= 1
        }
      "
    >
      <FontAwesomeIcon icon="fa-solid fa-play" flip="horizontal" size="4x" />
    </div>
    <div
      class="go--container"
      style="left: 100%; transform: translateX(-100%)"
      @click="
        () => {
          this.currentImage += 1
        }
      "
    >
      <FontAwesomeIcon icon="fa-solid fa-play" size="4x" />
    </div>
    <div class="dots--container">
      <div
        v-for="(img, index) in images"
        class="dots--dot"
        :class="{ 'dots--dot--selected': this.currentImage === index }"
        @click="
          () => {
            focusOn(index)
          }
        "
      ></div>
    </div>
  </div>
</template>

<style>
.go--container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 0 1em;

  color: white;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.1);
}

.go--container:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.carousel--container {
  position: relative;
  display: flex;
  width: 800px;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.carousel--image {
  position: absolute;
  aspect-ratio: 16/9;
  width: 800px;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}

.dots--container {
  display: flex;
  gap: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
}

.dots--dot {
  width: 10px;
  height: 10px;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(146, 146, 146, 0.5);
  transition: all 0.3s;
}

.dots--dot--selected {
  border-radius: 30%;
  background-color: var(--white);
}
</style>
