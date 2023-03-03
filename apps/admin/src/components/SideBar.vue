<script>
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink,
  },
}
</script>
<template>
  <div class="sidebar">
    <div class="sidebar--title">MODERATOR PAGE</div>
    <div class="sidebar--title">HOR MAHALAI</div>
    <RouterLink to="/users">
      <div class="sidebar--link">ผู้ใช้</div>
    </RouterLink>
    <RouterLink to="/dorms">
      <div class="sidebar--link">หอพัก</div>
    </RouterLink>
    <RouterLink to="/tickets">
      <div class="sidebar--link">การรายงาน</div>
    </RouterLink>
  </div>
</template>

<style scoped>
.sidebar {
  padding-right: 30px;
  height: 100vh;
  width: 20em;
  position: static;
  background-color: var(--jet);
  left: 0;
  top: 0;

  color: white;
}
a {
  color: white;
}
.sidebar--title {
  padding: 10px;
  font-size: 2em;
}
.sidebar--link {
  padding: 10px;
}
</style>
