<template>
  <button @click="$emit('sort-by-col')" type="button" class="btn-clear sorting-order" :class="{active: isActive, 'asc': order === 'asc'}">
    <span class="sorting-order__title">{{colTitle}}</span>
    <svg v-if="isActive" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg>
  </button>
</template>

<script>
export default {
  props: ['order', 'isActive', 'colTitle']
}
</script>

<style lang="scss" scoped>
.sorting-order {
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
  &.asc svg {
    transform: scale(-1);
  }
  &__title {
    cursor: pointer;
    border-bottom: 1px dashed;
    opacity: 0.8;
    &.active, &:hover {
      opacity: 1;
    }
  }
}
</style>
