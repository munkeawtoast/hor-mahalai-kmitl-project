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
  <div class="container mx-auto p-4">
    <RouterView />
  </div>
</template>
