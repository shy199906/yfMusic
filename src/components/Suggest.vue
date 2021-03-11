<template>
  <ul class="suggests">
    <h3 v-show="keywords!=''">搜索:"{{ keywords }}"</h3>
    <li v-for="s in suggests" :key="s.id" @click="$emit('searchResult',s.name)">{{ s | filtType }}{{ s.name }}</li>
  </ul>
</template>
<script>
export default {
  props: {
    suggests: {
      type: Array,
      default: function () {
        return [];
      },
    },
    keywords: String,
  },
  filters: {
    filtType(v) {
      if (typeof v.artists != "undefined") {
        return "歌曲:";
      } else if (typeof v.artist != "undefined") {
        return "专辑:";
      } else {
        return "歌手:";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.suggests {
  h3 {
    text-align: left;
    height: 50px;
    margin-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
      border-bottom: 1px solid #ddd;

  }
  li {
    text-align: left;
    padding-left: 15px;
    text-align: left;
    height: 50px;
    margin-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
      border-bottom: 1px solid #ddd;
  }
}
</style>