<template>
  <!-- <router-link :key="item.id" tag="li" to="/"> -->
  <li :key="item.id" @click="playingMusic">
    <div class="camel" v-if="num != -1">{{ num | formatNum }}</div>
    <div class="left">
      <div>{{ item.name }}</div>
      <p>
        <span v-if="item.song.privilege.maxbr > 320000"></span
        >{{ item.song.artists[0].name
        }}<i v-if="item.song.artists.length > 1">{{
          "/" + item.song.artists[1].name
        }}</i>
        -{{ item.name }}
      </p>
    </div>
    <div class="right">
      <span></span>
    </div>
  </li>
  <!-- </router-link> -->
</template>
<script>
export default {
  props: {
    item: Object,
    num: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    playingMusic() {
      this.$root.playingMusic.musicID = this.item.id;
    },
  },
  filters: {
    formatNum(val) {
      return val < 10 ? "0" + val : val;
    },
  },
  // watch:{
  //   playingMusic(){
  //     console.log(1111)
  //   }
  // }
};
</script>
<style lang="less" scoped>
li {
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  div.left {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #ddd;
    div {
      font-size: 17px;
      color: black;
    }
    p {
      font-size: 12px;
      color: #888;
      padding: 3px 0px;
      span {
        display: inline-block;
        width: 16px;
        height: 9px;
        line-height: 16px;
        background-image: url("../assets/index_icon_2x.png");
        background-position: 0px 0;
        background-size: 166px 97px;
      }
      i {
        font-style: normal;
      }
    }
  }
  div.right {
    border-bottom: 1px solid #ddd;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 22px;
      height: 22px;
      background-image: url("../assets/index_icon_2x.png");
      background-position: -24px 0;
      background-size: 166px 97px;
    }
  }
  div.camel {
    line-height: 46px;
    padding-right: 10px;
  }
  &:nth-child(-n + 3) {
    color: red;
  }
}
</style>