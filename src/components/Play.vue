<template>
  <div class="player">
    <audio
      autoplay
      ref="musicplayer"
      controls
      :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
      @timeupdate="timeupdate"
    />
    <div class="playerBar" v-show="showbutton">
      <i ref="rollImg">
        <img :src="song.al.picUrl" />
      </i>
      <!-- <i v-if="item.song.artists.length>1">{{"/"+song.ar[1].name}}</i> -->
      <i @click="showFull">
        <div>
          {{ song.name }}-{{ song.ar[0].name
          }}<span v-if="song.ar.length > 1">{{ "/" + song.ar[1].name }}</span>
        </div>
      </i>
      <i @click="togglePlay">
        <canvas ref="canvas" width="50" height="50"> </canvas>
        <div v-show="!this.$root.playingMusic.isPlay" class="playbtn">
          <img src="../assets/play.png" alt="" />
        </div>
        <div v-show="this.$root.playingMusic.isPlay" class="playbtn">
          <img src="../assets/stop.png" alt="" />
        </div>
      </i>
    </div>
    <div class="fullLrc" v-show="isFullLrc">
      <div
        class="imgurl"
        :style="{
          background: 'url(' + song.al.picUrl + ')',
          backgroundSize: 'contain',
          opacity: '0.5',
          transform: 'scale(' + 1 + ')',
          filter: 'blur(' + 20 + 'px)',
        }"
      ></div>
      <div class="back" @click="showfullLrc">
        <img src="../assets/back.png" alt="" />
      </div>
      <div class="songName">
        {{ song.name }}-{{ song.ar[0].name
        }}<span v-if="song.ar.length > 1">{{ "/" + song.ar[1].name }}</span>
      </div>
      <div class="bigImg"><img ref="rollImg2" :src="song.al.picUrl" /></div>
      <div class="lrc">
        <div>
          <ul :style="{ transform: `translateY(-${lrcCurrent * 25}px)` }">
            <li
              v-for="(lrc, i) in lrcArr"
              :key="i"
              :class="{ active: i == lrcCurrent }"
            >
              {{ lrc.lyric }}
            </li>
          </ul>
        </div>
      </div>
      <div class="bottomplay">
        <div class="turnImg">
          <img :src="song.al.picUrl" />
        </div>
        <div class="boxCenter">
          <div class="playstop">
            <div class="prevplay" @click="prev">
              <img src="../assets/prevplay.png" alt="" />
            </div>
            <div v-show="!this.$root.playingMusic.isPlay" class="playbtn">
              <img @click="togglePlay" src="../assets/play.png" alt="" />
            </div>
            <div v-show="this.$root.playingMusic.isPlay" class="playbtn">
              <img @click="togglePlay" src="../assets/stop.png" alt="" />
            </div>
            <div class="nextplay" @click="next">
              <img src="../assets/nextplay.png" alt="" />
            </div>
          </div>
          <div class="progress">
            <span class="totalTime">{{ currentTime | timer }}</span>
            <div class="jd" ref="jdt">
              <van-slider v-model="bfb" @change="onChange" />
            </div>
            <span class="totalTime">{{ duration | timer }}</span>
            <span></span>
          </div>
        </div>
        <router-link
          tag="div"
          :to="{
            path: '/TopComments/' + this.$root.playingMusic.musicID,
          }"
          class="right"
        >
          <img @click="showfullLrc" src="../assets/comments.png" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["musicID"],
  data() {
    return {
      song: {
        al: {
          picUrl: "",
        },
        name: null,
        ar: [{ name: "" }],
      },
      lrcArr: [],
      isFullLrc: false,
      lrcCurrent: 0,
      currentTime: 0,
      duration: 0,
      bfb: 0,
      showbutton: false,
    };
  },
  methods: {
    showFull() {
      this.isFullLrc = true;
    },
    prev(){
      // console.log(this.$root.playingMusic.musicID)
      // this.$root.playingMusic.musicID = 1811118551
      for(let i in this.$store.state.musicList){
        let len = this.$store.state.musicList.length-1
        if(this.$root.playingMusic.musicID == this.$store.state.musicList[i].id){
           if(i <= 0){
              this.$root.playingMusic.musicID = this.$store.state.musicList[len].id
            }
              this.$root.playingMusic.musicID = this.$store.state.musicList[i-1].id
        }
        
        
      }
      // console.log(this.$store.state.musicList)
      // if(){}
    },
    next(){
        
      for(let k =0; k<this.$store.state.musicList.length; k++){
         if(this.$root.playingMusic.musicID == this.$store.state.musicList[k].id){
          if(k >= this.$store.state.musicList.length-1){
                console.log(k)
                console.log(this.$store.state.musicList.length-1)
                  this.$root.playingMusic.musicID = this.$store.state.musicList[0].id
              }else{
                k++
                  this.$root.playingMusic.musicID = this.$store.state.musicList[k].id
              }

      }

    
      }
    },
    showfullLrc() {
      if (this.isFullLrc == true) {
        this.isFullLrc = false;
      } else {
        this.isFullLrc = true;
      }
    },
    onChange(value) {
      this.$refs.musicplayer.currentTime =
        parseInt(this.duration * value) / 100;
    },
    togglePlay() {
      if (this.$root.playingMusic.isPlay) {
        this.$root.playingMusic.isPlay = false;
        this.$refs.musicplayer.pause();
        this.$refs.rollImg.style.animationPlayState = "paused";
        this.$refs.rollImg2.style.animationPlayState = "paused";
        // console.log(e.target)
      } else {
        this.$root.playingMusic.isPlay = true;
        this.$refs.musicplayer.play();
        this.$refs.rollImg.style.animationPlayState = "running";
        this.$refs.rollImg2.style.animationPlayState = "running";
      }
    },

    timeupdate(event) {
      let audio = event.target;
      this.currentTime = audio.currentTime;
      this.duration = audio.duration;
      // console.log(this.currentTime,this.duration)
      this.bfb = parseFloat((this.currentTime / this.duration) * 100);
      // console.log(duration)
      for (let i in this.lrcArr) {
        let i2 = parseInt(i) + 1;
        if (i == this.lrcArr.length - 1) {
          this.lrcCurrent = i;
          break;
        }
        let lrcTime = this.lrcArr[i].time;
        //判断当前歌词事件如果 小于当前播放事件 但是大于上一个事件， 单签各吃播放
        if (
          this.currentTime >= lrcTime &&
          this.currentTime < this.lrcArr[i2].time
        ) {
          this.lrcCurrent = i;
          break;
        }
      }
      this.drawCircle(this.currentTime, this.duration);
      // this.timer(currentTime)
      // this.timer(duration)
      //   console.log(audio.currentTime,audio.duration)
    },
    drawCircle(c, d) {
      let canvas = this.$refs.canvas;
      let cxt = canvas.getContext("2d");

      cxt.beginPath();
      cxt.strokeStyle = "black";
      cxt.arc(25, 25, 20, 0, Math.PI * 2);
      cxt.stroke();
      cxt.closePath();

      cxt.beginPath();
      cxt.strokeStyle = "blue";
      cxt.arc(25, 25, 20, 0, Math.PI * 2 * (c / d));
      cxt.stroke();
      cxt.closePath();
    },
  },
  filters: {
    timer(seconds) {
      var h = parseInt(seconds / 3600);
      var m = parseInt((seconds / 60) % 60);
      var s = parseInt(seconds % 60);
      // var time = '';

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return `${h}:${m}:${s}`;
    },
  },
  watch: {
    musicID(val) {
      this.showbutton = true;
      this.$root.playingMusic.isPlay = true;
      this.$refs.rollImg.style.animationPlayState = "running";
      this.$refs.rollImg2.style.animationPlayState = "running";
      this.$http.get("/song/detail?ids=" + val).then((data) => {
        console.log(data);
        this.song = data.data.songs[0];
        this.$store.commit("picImg", this.song.al.picUrl);
      });
      this.$http.defaults.baseURL = "http://music.kele8.cn";
      this.$http.get("/lyric?id=" + val).then((lrcdata) => {
        let lrc = lrcdata.data.lrc.lyric;
        let lrcArr = lrc.split(/\n/);
        let reg = /\[(\d+):(\d+\.\d+)\](.+)/;
        this.lrcArr = lrcArr.map((lc) => {
          reg.test(lc);
          return {
            time: parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
            lyric: RegExp.$3,
          };
        });
      });
      this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";

      return val;
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  min-width: 320px;
  max-width: 640px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 999;
  audio {
    height: 50px;
    display: none;
  }
  .playerBar {
    display: flex;
    background-color: rgb(133, 141, 150);
    padding: 0px 10px;
    // background-color: black;
    i {
      display: inline-block;
      &:first-of-type {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        animation: rollImg 3s linear infinite;
      }
      &:nth-of-type(2) {
        flex: 1;
        font-size: 16px;
        margin: 0 auto;
        font-style: normal;
      }

      &:last-of-type {
        width: 50px;
        height: 50px;
        position: relative;
        div {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 99;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .fullLrc {
    width: 100%;
    // height: 100%;
    height: 100vh;
    // background-color: rgba(0, 0, 0, 0.4);
    // background-color: rgb(136, 147, 151);
    background-color: white;
    position: relative;
    z-index: 1;
    overflow: hidden;
    .imgurl {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
    .songName {
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
    }
    .back {
      width: 22px;
      height: 22px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      position: absolute;
      left: 20px;
      top: 20px;
      z-index: 99;
      img {
        width: 16px;
        height: 16px;
        background-image: url("../assets/back.png");
        vertical-align: middle;
        padding-right: 3px;
      }
    }
    .bigImg {
      margin: 0 auto;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background-color: rgb(85, 79, 79);
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        animation: rollImg 15s linear infinite;
      }
    }
    .lrc {
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      height: 26vh;
      top: 5vh;
      div {
        width: 100%;
        margin: 0 auto;
        top: 15vh;
        position: absolute;
        ul {
          li {
            height: 25px;
            &.active {
              color: red;
            }
          }
        }
      }
    }
    .bottomplay {
      width: 100%;
      height: 60px;
      // background-color: rgb(169, 169, 208);
      // background-color: #fff;
      margin-bottom: 20px;
      position: fixed;
      bottom: 0;
      display: flex;
      //进度条
      .boxCenter {
        flex: 1;
        .playstop {
          display: flex;
          flex-wrap: wrap;
          div {
            flex: 33.33%;
            margin-top: 10px;
          }
          .playbtn {
            img {
              margin: 0 auto;
              width: 25px;
              height: 25px;
              display: block;
            }
          }
          .nextplay {
            img {
              margin: 0 auto;
              width: 25px;
              height: 25px;
              display: block;
            }
          }
          .prevplay {
            img {
              margin: 0 auto;
              width: 25px;
              height: 25px;
              display: block;
            }
          }
        }
        .progress {
          display: flex;
          margin: 5px;
          position: relative;
          .jd {
            width: 30vw;
            height: 5px;
            margin: 5px;
            position: relative;

            /deep/ .van-slider__button {
              width: 5px;
              height: 5px;
            }
          }
          .totalTime {
            font-size: 14px;
          }
          div {
            flex: 1;
          }
        }
      }
      .turnImg {
        width: 60px;
        height: 60px;
        margin: 5px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
      }
      .right {
        line-height: 60px;
        width: 60px;
        height: 60px;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}

@keyframes rollImg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>