<template>
  <ul>
    <router-link :to="{path:'/SingerDetails/'+s.id}" tag="li" v-for="(s, k) in singerList" :key="s.id">
      <div class="left">
        <span>
          {{ k + 1 }}
        </span>
      </div>
      <div class="center">
        <img :src="s.img1v1Url" />
      </div>
      <div class="right">
        <div class="fontName">{{ s.name }}</div>
        <div class="hot">
          <img src="../assets/hot.png" alt="" />
          <span>{{ s.score }}</span>
        </div>
      </div>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: "Singer",
  props: ["singerList"],
  data() {
    return {
      SingerID:0
    };
  },
  methods: {},
  // created(){
  //   this.axios.get("/toplist/artist").then((d) => {
  //     console.log(d);
  //   });

  // }
};
</script>

<style lang="less" scoped>
ul {
  li:nth-child(-n+3) .left{
      color: red;
  }
  li {
    display: flex;
    margin: 10px 10px 10px 0px;
    .left {
      width: 10%;
      line-height: 80px;
    }
    .center {
      img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .fontName {
        text-align: left;
      }
      .hot {
        text-align: left;
        color: #959595;
        margin-top: 5px;
        img {
          width: 12px;
          height: 12px;
          margin-right: 3px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>