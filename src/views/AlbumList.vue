<template>
  <div class="recommendSong">
    <div class="recommendImg">
      <div class="back" @click="back">
        <img src="../assets/back.png" alt="" />
      </div>
      <div class="recoImg"></div>
      <div :style="`background-image:url(${AlbumImg})`" class="bgImg"></div>
      <div class="tjfont">
        <div class="left">
          <img :style="`background-image:url(${AlbumImg})`" />
        </div>
        <div class="right">
          <span>{{ AlbumName }}</span>
          <div>
            <div class="description">
              <span>专辑描述:</span>{{ AlbumDescription }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ListItem
        v-for="(item, k) in AlbumMusic"
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
  props: {
    AlbumID: {
      type: Number,
    },
  },
  components: {
    ListItem,
  },
  data() {
    return {
      Alid: 0,
      AlbumImg: "",
      AlbumName: "",
      AlbumDescription: "",
      AlbumMusic: [],
    };
  },
  methods: {
    back() {
      this.AlbumMusic = []
      this.$router.back();

    },
    Album(vm) {
      let AlMuxicList = [];
      vm.$http
        .get("/album?id=" + vm.Alid)
        .then((d) => {
          vm.AlbumImg = d.data.album.picUrl;
          vm.AlbumName = d.data.album.name;
          vm.AlbumDescription = d.data.album.description;
          AlMuxicList = d.data.songs;
        })
        .then(() => {
          for (let v of AlMuxicList) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              vm.AlbumMusic.push({
                name: data.data.songs[0].name,
                id: data.data.songs[0].id,
                song: {
                  privilege: {
                    maxbr: data.data.privileges[0].maxbr,
                  },
                  artists: data.data.songs[0].ar,
                },
              });
          vm.$store.commit("musicList",vm.AlbumMusic)

            });
          }
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.Alid = to.params.AlbumID;
      vm.Album(vm);
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
          margin: 10px 0px 0px 10px;
          .description {
            width: 100%;
            font-size: 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin-top: 3px;
            span {
              color: skyblue;
            }
          }
        }
      }
    }
  }
}
</style>