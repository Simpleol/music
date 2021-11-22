<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="this.currentSong.picUrl" alt="" ref="cd">
          <div class="player-title">
            <h3>{{this.currentSong.name}}</h3>
            <p>{{this.currentSong.singer}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click.stop="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 导入Vuex辅助函数
import { mapActions, mapGetters } from 'vuex'
// 导入动画插件
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showList () {
      // this.$emit('showList')
      // 显示列表播放界面
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      // 显示默认播放界面
      this.setFullScreen(true)
      // 隐藏迷你播放界面
      this.setMiniPlayer(false)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    // 监听图标播放点击切换图标状态
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 如果true就切换为播放状态
        this.$refs.play.classList.add('active')
        // 如果true就切换为播放状态让图片转起来
        this.$refs.cd.classList.add('active')
      } else {
        // 如果false就切换为暂停状态
        this.$refs.play.classList.remove('active')
        // 如果false就切换为暂停状态让图标停下来
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left{
      display: flex;
      padding-left: 30px;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: cd 10s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .player-title{
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        h3{
          @include font_color();
          @include font_size($font_medium);
          @include no-wrap();
        }
        p{
          @include font_color();
          @include font_size($font_medium_s);
          @include no-wrap();
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
@keyframes cd {
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
