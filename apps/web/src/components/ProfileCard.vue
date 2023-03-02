<script>
import { stringify } from 'json5'

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
      role: this.userData.role,
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
        <p>DOB</p>
      </div>
      <div>
        <p>{{ role }}</p>
      </div>
    </div>
    <div class="profilecard--images">
      <div
        style="
          width: 128px;
          height: 128px;
          background-color: aqua;
          border-radius: 60px;
        "
      ></div>
      <p>{{ userName }}</p>
    </div>
  </div>
</template>
<style scoped>
.profilecard--container {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;

  display: flex;
  justify-content: center;
  align-items: center;
  /* align-content: space-evenly; */
  flex-direction: row;

  padding: 1em;
  margin: 1em;
}
.profilecard--info {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}
.profilecard--images {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 1em;
}
</style>
