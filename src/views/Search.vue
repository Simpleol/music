<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg" alt="">
      <input type="text" placeholder="请输入要搜索的歌曲" v-model="keywords" v-throttle="search">
      <img class="img" @click.stop="imgDel" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4" alt="">
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left" @click.stop="addHistory(value)">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入滚动组件
import ScrollView from '../components/ScrollView'
// 导入api
import { getSearchList, getSearchHot } from '../api/index'
// 导入Vuex辅助函数
import { mapActions } from 'vuex'
// 导入工具类
import { setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    }
  },
  // 自定义指令
  directives: {
    throttle: {
      // 指令的定义
      // 函数节流
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1500)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    // 函数节流
    search () {
      // console.log('发送请求')
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          // console.log(data)
          this.songs = data.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 清空输入框
    imgDel () {
      this.keywords = ''
    },
    // 显示播放界面
    selectMusic (id) {
      // 显示默认播放界面
      this.setFullScreen(true)
      // 获取歌曲详细数据
      this.setSongDetail([id])
      // 判断是否已经保存了
      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      // 如果没有保存的话
      this.searchHistory.push(this.keywords)
      // 保存到本地中
      setLocalStorage('searchHistory', this.searchHistory)
      // 清空
      this.keywords = ''
    },
    selectedHot (value) {
      this.keywords = value
      // input无法自动触发
      this.search()
    },
    // 删除
    delHistory (value) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        // 如果不等于
        return item !== value
      })
      // 重新保存
      setLocalStorage('searchHistory', this.searchHistory)
    },
    // 搜索历史点击
    addHistory (value) {
      this.keywords = value
      this.search()
    }
  },
  created () {
    getSearchHot()
      .then((data) => {
        // console.log(data)
        this.hots = data.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    // 判断本地是否保存
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    // 如果本地有的话
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.search{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input{
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium_s);
      height: 60px;
      margin-left: 20px;
    }
    .img{
      position: fixed;
      right: 40px;
      width: 25px;
      height: 25px;
    }
  }
  .search-suggest{
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li{
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_size($font_medium);
        @include font_color();
      }
    }
  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
      margin-bottom: 20px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        @include font_size($font_medium_s);
        @include font_color();
        @include border_color();
        margin: 10px 20px;
      }
    }
  }
  .search-history{
    margin-top: 30px;
    li{
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      margin: 10px 0;
      .history-left{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right{
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
