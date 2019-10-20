<template>
  <div>
    <div class="scroll">
      <to-do-list></to-do-list>
    </div>
  </div>
</template>

<script>
import ToDoList from '../components/ToDoList.vue'

export default {
  name: 'Home',
  components: {
    ToDoList
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  height: calc(100vh - 78px);
  overflow-y: scroll;
}
</style>
