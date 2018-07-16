<template>
    <nav class="nav-style">
      <div class="nav-inner-div">
        <div class="log-div">
          <img src="../../assets/logImg.png" />
        </div>
        <div class="menu-list-style">
            <ul>
              <li v-if="roleId != 1">
                <router-link to="/home">首页</router-link>
              </li>
              <li v-if="roleId != 1">
                <router-link to="/addNewProject">新增项目</router-link>
              </li>
              <li v-if="roleId != 1">
                <router-link to="/allProject">编辑已有项目</router-link>
              </li>
              <li v-if="roleId != 1">
                <router-link to="/allProject">分析项目</router-link>
              </li>
              <li v-if="userName && userRole">
                <span>{{userName}}</span>.<span>{{userRole}}</span>
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
            roleId:""
          }
      },
      beforeMount:function () {
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.userName = userInfo.referredName;
        this.userRole = userInfo.name;
        this.roleId = userInfo.roleId;
      }
    }
</script>

<style scoped>
  .nav-style{
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
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
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    color: #2b3541;
    font-size: 16px;
    cursor: pointer;
  }
  .menu-list-style li:hover{
    border-bottom: 2px solid #2b3541;
    box-sizing: border-box;
  }
  .menu-list-style li a{
    text-decoration: navajowhite;
    color: #2b3541;
  }
</style>
