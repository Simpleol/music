<template>
    <!--swiper的bug,如果数据是从网络上加载的话那么播到最后一个就不会自动播放了,要加上v-if xxx.length > 0才行  -->
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
      <!-- slides -->
      <swiper-slide class="item" v-for="value in banners" :key="value.bannerId">
        <a :href="value.url">
          <img :src="value.pic" alt="">
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
// 导入swiper插件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.swiper-pagination-bullet{
  width: 16px;
  height: 16px;
  background: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active{
  @include bg_color()
}
</style>
