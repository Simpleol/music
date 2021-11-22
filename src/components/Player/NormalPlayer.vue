<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="normal-player" v-show="this.isFullScreen">
    <div class="player-wrapper">
     <PlayerHeader></PlayerHeader>
     <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
     <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
   </div>
    <div class="player-bg">
     <img :src="this.currentSong.picUrl" alt="">
    </div>
    </div>
  </transition>
</template>

<script>
// 导入头部组件
import PlayerHeader from './PlayerHeader'
// 导入中间组件
import PlayerMiddle from './PlayerMiddle'
// 导入底部组件
import PlayerBottom from './PlayerBottom'
// 导入Vuex辅助函数
import { mapGetters, mapActions } from 'vuex'
// 导入动画插件
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 800 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 800 }, function () {
        done()
      })
    }
  },
  watch: {
    // 监听歌曲是否发生变化
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) return
      // 如果发生变化就获取歌词
      this.setSongLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      position: absolute;
      height: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      filter: blur(5px);
    }
  }
}

</style>
