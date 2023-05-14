<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    RouterView,
    NavBar,
  },
})
</script>

<template>
  <NavBar v-if="!$route.meta.hideNavBar" />
  <div class="mx-auto" :class="[!$route.meta.hideNavBar ? 'container' : '']">
    <RouterView />
  </div>
</template>
