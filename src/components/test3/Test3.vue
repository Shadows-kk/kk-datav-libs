<template>
  <div class="title3">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'TestComponent3',
  setup () {
    const message = 'hello world3 '
    return {
      message
    }
  }
}
</script>

<style lang="scss" scoped>
.title3 {
  color: purple;
}
</style>