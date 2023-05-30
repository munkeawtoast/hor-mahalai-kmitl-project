<script>
import ProfileCard from '../components/ProfileCard.vue'
import DormBrief from '../components/DormBrief.vue'
import { generateDorms } from '@helper/data-gen'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '../stores'
export default {
  el: '#profile',
  data() {
    const userStore = useUserStore()
    return {
      // userData,
      userStore,
      favDorms: generateDorms(3, 5),
    }
  },
  components: { ProfileCard, FontAwesomeIcon },
  methods: {},
  computed: {},
}
</script>
<template>
  <div id="profile" class="flex flex-col items-center">
    <ProfileCard :userData="userStore" />
  </div>
  <FontAwesomeIcon :icon="['fa-regular', 'fa-star']"></FontAwesomeIcon>
  <span>Favourite dorms</span>
</template>
<style scoped></style>
