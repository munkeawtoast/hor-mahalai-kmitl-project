<script>
export default {}
</script>
<template>
  <div>
    <div>
      <form>
        <label>Username or Email</label><br />
        <input for="text" /><br />
        <label>Password</label><br />
        <input for="text" /><br />
        <button></button>
      </form>
      <p>
        Don't have an account yet?<RouterLink to="/register"
          >register!</RouterLink
        >
      </p>
    </div>
  </div>
</template>
<style scoped>
form {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1024px;
}
</style>
