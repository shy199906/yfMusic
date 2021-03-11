<template>
  <div class="box">
    <div class="zjname">
      <span @click="back" class="black">
        <img src="../assets/back.png" alt="" />
      </span>
      <i> {{ name }}专辑列表 </i>
    </div>
    <ul>
      <router-link :to="{path:'/AlbumList/'+s.id}" tag="li" v-for="(s, k) in SingerArr" :key="k">
        <div>
          <img :src="s.blurPicUrl" />
          {{ s.name }}
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SingerDetails",
  props: {
    SingerID: {
      type: Number,
    },
  },

  data() {
    return {
      SingerListID: 0,
      AlbumListID:0,
      SingerArr: [],
      name: "",
    };
  },
  methods: {
      back(){
          this.$router.push('/SingerList')
      }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.SingerListID = to.params.SingerID;
      vm.$http
        .get("/artist/album?id=" + vm.SingerListID + "&limit=10")
        .then((d) => {
          vm.SingerArr = d.data.hotAlbums;
          vm.name = d.data.artist.name;
         
        });
    //   vm.$http.get("/album?id=121012393").then(d=>{
    //       console.log(d)
    //   })
    });
  },
};
</script>
<style lang="less" scoped>
.box {
  margin-top: -40px;
  margin-bottom: -60px;
  background: linear-gradient(to top, skyblue 0%, pink 100%);
  .zjname {
    margin: 0px 10px 10px;
    font-weight: bold;
    text-align: left;
    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-color: rgb(233, 109, 109);
      border-radius: 50%;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-left: 2px;
      }
    }
    i {
      font-style: normal;
      font-size: 16px;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    li {
      width: 50%;
      padding: 10px;
      img {
        border-radius: 10px;
      }
    }
  }
}
</style>