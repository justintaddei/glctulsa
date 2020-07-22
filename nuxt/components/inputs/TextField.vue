<template>
  <div class="text-field">
    <label class="text--small" :for="id">{{ label }}</label>
    <div v-wave class="input-wrapper">
      <input
        v-model="interalValue"
        :id="id"
        :type="password ? 'password' : 'text'"
      />
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text-field',
  props: {
    password: Boolean,
    label: String,
    value: [String, Number]
  },
  computed: {
    id() {
      return `textfield_${this.label}`
    },
    interalValue: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-field {
  width: 100%;

  label {
    display: block;
    width: 100%;
  }

  .input-wrapper {
    position: relative;
    height: 48px;
    width: 100%;
    margin: 8px 0 0 0;

    overflow: hidden;

    border-radius: 8px 8px 0 0;
  }

  input {
    height: 48px;
    padding: 0 16px;
    background: #f9f9f9;
    // background: #fff;
    // box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
    // border-radius: 12px;
    border: none;
    border-bottom: 2px solid #aaa;
    width: 100%;
    outline: none;

    &:hover,
    &:focus {
      background: #f3f3f3;
    }
  }

  .overlay {
    pointer-events: none;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border-bottom: 2px solid #000;

    transform: scale(0, 1);
    transition: transform 0.2s ease;
  }

  &:focus-within .overlay {
    transform: none;
  }
}
</style>
