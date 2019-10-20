<template>
  <header>
    <div class="logo">
      Time Tracker
    </div>
    <current-task></current-task>
    <add-item-btn></add-item-btn>
  </header>
</template>

<script>
import AddItemBtn from '../components/common/AddItemBtn.vue'
import CurrentTask from '../components/common/CurrentTask.vue'

export default {
  name: 'MainHeader',
  components: { AddItemBtn, CurrentTask }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--main-color);
  box-shadow: -1px 1px 4px rgba(black, 0.3);
  /deep/ .add-btn {
    color: #ffffff;
  }
}
.logo {
  font-weight: bold;
  font-size: 18px;
  color: #ffffff;
}
</style>
