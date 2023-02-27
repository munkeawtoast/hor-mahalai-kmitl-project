<script>
import { RouterLink } from 'vue-router'
import SearchBar from './SearchBar.vue'

export default {
  components: {
    RouterLink,
    SearchBar,
  },
}
</script>
<template>
  <header class="navbar">
    <div>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      <RouterLink to="/"> </RouterLink>
    </div>
    <div>
      <SearchBar />
      <nav>
        <RouterLink to="/about"> </RouterLink>
        <!-- <RouterLink to="/dorms"> </RouterLink> -->
        <!-- <RouterLink to="/manage-dorms"> จัดการ </RouterLink> -->
      </nav>
    </div>
  </header>
</template>
<style>
header > div {
  
}
header.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid red;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-size: 1.5rem;
  align-items: center;
  padding: 0 40px;
}
img.logo {
  width: 1em;
  height: 1em;
}
</style>
