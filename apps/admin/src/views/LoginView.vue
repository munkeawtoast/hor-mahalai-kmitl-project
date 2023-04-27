<script>
import IconLogo from '../components/icons/IconLogo.vue'
import { IconAlertTriangleFilled } from '@tabler/icons-vue'
import userData from '@helper/data-gen/users.json'
export default {
  components: {
    IconLogo,
    IconAlertTriangleFilled,
  },
  data() {
    return {
      userData,
      user: '',
      password: '',
      rememberMe: false,
      errorText: 'aa',
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
    sendLoginRequest(e) {
      e.preventDefault()
      // this.checkUser()
    },
    
  },
}
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <IconLogo />
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            ล็อกอิน
          </h1>
          <div
            class="w-full bg-soft-danger flex items-center p-1 px-2 rounded-md"
            v-if="errorText !== ''"
          >
            <IconAlertTriangleFilled size="16" class="text-danger" />
            <span class="pl-2">
              {{ errorText }}
            </span>
          </div>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit="sendLoginRequest"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >ไอดี / อีเมลล์</label
              >
              <input
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                v-model="user"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >รหัสผ่าน</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                v-model="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                    v-model="rememberMe"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >จดจำผู้ใช้</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >ลืมรหัสผ่าน?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary hover: focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
