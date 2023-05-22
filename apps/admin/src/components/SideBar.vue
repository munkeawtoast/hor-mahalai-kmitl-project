<script setup>
import { IconLogo } from '@shared/components'
import {
  IconUsers,
  IconBuildingEstate,
  IconMessageReport,
} from '@tabler/icons-vue'
import { RouterLink } from 'vue-router'

const sidebarItems = [
  {
    icon: IconUsers,
    label: 'ผู้ใช้งาน',
    to: {
      name: 'users',
    },
  },
  {
    icon: IconBuildingEstate,
    label: 'หอพัก',
    to: {
      name: 'dorms',
    },
  },
  {
    icon: IconMessageReport,
    label: 'รายงานจากผู้ใช้',
    to: {
      name: 'tickets',
    },
  },
]
</script>
<template>
  <aside class="w-[19.5rem] border-lesser-gray border-1 border-r-2">
    <div class="border-lesser-white border-b p-2 w-full">
      <IconLogo />
    </div>
    <div class="">
      <RouterLink
        class="py-2 px-4 flex border-b border-lesser-white"
        v-for="item in sidebarItems"
        :key="item.label"
        :to="item.to"
      >
        <component :is="item.icon" class="text-primary" stroke-width="2" />
        <span class="pl-2">{{ item.to.name }}</span>
      </RouterLink>
    </div>
  </aside>
</template>
