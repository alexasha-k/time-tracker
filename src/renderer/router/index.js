import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Stats from '@/views/Stats.vue'
import AddNew from '@/views/AddNew.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/add-new',
      name: 'add-new',
      component: AddNew
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
