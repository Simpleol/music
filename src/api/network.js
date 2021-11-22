// 导入axios
import axios from 'axios'
// 导入Vue
import Vue from 'vue'

// 配置全局请求地址
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 配置全局请求时间
axios.defaults.timeout = 5000
// 定义一个变量用于记录发送几次请求
let count = 0

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 显示网络加载器
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  // 隐藏网络加载器
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 隐藏网络加载器
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  // 隐藏网络加载器
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 封装get/post/all请求
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
