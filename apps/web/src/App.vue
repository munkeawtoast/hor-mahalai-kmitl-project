<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { defineComponent } from 'vue'
import TicketIcon from './components/TicketIcon.vue'

export default defineComponent({
  components: {
    RouterView,
    NavBar,
    TicketIcon,
  },
})
</script>

<template>
  <NavBar v-if="!$route.meta.hideNavBar" />
  <div
    class="mx-auto"
    :class="[!$route.meta.hideNavBar ? 'container p-3 md:p-5' : '']"
  >
    <RouterView />
  </div>
  <TicketIcon class="fixed right-1 bottom-1"></TicketIcon>
</template>
