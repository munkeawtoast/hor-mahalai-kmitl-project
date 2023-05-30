<script>
import { IconAlertTriangle } from '@tabler/icons-vue'
import { useUserStore } from '../stores'

export default {
  data() {
    const user = useUserStore()
    return {
      user,
    }
  },
  components: {
    IconAlertTriangle,
  },
}
</script>
<template>
  <div v-if="user.token || $route.meta.hideIssues">
    <RouterLink to="/issues" class="">
      <IconAlertTriangle :size="56" />
    </RouterLink>
  </div>
</template>
