<script>
import { axios } from '../utils/axios'

export default {
  data() {
    return {
      tickets: [],
    }
  },

  mounted() {
    this.fetchTicket()
  },
  methods: {
    async fetchTicket() {
      const response = await axios.get(`/tickets/`)
      this.tickets = response.data
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
            TicketID
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            UserID
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Title</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-for="(ticket, index) in tickets" :key="index">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ ticket.ticketID }}
          </th>
          <td class="px-6 py-4">{{ ticket.userID }}</td>
          <td class="px-6 py-4">{{ ticket.title }}</td>
          <td class="px-6 py-4">{{ ticket.description }}</td>
          <!-- <td class="px-6 py-4 flex gap-3">
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
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
