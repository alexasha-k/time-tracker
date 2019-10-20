<template>
  <div class="add-new">
    <router-link class="link" to="/">back</router-link>
    <h1>Add New Item</h1>
    <div class="box">
      <div class="box__inner">
        <add-item-form></add-item-form>
      </div>
    </div>
  </div>
</template>

<script>
import AddItemForm from '../components/AddItemForm'

export default {
  components: { AddItemForm }
}
</script>

<style lang="scss" scoped>
.add-new {
  padding: 0 24px 24px;
  height: calc(100vh - 78px);
  overflow-y: auto;
}
</style>
