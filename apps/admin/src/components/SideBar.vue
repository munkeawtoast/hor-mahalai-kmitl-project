<script>
import { defineComponent } from 'vue'
import { IconLogo } from '@shared/components'
import {
  IconUsers,
  IconBuildingEstate,
  IconMessageReport,
} from '@tabler/icons-vue'

export default defineComponent({
  components: {
    IconLogo,
    IconBuildingEstate,
    IconUsers,
    IconMessageReport,
  },
})
</script>

<template>
  <aside class="p-2 w-[19.5rem] border-lesser-white border-r">
    <IconLogo />
  </aside>
</template>
