<script setup>
import { ref, watch } from 'vue'
import { axios } from '../utils'

import DormSearchResult from '../components/DormSearchResult.vue'
import MyInput from '../components/MyInput.vue'

async function fetchLandmarks(id) {
  const response = await axios.get(`/universities/${id}`)
  console.log(response.data)
  landmarkOptions.value = response.data.map(landmark => ({
    id: landmark.id,
    label: landmark.name,
  }))
}

async function fetchUniversities() {
  const response = await axios.get(`/universities`)
  universityOptions.value = response.data.map(uni => ({
    id: uni.id,
    label: uni.name,
  }))
}

async function fetchDorms() {
  const response = await axios.get(`/dorms`, {
    landmark: targetLandmark.value != null ? targetLandmark.value : undefined,
    university:
      targetUniversity.value != null ? targetUniversity.value : undefined,
    query: queryText.value != '' ? queryText.value : undefined,
  })
  dorms.value = response.data
}

// init

fetchUniversities()

const dorms = ref([])
const landmarkOptions = ref([])
const universityOptions = ref([])
const targetUniversity = ref()
const targetLandmark = ref()
const queryText = ref('')
</script>
<template>
  <button @click="fetchLandmarks">aa</button>
  <div class="space-y-4">
    <div class="bg-white space-y-2 rounded-xl p-4">
      <h1 class="text-2xl font-bold">ค้นหาหอ</h1>
      <MyInput
        label="ชื่อหอ"
        placeholder="หอพักชานสวน"
        id="search-bar"
        v-model="queryText"
      />
      <MySelect
        v-model="targetUniversity"
        id="dormform:landmark"
        name="landmark"
        label="กรุณาเลือกมหาลัย"
        placeholder="กรุณาเลือกมหาลัย"
        :options="universityOptions"
      />
      <MySelect
        v-model="targetLandmark"
        id="dormform:landmark"
        name="landmark"
        label="กรุณาเลือกมหาลัย"
        placeholder="กรุณาเลือกมหาลัย"
        :options="universityOptions"
      />
    </div>
    {{ debouncedQuery }}
    <DormSearchResult :dorms="dorms" />
  </div>
</template>
<style scoped></style>
