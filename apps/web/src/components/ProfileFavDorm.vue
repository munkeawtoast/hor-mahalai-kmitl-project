<script>
import ProfileCard from '../components/ProfileCard.vue'
import DormBrief from '../components/DormBrief.vue'
import { generateDorms } from '@helper/data-gen'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '../stores'
export default {
  components: { ProfileCard, DormBrief, FontAwesomeIcon },
  el: '#profile',

  data() {
    // const userData = JSON.parse(localStorage.getItem('userObject'))
    const userStore = useUserStore()
    return {
      // userData,
      userStore,
      favDorms: generateDorms(3, 5),
    }
  },
  methods: {},
  computed: {},
}
</script>
<template>
  <div id="profile" class="flex flex-col items-center">
    <ProfileCard :userData="userStore" />
    <!-- <DormBrief v-for="dorm in favDorms" :dormData="dorm"></DormBrief> -->
  </div>
  <FontAwesomeIcon :icon="['fa-regular', 'fa-star']"></FontAwesomeIcon>
  <span>Favourite dorms</span>
</template>
<style scoped></style>
