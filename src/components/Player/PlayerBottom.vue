<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode loop" @click.stop="mode" ref="mode"></div>
      <div class="prev" @click.stop="prev"></div>
      <div class="play" @click.stop="play" ref="play"></div>
      <div class="next" @click.stop="next"></div>
      <div class="favorite" @click.stop="favorite" :class="{'active': isFavorite(this.currentSong)}"></div>
    </div>
  </div>
</template>

<script>
// 导入Vuex辅助函数
import { mapActions, mapGetters } from 'vuex'
// 导入播放模式
import modeType from '../../store/modeType'
// 导入工具方法
import { formartTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    // 点击播放/暂停
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    // 点击切换模式
    mode () {
      // 如果播放模式是顺序播放
      if (this.modeType === modeType.loop) {
        // 切换为单曲循环
        this.setModeType(modeType.one)
        // 如果播放模式是单曲循环
      } else if (this.modeType === modeType.one) {
        // 切换为随机播放
        this.setModeType(modeType.random)
        // 如果播放模式是随机播放
      } else if (this.modeType === modeType.random) {
        // 切换为顺序播放
        this.setModeType(modeType.loop)
      }
    },
    // 点击切换上一首
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    // 点击切换下一首
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    // 进度条
    progressClick (e) {
      // 计算进度条的位置
      // 拿到进度条距离左边的位置
      // let normalLeft = e.target.offsetLeft
      let normalLeft = this.$refs.progressBar.offsetLeft
      // 拿到点击的位置距离左边的位置
      let eventLeft = e.pageX
      // 拿到点击的位置在进度条的位置
      let clickLeft = eventLeft - normalLeft
      // 拿到进度条的宽度
      // let progressWidth = e.target.offsetWidth
      let progressWidth = this.$refs.progressBar.offsetWidth
      // 拿到比例
      let value = clickLeft / progressWidth
      // 将比例设置给前景
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 计算当前应该从什么位置开始播放
      let currentTime = this.totalTime * value
      // console.log(currentTime)
      // 设置比例
      this.setCurrentTime(currentTime)
    },
    // 设置图标
    isFavorite (song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    },
    // 收藏歌曲
    favorite () {
      this.setFavoriteSong(this.currentSong)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    // 监听图标播放点击切换图标状态
    isPlaying (newValue, oldValue) {
      // console.log(newValue)
      if (newValue) {
        // 如果true就切换为播放状态
        this.$refs.play.classList.add('active')
      } else {
        // 如果false就切换为暂停状态
        this.$refs.play.classList.remove('active')
      }
    },
    // 监听图标点击切换播放模式
    modeType (newValue, oldValue) {
      // console.log(newValue)
      // 如果是顺序播放就添加单曲循环类名并删除顺序播放类名
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.add('loop')
        this.$refs.mode.classList.remove('random')
        // 如果是单曲循环就添加随机播放类名并删除单曲循环类名
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.add('one')
        this.$refs.mode.classList.remove('loop')
        // 如果是随机就添加顺序播放类名并删除随机播放类名
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
      }
    },
    // 监听歌曲总时长变化
    totalTime (newValue, oldValue) {
      let time = formartTime(newValue)
      // 格式化分钟和秒钟
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    // 监听歌曲当前时长变化
    currentTime (newValue, oldValue) {
      // 格式化当前播放的时间
      let time = formartTime(newValue)
      // 格式化分钟和秒钟
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 根据当前播放的时间计算比例
      let value = newValue / this.totalTime * 100
      // 将比例设置给进度条
      this.$refs.progressLine.style.width = value + '%'
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
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress-bar{
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: #fff;
      .progress-line{
        width: 0;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    span{
      @include font_size($font_samll);
      @include font_color();
    }
  }
  .bottom-control{
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      &.loop{
        @include bg_img('../../assets/images/loop')
      }
      &.one{
        @include bg_img('../../assets/images/one')
      }
      &.random{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next')
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite')
      }
    }
  }
}
</style>
