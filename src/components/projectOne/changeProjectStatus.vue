<template>
  <div class="base-pro-head-div">
    <div class="project-name-status">
      <span class="project-name-text">{{status.projectName}}</span>
    </div>
    <div class="project-status-div">
      <div  v-if="roleId==3">
        <span class="current-pro-status">状态：{{statusText}}</span>
        <button class="change-status-button" v-if="projectStatus==0||projectStatus==3" @click="clickButton(1)">提交</button>
      </div>
      <div  v-if="roleId==2">
        <span class="current-pro-status">状态：{{statusText}}</span>
        <button class="change-status-button" v-if="projectStatus==1" @click="clickButton(2)">审核通过</button>
        <button class="change-status-button" v-if="projectStatus==1 || projectStatus==2 " @click="clickButton(3)">驳回</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "change-project-status",
      props:["status"],
      data(){
        return{
          projectStatus:null,
          statusText:""
        }
      },
      computed: {
        roleId: function () {
          return this.userInfo.roleId;
        },
      },
      beforeMount:function () {
        this.projectStatus = this.status.code;
        this.statusText = this.status.message;
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      },
      methods:{
          clickButton:function (buttonType) {
            this.$emit('changeProjectStatus',buttonType)
          }
      }
    }
</script>

<style scoped>
  .base-pro-head-div{
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .project-name-text{
    color: #333333;
    font-size: 20px;
  }
  .project-status-text{
    color: #ed6b1a;
    font-size: 20px;
  }
  .change-status-button{
    border: 1px solid #ed6b1a;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: white;
    color: #ed6b1a;
    width: 80px;
    margin-left: 10px;
    height: 30px;
    cursor: pointer;
  }
</style>
