<template>
  <div class="add-item-form">
    <div class="toggle-form">
      <div class="radio-icon">
        <label class="radio-container">
          <input
            type="radio"
            name="toggle-form"
            :value="tasksFields"
            v-model="addForm"
            checked
          />
          <span class="checkmark">
            <i class="icon-check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"
                />
              </svg>
            </i>
          </span>
          <span class="label">Add Task</span>
        </label>
      </div>
      <div class="radio-icon">
        <label class="radio-container">
          <input
            type="radio"
            name="toggle-form"
            :value="subTasksFields"
            v-model="addForm"
          />
          <span class="checkmark">
            <i class="icon-check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"
                />
              </svg>
            </i>
          </span>
          <span class="label">Add Subtask</span>
        </label>
      </div>
    </div>
    <add-form
      v-if="!isSuccess"
      :schema="addForm"
      v-on:submit-form="addNewItem"
    ></add-form>
    <div v-else>
      <div class="success">
        Your item has been saved!
      </div>
      <button type="button" @click="updateComponent" class="btn">
        Add another item
      </button>
    </div>
  </div>
</template>

<script>
import { addData, addSubtaskData } from '@/db.js'
import tasksFields from '@/services/add-task/tasksFields.js'
import subTasksFields from '@/services/add-task/subTasksFields.js'
import AddForm from './common/AddForm.vue'

export default {
  data: vm => ({
    tasksFields: tasksFields,
    subTasksFields: subTasksFields,
    isSuccess: false,
    addForm: tasksFields
  }),
  methods: {
    addNewItem: function (data) {
      if (this.addForm.task) {
        addSubtaskData(data)
      } else {
        addData(data)
      }
      this.isSuccess = true
    },
    updateComponent: function () {
      this.isSuccess = false
    }
  },
  components: { AddForm },
  async mounted () {
    this.subTasksFields = await subTasksFields()
  }
}
</script>

<style lang="scss" scoped>
.toggle-form {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > .radio-icon:not(:last-child) {
    margin-right: 8px;
  }
}
.add-item-form {
  padding: 24px;
}
.success {
  margin-bottom: 16px;
}
</style>
