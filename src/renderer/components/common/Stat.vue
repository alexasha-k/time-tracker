<template>
  <div class="stat">
    <div class="box">
      <div class="box__inner">
        <div class="stat__wrapper">
          <div class="title">Stats</div>
          <div class="stat-table">
            <div class="title">Yesterday</div>
            <template v-if="itemsYesterdayOrdered">
              <table class="table striped-table">
                <template v-for="(value, name) in itemsYesterdayOrdered">
                  <thead>
                    <tr>
                      <td>{{ value[0].taskName }}</td>
                      <td>
                        <to-do-stats :items="value"></to-do-stats>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in value">
                      <td>{{ item.subtaskName }}</td>
                      <td>
                        {{ (item.endTime - item.startTime) | formatTime }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
              <stat-bar-chart
                class="bar-chart"
                :items="itemsYesterday"
              ></stat-bar-chart>
            </template>
            <div class="title">Today</div>
            <template v-if="itemsTodayOrdered">
              <table class="table striped-table">
                <template v-for="(value, name) in itemsTodayOrdered">
                  <thead>
                    <tr>
                      <td>{{ value[0].taskName }}</td>
                      <td>
                        <to-do-stats :items="value"></to-do-stats>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in value">
                      <td>{{ item.subtaskName }}</td>
                      <td>
                        {{ (item.endTime - item.startTime) | formatTime }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
              <stat-bar-chart
                class="bar-chart"
                :items="itemsToday"
              ></stat-bar-chart>
            </template>
            <div v-else>No task today</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeData, getData, getSubtaskData } from '../../db.js'
import moment from 'moment'
import _ from 'lodash'

import ToDoStats from './ToDoStats.vue'
import StatBarChart from './StatBarChart.vue'

export default {
  data: () => ({
    items: [],
    itemsToday: null,
    itemsYesterday: null,
    itemsTodayOrdered: null,
    itemsYesterdayOrdered: null,
    tasksNames: null,
    subtasksNames: null
  }),
  methods: {
    getTaskName: function (id) {
      const names = _.groupBy(this.taskNames, item => item._id)
      return names[id][0].name
    },
    getSubtaskName: function (id) {
      const names = _.groupBy(this.subtaskNames, item => item._id)
      return names[id][0].name
    },
    getGroupName: function (id) {
      const names = _.groupBy(this.taskNames, item => item._id)
      return names[id][0].group
    }
  },
  async mounted () {
    const today = new Date().getTime()
    const yesterday = moment()
      .subtract(1, 'day')
      .startOf('date')
      .format('x')
    const todayStartDay = moment(today)
      .startOf('date')
      .format('x')
    let items = await getTimeData(yesterday, today)
    let taskKeys = _.keys(_.groupBy(items, item => item.taskId))
    let subtaskKeys = _.keys(_.groupBy(items, item => item.subtaskId))
    this.taskNames = await getData({
      _id: { $in: taskKeys }
    })
    this.subtaskNames = await getSubtaskData(null, {
      _id: { $in: subtaskKeys }
    })

    items = items.map(item => {
      item.taskName = this.getTaskName(item.taskId)
      item.subtaskName = this.getSubtaskName(item.subtaskId)
      item.group = this.getGroupName(item.taskId)
      return item
    })

    this.itemsToday = items.filter(item => item.startTime >= todayStartDay)
    this.itemsYesterday = items.filter(item => item.startTime < todayStartDay)

    if (this.itemsToday.length) {
      this.itemsTodayOrdered = _.groupBy(this.itemsToday, item => item.taskId)
    }
    if (this.itemsYesterday.length) {
      this.itemsYesterdayOrdered = _.groupBy(
        this.itemsYesterday,
        item => item.taskId
      )
    }
    console.log(this.itemsToday)
  },
  components: { ToDoStats, StatBarChart }
}
</script>

<style lang="scss" scoped>
.stat {
  margin: 0 16px 16px;
  &__wrapper {
    padding: 12px 16px;
  }
  /deep/ .stats__wrapper {
    padding: 0;
  }
  .bar-chart {
    margin: 16px 0;
  }
}
</style>
