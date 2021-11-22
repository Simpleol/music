<template>
  <!--
  <div class="header" @click="theme">
    <div class="header-left"></div>
    <p class="header-title">幼儿园音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>
  </div>
   -->
  <div class="header" @click="theme">
    <!--不能直接给插槽设置样式-->
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <div class="center">
      <slot name="center">中间</slot>
    </div>
    <div class="right">
      <slot name="right">右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    // 切换皮肤
    theme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      // 设置自定义属性的取值为传入的值
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  .left, .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
      width: 100%;
      height: 100%;
    }
  }
  /*
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
   */
}

</style>
