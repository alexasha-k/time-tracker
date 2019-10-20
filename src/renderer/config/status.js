const status = [
  { _id: 'CANCELLED', value: 1, title: 'Cancelled' },
  { _id: 'DONE', value: 2, title: 'Done' },
  { _id: 'CREATED', value: 3, title: 'Created' },
  { _id: 'PROCESSING', value: 4, title: 'In process' }
]

const initialStatus = status[2] // _id: 'CREATED'

const statusToChange = status.filter(
  item => item._id === 'DONE' || item._id === 'CANCELLED'
  // || item._id === 'PROCESSING'
)

function isStatusActive (num) {
  switch (num) {
    case 1:
    case 2:
      return false
    case 3:
    case 4:
      return true
    default:
      return true
  }
}

function getStatus (value) {
  return status.find(item => item.value === value)
}

export { status, initialStatus, isStatusActive, getStatus, statusToChange }
