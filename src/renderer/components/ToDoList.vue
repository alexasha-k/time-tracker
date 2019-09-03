<template>
<ul>
  <li v-for="(item, index) in listItems" class="todo-item">
    <div class="todo-item__info">
      <div class="title">{{item.name}}</div>
      <div class="description">{{item.description}}</div>
      <div class="info-bottom">
        <div class="group">{{item.group}}</div>
        <task-status :status="item.status"></task-status>
      </div>
    </div>
    <div class="todo-item__tracker">
      <time-counter :startTime="item.time"></time-counter>
    </div>
  </li>
</ul>
</template>

<script>
import TimeCounter from './TimeCounter.vue'
import TaskStatus from './TaskStatus.vue'
import data from '@/assets/data.json'

export default {
  name: 'ToDoList',
  data: () => ({
    listItems: data

  }),
  components: {
    TimeCounter,
    TaskStatus
  }
}
</script>

<style lang="scss" scoped>
ul {
    padding: 0 24px;
    margin: 0;
    list-style: none;
}
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dddddd;
    margin-bottom: 24px;
    .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 6px;
    }
    .description {
        color: #666;
        margin-bottom: 12px;
    }
    .group {
        margin-right: 24px;
    }
    .info-bottom {
        display: flex;
        align-items: center;
    }
    &__info {
        padding: 8px 24px;
    }
    &__tracker {
        padding: 8px 24px;
        background-color: #FFAA00;
        align-self: stretch;
        display: flex;
        align-items: center;
    }
}
</style>
