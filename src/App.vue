<template>
  <div id="app">
    <!-- v-show="$route.meat.showNav" -->
    <TopNav v-show="$route.meta.showNav"></TopNav>
    
    <!-- router-view 是路由匹配到组件显示位置 -->
    <div :style="{ paddingTop: '40px', paddingBottom: '60px' }">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Play :musicID="$root.playingMusic.musicID"></Play>
  </div>
</template>
<script>
import TopNav from "./components/TopNav";
import Play from "./components/Play";
export default {
  components: {
    TopNav,
    Play,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
html,
body {
  width: 100%;
}
</style>
