<script>
import { IconLogo } from '@shared/components'
import UserIcon from './UserIcon.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
    UserIcon,
    IconLogo,
  },
}
</script>
<template>
  <header
    class="shadow-xs flex flex-row items-center justify-between bg-white py-2 px-4 md:px-12 text-primary"
  >
    <RouterLink to="/" class="">
      <IconLogo size="xl" />
    </RouterLink>
    <UserIcon />
  </header>
</template>
