<template>
  <div class="recommendSong">
    <div class="recommendImg">
      <div class="back" @click="back">
        <img src="../assets/back.png" alt="" />
      </div>
      <div class="recoImg"></div>
      <div :style="`background-image:url(${tjMUsicImg})`" class="bgImg"></div>
      <div class="tjfont">
        <div class="left">
          <img :style="`background-image:url(${tjMUsicImg})`" />
        </div>
        <div class="right">
          <span>{{ Character }}</span>
          <div>
            <div>
              <img :src="headPortrait" alt="" />
            </div>
            <span>{{ nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ListItem
        v-for="(item, k) in tjMUsic"
        :num="k + 1"
        :item="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import ListItem from "../components/ListItem";
export default {
  components: {
    ListItem,
  },
  props: {
    musicid: {
      type: Number,
    },  
  },
  data() {
    return {
      tjMusicID: 0,
      tjMUsic: [],
      hotMusicList: [],
      tjMUsicImg: "",
      //人物
      Character: "",
      //头像
      headPortrait: "",
      //用户名
      nickname: "",
      isImg:false
    };
  },
  methods: {
      back(){
          this.$router.push('/')
      },
    gd(vm) {
      //   vm.tjMusicID = vm.$route.params.musicid
      let tjMusicList = [];
      vm.tjMUsic = [];
      vm.$http
        .get("/playlist/detail?id=" + vm.tjMusicID)
        .then((data) => {
          let dataPlyalist = data.data.playlist;

          vm.tjMUsicImg = dataPlyalist.coverImgUrl;
          vm.Character = dataPlyalist.name;

          vm.headPortrait = dataPlyalist.creator.avatarUrl;

          vm.nickname = dataPlyalist.creator.nickname;

          //   console.log(vm.headPortrait.creator.avatarUrl)

          tjMusicList = dataPlyalist.trackIds.slice(0, 20);
          // console.log(tjMusicList)
          vm.$store.commit("musicList",tjMusicList)
          // console.log(vm.$store.state.musicList)
        })
        .then(() => {
          for (let v of tjMusicList) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              // console.log(data)
              vm.tjMUsic.push({
                name: data.data.songs[0].name,
                id: data.data.songs[0].id,
                song: {
                  privilege: {
                    maxbr: data.data.privileges[0].maxbr,
                  },
                  artists: data.data.songs[0].ar,
                },
              });
            });
          }
        });

      vm.tjMUsicImg = "";
    },
  },

  filters: {
    formatNum(value) {
      return (value / 10000).toFixed(1) + "万";
    },
    substr(value, len) {
      return value.substr(0, len) + "...";
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.tjMusicID = to.params.musicid;
       
      vm.gd(vm);
    });
  },

};
</script>

<style lang="less" scoped>
.recommendSong {
  margin-top: -40px;
  .back {
    position: absolute;
    left: 8px;
    top: 13px;
    width: 22px;
    height: 22px;
    background-color: rgba(245, 19, 19, 0.6);
    border-radius: 50%;
    z-index: 999;
    img {
      width: 16px;
      height: 16px;
      background-image: url("../assets/back.png");
      vertical-align: middle;
      padding-right: 3px;
    }
  }
  .recommendImg {
    position: relative;
    padding: 45px 20px;
    overflow: hidden;
    height: 190px;
    .recoImg {
      z-index: 10;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0.25;
      background: #000;
    }
    .bgImg {
      height: 190px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: block;
      background-repeat: no-repeat;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(15px);
    }
    .tjfont {
      display: flex;
      position: relative;
      z-index: 100;
      color: #fff;
      .left {
        width: 100px;
        height: 100px;
        img {
          width: 100px;
          height: 100px;
          display: block;
          background-repeat: no-repeat;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      .right {
        width: 60vw;
        div {
          display: flex;
          line-height: 66px;
          div {
            width: 30px;
            height: 30px;
            margin: 20px 10px 0px 15%;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>