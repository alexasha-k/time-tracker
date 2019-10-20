<template>
  <tr>
    <td>{{ itemNumber }}</td>
    <td>
      <form id="add-subtask-form" @submit="addNewSubtask">
        <input type="text" v-model="name" />
      </form>
    </td>
    <td></td>
    <td>
      <button
        class="btn btn__add-subtask"
        form="add-subtask-form"
        type="submit"
      >
        Save Item
      </button>
    </td>
  </tr>
</template>

<script>
import { addSubtaskData } from '@/db.js'
import { initialStatus } from '@/config/status.js'

export default {
  data: () => ({
    name: ''
  }),
  props: ['itemNumber', 'task'],
  methods: {
    addNewSubtask: async function (e, data) {
      e.preventDefault()
      if (this.name.trim()) {
        const currentDate = new Date()
        const status = initialStatus.value
        const { name, task } = this
        const data = { name, task, currentDate, status }
        const result = await addSubtaskData(data)
        this.$emit('add-item', result)
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
