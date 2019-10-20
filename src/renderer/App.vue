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
</style>
