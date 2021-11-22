<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
// 导入头部公共组件
import Header from '../Header'
export default {
  name: 'DetailHeader',
  methods: {
    back () {
      // 点击返回
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
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
    text-align: center;
    line-height: 100px;
    color: #fff;
    @include font_size($font_medium);
    font-weight: bold;
    @include no-wrap();
  }
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
}

</style>
