<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{this.currentSong.name}}</h3>
      <p>{{this.currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
// 导入Vuex辅助函数
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      // 隐藏默认播放界面
      this.setFullScreen(false)
      // 显示迷你播放界面
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  // @include bg_color();
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-title{
    display: flex;
    // 改变为垂直
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
  .header-left{
    @include bg_img('../../assets/images/down')
  }
  .header-right{
    // @include bg_img('../../assets/images/more')
  }
}

</style>
