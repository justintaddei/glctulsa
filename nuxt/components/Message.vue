<template>
  <transition
    :name="animation"
    :duration="{ leave: 0 }"
    leave-active-class="leave-active"
  >
    <p v-show="text.length" :class="['message', type]">
      <Icon :name="icon" /> {{ text }}
    </p>
  </transition>
</template>

<script>
export default {
  name: 'message',
  props: {
    type: {
      type: String,
      default: 'general'
    },
    text: [String, Number],
    animation: String
  },
  computed: {
    icon() {
      const icons = {
        general: 'info',
        warning: 'alert-triangle',
        success: 'check-circle'
      }

      return icons[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding: 0 32px;
  min-height: 64px;
  width: auto;

  border-radius: 8px;

  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  color: #fff;

  display: flex;
  align-items: center;

  &.general {
    background: $general;
    box-shadow: 0 8px 32px fade-out($general, 0.7);
  }

  &.warning {
    background: $warning;
    box-shadow: 0 8px 32px fade-out($warning, 0.7);
  }

  &.success {
    background: $success;
    box-shadow: 0 8px 32px fade-out($success, 0.7);
  }

  .icon {
    margin: 0 16px 0 0;
  }
}

.leave-active {
  opacity: 0;
}

.shake-enter-active {
  animation: shake 0.5s ease 0s 1 both;

  @keyframes shake {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    25% {
      opacity: 1;
      transform: translate(-3px, 0);
    }

    45% {
      transform: translate(3px, 0);
    }
    65% {
      opacity: 1;
      transform: translate(-3px, 0);
    }

    85% {
      transform: translate(3px, 0);
    }
  }
}
</style>
