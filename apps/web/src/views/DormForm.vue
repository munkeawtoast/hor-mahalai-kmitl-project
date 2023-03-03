<template>
  <div>
    <div class="container">
      <p class="backButton" @click="backFunction">&#60; Go back</p>
      <IconLogo></IconLogo>
      <form @submit.prevent="onSubmit">
        <label>Username: </label>
        <input v-model="userName" type="text" />

        <label>Password: </label>
        <input v-model="password" type="password" /><br />
        <label>Confirm password: </label>
        <input v-model="confirmPassword" type="password" />
        <span class="danger">{{ confirmPasswordText }}</span
        ><br />

        <label>First name: </label>
        <input v-model="firstName" type="text" />
        <label>Last name: </label>
        <input v-model="lastName" type="text" /><br />

        <label>Date of birth: </label>
        <input v-model="dob" type="date" /><br />
        <label>Email: </label>
        <input v-model="email" type="text" />
        <label>Images</label><br />
        <label>Role</label>
        <input
          v-model="role"
          type="radio"
          name="userType"
          value="user"
          checked
        />
        <label>User</label>
        <input v-model="role" type="radio" name="userType" value="dormOwner" />
        <label>Dorm owner</label><br />
        <button @click="submitLocal">Register</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
form {
  font-size: 1.5em;
  font-weight: bold;
}
button {
  background-color: unset;
  margin: 0.5em 0 0.5em 0;
  padding: 0.5em 6em;
  border-radius: 10px;
}
/* a{
  all:
} */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transform: translateY(-10vh);
  height: 100vh;
}
.backButton {
  position: absolute;
  font-size: 2em;
  top: 100px;
  left: -650px;
  cursor: pointer;
}
.backButton:hover {
  color: red;
}

.danger {
  color: red;
}
</style>
