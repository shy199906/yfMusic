<template>
  <div>
    <form @submit.stop.prevent="searchList(keywords)">
      <div class="search">
        <div>
          <span></span>
          <input
            type="text"
            ref="ipt"
            placeholder="搜索歌曲、歌手、专辑"
            v-model="keywords"
            @input="iptChange"
          />
          <span @click="removeKeywords"></span>
        </div>
      </div>
    </form>
    <div class="search-bom" v-show="keywords == ''">
      <h3>热门搜索</h3>

      <ul>
        <!-- @click="dj(k.first )" -->
        <li
          @click="hotclick(k.first)"
          v-for="(k, index) in hotSearch"
          :key="index"
          class=""
        >
          {{ k.first }}
        </li>
      </ul>
    </div>
    <Suggest
      v-show="showSearch"
      :suggests="suggests"
      :keywords="keywords"
      @searchResult="searchList"
    />
    <Loading v-show="searching" />
    <SearchResult v-show="showList" :searchMusicList="searchMusicList" />
    <!-- <router-view> -->
    <p ref="scrollbar"><Loading v-show="searching" /></p>
  </div>
</template>
<script>
import Suggest from "../components/Suggest";
import Loading from "../components/Loading";
import SearchResult from "../components/SearchResult.vue";
export default {
  name: "Search",
  data() {
    return {
      hotSearch: [],
      keywords: "",
      suggests: [],
      searchMusicList: [],
      searching: false, //是否显示 加载loading
      showList: false, //是否显示 搜索结果
      showSearch: false, //是否显示 搜索提示
      searchChange: false, // 监听搜索框
      num:0
    };
  },
  created() {
    // window.addEventListener("scroll",()=>{
    //   let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    //   let clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //   let barTop = this.$refs.scrollbar.offsetTop;
    //   console.log(scrollTop)
    //   console.log(clientHeight)
    //   console.log(barTop)
    //   if(scrollTop + clientHeight == barTop){
    //     console.log(11111)
    //     this.num++
    //     console.log("num",this.num)
    //   }
    // });
  },
  destroy() {
    window.removeEventListener("scroll", this.listenScroll);
  },
  methods: {
    hotclick(value) {
      console.log(this.kwds);
      this.keywords = value;
      this.$store.commit("keyname", value);
      this.showList = false;
      this.clickMusic(value);
    },
    clickMusic(val) {
      this.searching = true;
      this.searchChange = true;
      this.axios.get("/search?keywords=" + val).then((d) => {
        console.log(d);
        if (d.data.code == 200) {
          this.showList = true;
          this.searching = false;
          this.searchMusicList = d.data.result.songs.map((dat) => {
            return {
              name: dat.name,
              id: dat.id,
              song: {
                artists: dat.artists,
                privilege: {
                  maxbe: 1,
                },
              },
            };
          });
          // console.log(this.searchMusicList)
        }
      });
    },
    searchList(keywords) {
      this.keywords = keywords;
      this.$store.commit("keyname", keywords);
      this.showList = false;
      this.searching = false;
      this.showSearch = false;
      this.clickMusic(keywords);
    },
    removeKeywords() {
      this.keywords = "";
    },
    iptChange() {
      this.searchChange = false;
    },
  },
  watch: {
    keywords(val) {
      //loadding要显示
      this.showList = false;
      this.suggests = [];
      if (!this.searchChange) {
        this.searchChange = false;
        this.$http
          .get("/search/suggest?keywords=" + val)
          .then((data) => {
            if (data.data.code == 200 && data.data.result.order) {
              let result = data.data.result;
              let re = result.order.reduce((prev, v) => {
                if (v !== "playlists") {
                  let rev = result[v];
                  return prev.concat(rev);
                }
                return prev;
              }, []);
              this.suggests = re;
              this.searching = false;
              this.showSearch = true;
              if (this.keywords == "") {
                this.suggests = [];
              }
            }
          })
          .finally(() => {
            this.searching = false;
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http
        .get("/search/hot")
        .then((data) => {
          vm.hotSearch = data.data.result.hots;
        })
        .catch(() => {});
    });
  },
  components: {
    Suggest,
    Loading,
    SearchResult,
  },
};
</script>
<style lang="less" scoped>
div {
  .search {
    padding: 0px 10px;
    border-bottom: 1px solid #f0f1f2;
    div {
      margin: 20px auto;
      width: 90%;
      border-radius: 15px;
      background-color: #ebecec;
      height: 30px;
      span {
        display: inline-block;
        width: 13px;
        height: 13px;
        vertical-align: middle;
        &:first-of-type {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
        }
        &:last-of-type {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
        }
      }
      input {
        width: 85%;
        background-color: #ebecec;
        height: 30px;
        outline: none;
        border: none;
      }
    }
  }
  .search-bom {
    h3 {
      text-align: left;
      padding: 10px;
      font-size: 12px;
    }
    ul {
      margin-right: 45px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 5px 8px;
        font-size: 13px;
        margin: 5px;
        text-align: center;
        margin-top: 3px;
        margin-bottom: 5px;
        flex: auto;
      }
    }
  }
}
</style>