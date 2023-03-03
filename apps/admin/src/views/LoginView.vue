<script>
import IconLogo from '../components/icons/IconLogo.vue'
import userData from '@helper/data-gen/users.json'
export default {
  components: {
    IconLogo,
  },
  data() {
    return {
      userData,
      ID: '',
      password: '',
      errorText: '',
    }
  },
  methods: {
    checkUser() {
      userData.forEach((element) => {
        if (element.userName === this.ID || element.email === this.ID) {
          if (element.password == this.password) {
            let loginData = {
              id: element.id,
              userName: element.userName,
              firstName: element.firstName,
              lastName: element.lastName,
              email: element.email,
              dob: element.dob,
              role: element.role,
              userImage: element.userImage,
            }
            localStorage.setItem('userObject', JSON.stringify(loginData))
            this.$router.push('/')
          } else {
            this.errorText = 'wrong username or password'
          }
        } else {
          this.errorText = 'wrong username or password'
        }
      })
    },
  },
}
</script>
<template>
  <div class="container">
    <div class="row"><IconLogo /> ADMIN</div>
    <div class="row" v-for="a in userData">
      <div class="user-detail" v-if="a.role == 'moderator'">
        {{ a.email }}
        {{ a.password }}
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <label>Username or Email</label><br />
      <input v-model="ID" type="text" /><br />
      <label>Password</label><br />
      <input v-model="password" type="password" /><br />
      <button @click="checkUser">Login</button>
      <p class="errorText">
        {{ errorText }}
      </p>
    </form>
  </div>
</template>
<style scoped>
.row {
  display: flex;
  align-items: baseline;
}
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
  cursor: pointer;
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
.errorText {
  font-weight: normal;
  font-size: 1rem;
  color: red;
}
a:visited {
  color: blue;
}
a:hover {
  color: red;
}
</style>
