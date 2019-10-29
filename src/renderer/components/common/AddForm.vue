<template>
  <div>
    <div v-if="error" class="form__group">{{ error }}</div>
    <form @submit="handleSubmit" class="form" method="post">
      <div v-for="(value, name) in schema" class="form__group">
        <template v-if="value.type === 'text'">
          <input
            type="text"
            v-model="schema[name].value"
            v-focus
            :placeholder="value.label"
          />
        </template>
        <template v-if="value.type === 'select'">
          <v-select
            :options="value.variations"
            v-model="schema[name].value"
            :reduce="item => item.value"
            :placeholder="value.label"
          ></v-select>
        </template>
        <template v-if="value.type === 'date'">
          <datepicker
            monday-first
            v-model="schema[name].value"
            :placeholder="value.label"
            :disabled-dates="disabledDates"
            :highlighted="highlighted"
            calendar-class="time-tracker__datepicker"
          ></datepicker>
        </template>
      </div>
      <button type="submit" class="btn">Save</button>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { status } from '@/config/status.js'

export default {
  data: vm => ({
    error: '',
    disabledDates: {
      to: new Date()
    },
    highlighted: {
      days: [6, 0]
    }
  }),
  props: ['schema'],
  computed: {
    initialStatus: function () {
      return status.find(item => item._id === 'CREATED')
    },
    item: function () {
      let items = {}
      for (let it in this.schema) {
        items[it] = this.schema[it].value
      }
      return items
    }
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault()
      this.error = this.validateForm()
      if (!this.error) {
        const currentDate = new Date()
        const status = this.initialStatus.value
        const data = { ...this.item, currentDate, status }
        this.$emit('submit-form', data)
      }
    },
    validateForm: function () {
      const { ...fields } = this.item
      for (let key in fields) {
        if (!fields[key]) {
          return (this.error = 'All fields are required')
        }
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  components: { Datepicker },
  mounted () {
    console.log(Datepicker)
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__group {
    margin-bottom: 24px;
    > * {
      width: 100%;
    }
  }
}
</style>
