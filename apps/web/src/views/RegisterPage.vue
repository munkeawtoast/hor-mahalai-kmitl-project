<script>
import { IconLogo } from '@shared/components'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useZorm } from 'vue-zorm'
import { zRegister } from '@shared/validator'
import ZormInput from '../components/ZormInput.vue'
import { axios } from '../utils'

const validator = zRegister()

export default {
  data() {
    const zo = useZorm('userlogin', validator, {
      onValidSubmit: async e => {
        e.preventDefault()
        await axios
          .post('/users/register/', e.data)
          .then(this.$router.push({ path: '/' }))
          .catch(err => alert(err.response.data))
      },
      onFormData: async e => {
        console.log(e)
      },
      // customIssues: serverSideIssues
    })
    return {
      zo,
      userName: '',
      passWord: '',
      confirm: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    }
  },
  components: {
    IconLogo,
    ZormInput,
  },
  methods: {
    backFunction() {
      this.$router.push({ path: '/' })
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
      <div
        id="regis"
        class="flex h-screen flex-col items-center justify-center"
      >
        <p
          class="absolute left-4 top-4 cursor-pointer hover:text-danger"
          @click="backFunction"
        >
          &#60; Go back
        </p>
        <form :ref="zo.getRef">
          <div
            class="flex flex-col items-stretch gap-2 rounded-xl border-black bg-white px-48 py-8 text-lg"
          >
            <IconLogo></IconLogo>
            <ZormInput
              label="Username"
              v-model="userName"
              placeholder="e.g. JohnDoe123, jd@gmail.com"
              :id="zo.fields.username('id')"
              :field="zo.fields.username('name')"
              :error="zo.errors.username"
              required
            />
            <ZormInput
              label="Password"
              v-model="password"
              placeholder="หอพักไม่มีชื่อ"
              :id="zo.fields.password('id')"
              :field="zo.fields.password('name')"
              :error="zo.errors.password"
              required
            />
            <ZormInput
              label="Confirm password"
              v-model="confirm"
              placeholder="หอพักไม่มีชื่อ"
              :id="zo.fields.confirm('id')"
              :field="zo.fields.confirm('name')"
              :error="zo.errors.confirm"
              required
            />
            <div class="flex gap-2">
              <ZormInput
                label="First Name"
                v-model="firstName"
                placeholder="หอพักไม่มีชื่อ"
                :id="zo.fields.firstname('id')"
                :field="zo.fields.firstname('name')"
                :error="zo.errors.firstname"
                required
              />
              <ZormInput
                label="Last Name"
                v-model="lastName"
                placeholder="หอพักไม่มีชื่อ"
                :id="zo.fields.lastname('id')"
                :field="zo.fields.lastname('name')"
                :error="zo.errors.lastname"
                required
              />
            </div>
            <ZormInput
              label="Email"
              v-model="email"
              placeholder="หอพักไม่มีชื่อ"
              :id="zo.fields.email('id')"
              :field="zo.fields.email('name')"
              :error="zo.errors.email"
              required
            />
            <div class="flex items-center justify-center gap-2">
              <p>Your role</p>
              <label for="user">User:</label>
              <input
                type="radio"
                id="fname"
                name="role"
                value="USER"
                v-model="role"
              />
              <label for="Dormowner">Dorm owner:</label>
              <input
                type="radio"
                id="lname"
                name="role"
                value="DORM_OWNER"
                v-model="role"
              />
            </div>
            <!-- <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
            /> -->
            <input
              class="cursor-pointer rounded-md border border-lesser-gray p-2"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        <!-- <pre>Validation status: {{ JSON.stringify(zo.validation, null, 2) }}</pre> -->
      </div>
    </div>
  </div>
</template>
