<template>
  <div class="services-events">
    <h1>
      Services & Events
    </h1>

    <h2>Recurring Events</h2>

    <h2>Isolated Events</h2>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  layout: 'admin',
  created() {
    console.log('this.$auth.user :>> ', this.$auth.user)
  }
}
</script>


<style lang="scss" scoped>
.services-events {
  h1 {
    margin-bottom: 64px;
  }
}
</style>
