<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} - {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
// 导入Vuex辅助函数
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      // 映射方法
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail'
    ]),
    selectMusic (id) {
      // this.$store.dispatch('setFullScreen', true)
      // 显示默认播放界面
      this.setFullScreen(true)
      // 隐藏迷你播放界面
      this.setMiniPlayer(false)
      // 获取歌单详情数据
      this.setSongDetail([id])
    },
    // 播放全部
    selectAllMusic () {
      // 显示默认播放界面
      this.setFullScreen(true)
      let ids = this.playlist.map(function (item) {
        return item.id
      })
      // 获取全部歌单详情数据
      this.setSongDetail([ids])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title{
      @include font_size($font_large);
      @include font_color();
    }
  }
  .item{
    h3{
      @include font_color();
      @include font_size($font_medium);
      margin-bottom: 5px;
      @include clamp(1);
    }
    p{
      @include font_color();
      @include font_size($font_samll);
      @include clamp(1);
      opacity: 0.8;
    }
  }
}
</style>
