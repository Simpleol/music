<template>
    <div class="account-bottom">
      <div class="bottom-play" @click="selectAllMusic">
        <span></span>
        <span>播放全部</span>
      </div>
      <div class="bottom-wrapper">
        <ScrollView>
          <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
        </ScrollView>
      </div>
    </div>
</template>

<script>
// 导入滚动组件
import ScrollView from '../ScrollView'
// 导入列表组件
import SongListItem from '../SongListItem'
// 导入Vuex辅助函数
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters([
      'historyList',
      'favoriteList'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    // 播放全部
    selectAllMusic () {
      // 如果是我喜欢听的
      if (this.switchNum === 0) {
        // this.$store.commit('SET_SONG_DETAIL', this.favoriteList)
        this.SET_SONG_DETAIL(this.favoriteList)
      } else {
        // 如果是最近听的
        // this.$store.commit('SET_SONG_DETAIL', this.historyList)
        this.SET_SONG_DETAIL(this.historyList)
      }
      // 显示默认播放界面
      this.setFullScreen(true)
      // 重置歌曲
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.account-bottom{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  .bottom-play{
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border_color();
    border-radius: 30px;
    span{
      display: inline-block;
      &:nth-of-type(1){
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper{
    position: fixed;
    top: 200px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
