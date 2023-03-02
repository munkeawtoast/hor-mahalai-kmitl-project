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
            this.$router.push({ path: '/' })
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
    <IconLogo></IconLogo>
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
    <p>
      Don't have an account yet?
      <RouterLink to="/register">register!</RouterLink>
    </p>
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
