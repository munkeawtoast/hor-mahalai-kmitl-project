<script>
import IconLogo from '../components/icons/IconLogo.vue'
export default {
  el: '#regis',
  data() {
    return {
      userName: '',
      password: '',
      confirmPassword: '',
      confirmPasswordText: '',
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      iamges: 'https://loremflickr.com/640/480/people?lock=65791',
      role: 'user',
    }
  },
  components: {
    IconLogo,
  },
  methods: {
    submitLocal() {
      if (
        [
          this.userName,
          this.password,
          this.confirmPassword,
          this.firstName,
          this.lastName,
          this.dob,
          this.email,
          this.role,
        ].every((el) => el !== '')
      ) {
        let userInfo = {
          id: 5,
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          email: this.email,
          userImages: this.images,
          role: this.role,
        }
        let userObject = JSON.stringify(userInfo)
        localStorage.setItem('userObject', userObject)

        this.$router.push({ path: '/' })
      } else {
        alert('โปรดกรอกข้อมูลให้ครบ')
      }
    },
    backFunction() {
      this.$router.push({ path: '/' })
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
    password(newPassword, oldPassword) {
      if (newPassword != this.confirmPassword) {
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
