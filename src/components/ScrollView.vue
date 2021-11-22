<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 导入IScroll专业版本
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  // 创建生命周期方法使用IScroll
  mounted () {
    // 创建IScroll告诉他谁需要滚动
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3, // 监听类型
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // setTimeout(() => {
    //   this.iscroll.refresh()
    // }, 500)
    // 创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了制定内容发生了变化,就会执行传入的回调函数
    mutationList: 发生变化的数组
    observer: 观察者对象
     */
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    // 告诉观察者对象告诉观察者观察什么
    let config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 告诉观察者对象我们需要观察谁,需要观察什么内容
    // 第一个参数观察什么元素,第二个参数观察什么内容
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供方法把当前偏移位传递给外界
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper{
  width: 100%;
  height: 100%;
}

</style>
