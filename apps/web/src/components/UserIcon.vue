<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
        this.clicked = !this.clicked
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
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<template>
  <div class="outer">
    <button
      class="usericon"
      @click="
        (event) => {
          handleClick(event)
        }
      "
    >
      <div class="usericon--letter">ห</div>
    </button>
    <div class="drop-down" v-show="clicked">
      <div class="dropdown-profile">
        <img :src="userImage" @click="profileFunction" class="profile-images" />
        <span @click="profileFunction">{{ userName }}</span>
        <span @click="profileFunction">{{ role }}</span>
      </div>
      <div
        v-show="userName != 'Please Login'"
        class="dropdown-location"
        @click="profileFunction"
      >
        <FontAwesomeIcon :icon="['fa-solid', 'fa-location-dot']">
        </FontAwesomeIcon>
        <span> รายชื่อที่พินไว้</span><br />
        <FontAwesomeIcon :icon="['fa-solid', 'fa-location-dot']">
        </FontAwesomeIcon>
        <span> รายชื่อที่พินไว้</span>
      </div>
      <div class="dropdown-button">
        <button @click="loginFunction">Login</button>
        <button @click="registerFunction">Register</button>
        <button @click="logoutFunction" v-show="userName != 'Please Login'">
          Logout
        </button>
        <button @click="addDormFunction" v-show="role === 'dorm-owner'">
          Add dorm
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.outer {
  position: relative;
}
.usericon {
  all: unset;
  margin-left: 1em;
  border-radius: 8px;
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
  overflow: hidden;
  cursor: pointer;
}

.usericon--letter {
  transform: translateY(-0.06em);
  font-size: 2em;
  font-weight: 500;
}

.drop-down {
  position: absolute;
  /* background-color: red;
  top: 100;
  right: 0;
  clip-path: path('m 0 10 L 8 2 Q 10 0 10 4 L 10 10 z'); */
  width: 300px;
  height: 200px;
  padding: 12px;
  transform: translateX(-260px) translateY(5px);
  border-radius: 22px;
  background-color: blanchedalmond;
  border-color: black;
}
.profile-images {
  border-radius: 12px;
  width: 64px;
  height: 64px;
}
.dropdown-profile {
  display: flex;
  align-items: center;

  gap: 12px;
  border-bottom: 1px solid black;
  cursor: pointer;
}
.dropdown-location {
  border-bottom: 1px solid black;
}
.dropdown-button {
  display: flex;
  justify-content: center;
  gap: 12px;
}
/* .drop-down::before {
  width: 10px;
  height: 10px;
  content: '';
  background-color: red;
  color: blue;
  outline: solid 800px black;
} */
</style>
