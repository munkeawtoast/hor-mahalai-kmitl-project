<script setup>
import DormBrief from './DormBrief.vue'
import { defineProps } from 'vue'

const props = defineProps({
  dorms: {
    type: Array,
    required: true,
  },
})

const { dorms } = props

</script>
<template>
  <DormBrief
    v-for="dorm in dorms"
    :dorm-data="dorm"
    :key="dorm.name"
  />
</template>

<style scoped></style>
