<script>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  data() {
    const userData = JSON.parse(localStorage.getItem('userObject'))
    return {
      userImage: userData?.userImage,
      userName: userData?.userName,
      role: userData?.role,
      clicked: false,
    }
  },
  methods: {
    handleClick(event) {
      if (event) {
        event.preventDefault()
        // this.clicked = !this.clicked
      }
    },
    loginFunction() {
      this.$router.push('/login')
    },
    registerFunction() {
      this.$router.push('/register')
    },
    logoutFunction() {
      localStorage.removeItem('userObject')
      this.$router.go()
    },
    profileFunction() {
      this.$router.push('/users/me')
    },
    addDormFunction() {
      this.$router.push('/dorms/new')
    },
    logout() {
      localStorage.removeItem('userObject')
      this.$router.go()
    },
  },
  components: {
    FontAwesomeIcon,
    RouterLink,
    MenuButton,
    MenuItems,
    MenuItem,
    Menu,
  },
}
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      as="button"
      class="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft bg-contain bg-center p-2 text-black hover:cursor-pointer"
      @click.left="handleClick"
      :style="{
        backgroundImage: `url(${userImage})`,
      }"
    >
      <font-awesome-icon
        icon="fa-solid fa-user"
        class="translate-y-0.5 text-3xl font-medium text-primary"
        v-if="!userImage && !userName"
      />
      <span
        v-if="!userImage && userName"
        class="text-3xl font-medium text-primary"
      >
        {{ userName[0] }}
      </span>
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        as="div"
        class="absolute right-0 mt-2 w-[275px] origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <!-- Profile -->
        <MenuItem as="template" v-slot="{ active }">
          <RouterLink
            class="flex w-full items-center rounded-xl p-2 transition-colors"
            :to="
              userName
                ? '/users/me'
                : {
                    name: 'login',
                  }
            "
            :class="{
              'bg-less-white': active,
            }"
          >
            <!-- Icon -->
            <div
              :style="{
                backgroundImage: `url(${userImage})`,
              }"
              class="mr-3 flex aspect-square w-16 items-center justify-center rounded-md bg-primary-soft bg-contain bg-center text-4xl font-medium text-primary"
            >
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="translate-y-0.5"
                v-if="!userImage && !userName"
              />
            </div>
            <!-- Text -->
            <div class="flex flex-col justify-end text-left">
              <span
                class="block translate-y-2 text-xs text-gray"
                @click="profileFunction"
              >
                {{ role }}
              </span>
              <span class="block text-2xl font-medium" @click="profileFunction">
                {{ userName ?? '????????????????????????????????????????????????' }}
              </span>
            </div>
          </RouterLink>
        </MenuItem>
        <hr class="my-2 mx-1.5 text-lesser-gray" />
        <!-- Login and Register-->
        <div class="flex flex-col gap-2" v-if="!userName">
          <!-- Register -->
          <MenuItem as="template" v-slot="{ active }">
            <RouterLink
              to="/register"
              class="w-full rounded-2xl bg-primary p-3 text-center text-white shadow-md shadow-primary-soft ring-lesser-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-soft hover:ring-lesser-white"
              :class="[active && 'scale-105 shadow-xl ring-lesser-white']"
            >
              ?????????????????????????????????
            </RouterLink>
          </MenuItem>
          <!-- Login -->
          <MenuItem as="template" v-slot="{ active }">
            <RouterLink
              to="/login"
              class="w-full rounded-2xl bg-white p-3 text-center text-black shadow-md shadow-primary-soft ring-1 ring-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-soft hover:ring-lesser-white"
              :class="[
                active &&
                  'scale-105 shadow-xl shadow-primary-soft ring-lesser-white',
              ]"
            >
              ?????????????????????
            </RouterLink>
          </MenuItem>
        </div>
        <!-- If Logged In -->
        <div class="flex flex-col gap-0.5" v-if="userName">
          <!-- Moderator -->
          <template v-if="role === 'dorm-owner'">
            <MenuItem as="template" v-slot="{ active }">
              <RouterLink
                to="/dorms/new"
                class="flex items-center justify-center rounded-md bg-white p-2 text-black transition-all duration-300 hover:bg-lesser-white"
                :class="[active && 'bg-lesser-white']"
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" class="pr-2" />
                <span>???????????????????????????????????????????????????</span>
              </RouterLink>
            </MenuItem>
          </template>
          <!-- Student -->
          <template v-if="role === 'student'">
            <MenuItem as="template" v-slot="{ active }">
              <RouterLink
                to="/profile/me/"
                class="flex items-center justify-center rounded-md bg-white p-2 text-black transition-all duration-300 hover:bg-lesser-white"
                :class="[active && 'bg-lesser-white']"
              >
                <FontAwesomeIcon icon="fa-solid fa-bookmark" class="pr-2" />
                <span>?????????????????????????????????????????????</span>
              </RouterLink>
            </MenuItem>
            <!-- <MenuItem as="template" v-slot="{ active }">
              <RouterLink
                to="/profile/me/"
                class="flex items-center justify-center rounded-md bg-white p-2 text-black transition-all duration-300 hover:bg-lesser-white"
                :class="[active && 'bg-lesser-white']"
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-map-location-dot"
                  class="pr-2"
                />
                <span>?????????????????????????????????????????????</span>
              </RouterLink>
            </MenuItem> -->
          </template>

          <hr class="my-2 mx-1.5 text-lesser-gray" />
          <!-- Logout -->
          <MenuItem as="template" v-slot="{ active }">
            <button
              @click="logout"
              class="w-full rounded-2xl bg-white p-3 text-center text-black shadow-md shadow-soft-danger ring-1 ring-danger transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-soft-danger hover:ring-lesser-white"
              :class="[active && 'scale-105 shadow-xl  ring-lesser-white']"
            >
              ???????????????????????????
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
    <div
      class="absolute top-full right-0 z-50 mt-2 rounded-md bg-white p-4 shadow-2xl backdrop-blur-sm"
      v-show="clicked"
    >
      <div class="flex w-max items-center">
        <div
          :style="{
            backgroundImage: `url(${userImage})`,
          }"
          @click="profileFunction"
          class="mr-3 flex aspect-square w-16 items-center justify-center rounded-md bg-primary-soft bg-contain bg-center text-4xl font-medium text-primary"
        >
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="translate-y-0.5"
            v-if="!userImage && !userName"
          />
        </div>
        <div class="flex flex-col justify-end text-left">
          <span
            class="block translate-y-2 text-xs text-gray"
            @click="profileFunction"
          >
            {{ role }}
          </span>
          <span class="block text-2xl font-medium" @click="profileFunction">
            {{ userName ?? '????????????????????????????????????????????????' }}
          </span>
        </div>
      </div>
      <div
        v-show="userName != 'Please Login'"
        class="dropdown-location"
        @click="profileFunction"
      >
        <div class="text-md flex w-max items-center gap-3">
          <FontAwesomeIcon :icon="['fa-solid', 'fa-location-dot']" size="sm" />
          <span> ??????????????????????????????????????????????????????</span>
        </div>
      </div>
      <div class="dropdown-button">
        <button @click="addDormFunction" v-show="role === 'dorm-owner'">
          Add dorm
        </button>
      </div>
    </div>
  </Menu>
  <!-- <div
    class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 backdrop-blur-sm duration-300"
    :class="{
      'opacity-0': !clicked,
      '-z-10': !clicked,
      'z-10': clicked,
    }"
    @click.left="handleClick"
  ></div> -->
</template>
