<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>
<template>
  <div class="logo">
    <FontAwesomeIcon :icon="['fa-solid', 'fa-city']" />
    <div class="logo--text">หอมหาลัย</div>
  </div>
</template>
<style scoped>
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
</style>
