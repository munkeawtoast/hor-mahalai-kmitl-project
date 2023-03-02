<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    size: String,
    teztSize: String,
  },
}
</script>
<template>
  <div class="logo">
    <FontAwesomeIcon :icon="['fa-solid', 'fa-city']" :size="size" />
    <div class="logo--text">หอมหาลัย</div>
  </div>
</template>
<style scoped>
.logo {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  font-size: 1.5rem;
  text-decoration: none;
}

.logo--text {
  padding-left: 2px;
  font-weight: 800;
  font-size: 35px;
  transform: translateY(2px);
  font-weight: 800;
  display: inline;
}
</style>
