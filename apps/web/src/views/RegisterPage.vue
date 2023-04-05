<script>
import IconLogo from '../components/icons/IconLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../components/TextInput.vue'
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
    FontAwesomeIcon,
    TextInput,
  },
  methods: {
    submitLocal() {
      console.log(this.userName)
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
  <div id="regis" class="flex h-screen flex-col items-center justify-center">
    <p
      class="absolute top-4 left-4 cursor-pointer hover:text-danger"
      @click="backFunction"
    >
      &#60; Go back
    </p>
    <IconLogo></IconLogo>
    <form class="flex flex-col gap-4 p-8 text-lg" @submit.prevent="onSubmit">
      <p class="text-center">Register</p>
      <TextInput
        faIcon="fa-solid fa-user"
        inputPlaceholder="Username"
        inputType="text"
        v-model="userName"
      ></TextInput>
      <TextInput
        faIcon="fa-solid fa-lock"
        inputPlaceholder="Password"
        inputType="password"
        v-model="password"
      ></TextInput>
      <TextInput
        faIcon="fa-solid fa-lock"
        inputPlaceholder="Confirm password"
        inputType="password"
        v-model="confirmPassword"
      >
      </TextInput>
      <div class="flex flex-row gap-8">
        <TextInput
          faIcon="fa-solid fa-address-card "
          inputPlaceholder="First Name"
          inputType="text"
          v-model="firstName"
        >
        </TextInput>
        <TextInput
          faIcon="fa-solid fa-address-card"
          inputPlaceholder="Last Name"
          inputType="text"
          v-model="lastName"
        >
        </TextInput>
      </div>
      <div class="flex flex-row gap-8">
        <TextInput
          faIcon="fa-solid fa-calendar-days"
          inputPlaceholder="Date of birth"
          inputType="date"
          v-model="dob"
        >
        </TextInput>
        <TextInput
          faIcon="fa-solid fa-envelope"
          inputPlaceholder="Email"
          inputType="email"
          v-model="email"
        >
        </TextInput>
      </div>
      <span class="danger">{{ confirmPasswordText }}</span>
      <button class="w-48 rounded-md bg-lesser-gray p-2" @click="submitLocal">
        Register
      </button>
    </form>
  </div>
</template>
<style scoped></style>
