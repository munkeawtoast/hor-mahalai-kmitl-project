<script>
export default {
  props: {
    dormData: {
      type: Object,
      required: true,
    },
  },
}
</script>
<template>
  <div class="dorm--container">
    <img :src="dormData.image" class="dorm--image" alt="" />
    <div class="dorm">
      <div class="dorm--row">
        <div class="dorm--secondary"></div>
        <div class="dorm--secondary dorm--star"></div>
      </div>
      <div class="dorm--row">
        <div class="dorm--name">{{ dormData.name }}</div>
      </div>
      <div class="dorm--row">
        <div class="dorm--secondary"></div>
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

.dorm--image {
  height: 200px;
  aspect-ratio: 4/3;
}

.dorm--secondary {
}

.dorm {
  padding: 10px;
}
</style>
