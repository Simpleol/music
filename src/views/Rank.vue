<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="obj in category" :key="obj.id" class="group-title">
            <div class="group-left">
              <img v-lazy="obj.coverImgUrl">
              <p>{{obj.updateFrequency}}</p>
            </div>
            <div class="group-right">
              <p>{{obj.name}}</p>
              <p>{{obj.updateFrequency}}</p>
            </div>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
// 导入api
import { getTopListDetail } from '../api/index'
// 导入滚动组件
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  data () {
    return {
      category: {}
    }
  },
  created () {
    getTopListDetail()
      .then((data) => {
        // console.log(data)
        this.category = data.list
        // console.log(this.category)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.rank{
  width: 100%;
  height: 100%;
  .rank-wrapper{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    overflow: hidden;
    .group-title{
      display: flex;
      align-items: center;
      width: 100%;
      height: 200px;
      padding: 20px 20px;
      .group-left{
        width: 200px;
        height: 200px;
        position: relative;
        img{
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          @include font_size($font_medium_s);
          color: #fff;
        }
      }
      .group-right{
        margin-left: 20px;
        p{
          @include font_color();
          &:nth-of-type(1){
            @include font_size($font_large);
          }
          &:nth-of-type(2) {
            @include font_size($font_medium_s);
            margin-top: 20px;
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
