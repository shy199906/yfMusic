<template>
  <div class="box">
    <div class="boxtop">
      <div class="udTime">更新时间:{{udTimer|formatDate}}</div>
    </div>
    <div>
      <div class="bottom">
        <Singer :singerList="this.singerList"></Singer>
      </div>
    </div>
    <!-- <div>查看更多歌手</div> -->
  </div>
</template>
<script>
import Singer from "../components/Singer";
export default {
  data() {
    return {
      singerList: [],
      udTimer: new Date,
      num:1
    };
  },
  components: {
    Singer,
  },
    
  methods: {
   loadSinger(vm){
      vm.axios.get("/toplist/artist").then((d) => {
        vm.udTimer = d.data.list.updateTime
        console.log(vm.udTimer)
        vm.singerList = d.data.list.artists.slice(0, 30);
      });
    }
  },
  filters:{
    formatDate(value){
      let d = new Date(value);
      let mon = (d.getMonth()+1)
      let day = d.getDate()
      return (mon<10?"0"+mon:mon)+"月"+(day<10?"0"+day:day)+"日"
    }
  },
    beforeRouteEnter(to, from, next) {
    next(vm=>{
      // if(typeof vm.$route.params.num == "undefined"){
      //   vm.hotMusicList=[]
        vm.num=0;
      // }
      vm.loadSinger(vm)
    });
  },
};
</script>
<style lang="less" scoped>
.box {
  margin-top: 10px;
  .boxtop {
    display: flex;
    .udTime {
      text-align: left;
      margin-left: 10px;
    }
    div {
      flex: 1;
    }
  }
}
</style>