<template>
  <div class="Recommend">
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link v-for="rem in recommendMusicList" :key="rem.id" :to="{path:'/musiclist/'+rem.id}" tag='li'>
      <div>
        <img :src="rem.picUrl">
        <span>{{rem.playCount|formatNum}}</span>
      </div>
      <p>{{rem.name|substr(26)}}</p>
      </router-link>
    </ul>
    <Loading v-if="recommendMusicList.length<=0"/>
    <Title>最新音乐</Title>
    <!-- @playMusic="$emit('playMusic',item.id)" -->
     <MusicItem :newMusicList="newMusicList" @playMusic="playMusic"></MusicItem>
     <div class="homeImg">

     </div>
  </div>
</template>

<script>
import Title from '../components/Title'
import MusicItem from '../components/MusicItem'
import Loading from "../components/Loading";

export default {
  name: 'Recommend',
  components: {
    Title,
    MusicItem,
    Loading
  },
  data(){
    return{
      recommendMusicList:[],
      newMusicList:[]
    }
  },
  methods:{
    playMusic(id){
      this.$emit("playMusic",id)
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.$http('/personalized?limit=6').then(data=>{//获取推荐歌单
        vm.recommendMusicList=data.data.result
        console.log(data.data.result)
      }).catch(error=>{
        console.log(error)
      });
      vm.$http('/personalized/newsong').then(data=>{//获取最新音乐列表
        vm.newMusicList=data.data.result
          vm.$store.commit("musicList",vm.newMusicList)
      console.log(vm.$store.state.musicList)
      }).catch(error=>{
        console.log(error)
      });
    })
  },
  filters:{
    formatNum(value){
      return (value/10000).toFixed(1)+"万"
    },
    substr(value,len){
      return value.substr(0,len)+"..."
    }
  }
}
</script>
<style lang="less" scoped>
ul.recommendList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li{
    width: 33%;
    div{
      position: relative;
      span{
        top: 2px;;
        right: 3px;
        position: absolute;
        color: white;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      }
    }
    p{
      font-size: 12px;
      text-align: left;
      
    }
  }
  
}
.homeImg{
    width: 100%;
    height: 33vh;
        margin-top: 10px;
        margin-bottom: -60px;
    background-image: url("../assets/recommand_bg_2x.png");
  }
</style>
