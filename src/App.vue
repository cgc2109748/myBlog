<template>
  <div id="app">
    <!-- <div class="mainframe-wrap" :style="{'width': mainWidth+'px'}"> -->
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      mainWidth: window.innerWidth,
    }
  },
  mounted () {
  }
}
</script>

<style>
body {
  position: relative;
  margin: 0;
  overflow-x: hidden;
  background: #fff;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
  font-style: '微软雅黑';
  height: 100%;
}

</style>
