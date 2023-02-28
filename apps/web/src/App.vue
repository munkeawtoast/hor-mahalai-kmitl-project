<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    RouterView,
    NavBar,
  },
}
</script>

<template>
  <NavBar v-if="!$route.meta.hideNavBar" />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  width: 1024px;
  margin: 0 auto;
}
@media (width <= 1366) {
  .container {
    width: 100%;
  }
}
</style>
