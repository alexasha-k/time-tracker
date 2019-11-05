<template>
  <table class="subtasks-table table striped-table">
    <thead>
      <tr>
        <td>№</td>
        <td>
          <base-sorting-order
            :isActive="sortingCol === 'name'"
            :order="sortingOrder"
            colTitle="Subtask"
            v-on:sort-by-col="sortCol('name')"
          ></base-sorting-order>
        </td>
        <td>
          <base-sorting-order
            :isActive="sortingCol === 'status'"
            :order="sortingOrder"
            colTitle="Status"
            v-on:sort-by-col="sortCol('status')"
          ></base-sorting-order>
        </td>
        <td><to-do-stats v-if="items" :items="items"></to-do-stats></td>
      </tr>
    </thead>
    <transition-group name="fade" tag="tbody">
      <subtask-table-row
        v-for="(item, index) in items"
        :key="item._id"
        :index="itemsPerPage * (currentPage - 1) + index"
        :item="item"
        :isAllVisible="isShowAll"
      ></subtask-table-row>
    </transition-group>
    <tfoot>
      <transition name="fade">
        <add-subtask-row
          key="new-row"
          v-if="isAddNewItem"
          :itemNumber="items.length + 1 || 1"
          :task="id"
          v-on:add-item="addNewItem"
        ></add-subtask-row>
      </transition>
      <tr>
        <td colspan="4">
          <button
            v-if="allItemsLength !== itemsLength"
            @click="showAll"
            class="btn"
            type="button"
          >
            {{ isShowAll ? 'Show active only' : 'Show all items' }}
          </button>
          <button
            v-if="!isAddNewItem"
            @click="isAddNewItem = !isAddNewItem"
            class="btn"
            type="button"
          >
            Add New Subtask
          </button>
        </td>
      </tr>
      <tr v-if="pagesNumber > 1">
        <td colspan="4">
          <pagination
            :pageLength="pagesNumber"
            :currentPage="currentPage"
            v-on:change-current="changeCurrentPage"
          ></pagination>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import SubtaskTableRow from './SubtaskTableRow.vue'
import ToDoStats from './common/ToDoStats.vue'
import AddSubtaskRow from './common/AddSubtaskRow.vue'
import Pagination from './common/Pagination.vue'
import { getSubtaskData, getSubtaskCount } from '../db.js'

export default {
  data: () => ({
    items: [],
    isAddNewItem: false,
    allItemsLength: 0,
    isShowAll: false,
    itemsLength: 0,
    itemsPerPage: 10,
    currentPage: 1,
    sortingCol: '',
    sortingOrder: 'asc'
  }),
  computed: {
    pagesNumber: function () {
      return this.isShowAll
        ? Math.ceil(this.allItemsLength / this.itemsPerPage)
        : Math.ceil(this.items.length / this.itemsPerPage)
    }
  },
  props: ['id'],
  methods: {
    addNewItem: function (item) {
      this.items.push(item)
      this.isAddNewItem = false
    },
    showAll: async function () {
      this.isShowAll = !this.isShowAll
      if (this.isShowAll) {
        this.items = await getSubtaskData(this.id)
      } else {
        this.items = this.items.filter(
          item => item.status === 3 || item.status === 4
        )
      }
    },
    countStatus: function () {
      if (!this.itemsLength && this.allItemsLength) {
        const commonStatus = 2
        this.$emit('count-status', commonStatus)
      }
    },
    changeCurrentPage: async function (page) {
      this.currentPage = page
      this.items = await getSubtaskData(this.id, undefined, page)
    },
    sortCol: function (sortField) {
      if (this.sortingCol === sortField) {
        this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortingCol = sortField
      }
      this.sortData()
    },
    sortData: function () {
      this.items.sort((a, b) => {
        const compA =
          typeof a[this.sortingCol] === 'string'
            ? a[this.sortingCol].toUpperCase()
            : a[this.sortingCol]
        const compB =
          typeof b[this.sortingCol] === 'string'
            ? b[this.sortingCol].toUpperCase()
            : b[this.sortingCol]
        if (this.sortingOrder === 'asc') {
          return compA < compB ? -1 : compA > compB ? 1 : 0
        } else {
          return compA > compB ? -1 : compA < compB ? 1 : 0
        }
      })
    }
  },
  components: {
    SubtaskTableRow,
    AddSubtaskRow,
    ToDoStats,
    Pagination
  },
  async mounted () {
    const filterParams = { $or: [{ status: 3 }, { status: 4 }] }
    this.items = await getSubtaskData(this.id, filterParams)
    // this.items = await getSubtaskData(this.id)
    this.items.sort(item => item.status)
    this.itemsLength = this.items.length
    this.allItemsLength = await getSubtaskCount(this.id)
    this.countStatus()
  }
}
</script>

<style lang="scss" scoped>
.subtasks-table {
  /deep/ .stats,
  /deep/ .time-counter {
    text-align: center;
  }
  /deep/ .stats {
    margin: -8px -12px;
  }
}
.btn__add-subtask {
  display: block;
  text-align: center;
  margin: -8px -12px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
