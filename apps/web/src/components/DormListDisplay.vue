<script setup>
import DormBrief from './DormBrief.vue'
import { defineProps } from 'vue'

const props = defineProps({
  dorms: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <DormBrief v-for="dorm in props.dorms" :dorm-data="dorm" :key="dorm.name" />
</template>

<style scoped></style>
