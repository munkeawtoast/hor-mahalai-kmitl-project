<script>
import { generateDorms, generateUsers } from '@helper/data-gen'

export default {
  data() {
    return {
      users: generateUsers(0, 30),
      dorms: generateDorms(0, 30),
    }
  },
  methods: {
    banUser(user) {
      const deletingID = user.id
      this.dorms = this.dorms.filter((iter) => iter.id !== deletingID)
    },
  },
}
</script>
<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">#</th>
                <th scope="col" class="px-6 py-4">First</th>
                <th scope="col" class="px-6 py-4">Last</th>
                <th scope="col" class="px-6 py-4">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td class="whitespace-nowrap px-6 py-4">Mark</td>
                <td class="whitespace-nowrap px-6 py-4">Otto</td>
                <td class="whitespace-nowrap px-6 py-4">@mdo</td>
              </tr>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                <td class="whitespace-nowrap px-6 py-4">@fat</td>
              </tr>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                <td class="whitespace-nowrap px-6 py-4">Larry</td>
                <td class="whitespace-nowrap px-6 py-4">Wild</td>
                <td class="whitespace-nowrap px-6 py-4">@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col overflow-x-auto">
    <div class="sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">#</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
                <th scope="col" class="px-6 py-4">Heading</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
              </tr>
              <tr class="border-b dark:border-neutral-500">
                <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
              </tr>
              <tr class="border-b">
                <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
                <td class="whitespace-nowrap px-6 py-4">Cell</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
