/
<script>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'

export default {
  components: {
    RouterView,
    SideBar,
  },
}
</script>

<template>
  <!-- <NavBar /> -->
  <div id="app-shell" class="min-h-screen flex w-full">
    <SideBar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>
