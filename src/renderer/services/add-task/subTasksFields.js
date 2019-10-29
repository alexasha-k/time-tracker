import { getData } from '@/db.js'

async function getVariations () {
  let data = await getData()
  data = data.map(item => {
    const { name: label, _id: value } = item
    return { label, value }
  })
  return data
}

const subTasksFields = async () => {
  const schema = {
    name: {
      value: '',
      type: 'text',
      label: 'Name'
    },
    task: {
      value: '',
      type: 'select',
      label: 'Choose task',
      variations: []
    },
    dateTo: {
      value: '',
      type: 'date',
      label: 'Choose date to'
    }
  }
  schema.task.variations = await getVariations()
  return schema
}

export default subTasksFields
