<template>
  <div class="time-counter">
    <button
      v-if="!isAddTimeActive && isTrackingAllowed"
      @click="isAddTimeActive = true"
      type="button"
      class="btn-clear time-counter__btn"
      title="Add time"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
    <div v-if="isAddTimeActive && isTrackingAllowed" class="add-time">
      <form @submit="handleAddTime" class="add-time__form">
        <input type="number" v-model="addedTime.hours" />
        <input type="number" v-model="addedTime.minutes" />
        <button type="submit" class="btn-clear time-counter__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
    <span class="time-counter__time">{{ time | formatTime }}</span>
    <button
      v-if="isTrackingAllowed"
      @click="handleClick"
      class="btn-clear time-counter__btn round-animation"
      type="button"
      title="Start task"
    >
      <svg
        v-if="isActive"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 510 510"
      >
        <path
          d="M178.5,357h51V153h-51V357z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
       M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z M280.5,357h51V153h-51V357z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TimeCounter',
  data: vm => ({
    time: vm.startTime,
    isActive: false,
    interval: null,
    isAddTimeActive: false,
    addedTime: {
      hours: 0,
      minutes: 0
    }
  }),
  props: ['startTime', 'current', 'untrackedTime', 'isTrackingAllowed'],
  methods: {
    handleClick: function () {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.interval = setInterval(this.runTime, 1000)
        this.$emit('change-time')
      } else {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        this.stopTime()
      }
    },
    handleAddTime: function (e) {
      e.preventDefault()
      const hoursToMs = this.addedTime.hours * 60 * 60 * 1000
      const minutesToMs = this.addedTime.minutes * 60 * 1000
      this.time = this.time + hoursToMs + minutesToMs
      if (!this.interval) {
        this.stopTime()
      }
      this.isAddTimeActive = false
    },
    runTime: function () {
      this.time += 1000
    },
    stopTime: function () {
      this.$emit('change-time', this.time)
    }
  },
  watch: {
    current: function (isCurrent) {
      if (!isCurrent && this.interval) {
        this.isActive = false
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        this.stopTime()
      }
    }
  },
  mounted () {
    if (this.current) {
      this.isActive = true
      this.time += this.untrackedTime
      this.interval = setInterval(this.runTime, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.time-counter {
  overflow: hidden;
  padding: 8px 12px 8px 16px;
  text-align: right;
  &__btn {
    color: #fff;
    vertical-align: middle;
    &:hover {
      opacity: 0.6;
    }
  }
  &__time {
    color: #fff;
    font-weight: bold;
  }
}
.round-animation {
  position: relative;
  transition-duration: 0.4s;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background-color: #ffffff;
    content: '';
    opacity: 0;
    transition: all 800ms;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  &:active::before {
    width: 0;
    height: 0;
    opacity: 0.6;
    transition: 0s;
  }
}
.add-time {
  display: inline-block;
  vertical-align: middle;
  &__form {
    display: flex;
    input {
      margin-right: 4px;
      max-width: 46px;
      background-color: #ffffff;
    }
  }
}
</style>
