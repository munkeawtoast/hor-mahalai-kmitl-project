<script>
import { useZorm } from 'vue-zorm'
import { zPostTicket } from '@shared/validator'
import ZormInput from '../components/ZormInput.vue'
import ZormSelect from '../components/ZormSelect.vue'
import ZormEditor from '../components/ZormEditor.vue'
import axios from 'axios'

const validator = zPostTicket()

export default {
  components: { ZormInput, ZormSelect, ZormEditor },
  data() {
    const zo = useZorm('ticket', validator, {
      onValidSubmit: async e => {
        e.preventDefault()
        // await axios.post('/tickets/', e.data)
        console.log(e)
        // await axios
        //   .post('/users/login/', e.data)
        //   .then(res => {
        //     userStore.token = res.data.token
        //     this.$router.push({ path: '/' })
        //   })
        //   .catch(err => {
        //     console.log(err.response.data)
        //   })
        // console.log(jwtDecode(res.data.token))
        // userStore.token = res.data.token
        // this.$router.push({ path: '/' })
        // },
        // onFormData: async e => {
        //   console.log(e)
      },
      // customIssues: serverSideIssues
    })
    return {
      zo,
      title: '',
      description: '',
      ticketCategory: '',
      ticketOptions: [
        { id: 'REGISTER', label: 'Register Problem' },
        { id: 'LOGIN', label: 'Login Problem' },
        { id: 'WEBBUG', label: 'Web problem' },
        { id: 'OTHER', label: 'Other problem' },

        // {
        //   label: ['Register Problem','Login Problem'],
        // },
      ],
    }
  },
  methods: {},
}
</script>
<template>
  <div class="h-screen">
    <form :ref="zo.getRef">
      <p>Report an issue</p>
      <ZormInput
        label="Title:"
        v-model="title"
        placeholder="Type your username here"
        :id="zo.fields.title('id')"
        :field="zo.fields.title('name')"
        :error="zo.errors.title"
        required
      />
      <label>Description:</label><br />
      <ZormEditor
        v-model="description"
        :id="zo.fields.description('id')"
        :field="zo.fields.description('name')"
        :error="zo.errors.description"
      />
      <!-- <label>Choose a category:</label><br />
      <select
        class="block w-full rounded-lg border border-lesser-gray bg-gray-50 p-2.5 text-sm text-black focus:border-primary focus:ring-primary mb-2 font-medium"
        v-model="ticketcategory"
      >
        <option value="REGISTER">Register Problem</option>
        <option value="LOGIN">Login Problem</option>
        <option value="WEBBUG">Web problem</option>
        <option value="OTHER" selected>Other problem</option>
      </select> -->
      <ZormSelect
        v-model="ticketCategory"
        :id="zo.fields.ticketcategory('id')"
        :field="zo.fields.ticketcategory('name')"
        :error="zo.errors.ticketcategory"
        label="กรุณาเลือกโซนของหอ"
        placeholder="กรุณาเลือกโซนของหอ"
        :options="ticketOptions"
      />
      <input
        class="w-48 cursor-pointer rounded-md border border-lesser-gray p-2"
        type="submit"
        value="Submit"
      />
    </form>
  </div>
</template>
<style scoped></style>
