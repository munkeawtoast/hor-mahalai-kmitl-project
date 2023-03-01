<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>
<template>
  <div class="wrapper">
    <input type="text" placeholder="ค้นหา" />
    <FontAwesomeIcon :icon="['fa-solid', 'fa-search']" size="lg" flip="horizontal" />
    <!-- <font-awesome-icon icon="search" size="lg"  /> -->
  </div>
</template>
<style scoped>
.wrapper {
  background-color: var(--color-background-mute);
  color: var(--color-detail);
  font-size: 13px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
}
input[type='text'] {
  all: unset;
  padding-right: 0.5em;
  width: 12em;
  color: var(--color-text);
}
</style>
