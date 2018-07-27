<template>
    <div class="pro-one-div" @click="goToProjectOne(projectData.id,projectData.projectS_id)"  >
      <div class="pro-img-div">
        <img class="pro-img" :src="projectImg" :onerror="errorImg"/>
      </div>
      <div class="pro-name-div">
        {{projectData.title}}
        <span class="color-orange">{{projectData.stageStatusList[0].status}}</span>
      </div>
      <div class="pro-status-container">
        <!--<div class="pro-status-one-line" v-for="(item,key) in projectData.stageStatusList" :key="key">-->
          <!--<div>-->
            <!--<span>{{item.stageTitle}} - </span>-->
            <!--<span class="color-orange"> {{item.status}}</span>-->
          <!--</div>-->
          <!--<img class="arrow-img" src="../../assets/project/arrow.png" />-->
        <!--</div>-->

        <!--<div class="pro-status-one-line">-->
          <!--<div>-->
            <!--<span>设计阶段 - </span>-->
            <!--<span class="color-orange"> 审批通过</span>-->
          <!--</div>-->
          <!--<img class="arrow-img" src="#" />-->
        <!--</div>-->
        <!--<div class="pro-status-one-line">-->
          <!--<div>-->
            <!--<span>招投标阶段 - </span>-->
            <!--<span class="color-orange"> 审批通过</span>-->
          <!--</div>-->
          <!--<img class="arrow-img" src="#" />-->
        <!--</div>-->
        <!--<div class="pro-status-one-line">-->
          <!--<div>-->
            <!--<span>施工阶段 - </span>-->
            <!--<span class="color-orange"> 审批通过</span>-->
          <!--</div>-->
          <!--<img class="arrow-img" src="#" />-->
        <!--</div>-->
        <!--<div class="pro-status-one-line">-->
          <!--<div>-->
            <!--<span>结账阶段 - </span>-->
            <!--<span class="color-orange"> 审批通过</span>-->
          <!--</div>-->
          <!--<img class="arrow-img" src="#" />-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "project-one",
      props:["projectData","projectType"],
      data(){
          return {
            errorImg:require('../../assets/project/projectImgError.png')
          }
      },
      computed:{
        projectImg:function () {
          var imgArray = this.projectData.photoes.split("#");
          return imgArray[0]
        }
      },
      methods:{
          goToProjectOne:function (projectId,projectS_id) {

            sessionStorage.setItem('currentProjectType',this.projectType);

            this.$router.push({
              name:"projectOne",
              params:{
                projectId:projectId,
                projectS_id:projectS_id
              }
            })
          }
      }
    }
</script>

<style scoped>
  .pro-one-div{
    width: 290px;
    border-radius: 10px;
    overflow:hidden;
    cursor: pointer;
    padding-bottom: 20px;
    margin-bottom: 20px;
    margin-right: 10px;
  }
  .pro-one-div:hover{
    box-shadow: 0 0 10px 1px #cccccc;
  }
  .pro-img{
    width: 100%;
    height: 176px;
  }
  .pro-name-div{
    font-size: 16px;
    color: #333333;
    padding: 10px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .pro-status-container{
    box-sizing: border-box;
  }
  .pro-status-one-line{
    height: 30px;
    margin: 10px 20px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 0 20px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .color-orange{
    color: #ed6b1a;
    font-size: 14px;
    display: inline-block;
    width: 80px;
    text-align: right;
  }
  .arrow-img {
    float: right;
  }
</style>
