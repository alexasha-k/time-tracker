<template>
  <transition name="fade" appear>
    <div id="app">
      <main-header></main-header>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import MainHeader from './components/MainHeader.vue'

export default {
  name: 'time-tracker',
  components: { MainHeader }
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select';
@import './assets/scss/styles';
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background-color: #f3f3f3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.table {
  border-collapse: collapse;
  width: 100%;
  thead td {
    background-color: #f3f3f3;
    font-weight: 600;
    /deep/ button {
      font-weight: 600;
      font-size: inherit;
    }
  }
  /deep/ td {
    padding: 8px 12px;
    border-bottom: 1px solid #e6e6e6;
  }
  tbody /deep/ tr:nth-child(odd) td {
    background-color: #ffffff;
  }
  tbody /deep/ tr td {
    &.time-counter-cell {
      padding: 0;
      background-color: var(--main-color);
      transition: 0.4s ease;
      &.active {
        background-color: #cd0074;
      }
    }
  }
}
.title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
}
</style>
