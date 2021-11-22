<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲循环</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click.stop="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
           <ul ref="play">
            <li class="item" v-for="(value,index) in songs" :key="value.id" @click.stop="selectMusic(index)">
              <div class="item-left">
                <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                <p>{{value.name}}</p>
              </div>
              <div class="item-right">
                <div class="item-favorite" @click.stop="favorite(value)" :class="{'active': isFavorite(value)}"></div>
                <div class="item-del" @click.stop="del(index)"></div>
              </div>
            </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom" @click.stop="hidden">
        <p>关闭</p>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 导入IScroll组件
import ScrollView from '../ScrollView'
// 导入动画插件
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
// 导入Vuex辅助函数
import { mapActions, mapGetters } from 'vuex'
// 导入播放模式
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    },
    // 点击切换播放/暂停
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
    // 删除单曲
    del (index) {
      this.setDelSong(index)
    },
    // 清空所有歌曲
    delAll () {
      this.setDelSong()
    },
    // 切换歌曲
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    // 收藏歌曲
    favorite (value) {
      this.setFavoriteSong(value)
    },
    // 设置图标
    isFavorite (song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songs',
      'currentIndex',
      'favoriteList'
    ])
  },
  watch: {
    // 监听图标播放点击切换图标状态
    isPlaying (newValue, oldValue) {
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
    // 监听列表显示隐藏
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        // 让他滚动
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-wrapper{
    .player-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode{
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop{
            @include bg_img('../../assets/images/small_loop');
          }
          &.one{
            @include bg_img('../../assets/images/small_one');
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p{
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .top-right{
        .del{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del');
        }
      }
    }
    .player-middle{
      height: 700px;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/small_pause');
            }
          }
        }
      }
      .item{
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
          align-items: center;
          .item-play{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 20px;
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_un_favorite');
            &.active{
              @include bg_img('../../assets/images/small_favorite')
            }
          }
          .item-del{
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close')
          }
        }
      }
    }
    .player-bottom{
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p{
        text-align: center;
        @include font_size($font_large);
        color: #fff;
      }
    }
  }
}
</style>
