<template>
  <form @submit.prevent="login" class="login">
    <Logo size="128" />
    <h1>Admin Dashboard</h1>

    <Message animation="shake" type="warning" :text="warning" />

    <TextField name="username" label="Username" v-model="username" />
    <TextField name="password" label="Password" v-model="password" password />

    <Button :disabled="formDisabled" type="submit" icon="key">Login</Button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: 'guest',
  middleware: 'auth',
  name: 'login',
  layout: 'login',
  head: () => ({
    title: 'Admin Login'
  }),
  data() {
    return {
      username: '',
      password: '',
      warning: ''
    }
  },
  mounted() {
    this.$watch(
      () => [this.username, this.password],
      () => {
        this.warning = ''
      }
    )
  },
  computed: {
    formDisabled(): boolean {
      return !this.username || !this.password || this.warning !== ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
      } catch (e) {
        this.warning = 'Invalid username or password'
      }
    }
  }
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

  .message {
    margin-bottom: 32px;
  }

  .text-field {
    margin: 0 0 24px 0;
  }

  .button {
    margin: 24px 0 0 0;
  }
}
</style>
