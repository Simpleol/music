import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入css样式
import './assets/css/base.scss'
// 导入鼠标延迟插件
import fastclick from 'fastclick'
// 导入懒加载
import VueLazyload from 'vue-lazyload'
// 导入插件
import Loading from './plugin/loading/index'

Vue.use(Loading, {
  title: '正在加载...'
})

// 解决移动端100~300延迟的问题
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  // 通过配置loading来设置图片还没加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
