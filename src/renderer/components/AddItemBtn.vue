<template>
<div class="add-btn" title="Add new task" tabindex="0">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="currentColor" /></svg>
</div>
</template>

<script>
export default {
  name: 'AddItemBtn'
}
</script>

<style scoped lang="scss">
.add-btn {
    position: fixed;
    z-index: 120;
    right: 24px;
    bottom: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #666;
    transition: linear 150ms;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 6px #ddd;
    }
}
</style>
