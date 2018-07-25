<template>
    <div class="home-page-div">
      <head-component></head-component>
      <div class="home-content-div" :class="roleId != 2?'':'two-part'">
        <router-link to="/addNewProject" v-if="roleId == 3">
          <div class="page-one-div">
            <img class="img-style" src="../assets/homeImg/11.png"/>
            <div class="project-text">
              <div class="name-text">新增项目</div>
              <div class="desc-text">你可以在这里新增项目的介绍及数据</div>
            </div>
          </div>
        </router-link>
        <router-link to="/allProject/1" v-if="roleId == 3 || roleId == 2">
          <div class="page-one-div">
            <img class="img-style" src="../assets/homeImg/22.png"/>
            <div class="project-text">
              <div class="name-text">现有项目</div>
              <div class="desc-text">你可以在这里对已有项目的介绍及数据修改</div>
            </div>
          </div>
        </router-link>
        <router-link to="/allProject/2">
          <div class="page-one-div">
            <img class="img-style" src="../assets/homeImg/33.png"/>
            <div class="project-text">
              <div class="name-text">项目成本分析</div>
              <div class="desc-text">你可以在这里对已有项目的介绍及数据进行分析查看</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"

  export default {
      name: "home",
      components:{headComponent},
    beforeMount:function () {
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.userName = userInfo.referredName;
      this.userRole = userInfo.name;
      this.roleId = userInfo.roleId;
    }

  }
</script>

<style scoped>
  body{
    background-color: #eeeeee;
  }
  .home-content-div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    padding-top: 70px;
  }
  .page-one-div{
    width: 390px;
    height: 440px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #eeeeee;
  }
  .img-style{
    height: 240px;
    width: 100%;
  }
  .name-text{
    color: #2b3541;
    font-size: 24px;
  }
  .desc-text{
    font-size: 20px;
    color: #2b3541;
    margin-top: 10px;
  }
  .home-content-div a{
    text-decoration: none;
    color: #333333;
  }
  .project-text{
    padding: 60px 20px;
    box-sizing: border-box;
  }
  .two-part{
    justify-content: space-around;
  }
</style>
