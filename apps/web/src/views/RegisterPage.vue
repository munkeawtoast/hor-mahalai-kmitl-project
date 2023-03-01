<template>
  <div id="regis">
    <div class="container">
      <form @submit.prevent="onSubmit">
        <label>Username</label><br />
        <input v-model="username" type="text" /><br />
        <label>Password</label>
        <input v-model="password" type="password" />
        <label>Confirm password</label>
        <input type="text" /><br />
        <label>First name</label><br />
        <input type="text" /><br />
        <label>Last name</label><br />
        <input type="text" /><br />
        <label>Email</label><br />
        <input type="text" /><br />
        <label>Role</label><br />
        <input type="radio" name="userType" value="user" checked />
        <label>User</label>
        <input type="radio" name="userType" value="dormOwner" />
        <label>Dorm owner</label><br />
        <button @click="returnText"></button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  el: '#regis',
  data() {
    return {
      username: '',
    }
  },
  methods: {
    returnText() {
      console.log(this.username)
    },
  },
  watch: {},
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
