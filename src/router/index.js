import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 实现Vue组件的按需加载
// 按需加载推荐界面
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
// 按需加载歌手界面
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
// 按需加载排行榜界面
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
// 按需加载搜索界面
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
// 按需加载歌单详情界面
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
// 按需加载个人中心界面
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}

const routes = [
  // 默认加载界面为推荐界面
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    // 设置二级路由地址
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    // 设置二级路由地址
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
