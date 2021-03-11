<template>
  <div class="comments">
    <div
      class="bg"
      :style="{
        background: 'url(' + this.$store.state.picImg + ')',
        backgroundSize: 'contain',
        filter: 'blur(' + 20 + 'px)',
        opacity: '0.5',
        transform: 'scale(' + 1 + ')',
      }"
    ></div>
    <div class="back" @click="back">
        <img src="../assets/back.png" alt="">
    </div>
    <h2>热门评论</h2>
    <ul>
      <li v-for="(tc, k) in topCommentsList" :key="k">
        <div class="left">
          <img :src="tc.user.avatarUrl" alt="" />
        </div>
        <div class="right">
          <div class="right_top">
            <div class="ctname">
              <p>{{ tc.user.nickname }}</p>
              <p>{{ tc.time |formatDate}}</p>
            </div>
            <div>
              <span>{{ tc.likedCount }}</span>
              <img src="../assets/zan.png" alt="">
            </div>
          </div>
          <div class="right_bottom">
            <span>"{{tc.content}}"</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    musicid: {
      type: Number,
    },
  },
  data() {
    return {
      topCommentsID: 0,
      topCommentsList: [],
    };
  },
  methods: {
      back(){
           this.$router.push('/')
      },
    comments(vm) {
      vm.$http
        .get("/comment/music?id=" + vm.topCommentsID + "&limit=10")
        .then((data) => {
          console.log(data);
          //   console.log(data.data.comments)
          vm.topCommentsList = data.data.comments;
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.topCommentsID = vm.$root.playingMusic.musicID;
      vm.comments(vm);
    });
  },
   filters:{
    formatDate(value){
      let d = new Date(value);
      let h = d.getHours()
      let m = d.getMinutes()
      return (h<10?"0"+h:h)+":"+(m<10?"0"+m:m)
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: -40px;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  h2 {
    text-align: left;
    margin-left: 5px;
    margin-bottom: 10px;
  }
  ul{
      li{
          display: flex;
          margin: 20px 0px;
          .left{
              width: 10%;
              margin: 0px 10px 0px 0px;
              img{
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
              }
          }
          .right{
              flex: 1;
              font-size: 16px;
              padding-bottom: 20px;
                border-bottom: 1px solid #000;
              .right_top{
                  display: flex;
                  justify-content: space-between;
                  .ctname{
                      text-align: left;
                  }
                    div:last-child{
                        img{
                            width: 20px;
                            height: 20px;
                        }
                    }
              }
              .right_bottom{
                  margin-top: 10px;
                  text-align: left;
              }
          }
      }
  }
}
    .back {
      width: 22px;
      height: 22px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
     margin: 10px 0px 10px 10px;
     position: relative;
     z-index: 99;
      img {
        width: 16px;
        height: 16px;
        background-image: url("../assets/back.png");
        vertical-align: middle;
        padding-right: 3px;
      }
    }
</style>
