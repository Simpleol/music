<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <ul slot="center" class="header-title">
      <li :class="{'active': switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{'active': switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
// 导入头部公共组件
import Header from '../Header'
export default {
  name: 'AccountHeader',
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    back () {
      // 点击返回
      window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  },
  components: {
    Header
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
  .header-title{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    font-weight: bold;
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,0.3);
      }
    }
  }
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
}

</style>
