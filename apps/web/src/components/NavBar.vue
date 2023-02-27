<script>
import { RouterLink } from 'vue-router';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    RouterLink
  }
}
</script>
<template>
  <header>
    <div>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="100"
        height="100"
      />
    </div>
    <div>
      <SearchBar />
      <nav>
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/">
          
        </RouterLink>
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/">
          Home
        </RouterLink>
      </nav>
    </div>
  </header>
</template>