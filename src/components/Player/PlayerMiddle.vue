<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="this.currentSong.picUrl" alt="">
      </div>
      <p v-if="this.getFirstLyric() !== '' || this.getFirstLyric() !== null || this.getFirstLyric() !== undefined">{{ getFirstLyric() }}</p>
      <p v-else>暂无歌词</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(value,key) in currentLyric" :key="key" :class="{'active':currentLineNum === key}">{{value}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
// 导入swiper插件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// 导入IScroll组件
import ScrollView from '../ScrollView'
// 导入Vuex辅助函数
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      currentLineNum: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    // 监听isPlaying状态变化
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 如果未true则播放
        this.$refs.cdWrapper.classList.add('active')
      } else {
        // 如果未false则暂停
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    // 监听歌曲时间变化
    currentTime (newValue, oldValue) {
      // console.log(newValue)
      // 高亮歌词同步
      /*
      let lineNum = Math.floor(newValue) + ''
      let result = this.currentLyric[lineNum]
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 歌词滚动同步
        let currentLyricTop = document.querySelector('li.active').offsetTop
        let lyricHeight = this.$refs.lyric.$el.offsetHeight
        // console.log(lyricHeight)
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      }
       */
      // 高亮歌词同步
      let lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 歌词滚动同步
      let currentLyricTop = document.querySelector('li.active').offsetTop
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      // console.log(lyricHeight)
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    // 监听歌词变化
    currentLyric (newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    // 处理第一句歌词
    getFirstLyric () {
      for (let key in this.currentLyric) {
        // 第一句歌词
        return this.currentLyric[key]
      }
    },
    // 处理歌词立即滚动
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      let result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  props: {
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
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd{
    .cd-wrapper{
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: cd 10s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      margin-top: 50px;
      @include font_color;
      @include font_size($font_medium);
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 50%;
      }
      &.active{
        color: #fff;
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
<style lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active{
  @include bg_color();
  width: 60px;
}
</style>
