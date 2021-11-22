<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div class="wrapper">
          <Banner :banners="banners"></Banner>
          <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
          <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <!--设置路由出口并添加动画-->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// 导入轮播图组件
import Banner from '../components/Recommend/Banner'
// 导入需要请求的api
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
// 导入推荐歌单/最新专辑组件
import Personalized from '../components/Recommend/Personalized'
// 导入最新音乐组件
import SongList from '../components/Recommend/SongList'
// 导入IScroll组件
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  methods: {
    fatherSelectItem (id, type) {
      // 点击设置二级路由地址并传递id
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  // 创建生命周期方法
  created () {
    // 获取轮播图
    getBanner()
      .then((data) => {
        // console.log(data)
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取推荐歌单
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取最新专辑
    getNewAlbum()
      .then((data) => {
        // console.log(data)
        // 获取六条数据
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    // 最新歌曲
    getNewSong()
      .then((data) => {
        // console.log(data)
        // this.songs = data.result
        let list = []
        data.result.forEach((value) => {
          let obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 184px;
  .recommend-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0);
}
.v-enter-active{
  transition: all 0.8s;
}
.v-leave{
  transform: translateX(0);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: all 0.8s;
}
</style>
