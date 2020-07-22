<template>
  <div
    class="icon"
    :style="{ stroke: color }"
    v-html="require(`~/assets/icons/${name}.svg?raw`)"
  />
</template>

<script>
export default {
    name: "icon",
    props: {
        name: String,
        color: {
            type: String,
            default: 'currentColor'
        }
    }
}
</script>

<style scoped>
.icon {
  width: 32px;
  height: 32px;
}
</style>
