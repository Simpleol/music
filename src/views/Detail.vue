<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
        <ScrollView ref="scrollView">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
// 导入需要请求的api
import { getPlayerList, getAlbum, getArtistsSongs } from '../api/index'
// 导入头部组件
import DetailHeader from '../components/Detail/DetailHeader'
// 导入中间组件
import DetailTop from '../components/Detail/DetailTop'
// 导入底部组件
import DetailBottom from '../components/Detail/DetailBottom'
// 导入IScroll组件
import ScrollView from '../components/ScrollView'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  // 创建生命周期方法
  created () {
    // 获取id
    // console.log(this.$route.params.type)
    // 判断是什么类型的数据
    // 加载推荐歌单
    if (this.$route.params.type === 'personalized') {
      getPlayerList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch(function (err) {
          console.log(err)
        })
      // 加载最新专辑
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      // 加载歌手单曲
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  data () {
    return {
      playlist: {}
    }
  },
  // 创建生命周期方法
  mounted () {
    // 获取图片的高度
    let defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)
    this.$refs.scrollView.scrolling((offset) => {
      // console.log(offset)
      if (offset < 0) {
        // console.log('向上滚动')
        // let scale = 10 * Math.abs(offset) / defaultHeight
        let scale = Math.abs(offset) / defaultHeight
        // console.log(scale)
        // 设置往上滚动图片高斯模糊
        /*
          注意点: 高斯模糊的效果是非常消耗性能的,不推荐移动端使用;
                 如果非要在移动端使用,建议只设置一次;
         */
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        // 建议用opacity设置模糊效果
        this.$refs.top.changeMask(scale)
      } else {
        // console.log('向下滚动')
        let scale = 1 + offset / defaultHeight
        // console.log(scale)
        // 设置往下滚动图片变大
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.detail{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>
