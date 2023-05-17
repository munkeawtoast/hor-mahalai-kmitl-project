<script>
import { useUserStore } from '../stores'

export default {
  props: {
    // userName: String,
    // firstName: String,
    // lastName: String,
    userData: Object,
  },
  data() {
    return {
      userName: this.userData.username,
      firstName: this.userData.firstname,
      lastName: this.userData.lastname,
      email: this.userData.email,
      dob: this.userData.dob,
      role: this.userData.role,
      userImage: this.userData.userImage,
    }
  },
}
</script>
<template>
  <div
    id="profilecard"
    class="flex flex-row h-full w-[60rem] border-black border content-center items-center justify-around text-2xl p-6 mt-12"
  >
    <div class="flex flex-col items-start gap-4">
      <p>Name: {{ firstName }} {{ lastName }}</p>
      <p>Email: {{ email }}</p>
      <p>Role: {{ role }}</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-2">
      <img :src="userImage" class="w-32 h-32 bg-pink-300 rounded-full" />
      <p>{{ userName }}</p>
    </div>
  </div>
</template>
<style scoped>
/* .profilecard--container {
  width: 772px;
  height: 100%;
  background-color: antiquewhite;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

  padding: 1em;
  margin: 1em;

  font-size: 1.5em;
}
.profilecard--info {
  display: flex;
  align-items: center;
  align-content: space-between;
}
.profilecard--imagesContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 1em;
}
.profilecard--images {
  width: 128px;
  height: 128px;
  background-color: aqua;
  border-radius: 64px;
} */
</style>
