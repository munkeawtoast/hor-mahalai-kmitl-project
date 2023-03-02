<script>
import ProfileCard from '../components/ProfileCard.vue'
export default {
  components: { ProfileCard },
  el: '#profile',

  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userObject')),
    }
  },
  methods: {},
  computed: {},
}
</script>
<template>
  <div id="profile">
    <ProfileCard :userData="userData" />
  </div>
</template>
<style scoped></style>
