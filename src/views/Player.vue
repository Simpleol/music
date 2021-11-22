<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="this.currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
// 导入播放器组件
import NormalPlayer from '../components/Player/NormalPlayer'
// 导入迷你播放器
import MiniPlayer from '../components/Player/MiniPlayer'
// 导入列表播放器
import ListPlayer from '../components/Player/ListPlayer'
// 导入Vuex辅助函数
import { mapGetters, mapActions } from 'vuex'
// 导入播放模式
import mode from '../store/modeType'
// 导入工具方法
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'

export default {
  name: 'Player',
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
      // 获取当前播放的时长
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        // 如果是顺序循环
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        // 如果是单曲循环
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        // 如果是随机播放
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      // 如果为true播放
      if (newValue) {
        // 将当前歌曲存储到播放列表中
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
        // 如果为false暂停
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      /*
       注意点: 在ios系统不会自动加载歌曲,所以oncanplay不会执行
       解决方案: ondurationchange
                ondurationchange当歌曲加载之后执行
      */
      // 是否能够播放
      this.$refs.audio.ondurationchange = () => {
        // 重新获取歌曲的总时长
        this.totalTime = this.$refs.audio.duration
        // 判断是否为true是的话播放
        if (this.isPlaying) {
          // 将当前歌曲存储到播放列表中
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    // 监听进度条变化
    curTime (newValue, oldValue) {
      // 设置时间
      this.$refs.audio.currentTime = newValue
    },
    // 监听收藏歌曲变化
    favoriteList (newValue, oldValue) {
      // 设置名称并把值转换成字符串后再存储
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    // 监听播放历史变化
    historyList (newValue, oldValue) {
      // 设置名称并把值转换成字符串后再存储
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // 收藏列表
    // 转换数值并读取
    // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    let favoriteList = getLocalStorage('favoriteList')
    // 如果是null的话
    if (favoriteList === null) return
    this.setFavoriteList(favoriteList)

    // 播放历史
    // 转换数值并读取
    // let historyList = JSON.parse(window.localStorage.getItem('historyList'))
    let historyList = getLocalStorage('historyList')
    // 如果是null的话
    if (historyList === null) return
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      // 获取歌曲的总时长
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  }
}
</script>

<style scoped lang="scss">

</style>
