<script>
import { useUserStore } from '../stores'
import { zPatchUser } from '@shared/validator'
import ZormInput from './ZormInput.vue'
import { useZorm } from 'vue-zorm'
import { IconPhotoPlus } from '@tabler/icons-vue'

const validator = zPatchUser()
export default {
  props: {
    // userName: String,
    // firstName: String,
    // lastName: String,
    userData: Object,
  },
  data() {
    const zo = useZorm('useredit', validator, {
      onValidSubmit(e) {
        // this.buttoncount = 0
        e.preventDefault()
        console.log(e.data)
        // await axios.post('/users/register/', e.data)
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
      userImage: this.userData.userImage,
      buttoncount: 0,
      uploadImages: [],
      newPassword: '',
    }
  },
  methods: {
    editFunction() {
      console.log('hello')
      this.buttoncount = 1
    },
    handleFileAdd(event) {
      const theFile = event.target.files[0]
      console.log(theFile)
      this.uploadImages.push(theFile)
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
    <!-- <button
      @click="editFunction"
      class="cursor-pointer rounded-md border border-lesser-gray p-2"
    >
      Edit
    </button> -->
    <input
      class="cursor-pointer rounded-md border border-lesser-gray p-2"
      type="submit"
      @click="editFunction"
      value="Edit"
    />
  </div>
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
        <ZormInput
          label="New password"
          v-model="newPassword"
          placeholder="e.g. JohnDoe123, jd@gmail.com"
          :id="zo.fields.password('id')"
          :field="zo.fields.password('name')"
          :error="zo.errors.password"
          required
        />
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
            class="flex flex-col items-center justify-center w-full h-[256px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
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
          </label>
        </div>
        <input
          class="cursor-pointer rounded-md border border-lesser-gray p-2"
          type="submit"
          value="submit"
        />
      </div>
    </form>
  </div>
</template>
<style scoped>
/* .profilecard--container {
  width: 772px;
  height: 100%;
  background-color: antiquewhite;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

  padding: 1em;
  margin: 1em;

  font-size: 1.5em;
}
.profilecard--info {
  display: flex;
  align-items: center;
  align-content: space-between;
}
.profilecard--imagesContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 1em;
}
.profilecard--images {
  width: 128px;
  height: 128px;
  background-color: aqua;
  border-radius: 64px;
} */
</style>
