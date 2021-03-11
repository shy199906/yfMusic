<template>
  <div>
    <ul>
      <ListItem
        v-for="sm in searchMusicList"
        :key="sm.id"
        :item="sm"
      ></ListItem>
      <!-- <div>查看更多</div> -->
    </ul>
  </div>
</template>
<script>
import ListItem from "./ListItem";
export default {
  props: ["searchMusicList"],
  components: {
    ListItem,
  },
  methods: {},
  mounted() {
  },
};
</script>
<style lang="less" scoped>
</style>