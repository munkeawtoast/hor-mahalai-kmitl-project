<script>
import { zPatchUser } from '@shared/validator'
import ZormInput from './ZormInput.vue'
import { useZorm } from 'vue-zorm'
import { IconPhotoPlus } from '@tabler/icons-vue'
import { axios } from '../utils'

const validator = zPatchUser()
export default {
  props: {
    userData: Object,
  },
  data() {
    const zo = useZorm('useredit', validator, {
      onValidSubmit: async e => {
        e.preventDefault()
        e.data.uploadImage = this.uploadImage
        console.log(e.data)
        this.buttoncount = 0
        await axios.patchForm('/users/', e.data)
        // .then(this.$router.go(this.$router.currentRoute))
        // .catch(err => console.log(err))
      },
      // onFormData: async e => {
      //   console.log(e)
      //   console.log(this.uploadImages[0])
      // },
      // customIssues: serverSideIssues
    })
    return {
      zo,
      userName: this.userData.username,
      firstName: this.userData.firstname,
      lastName: this.userData.lastname,
      email: this.userData.email,
      role: this.userData.role,
      userImage: this.userData.image,
      buttoncount: 0,
      uploadImage: null,
      newPassword: '',
      confirmPassword: '',
    }
  },
  computed: {
    uploadedImageLink() {
      return URL.createObjectURL(this.uploadImage)
    },
  },
  methods: {
    editFunction() {
      console.log('hello')
      this.buttoncount = 1
    },
    handleFileAdd(event) {
      this.uploadImage = event.target.files[0]
    },
  },
  components: { ZormInput, IconPhotoPlus },
}
</script>
<template>
  <div
    v-if="buttoncount == 0"
    id="profilecard"
    class="flex flex-row h-full w-full border-black border justify-around items-start text-2xl p-6 mt-12"
  >
    <div class="flex flex-col justify-center items-center gap-2">
      <img :src="userImage" class="w-64 h-64 bg-pink-300 rounded-full" />
      <p>{{ userName }}</p>
    </div>
    <div class="flex flex-row items-center justify-center content-center gap-4">
      <p>Name: {{ firstName }} {{ lastName }}</p>
      <p>Email: {{ email }}</p>
      <p>Role: {{ role }}</p>
    </div>
    <input
      class="cursor-pointer rounded-md border border-lesser-gray p-2"
      type="submit"
      @click="editFunction"
      value="Edit"
    />
  </div>
  <!-- {{ JSON.stringify(zo.validation) }} -->
  <div
    v-else
    id="profilecard"
    class="flex flex-row h-full w-full border-black border justify-around items-start text-2xl p-6 mt-12"
  >
    <form :ref="zo.getRef">
      <div
        class="flex flex-col items-stretch gap-2 rounded-xl border-black px-48 py-8 text-lg"
      >
        <ZormInput
          label="Username"
          v-model="userName"
          placeholder="e.g. JohnDoe123, jd@gmail.com"
          :id="zo.fields.username('id')"
          :field="zo.fields.username('name')"
          :error="zo.errors.username"
          required
        />
        <div class="flex gap-2">
          <ZormInput
            label="New password"
            v-model="newPassword"
            placeholder="e.g. JohnDoe123, jd@gmail.com"
            :id="zo.fields.password('id')"
            :field="zo.fields.password('name')"
            :error="zo.errors.password"
            required
          />
          <ZormInput
            label="Confirm password"
            v-model="confirmPassword"
            placeholder="e.g. JohnDoe123, jd@gmail.com"
            :id="zo.fields.confirm('id')"
            :field="zo.fields.confirm('name')"
            :error="zo.errors.confirm"
            required
          />
        </div>
        <div class="flex gap-2">
          <ZormInput
            label="Firstname"
            v-model="firstName"
            placeholder="e.g. JohnDoe123, jd@gmail.com"
            :id="zo.fields.firstname('id')"
            :field="zo.fields.firstname('name')"
            :error="zo.errors.firstname"
            required
          />
          <ZormInput
            label="Lastname"
            v-model="lastName"
            placeholder="e.g. JohnDoe123, jd@gmail.com"
            :id="zo.fields.lastname('id')"
            :field="zo.fields.lastname('name')"
            :error="zo.errors.lastname"
            required
          />
        </div>
        <ZormInput
          label="Email"
          v-model="email"
          placeholder="e.g. JohnDoe123, jd@gmail.com"
          :id="zo.fields.email('id')"
          :field="zo.fields.email('name')"
          :error="zo.errors.email"
          required
        />
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center aspect-square h-[256px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <template v-if="!uploadImage">
              <IconPhotoPlus class="text-gray-500 mb-4 space-y-2" size="80" />
              <p class="text-sm text-center text-gray-500">
                <span class="font-semibold">คลิกเพื่อเลือกไฟล์</span>
                <span class="block"> รับไฟล์นามสกุล PNG, JPG </span>
                <!-- <span class="block font-semibold"> ภาพควรมีอัตราส่วน 16/9 </span> -->
              </p>
              <input
                id="dropzone-file"
                @change="handleFileAdd"
                type="file"
                class="hidden"
                accept="image/jpeg, image/png, image/webp"
              />
            </template>
            <template v-if="uploadImage">
              <img :src="uploadedImageLink" />
            </template>
          </label>
        </div>
      </div>
      <input
        class="cursor-pointer rounded-md border border-lesser-gray p-2"
        type="submit"
        value="submit"
      />
    </form>
  </div>
</template>
