<script>
import IconLogo from '../components/icons/IconLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useZorm } from 'vue-zorm'
import { zRegister } from '@shared/validator'
import ZormInput from '../components/ZormInput.vue'
import { axios } from '../utils'

const validator = zRegister()

const zo = useZorm('userlogin', validator, {
  onValidSubmit: async (e) => {
    e.preventDefault()
    console.log(e.data)
    await axios.post('/users/register', e.data)
  },
  onFormData: async (e) => {
    console.log(e)
  },
  // customIssues: serverSideIssues
})
export default {
  data() {
    return {
      zo,
      username: '',
      password: '',
      confirm: '',
      firstname: '',
      lastname: '',
      email: '',
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
  <div id="regis" class="flex h-screen flex-col items-center justify-center">
    <p
      class="absolute left-4 top-4 cursor-pointer hover:text-danger"
      @click="backFunction"
    >
      &#60; Go back
    </p>
    <form
      :ref="zo.getRef"
      class="flex flex-col items-start gap-2 rounded-xl border-black bg-white px-48 py-8 text-lg"
    >
      <IconLogo></IconLogo>
      <ZormInput
        label="Username"
        v-model="username"
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
        :id="zo.fields.password('id')"
        :field="zo.fields.password('name')"
        :error="zo.errors.password"
        required
      />
      <ZormInput
        label="First Name"
        v-model="firstname"
        placeholder="หอพักไม่มีชื่อ"
        :id="zo.fields.firstname('id')"
        :field="zo.fields.firstname('name')"
        :error="zo.errors.firstname"
        required
      />
      <ZormInput
        label="Last Name"
        v-model="lastname"
        placeholder="หอพักไม่มีชื่อ"
        :id="zo.fields.lastname('id')"
        :field="zo.fields.lastname('name')"
        :error="zo.errors.lastname"
        required
      />
      <ZormInput
        label="Email"
        v-model="email"
        placeholder="หอพักไม่มีชื่อ"
        :id="zo.fields.email('id')"
        :field="zo.fields.email('name')"
        :error="zo.errors.email"
        required
      />
      <input />
      <input
        class="w-48 cursor-pointer rounded-md border border-lesser-gray p-2"
        type="submit"
        value="login"
      />
    </form>
    <pre>Validation status: {{ JSON.stringify(zo.validation, null, 2) }}</pre>
  </div>
</template>
