<template>
  <li
    @dragstart="handleDragStart(item, $event)"
    @dragenter="handleDragEnter(item, $event)"
    @drop="handleDrop(item, $event)"
    @dragend="handleDragEnd(item, $event)"
    :class="{ active: isCurrent, opened: isSubTasksVisible }"
  >
    <div class="box">
      <div class="box__inner">
        <div class="todo-item__card">
          <div class="todo-item__left">
            <div class="title">{{ item.name }}</div>
            <button
              @click="isSubTasksVisible = !isSubTasksVisible"
              type="button"
              class="btn-clear btn-icon btn-icon--left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                />
              </svg>
              Show subtasks
            </button>
          </div>
          <div class="todo-item__right">
            <div class="group">
              <span class="label">Group: </span>{{ item.group | defineGroup }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-top">
      <div v-if="isSubTasksVisible" class="todo-item__subtasks">
        <subtasks-table
          :id="item._id"
          v-on:count-status="handleStatus"
        ></subtasks-table>
      </div>
    </transition>
    <!-- <div class="">
      <button type="button" name="button" @click="remove">Delete</button>
    </div> -->
  </li>
</template>

<script>
import SubtasksTable from './SubtasksTable.vue'
import { removeItem, updateItem } from '../db.js'
import group from '@/config/group.js'

export default {
  data: vm => ({
    componentItem: null,
    subtasks: null,
    isDragged: false,
    isSubTasksVisible: false
  }),
  props: ['item'],
  computed: {
    isCurrent: function () {
      return this.item._id === this.$store.state.timer.currentTask
    }
  },
  methods: {
    remove: function () {
      removeItem({ _id: this.item._id })
    },
    handleStatus: function (status) {
      if (this.item.status !== status) {
        updateItem(this.item._id, { status: status })
      }
    },
    handleDragStart: function (item, e) {
      e.dataTransfer.effectAllowed = 'move'
      this.$emit('set-dragged', item)
    },
    handleDrop: function (item, e) {
      console.log(e)
    },
    handleDragEnter: function (item, e) {
      this.$emit('change-order', item)
    },
    handleDragEnd: function (item, e) {
      e.dataTransfer.dropEffect = 'move'
      this.$emit('set-dragged')
    }
  },
  async mounted () {
    if (this.isCurrent) {
      this.isSubTasksVisible = true
    }
    this.componentItem = this.item
  },
  filters: {
    defineGroup: function (val) {
      const item = group.find(item => item.value === val)
      if (item) {
        return item.label
      } else {
        return 'Other'
      }
    }
  },
  components: {
    SubtasksTable
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  margin-bottom: 6px;
  transition: 350ms ease;
  &__card {
    padding: 16px;
    border-right: 4px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
  }
  &__subtasks {
    background-color: #fafafa;
    padding: 24px;
  }
  .title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 12px;
  }
  .description {
    overflow: hidden;
    margin-bottom: 4px;
    max-height: 20px;
    color: #666;
  }
  .group {
    margin-right: 12px;
  }
  &__info {
    padding: 12px 16px;
  }
  &__tracker {
  }
  &.dragged {
    opacity: 0.6;
  }
  &.active {
    .todo-item__card {
      border-color: orange;
    }
  }
  &.opened .btn-icon svg {
    transform: scale(-1);
  }
}
.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.5s;
  z-index: -1;
  position: relative;
}
.slide-top-enter, .slide-top-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-80px);
}
</style>
