<script>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchBar from './SearchBar.vue'
import UserIcon from './UserIcon.vue'
import IconLogo from '../components/icons/IconLogo.vue'

export default {
  components: {
    RouterLink,
    SearchBar,
    FontAwesomeIcon,
    UserIcon,
    IconLogo,
  },
}
</script>
<template>
  <header class="navbar">
    <RouterLink to="/" class="logo">
      <IconLogo size="xl"></IconLogo>
    </RouterLink>
    <div class="right">
      <SearchBar />
      <UserIcon />
      <nav>
        <RouterLink to="/about"> </RouterLink>
        <!-- <RouterLink to="/dorms"> </RouterLink> -->
        <!-- <RouterLink to="/manage-dorms"> จัดการ </RouterLink> -->
      </nav>
    </div>
  </header>
</template>
<style>
header.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid red;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  align-items: center;
  padding: 0 40px;
}
.logo {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.logo--text {
  padding-left: 2px;
  font-weight: 800;
  font-size: 35px;
  transform: translateY(2px);
  font-weight: 800;
  display: inline;
}

.right {
  display: flex;
}
</style>
