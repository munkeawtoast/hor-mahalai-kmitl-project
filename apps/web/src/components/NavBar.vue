<script>
import IconLogo from './icons/IconLogo.vue'
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
    class="shadow-xs relative flex w-screen flex-row items-center justify-between bg-white py-2 px-12 text-primary"
  >
    <RouterLink to="/" class="">
      <IconLogo size="xl"></IconLogo>
    </RouterLink>
    <UserIcon />
  </header>
</template>
