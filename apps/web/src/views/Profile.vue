<script>
import ProfileCard from '../components/ProfileCard.vue'
import DormBrief from '../components/DormBrief.vue'
import { generateDorms } from '@helper/data-gen'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: { ProfileCard, DormBrief, FontAwesomeIcon },
  el: '#profile',

  data() {
    const userData = JSON.parse(localStorage.getItem('userObject'))
    return {
      userData,
      favDorms: generateDorms(userData.id * 3, userData.id * 3 + 3),
    }
  },
  methods: {},
  computed: {},
}
</script>
<template>
  <div id="profile">
    <ProfileCard :userData="userData" />
    <FontAwesomeIcon :icon="['fa-regular', 'fa-star']"></FontAwesomeIcon>
    <span>Favourite dorms</span>
    <DormBrief v-for="dorm in favDorms" :dormData="dorm"></DormBrief>
  </div>
</template>
<style scoped></style>
