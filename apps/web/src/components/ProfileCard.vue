<script>
export default {
  props: {
    // userName: String,
    // firstName: String,
    // lastName: String,
    userData: Object,
  },
  data() {
    return {
      userName: this.userData.userName,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      dob: this.userData.dob,
      role: this.userData.role,
      userImage: this.userData.userImage,
    }
  },
}
</script>
<template>
  <div id="profilecard" class="profilecard--container">
    <div>
      <div class="profilecard--info">
        <p>{{ firstName }}</p>
        <p>{{ lastName }}</p>
      </div>
      <div>
        <p>{{ email }}</p>
      </div>
      <div>
        <p>{{ dob }}</p>
      </div>
      <div>
        <p>{{ role }}</p>
      </div>
    </div>
    <div class="profilecard--imagesContainer">
      <img :src="userImage" alt="prifileImage" class="profilecard--images" />
      <p>{{ userName }}</p>
    </div>
  </div>
</template>
<style scoped>
.profilecard--container {
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
}
</style>
