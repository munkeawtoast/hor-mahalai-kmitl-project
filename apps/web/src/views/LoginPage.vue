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
            this.errorText = 'wrong username or password!!'
          }
        } else {
          this.errorText = 'wrong username or password!!'
        }
      })
    },
    backFunction() {
      this.$router.back()
    },
  },
}
</script>
<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <p
      class="absolute top-4 left-4 cursor-pointer hover:text-danger"
      @click="backFunction"
    >
      &#60; Go back
    </p>
    <form
      class="flex flex-col items-center gap-4 rounded-xl bg-white p-48"
      @submit.prevent="onSubmit"
    >
      <IconLogo></IconLogo>
      <label>Username or Email</label>
      <input class="indent-1" v-model="ID" type="text" />
      <label>Password</label>
      <input
        class="bg-lesser-gray indent-1"
        v-model="password"
        type="password"
      />
      <button class="w-48 rounded-md bg-lesser-gray p-2" @click="checkUser">
        Login
      </button>
      <p class="text-danger">
        {{ errorText }}
      </p>
      <p>
        Don't have an account yet?
        <RouterLink class="hover:text-danger" to="/register"
          >register here!</RouterLink
        >
      </p>
    </form>
  </div>
</template>
<style scoped></style>
