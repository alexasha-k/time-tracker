<template>
<div class="time-counter" @click="handleClick">
  {{time}}
</div>
</template>

<script>
export default {
  name: 'TimeCounter',
  data: vm => ({
    time: vm.startTime,
    isActive: false,
    interval: null
  }),
  props: ['startTime'],
  methods: {
    handleClick: function () {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.interval = setInterval(this.runTime, 1000)
      } else {
        if (this.interval) {
          clearInterval(this.interval)
        }
        this.stopTime()
      }
    },
    runTime: function () {
      this.time += 1000
    },
    stopTime: function () {
      console.log(this.time)
    }
  }
}
</script>
