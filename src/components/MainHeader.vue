<template>
  <Header class="header">
    <div slot="left" class="header-left"></div>
    <p slot="center" class="header-title">幼儿园音乐</p>
    <div slot="right" class="header-right" @click.stop="accountClick"></div>
  </Header>
</template>

<script>
// 导入公共组件
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    // 点击跳转个人中心界面
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header{
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    @include font_size($font_medium);
    font-weight: bold;
  }
  .header-left{
    @include bg_img('../assets/images/logo')
  }
  .header-right{
    @include bg_img('../assets/images/account')
  }
}

</style>
