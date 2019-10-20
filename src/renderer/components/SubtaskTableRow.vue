<template>
  <tr v-if="item">
    <td>{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>
      <task-status
        :status="item.status"
        v-on:change-status="handleChangeStatus"
      ></task-status>
    </td>
    <td class="time-counter-cell" :class="{ active: isCurrent }">
      <time-counter
        :startTime="item.time || 0"
        v-on:change-time="handleChangeTime"
        :current="isCurrent"
        :untrackedTime="addedTime"
        :isTrackingAllowed="isTrackingAllowed"
      ></time-counter>
    </td>
  </tr>
</template>

<script>
import TimeCounter from './TimeCounter.vue'
import TaskStatus from './common/TaskStatus.vue'
import { updateSubItem, addTimeData } from '../db.js'

export default {
  props: ['item', 'index', 'isAllVisible'],
  computed: {
    isVisible: function () {
      return (
        this.isAllVisible || this.item.status === 3 || this.item.status === 4
      )
    },
    isCurrent: function () {
      return this.item._id === this.$store.state.timer.currentItem
    },
    addedTime: function () {
      if (this.isCurrent) {
        return Date.now() - this.$store.state.timer.startTime
      }
      return 0
    },
    isTrackingAllowed: function () {
      const status = this.item.status
      const result = !(status === 1 || status === 2)
      return result
    }
  },
  methods: {
    handleChangeTime: function (newVal) {
      if (newVal) {
        let updatedInfo = { time: newVal }
        if (!this.item.time) {
          updatedInfo.status = this.item.status = 4
        }
        this.item.time = newVal
        addTimeData({
          taskId: this.item.task,
          subtaskId: this.item._id,
          startTime: this.$store.state.timer.startTime,
          endTime: Date.now()
        })
        updateSubItem({ _id: this.item._id }, updatedInfo)
        if (this.item._id === this.$store.state.timer.currentItem) {
          this.$store.dispatch('timer/SET_CURRENT_ITEM', null)
        }
      } else {
        const item = {
          currentItem: this.item._id,
          currentTask: this.item.task,
          startTime: Date.now(),
          currentItemTitle: this.item.name
        }
        this.$store.dispatch('timer/SET_CURRENT_ITEM', item)
      }
    },
    handleChangeStatus: async function (newVal) {
      this.item.status = newVal
      await updateSubItem({ _id: this.item._id }, { status: newVal })
    }
  },
  components: {
    TimeCounter,
    TaskStatus
  },
  mounted () {}
}
</script>

<style lang="scss" scoped></style>
