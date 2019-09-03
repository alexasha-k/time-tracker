<template>
<div class="status" :class="setIcon(status)" :title="status"></div>
</template>

<script>
export default {
  name: 'TaskStatus',
  props: ['status'],
  methods: {
    setIcon: function (value) {
      switch (value) {
        case 'created':
          return 'status--gray'
        case 'done':
          return 'status--green'
        case 'in process':
          return 'status--yellow'
        case 'cancelled':
          return 'status--red'
        default:
          return 'status--black'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    &--red {
        background-color: red;
    }
    &--green {
        background-color: green;
    }
    &--yellow {
        background-color: yellow;
    }
    &--gray {
        background-color: lightgray;
    }
    &--black {
        background-color: black;
    }
}
</style>
