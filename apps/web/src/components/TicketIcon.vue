<script setup>
import { RouterLink } from 'vue-router'
import { IconAlertTriangle } from '@tabler/icons-vue'
import { useUserStore } from '../stores'

const user = useUserStore()
</script>
<template>
  <div v-if="user.token || $route.meta.hideIssues">
    <RouterLink to="/issues" class="">
      <IconAlertTriangle :size="56" />
    </RouterLink>
  </div>
</template>
