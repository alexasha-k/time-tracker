<template>
  <div class="current-task">Current: {{ tweenedText }}</div>
</template>

<script>
export default {
  data: () => ({
    tweenedText: ''
  }),
  computed: {
    task: function () {
      return this.$store.state.timer.currentItemTitle || 'No Task'
    }
  },
  watch: {
    task: function (newVal) {
      this.tweenText(newVal)
    }
  },
  methods: {
    tweenText: function (text) {
      const textLength = text.length
      let i = 0
      let t
      const getText = i => {
        this.tweenedText = this.task.substr(0, i + 1)
      }
      while (i <= textLength) {
        ;(function (i) {
          t = setTimeout(getText, 50 * i, i)
        })(i++)
      }
      clearTimeout(t)
    }
  },
  mounted () {
    this.tweenedText = this.task
  }
}
</script>

<style lang="scss" scoped>
.current-task {
  overflow: hidden;
  margin-right: 24px;
  margin-left: auto;
  max-width: 200px;
  color: #ffffff;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
