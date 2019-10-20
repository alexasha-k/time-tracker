<template>
  <div class="stats">
    <div class="stats__wrapper">
      <div class="stats__data">Total time: {{ totalTime | formatTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoStats',
  props: ['items'],
  computed: {
    totalTime: function () {
      const total =
        this.items.reduce(
          (acc, item) => (+item.time ? acc + +item.time : acc),
          0
        ) || 0
      return total
    }
  }
}
</script>

<style lang="scss" scoped>
.stats {
  &__wrapper {
    padding: 12px 16px;
  }
}
</style>
