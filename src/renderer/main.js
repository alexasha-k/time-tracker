import Vue from 'vue'
import axios from 'axios'
import vSelect from 'vue-select'

import App from './App'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const requireComponent = require.context(
  // The relative path of the components folder
  './components/base',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.component('v-select', vSelect)

Vue.filter('formatTime', function (time) {
  let seconds = Math.floor(time / 1000) % 60
  seconds = ('0' + seconds).slice(-2)
  let minutes = Math.floor(time / 60000) % 60
  minutes = ('0' + minutes).slice(-2)
  let hours = Math.floor(time / 3600000)
  return `${hours}:${minutes}:${seconds}`
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  beforeCreate () {
    this.$store.commit('timer/INITIALISE_STORE')
  },
  template: '<App/>'
}).$mount('#app')
