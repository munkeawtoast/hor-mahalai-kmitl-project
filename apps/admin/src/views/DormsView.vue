<script setup>
import { onBeforeMount, ref } from 'vue'
import MyTable from '../components/MyTable.vue'
import { axios } from '../utils/axios'

const data = ref([])

onBeforeMount(async () => {
  const response = await axios.get('/dorms/')
  data.value = response.data
})
</script>
<template>
  {{ JSON.stringify(data) }}
  <!-- <MyTable @button-clicked="" /> -->
</template>
