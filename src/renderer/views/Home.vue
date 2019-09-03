<template>
<div>
  <main-header></main-header>
  <list-filters></list-filters>
  <to-do-list></to-do-list>
  <add-item-btn></add-item-btn>
  <app-status-icon></app-status-icon>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ListFilters from '../components/ListFilters.vue'
import ToDoList from '../components/ToDoList.vue'
import AddItemBtn from '../components/AddItemBtn.vue'
import AppStatusIcon from '../components/AppStatusIcon.vue'

export default {
  name: 'Home',
  components: {
    ToDoList,
    MainHeader,
    ListFilters,
    AddItemBtn,
    AppStatusIcon
  }
}
</script>
