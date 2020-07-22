<template>
  <button v-wave class="button">
    <Icon v-if="icon" :name="icon" />
    <span><slot /></span>
  </button>
</template>

<script>
export default {
    props: {
        icon: String
    }
}
</script>

<style lang="scss" scoped>
.button {
  background: $red;
  color: #fff;
  outline: none;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;

  border: none;
  border-radius: 48px;

  cursor: pointer;

  transition: box-shadow 0.2s ease;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04),
    0px 2px 6px rgba(138, 15, 15, 0.12), 0px 16px 24px rgba(138, 15, 15, 0.2);

  &:hover,
  &:active {
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04),
      0px 2px 6px rgba(148, 17, 27, 0.12), 0px 10px 20px rgba(148, 17, 27, 0.18);
  }

  .icon {
    margin: 0 16px 0 0;
  }

  span {
    line-height: 32px;
  }
}
</style>
