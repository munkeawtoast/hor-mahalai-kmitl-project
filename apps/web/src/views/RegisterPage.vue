<script>
import IconLogo from '../components/icons/IconLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  data() {
  },
  components: {
    IconLogo,
    FontAwesomeIcon,
  },
  methods: {
    backFunction() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>
<template>
  <div id="regis" class="flex h-screen flex-col items-center justify-center">
    <p
      class="absolute left-4 top-4 cursor-pointer hover:text-danger"
      @click="backFunction"
    >
      &#60; Go back
    </p>
    <IconLogo></IconLogo>
    <form class="flex flex-col gap-4 p-8 text-lg" @submit.prevent="onSubmit">
      <p class="text-center">Register</p>
    </form>
  </div>
</template>
