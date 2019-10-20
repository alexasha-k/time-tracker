import groups from '@/config/group.js'

const tasksFields = {
  name: {
    value: '',
    type: 'text',
    label: 'Name'
  },
  group: {
    value: null,
    type: 'select',
    label: 'Choose type',
    variations: Object.values(groups)
  }
}

export default tasksFields
