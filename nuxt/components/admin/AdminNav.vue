<template>
  <div class="nav">
    <Logo />

    <nav>
      <nuxt-link to="/admin">
        <Icon name="calendar" /> Services & Events
      </nuxt-link>
      <nuxt-link to="/admin/services-events">
        <Icon name="users" /> Staff Members
      </nuxt-link>
      <nuxt-link to="/admin/analytics">
        <Icon name="bar-chart-2" /> Analytics
      </nuxt-link>
      <nuxt-link to="/admin/services-events">
        <Icon name="key" /> Other Users
      </nuxt-link>
    </nav>

    <div class="current-user">
      <span class="user">
        <Icon name="user-check" />
        {{ $auth.user.username }}
      </span>

      <Button @click.native="$auth.logout()" look="flat" icon="log-out"
        >Logout</Button
      >
    </div>
  </div>
</template>

<script>
import Button from '../inputs/Button'
export default {
  components: { Button }
}
</script>


<style lang="scss" scoped>
$nav-width: 300px;

.nav {
  position: fixed;
  width: $nav-width;
  height: 100vh;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
  border-radius: 0 32px 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .logo {
    margin-top: 64px;
  }

  nav {
    margin-top: 48px;
    width: 100%;
    text-align: right;

    a {
      color: inherit;
      text-decoration: none;
      font-size: $font-size--normal;
      height: 58px;
      width: $nav-width - 48px;
      display: inline-flex;
      justify-content: flex-start;
      padding: 0 16px 0 24px;
      border-radius: 58px 0 0 58px;
      align-items: center;

      .icon {
        margin-right: 16px;
      }

      &.nuxt-link-active {
        background: #eee;
      }
    }
  }

  .current-user {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0 48px;

    .user .icon {
      margin: 0 16px 0 0;
    }

    .button {
      margin: 24px 0 48px 0;
      width: 100%;
    }
  }
}
</style>
