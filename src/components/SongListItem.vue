<template>
  <ul class="song-list">
    <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
      <img v-lazy="value.picUrl" alt="">
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
// 导入Vuex辅助函数
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      // 显示默认播放界面
      this.setFullScreen(true)
      // 获取歌曲详细数据
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.song-list{
  width: 100%;
  overflow: hidden;
  .item{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img{
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div{
      width: 70%;
      h3{
        @include font_color();
        @include font_size($font_medium);
        margin-bottom: 10px;
        @include no-wrap();
      }
      p{
        @include font_color();
        @include font_size($font_samll);
        opacity: 0.7;
        @include no-wrap();
      }
    }
  }
}
</style>
