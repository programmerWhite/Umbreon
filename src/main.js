// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./components/store"

import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.axios= axios;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(!!sessionStorage.getItem('token')){
    config.params.token = sessionStorage.getItem('token');
  }
  return config;

}, function (error) {
  // 对请求错误做些什么
  store.dispatch("dialogParameter",{
    type:"alert",
    changeText:"系统异常，稍后再试。",
    button1:"确认"
  });

  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  if(response.data.forbidden == 1){
    store.dispatch("dialogParameter", {
      type: "alert",
      changeText: "你没有权限做这个操作。",
      button1: "确认",
      button1CallBack:function () {

      }
    });
  }

  if(response.data.messageType == 0 || response.data.messageCode == 100){
    store.dispatch("dialogParameter",{
      type:"alert",
      changeText:"请重新登录系统，即将前往登录页面。",
      button1:"确认",
      button1CallBack:function () {
        router.push({
          name:"login"
        })
      }
    });
  }

  if(response.data.messageType == 0 && response.data.messageCode != 100 || !!response.data.exception){
    store.dispatch("dialogParameter",{
      type:"alert",
      changeText:"系统异常，稍后再试。",
      button1:"确认",
      button1CallBack:function () {

      }
    });
  }
  return response;

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<app/>'
});
