<script>
import ProfileCard from '../components/ProfileCard.vue'
import DormBrief from '../components/DormBrief.vue'
import { generateDorms } from '@helper/data-gen'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '../stores'
import { axios } from '../utils'
import { IconSquarePlus } from '@tabler/icons-vue'
import { RouterLink } from 'vue-router'
import ProfileDorm from '../components/ProfileDorm.vue'
export default {
  components: {
    ProfileCard,
    DormBrief,
    FontAwesomeIcon,
    IconSquarePlus,
    RouterLink,
    ProfileDorm,
  },
  el: '#profile',

  data() {
    // const userData = JSON.parse(localStorage.getItem('userObject'))
    const userStore = useUserStore()
    return {
      // userData,
      userStore,
      favDorms: generateDorms(3, 5),
      ownDorms: null,
    }
  },
  async beforeMount() {
    await axios
      .get(`/dorms/`, { params: { ownerid: this.userStore.id } })
      .then(res => {
        this.ownDorms = res.data
      })
      .catch(err => {
        console.log(err.response.data)
      })
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
  <div v-if="userStore.role == 'USER'">
    <FontAwesomeIcon :icon="['fa-regular', 'fa-star']"></FontAwesomeIcon>
    <span>Favourite dorms"</span>
  </div>
  <div v-else>
    <FontAwesomeIcon :icon="['fa-solid', 'fa-city']"></FontAwesomeIcon>
    <span>Your dorms:</span>
  </div>
  <div v-for="(room, index) in ownDorms" :key="index">
    <ProfileDorm
      v-if="userStore.role == 'DORM_OWNER'"
      :roomData="room"
    ></ProfileDorm>
  </div>
  <div>
    <RouterLink
      v-if="userStore.role == 'DORM_OWNER'"
      :to="{ name: 'dorm-create' }"
      class="w-full h-72 border-black border flex items-center justify-center text-3xl"
    >
      <IconSquarePlus :size="72" />
      <p>เพิ่มหอใหม่</p>
    </RouterLink>
  </div>
</template>
<style scoped></style>
