<template>
  <div class="add-btn" title="Add new task" tabindex="0">
    <router-link to="/add-new">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
          fill="currentColor"
        />
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AddItemBtn'
}
</script>

<style scoped lang="scss">
.add-btn {
  color: #333;
  cursor: pointer;
  transition: linear 150ms;
  a {
    color: currentColor;
  }
}
</style>
