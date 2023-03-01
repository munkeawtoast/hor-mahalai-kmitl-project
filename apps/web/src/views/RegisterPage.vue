<script>
import IconLogo from '../components/icons/IconLogo.vue'
export default {
  el: '#regis',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      confirmPasswordText: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    }
  },
  components: {
    IconLogo,
  },
  methods: {
    submitLocal() {
      let userInfo = {
        username: this.username,
        password: this.password,
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        role: this.role,
      }
      let userObject = JSON.stringify(userInfo)
      localStorage.setItem('userObject', userObject)
    },
  },
  watch: {
    confirmPassword(newConfirmPassword, oldConfirmPassword) {
      if (newConfirmPassword != this.password) {
        this.confirmPasswordText = 'Password ไม่ตรงกัน'
      } else {
        this.confirmPasswordText = ''
      }
    },
  },
}
</script>
<template>
  <div id="regis">
    <div class="container">
      <IconLogo></IconLogo>
      <form @submit.prevent="onSubmit">
        <label>Username: </label>
        <input v-model="username" type="text" /><br />
        <label>Password: </label>
        <input v-model="password" type="password" />
        <label>Confirm password: </label>
        <input v-model="confirmPassword" type="password" /><br />
        <p class="danger">{{ confirmPasswordText }}</p>
        <label>First name: </label>
        <input v-model="firstName" type="text" />
        <label>Last name: </label>
        <input v-model="lastName" type="text" /><br />
        <label>Email: </label>
        <input v-model="email" type="text" /><br />
        <label>Role</label><br />
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
<style scoped>
form {
  text-align: center;
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

.danger {
  color: red;
}
</style>
