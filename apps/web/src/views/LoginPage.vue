<script>
import IconLogo from '../components/icons/IconLogo.vue'
import userData from '@helper/data-gen/users.json'
import { useZorm } from 'vue-zorm'
import { zLogin } from '@shared/validator'
import ZormInput from '../components/ZormInput.vue'
import { axios } from '../utils'

const validator = zLogin()

const zo = useZorm('userlogin', validator, {
  onValidSubmit: async (e) => {
    e.preventDefault()
    console.log(e.data)
    const res = await axios.post('/users/login/', e.data)
    console.log(res.data)
  },
  onFormData: async (e) => {
    console.log(e)
  },
  // customIssues: serverSideIssues
})
export default {
  components: {
    IconLogo,
    ZormInput,
  },
  data() {
    return {
      zo,
      userData,
      id: '',
      password: '',
    }
  },
  methods: {
    // checkUser() {
    //   userData.forEach((element) => {
    //     if (element.userName === this.ID || element.email === this.ID) {
    //       if (element.password == this.password) {
    //         let loginData = {
    //           id: element.id,
    //           userName: element.userName,
    //           firstName: element.firstName,
    //           lastName: element.lastName,
    //           email: element.email,
    //           dob: element.dob,
    //           role: element.role,
    //           userImage: element.userImage,
    //         }
    //         localStorage.setItem('userObject', JSON.stringify(loginData))
    //         this.$router.push({ path: '/' })
    //       } else {
    //         this.errorText = 'wrong username or password!!'
    //       }
    //     } else {
    //       this.errorText = 'wrong username or password!!'
    //     }
    //   })
    // },
    backFunction() {
      this.$router.back()
    },
  },
}
</script>
<template>
  <div
    class="flex h-screen flex-col items-center justify-center bg-[url('https://www.prachachat.net/wp-content/uploads/2019/03/1552051982537-728x485.jpg')] bg-cover bg-no-repeat"
  >
    <div
      class="flex h-full w-full flex-col items-center justify-center backdrop-blur-lg"
    >
      <p
        class="absolute left-4 top-4 cursor-pointer hover:text-danger"
        @click="backFunction"
      >
        &#60; Go back
      </p>
      <form
        class="flex flex-col items-center gap-2 rounded-xl border-black bg-white p-48"
        :ref="zo.getRef"
      >
        <IconLogo></IconLogo>
        <ZormInput
          label="Username or email"
          v-model="id"
          placeholder="Type your username here"
          :id="zo.fields.username('id')"
          :field="zo.fields.username('name')"
          :error="zo.errors.username"
          required
        />
        <ZormInput
          label="Password"
          v-model="password"
          placeholder="Type your password here"
          :id="zo.fields.password('id')"
          :field="zo.fields.password('name')"
          :error="zo.errors.password"
          required
        />
        <input
          class="w-48 cursor-pointer rounded-md border border-lesser-gray p-2"
          type="submit"
          value="login"
        />
        <p>
          Don't have an account yet?
          <RouterLink class="hover:text-primary" to="/register"
            >register here!</RouterLink
          >
        </p>

        <!-- <pre>Validation status: {{ JSON.stringify(zo.validation, null, 2) }}</pre> -->
      </form>
    </div>
  </div>
</template>
<style scoped></style>
