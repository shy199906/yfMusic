<template>
  <div class="box">
    <ul class="topnav">
      <li><router-link tag="a" to="/">推荐音乐</router-link></li>
      <li><router-link tag="a" to="/HotMusic">热歌榜</router-link></li>
      <li><router-link tag="a" to="/SingerList">歌手榜</router-link></li>
      <li><router-link tag="a" to="/search">搜索</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
    background-color: white;
    .topnav {
      display: flex;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      li {
        line-height: 40px;
        flex: 1 1 auto;
        font-size: 15px;
        a {
          display: inline-block;
          text-decoration: none;
          color: #000;
          &.router-link-exact-active {
            color: red;
            border-bottom: 5px solid red;
          }
        }
      }
    }
}
</style>