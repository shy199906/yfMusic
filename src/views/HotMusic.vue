<template>
  <div class="hotMusic">
    <div class="top">
      <div class="box">
        <div class="hotimg"></div>
        <p class="UpdateTime">更新时间:{{ UpdateTime | formatDate }}</p>
      </div>
    </div>
    <ul>
      <ListItem  @playMusic="playMusic" v-for="(item,k) in hotMusicList" :num="k+1" :item="item" :key="item.id"></ListItem>
    </ul>
    
    <!-- <div @click='loadMusic(num+1)'>查看更多</div> -->
    <!-- <button @click="loadMusic(num)">查看更多</button> -->
    <router-link class="move" :to="`/HotMusic/${num+1}`">查看更多</router-link>
  </div>
</template>
<script>
import ListItem from '../components/ListItem'
export default {
  name: "HotMusic",
  data() {
    return {
      UpdateTime: new Date(),
      hotMusicList:[],
      num:0

    };
  },

  methods:{
    loadMusic(vm){
        let musicids=[];
        vm.num++;
        vm.$http.get('/top/list?idx=1').then(data=>{//获取热榜信息
          vm.UpdateTime=data.data.playlist.updateTime;//获取更新日期
          musicids=data.data.playlist.trackIds.slice(20*(vm.num-1),20*vm.num);
        }).then(()=>{
            for(let v of musicids){
              vm.$http.get('song/detail?ids='+v.id).then((data)=>{//根据热榜里面歌曲id获取歌曲详细信息
                vm.hotMusicList.push({
                  name:data.data.songs[0].name,
                  id:data.data.songs[0].id,
                  song:{
                    privilege:{
                      maxbr:data.data.privileges[0].maxbr
                    },
                    artists:data.data.songs[0].ar
                  }
                });
              });
            }
      vm.$store.commit("musicList",vm.hotMusicList)

        });
    },
    playMusic(id){
      this.$emit("playMusic",id)
    }
  },
  components:{
      ListItem,
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      if(typeof vm.$route.params.num == "undefined"){
        vm.hotMusicList=[]
        vm.num=0;
      }
      vm.loadMusic(vm)
    });
  },
  beforeRouteUpdate(to,from,next){
    this.loadMusic(this)
    next()
  },
  filters:{
    formatDate(value){
      let d = new Date(value);
      let mon = (d.getMonth()+1)
      let day = d.getDate()
      return (mon<10?"0"+mon:mon)+"月"+(day<10?"0"+day:day)+"日"
    }
  },
};
</script>
<style lang="less">
.top {
  background: url("../assets/hot_music_bg_2x.jpg") no-repeat;
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background-size: contain;
  .box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    z-index: 999;
    .hotimg {
      background: url("../assets/index_icon_2x.png");
      width: 142px;
      height: 67px;
      background-size: 166px 97px;
      background-position: -24px -30px;
    }
    .UpdateTime {
      text-align: left;
      color: white;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
.move{
  text-decoration: none;
  color: #b399b3;
  display: inline-block;
  margin: 5px 0px;
  font-size: 14px;
}
.top::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>