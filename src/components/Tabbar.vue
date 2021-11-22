<template>
  <div class="tabular">
    <router-link to="/recommend" class="item">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer" class="item">
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" class="item">
      <span>排行</span>
    </router-link>
    <router-link to="/search" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.tabular{
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  .item{
    &.router-link-active{
      border-bottom: 5px solid;
      @include border_color();
      span{
        @include font_active_color();
      }
    }
    span{
      line-height: 84px;
      @include font_color();
      @include font_size($font_medium);
    }
  }
}
</style>
