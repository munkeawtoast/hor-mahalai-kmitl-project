<script>
// import { generateDorms, generateUsers } from '@helper/data-gen'
import { axios } from '../utils'

export default {
  data() {
    return {
      users: null,
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async banfunction(user) {
      console.log(user)
      await axios
        .delete(`/users/${user}`)
        .then(this.$router.go(this.$router.currentRoute))
        .catch(err => alert(err))
      // console.log(response.data)
      // this.users = response.data
    },
    async fetchUser() {
      const response = await axios
        .get(`/users/`)
        .then(this.$router.push(this.$router.currentRoute))
        .catch(err => alert(err))
      console.log(response.data)
      // this.users = response.data
      // this.universityOptions = response.data.map(uni => ({
      //   id: uni.id,
      //   label: uni.name,
      // }))
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
            UserID
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Username
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            First name
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Last name
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Role</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            banned at
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Banbutton
          </th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in users" :key="index">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ user.userId }}
          </th>
          <td class="px-6 py-4">{{ user.username }}</td>
          <td class="px-6 py-4">{{ user.firstName }}</td>
          <td class="px-6 py-4">{{ user.lastName }}</td>
          <td class="px-6 py-4">{{ user.Role }}</td>
          <td class="px-6 py-4">{{ user.bannedAt }}</td>
          <td class="px-6 py-4">
            <button
              class="bg-red-300 p-2 rounded-md"
              @click="banfunction(user.userId)"
            >
              Ban
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
