<script>
import { axios } from '../utils/axios'

export default {
  name: 'DormsView',
  data() {
    return {
      data: [],
    }
  },
  beforeMount: async function () {
    const response = await axios.get('/dorms/')
    this.data = response.data
    console.log(this.data)
  },
  methods: {
    banfunction(dorm) {
      axios
        .delete(`/dorms/${dorm}`)
        .then(this.$router.go())
        .catch(err => alert(err))
    },
    approvefunction(dorm) {
      axios
        .post(`/dorms/approve/${dorm}`)
        .then(this.$router.go())
        .catch(err => alert(err))
    },
  },
}
</script>
<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            DormID
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Dormname
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Maxprice
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Minprice
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            University
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Location
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Approved at
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Approved by
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-for="(dorm, index) in data" :key="index">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ dorm.id }}
          </th>
          <td class="px-6 py-4">{{ dorm.name }}</td>
          <td class="px-6 py-4">{{ dorm.priceRange[0] }}</td>
          <td class="px-6 py-4">
            {{ dorm.priceRange[1] ? dorm.priceRange[1] : 'null' }}
          </td>
          <td class="px-6 py-4">{{ dorm.university }}</td>
          <td class="px-6 py-4">{{ dorm.landmark }}</td>
          <td class="px-6 py-4">
            {{ dorm.approvedAt ? dorm.approvedAt : 'null' }}
          </td>
          <td class="px-6 py-4">
            {{ dorm.approvedBy ? dorm.approvedBy : 'null' }}
          </td>
          <td class="px-6 py-4 flex gap-3">
            <button
              class="bg-red-300 p-2 rounded-md"
              @click="banfunction(dorm.id)"
            >
              Delete
            </button>
            <button
              class="bg-green-300 p-2 rounded-md"
              @click="approvefunction(dorm.id)"
              v-if="dorm.approvedAt != 'null'"
            >
              Approve
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <MyTable @button-clicked="" /> -->
</template>
