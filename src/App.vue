<template>
  <div id="app">
    <MainHeader></MainHeader>
    <TabBar></TabBar>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
// 导入头部组件
import MainHeader from './components/MainHeader'
// 导入TBA组件
import TabBar from './components/Tabbar'
// 导入播放器组件
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    TabBar,
    Player
  }
}
</script>

<style scoped lang="scss">

</style>
