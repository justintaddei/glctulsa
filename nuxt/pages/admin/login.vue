<template>
  <form @submit.prevent="login" class="login">
    <Logo size="128" />
    <h1>Admin Dashboard</h1>

    <TextField label="Username" v-model="username" />
    <TextField label="Password" v-model="password" password />

    <Button type="submit" icon="profile">Login</Button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'login',
  head: () => ({
    title: 'Admin Login',
  }),
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      // alert(`${this.username}, ${this.password}`)
    },
  },
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 400px;
  height: 100vh;
  width: 33.3%;
  margin: auto;

  h1 {
    margin: 32px 0;
  }

  .text-field {
    margin: 0 0 24px 0;
  }

  .button {
    margin: 24px 0 0 0;
  }
}
</style>
