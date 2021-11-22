<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSing(obj.id)">
                <img v-lazy="obj.picUrl" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <!--
          <li v-for="(key,index) in keys"
              :key="key" @click.stop="keyDown(index)"
              :class="{'active': currentIndex === index}">{{key}}</li>
        -->
        <li v-for="(key,index) in keys"
            :key="key"
            :data-index="index"
            @touchstart.stop.prevent="touchstart"
            @touchmove.stop.prevent="touchmove"
            :class="{'active': currentIndex === index}">{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    </div>
    <!--设置路由出口并添加动画-->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// 导入api
import { getAllArtists } from '../api/index'
// 导入滚动组件
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  created () {
    getAllArtists()
      .then((result) => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  components: {
    ScrollView
  },
  watch: {
    // 监听数据发生变化
    list () {
      // 注意点: watch只能监听变化,数据不一定已经渲染完了
      //        所以为了保证数据完成之后再去获取就可以借助$nextTick来完成
      this.$nextTick(() => {
        // console.log(this.$refs.group)
        this.$refs.group.forEach((group) => {
          this.groupTop.push(group.offsetTop)
        })
        // console.log(this.groupTop)
      })
    },
    // 监听分组标题变化
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  methods: {
    // 点击切换索引
    // 私有属性
    _keyDown (index) {
      this.currentIndex = index
      // console.log(index)
      let offsetY = this.groupTop[index]
      // console.log(offsetY)
      // 滚动到指定的位置
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    // 手指按下
    touchstart (e) {
      // console.log(e.target.dataset.index)
      // 转换数值
      let index = parseInt(e.target.dataset.index)
      // 将数值传递给私有属性
      this._keyDown(index)
      // 拿到手指第一个位置
      this.beginOffsetY = e.touches[0].pageY
    },
    // 手指离开
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      // console.log(offsetY)
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    // 跳转歌曲详情页面
    switchSing (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  computed: {
    // 设置吸顶效果
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  mounted () {
    // 监听滚动
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        let perTop = this.groupTop[i]
        let nextTop = this.groupTop[i + 1]
        if (-y >= perTop && -y <= nextTop) {
          this.currentIndex = i

          // 用下一组标题的偏移位加上当前滚动出去的偏移位置
          let diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) return
          this.fixTitleOffsetY = fixTitleOffsetY
          // 将值设置给分组标题
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupTop.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.singer{
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    overflow: hidden;
    .list-wrapper{
      .list-group{
        .group-title{
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item{
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          align-items: center;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys{
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li{
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active{
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
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
