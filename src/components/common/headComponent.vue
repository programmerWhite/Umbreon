<template>
    <nav class="nav-style">
      <div class="nav-inner-div">
        <div class="log-div">
          <img src="../../assets/logImg.png" />
        </div>
        <div class="menu-list-style">
            <ul class="level-one-ul">
              <li v-if="roleId != 1" :class="currentMenu == 1?'current-menu-one':''" @click="clickMenu(1)">
                <router-link to="/home">首页</router-link>
              </li>
              <li v-if="roleId == 3" :class="currentMenu == 2?'current-menu-one':''" @click="clickMenu(2)">
                <router-link to="/addNewProject">新增项目</router-link>
              </li>
              <li v-if="roleId != 4 && roleId != 5 && roleId != 1" :class="currentMenu == 3?'current-menu-one':''" @click="clickMenu(3)">
                <router-link to="/allProject/1">现有项目</router-link>
              </li>
              <li v-if="roleId != 1" :class="currentMenu == 4?'current-menu-one':''" @click="clickMenu(4)">
                <router-link to="/allProject/2">项目成本分析</router-link>
              </li>
              <li v-if="userName && userRole">
                <div class="flex-style">
                  <img class="user-photo-img" :src="userInfo.photograph" :onerror="defaultPhoto">
                  <span>{{userName}}</span>
                  <!--.<span>{{userRole}}</span>-->
                </div>
                <ul class="level-two-ul">
                  <li>
                    <router-link to="/personalCenter">个人中心</router-link>
                  </li>
                  <li>
                    <router-link to="/">退出登录</router-link>
                  </li>
                </ul>
              </li>
              <li v-else>
                <router-link to="/">登录</router-link>
              </li>
            </ul>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
        name: "headComponent",
      data(){
          return{
            userName:"",
            userRole:"",
            roleId:"",
            userInfo:null,
            defaultPhoto:"this.src='"+require("../../assets/common/deaulf.png")+"'",
            currentMenu:1
          }
      },
      beforeMount:function () {
        var pageNum = sessionStorage.getItem('pageNum');
        if(pageNum){
          this.currentMenu = pageNum;
        }else{
          this.currentMenu = 1;
        }
          /*session 里面获取 用户信息。方面导航内容状态的显示*/
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        /*如果头像为空，显示默认*/
        if(!this.userInfo.photograph){
          this.userInfo.photograph = "../../assets/common/deaulf.png";
        }
        this.userName = this.userInfo.referredName;
        this.userRole = this.userInfo.name;
        this.roleId = this.userInfo.roleId;
      },
      methods:{
        clickMenu:function (num) {
          this.currentMenu = num;
          sessionStorage.setItem('pageNum',num);
        }
      }
    }
</script>

<style scoped>
  .nav-style{
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
    background-color: white;
  }
  .nav-inner-div{
    width: 1200px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-list-style ul{
    margin: 0;
    padding: 0px;
  }
  .menu-list-style li{
    list-style-type: none;
    display: inline-block;
    padding: 0 20px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #2b3541;
    font-size: 16px;
    cursor: pointer;
  }
  .menu-list-style>ul>li:hover{
    border-bottom: 2px solid #2b3541;
    box-sizing: border-box;
  }
  .menu-list-style li a{
    text-decoration: navajowhite;
    color: #2b3541;
    display: block;
    height: 100%;
    width: 100%;
  }
  .level-two-ul{
    position: absolute;
    background-color: white;
    width: 100%;
    display: none;
    left: 0px;
    box-shadow: 0 2px 10px 2px #cccccc;
    border-radius: 4px;
    z-index: 10;
  }
  .level-two-ul li{
    width: inherit;
    margin: 0;
    text-align: center;
    padding: 0;
  }

  .level-two-ul>li:hover{
    color: #ed6b1a;
  }
  .level-one-ul{
    display: flex;
    align-items: stretch;
  }
  .level-one-ul>li{
    position: relative;
  }

  .level-one-ul>li:hover .level-two-ul{
    display: block;
  }
  .user-photo-img{
    height: 35px;
    width: 35px;
    border-radius: 100%;
    margin-right: 10px;
  }
  .flex-style{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .log-div img{
    width: 310px;
  }
  .current-menu-one{
    border-bottom: 2px solid #2b3541;
    box-sizing: border-box;
  }
</style>
