<template>
  <div class="base-pro-head-div">
    <div class="project-name-status">
      <!--<span class="project-name-text">{{baseData.title}}</span>-->
    </div>
    <div class="project-status-div">
      <div  v-if="roleId==3">
        <span class="current-pro-status">状态：待提交</span>
        <button class="change-status-button" @click="clickButton(1)">提交</button>
      </div>
      <div  v-if="roleId==2">
        <span class="current-pro-status">状态：待审核</span>
        <button class="change-status-button" @click="clickButton(2)">审核通过</button>
        <button class="change-status-button" @click="clickButton(3)">驳回</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "change-project-status",
      computed: {
        roleId: function () {
          return this.userInfo.roleId;
        },
      },
      beforeMount:function () {
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
