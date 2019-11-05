<template>
  <div>
    <list-filters v-on:filter-items="filteredItems"></list-filters>
    <to-do-list-toggle v-model="showAll"></to-do-list-toggle>
    <stat></stat>
    <div
      droppable="true"
      @drop="handleDrop(item, $event)"
      @dragOver="handleDragOver(item, $event)"
    >
      <transition-group name="list" tag="ul">
        <to-do-item
          v-for="(item, index) in listItems"
          :key="item._id"
          class="todo-item"
          :class="{ dragged: draggedItem === item }"
          :item="item"
          draggable="true"
          v-on:change-order="handleChangeOrder"
          v-on:set-dragged="setDraggedItem"
        ></to-do-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue'
import ToDoListToggle from './common/ToDoListToggle.vue'
import ListFilters from './common/ListFilters.vue'
import Stat from './common/Stat.vue'

import { getData } from '../db.js'

export default {
  name: 'ToDoList',
  data: () => ({
    listItems: [],
    draggedItem: null,
    showAll: true
  }),
  components: {
    ToDoItem,
    ListFilters,
    ToDoListToggle,
    Stat
  },
  methods: {
    filteredItems: async function (val) {
      this.listItems = await getData(val)
    },
    handleDragStart: function (item, e) {
      console.log(e)
    },
    handleDragOver: function (item, e) {
      console.log(e)
    },
    handleDrop: function (item, e) {
      console.log(e)
    },
    moveItem: function (from, to) {
      this.listItems.splice(to, 0, this.listItems.splice(from, 1)[0])
    },
    handleChangeOrder: function (item) {
      if (this.draggedItem !== item) {
        console.log(item)
        const from = this.listItems.indexOf(this.draggedItem)
        const to = this.listItems.indexOf(item)
        this.moveItem(from, to)
      }
    },
    setDraggedItem: function (item) {
      if (!item) {
        this.draggedItem = null
      } else {
        this.draggedItem = item
      }
    }
  },
  watch: {
    showAll: async function () {
      if (this.showAll) {
        this.listItems = await getData()
      } else {
        this.filteredItems({
          $or: [{ status: 3 }, { status: 4 }]
        })
      }
    }
  },
  async mounted () {
    this.listItems = await getData()
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0 16px;
  margin: 0;
  list-style: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  /deep/ .todo-item__left .btn-clear {
    transition: all 0.5s;
    transition-delay: 0.4s;
  }
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-36px);
  /deep/ .todo-item__left .btn-clear {
    opacity: 0;
  }
}
</style>
