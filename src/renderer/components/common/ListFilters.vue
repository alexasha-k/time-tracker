<template>
  <div class="filters">
    <div class="box">
      <div class="box__inner">
        <div class="filters__form">
          <form>
            <div class="filters__row">
              <div class="filters__col">
                <input
                  type="search"
                  v-model="searchingString"
                  placeholder="Search"
                  @input="handleChange"
                />
              </div>
              <div class="filters__col">
                <v-select
                  :options="groupOptions"
                  v-model="selectedGroup"
                  @input="handleChange($event, 'group')"
                  placeholder="Sort group"
                ></v-select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { status } from '@/config/status.js'
import groups from '@/config/group.js'

export default {
  name: 'ListFilters',
  data: () => ({
    searchingString: '',
    groupOptions: [],
    statusOptions: [],
    selectedGroup: '',
    selectedStatus: ''
  }),
  methods: {
    handleChange: function (e, category) {
      let searchingData
      if (category) {
        if (category === 'group') {
          this.selectedStatus = ''
        } else if (category === 'status') {
          this.selectedGroup = ''
        }
        searchingData = e ? { [category]: e.value } : {}
      } else {
        const str = e.target.value.trim()
        const regexp = new RegExp(str)
        searchingData = {
          $or: [{ name: regexp }, { description: regexp }]
        }
      }
      this.$emit('filter-items', searchingData)
    }
  },
  mounted () {
    this.groupOptions = groups
    this.statusOptions = status
  }
}
</script>

<style scoped lang="scss">
.filters {
  margin: 0 16px 16px;
  &__form {
    padding: 16px;
  }
  &__row {
    display: flex;
    justify-content: space-between;
  }
  &__col {
    flex-basis: calc(50% - 8px);
    > * {
      width: 100%;
    }
  }
}
</style>
