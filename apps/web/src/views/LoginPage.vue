<script>
import IconLogo from '../components/icons/IconLogo.vue'
export default {
  components: {
    IconLogo,
  },
}
</script>
<template>
  <div class="container">
    <IconLogo></IconLogo>
    <div>
      <form>
        <label>Username or Email</label><br />
        <input for="text" /><br />
        <label>Password</label><br />
        <input for="text" /><br />
        <button>Login</button>
      </form>
      <p>
        Don't have an account yet?
        <RouterLink to="/register">register!</RouterLink>
      </p>
    </div>
  </div>
</template>
<style scoped>
form {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}
label {
  margin: 0;
  padding: 0;
}
input {
}
button {
  background-color: unset;
  margin: 0.5em 0 0.5em 0;
  padding: 0.5em 6em;
  border-radius: 10px;
}
/* a{
  all:
} */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transform: translateY(-10vh);
  height: 100vh;
}
</style>
