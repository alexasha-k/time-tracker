import electron from 'electron'

const Datastore = require('nedb')
const dataBasePath = electron.remote.app.getPath('userData') + '/TimeTracker/'

const db = {}

// ************************ //
// Task DataBase structure:
// {
//   currentDate: Date,
//   group: Number[enum],
//   name: String,
//   status: Number[enum],
//   _id: hash
// }
// ************************ //

db.tasks = new Datastore({
  filename: dataBasePath + 'tasks.db',
  autoload: true
})

// ************************ //
// Subtask DataBase structure:
// {
//   currentDate: Date
//   name: String
//   status: Number[enum]
//   task: hash[task._id]
//   time: Number,
//   timeTo?: Date
//   _id: hash
// }
// ************************ //

db.subtasks = new Datastore({
  filename: dataBasePath + 'subtasks.db',
  autoload: true
})

// ************************ //
// Times DataBase structure:
// {
//   task: String
//   subtaskId: Number[enum]
//   endTime: Number
//   startTime: Number
//   _id: hash
// }
// ************************ //

db.times = new Datastore({
  filename: dataBasePath + 'times.db',
  autoload: true
})

function getData (filter) {
  const params = filter ? { ...filter } : {}
  const prom = new Promise(function (resolve, reject) {
    db.tasks
      .find(params)
      .sort({ currentDate: -1, name: 1 })
      .exec(function (err, docs) {
        resolve(docs)
        console.log(docs)
        reject(err)
      })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function getSubtaskData (taskId, filter, page) {
  const params = filter ? { task: taskId, ...filter } : { task: taskId }
  const numPerPage = 10
  const startPos = page ? (page - 1) * numPerPage : 0

  const prom = new Promise(function (resolve, reject) {
    db.subtasks
      .find(params)
      .sort({ status: -1, name: 1 })
      .skip(startPos)
      .limit(numPerPage)
      .exec(function (err, docs) {
        console.log(docs)
        resolve(docs)
        reject(err)
      })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function getSubtaskCount (taskId, filter) {
  const params = filter ? { task: taskId, ...filter } : { task: taskId }
  const prom = new Promise(function (resolve, reject) {
    db.subtasks.count(params, function (err, count) {
      console.log(count, err)
      resolve(count)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function getTimeData (from, to) {
  const params = {
    $and: [{ startTime: { $gte: from } }, { endTime: { $lte: to } }]
  }
  const prom = new Promise(function (resolve, reject) {
    db.times
      .find(params)
      .sort({ status: -1, firstField: 1 })
      .exec(function (err, docs) {
        resolve(docs)
        reject(err)
      })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function addData (data) {
  const prom = new Promise(function (resolve, reject) {
    db.tasks.insert(data, function (err, newData) {
      resolve(newData)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function addSubtaskData (data) {
  const prom = new Promise(function (resolve, reject) {
    db.subtasks.insert(data, function (err, newData) {
      resolve(newData)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function addTimeData (data) {
  const prom = new Promise(function (resolve, reject) {
    db.times.insert(data, function (err, newData) {
      // console.log(newData)
      resolve(newData)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function updateItem (id, newVal) {
  const prom = new Promise(function (resolve, reject) {
    db.tasks.update({ _id: id }, { $set: newVal }, { multi: true }, function (
      err,
      numReplaced
    ) {
      resolve(numReplaced)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function updateSubItem (item, newVal) {
  const prom = new Promise(function (resolve, reject) {
    db.subtasks.update(item, { $set: newVal }, { multi: true }, function (
      err,
      numReplaced
    ) {
      resolve(numReplaced)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

function removeItem (id) {
  const prom = new Promise(function (resolve, reject) {
    db.tasks.remove({ _id: id }, { multi: true }, function (err, numRemoved) {
      resolve(numRemoved)
      reject(err)
    })
  })
  return prom.then(val => onFulfilled(val), err => onRejected(err))
}

//

function onFulfilled (data) {
  return data
}

function onRejected (msg) {
  console.log(msg)
}

export {
  getData,
  addData,
  updateItem,
  removeItem,
  addSubtaskData,
  getSubtaskData,
  updateSubItem,
  getTimeData,
  addTimeData,
  getSubtaskCount
}
