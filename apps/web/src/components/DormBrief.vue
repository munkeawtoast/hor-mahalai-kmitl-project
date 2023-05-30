<script>
import {
  IconBuildingEstate,
  IconStarFilled,
  IconSchool,
} from '@tabler/icons-vue'
export default {
  props: {
    dormData: {
      type: Object,
      required: true,
    },
    search: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  components: {
    IconBuildingEstate,
    IconStarFilled,
    IconSchool,
  },
}
</script>
<template>
  <div
    class="flex h-64 items-stretch overflow-hidden rounded-2xl bg-white shadow-md"
  >
    <img
      :src="dormData.images[0]"
      width="400"
      :alt="`รูปหอพัก${dormData.name}`"
    />
    <div class="flex w-full">
      <div class="p-4 flex-1">
        <div class="text-gray-500 pb-2 flex gap-4">
          <div class="flex gap-1">
            <IconSchool /><span>{{ dormData.university }}</span>
          </div>
          <div class="flex gap-1">
            <IconBuildingEstate /><span>{{ dormData.landmark }}</span>
          </div>
        </div>
        <RouterLink class="" :to="`/dorms/${dormData.id}`">
          <div class="text-3xl font-bold">{{ dormData.name }}</div>
        </RouterLink>
        <div></div>
      </div>
      <div class="border-l-2 flex flex-col border-gray-200 w-36">
        <div class="flex flex-1 justify-center items-center">
          <div class="gap-1 items-center flex text-xl text-primary-soft">
            <IconStarFilled />
            <span class="text-primary-soft">{{ dormData.userRating }}</span>
            <span class="font-light text-lesser-gray">/</span>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
