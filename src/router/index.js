import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import userManage from '@/components/userManage/userManage'
import allProject from '@/components/allProject/allProject'
import projectOne from '@/components/projectOne/projectOne'
import scanUserDetail from '@/components/userManage/scanUserDetail'
import addNewProject  from '@/components/addProject/addNewProject.vue'
import personalCenter  from '@/components/personalCenter/personalCenter.vue'

Vue.use(Router)

var routerObj = new Router({
    routes: [
      {
        path: '/',
        name: 'login',
        component: login
      },
      {
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: userManage
      },
      {
        path: '/allProject',
        name: 'allProject',
        component: allProject
      },
      {
        path: '/projectOne/:projectId/:projectS_id',
        name: 'projectOne',
        component: projectOne
      },
      {
        path: '/scanUserDetail/:userId',
        name: 'scanUserDetail',
        component: scanUserDetail
      },
      {
        path: '/addNewProject',
        name: 'addNewProject',
        component: addNewProject
      },
      {
        path: '/personalCenter',
        name: 'personalCenter',
        component: personalCenter
      }
    ]
});

routerObj.beforeEach((to, from, next)=>{
  /*如果地址不存在，就跳转到上一个页面，上一个页面不存在就跳转到首页*/
  if(to.matched.length == 0){
    from.name ? next({ name:from.name }) : next('/');
  }else{
    next();
  }
});

export default routerObj;
