<script setup>
import { IconTrash } from '@tabler/icons-vue'
import { defineProps, ref } from 'vue'
import { useUserStore } from '../stores';

const props = defineProps(['comment'])

const isOwnerOrAdmin = ref(false)

const userStore = useUserStore()



</script>

<template>
  <div
    class="w-2/5 w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black flex"
  >
    <div class="w-12 h-12 bg-less-black"></div>
    <div>
      <!-- <p>{{name}} {{time}}</p> -->
      <!-- <p>{{ description}}</p> -->
    </div>
    <div :class="isOwnerOrAdmin">

    </div>
    <div v-if="userStore.role === 'ADMIN' || userStore.id === props.ownerid">

    <IconTrash />
    </div>
  </div>
</template>
