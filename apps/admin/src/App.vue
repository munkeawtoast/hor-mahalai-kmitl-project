/<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

export default {
  components: {
    RouterView,
    NavBar,
    SideBar,
  },
}
</script>

<template>
  <NavBar />
  <div class="container">
    <SideBar />
    <div class="inner">
      <RouterView />
    </div>
  </div>
</template>
