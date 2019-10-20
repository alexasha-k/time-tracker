<template>
  <div class="status__row">
    <div class="label">Status:</div>
    <div
      v-if="!isEdit && status"
      class="status-icon"
      :class="setIcon(status)"
      :title="defineStatus"
    ></div>
    <div v-else class="status__select">
      <form class="form" action="index.html" method="post">
        <div class="form__group">
          <v-select
            :options="statusOptions"
            v-model="currentStatus"
            label="title"
            :clearable="false"
            :reduce="item => item.value"
            placeholder="Select status"
          ></v-select>
        </div>
      </form>
    </div>
    <button
      v-if="isActiveStatus"
      type="button"
      class="btn-clear"
      @click="handleClick"
      :title="iconTitle"
    >
      <svg
        v-if="isEdit"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { getStatus, statusToChange } from '@/config/status.js'

export default {
  name: 'TaskStatus',
  data: () => ({
    isEdit: false,
    statusOptions: null,
    currentStatus: ''
  }),
  props: ['status'],
  computed: {
    iconTitle: function () {
      switch (this.isEdit) {
        case true:
          return 'Save new status'
        default:
          return 'Edit status'
      }
    },
    defineStatus: function () {
      return getStatus(+this.status).title || 'Other'
    },
    isActiveStatus: function () {
      return !(this.status === 1 || this.status === 2)
    }
  },
  methods: {
    setIcon: function (value) {
      switch (value) {
        case 1:
          return 'status-icon--red'
        case 2:
          return 'status-icon--green'
        case 3:
          return 'status-icon--gray'
        case 4:
          return 'status-icon--yellow'
        default:
          return 'status-icon--black'
      }
    },
    handleClick: function () {
      this.isEdit = !this.isEdit
      if (this.currentStatus.value !== this.status) {
        this.$emit('change-status', this.currentStatus)
      }
    }
  },
  async mounted () {
    this.statusOptions = statusToChange
    this.currentStatus = getStatus(+this.status)
  }
}
</script>

<style lang="scss" scoped>
.label {
  margin-right: 12px;
}
.status {
  &__select {
    margin-right: 4px;
    min-width: 140px;
  }
  &__row {
    display: flex;
    align-items: center;
    .btn-clear {
      opacity: 0;
      transition: 150ms ease;
    }
    &:hover {
      .btn-clear {
        opacity: 1;
      }
    }
  }
}

.status-icon {
  display: block;
  margin-right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  &--red {
    background-color: #cd0074;
  }
  &--green {
    background-color: #9fee00;
  }
  &--yellow {
    background-color: #ff5402;
  }
  &--gray {
    background-color: lightgray;
  }
  &--black {
    background-color: black;
  }
}
</style>
