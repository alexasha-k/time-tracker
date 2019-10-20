<template>
  <div class="pagination">
    <div class="pagination__row">
      <button v-for="num in +pageLength" type="button" class="btn pagination__item" :class="{active: num == currentPage}" @click="$emit('change-current', num)">{{num}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageLength', 'currentPage']
}
</script>

<style lang="scss" scoped>

.pagination {
  &__row {
    display: flex;
    align-items: center;
  }
  &__item {
    margin-right: 12px;
    width: 36px;
    padding: 0;
    text-align: center;
    line-height: 32px;
    background-color: white;
    color: var(--main-color);
    &.active, &:hover {
      background-color: var(--main-color);
      color: white;
    }
  }
}
</style>
