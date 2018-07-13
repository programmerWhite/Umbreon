<template>
    <div class="shade">
      <div class="change-password-container">
        <div class="change-password-head-div">
          <img src="../../assets/common/close.png" @click="hideChangePassword"/>
        </div>
        <div class="change-password-title">重置密码</div>
        <div class="input-container-div">
          <div class="input-line-div">
            <span class="input-label">用户名:</span>
            <div class="input-outer-div">
              <input class="input-style" type="text" disabled="disabled" v-model="userName"/>
            </div>
          </div>
          <div class="input-line-div">
            <span class="input-label">新密码:</span>
            <div class="input-outer-div">
              <input class="input-style" type="text"  v-model="newPassword"/>
            </div>
          </div>
          <div class="input-line-div">
            <span class="input-label">确认密码:</span>
            <div class="input-outer-div">
              <input class="input-style" type="text"  v-model="confirmPassword"/>
            </div>
          </div>
          <div class="input-line-div">
            <span class="input-label"></span>
            <div class="input-outer-div text-align">
              <button class="button-style" @click="hideChangePassword">取消</button>
              <button class="button-style" @click="changePassword">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import $ from "jquery"

  export default {
        name: "change-password",
      props:["userData"],
      data(){
          return{
            userName:"",
            newPassword:"",
            confirmPassword:"",
            userId:null
          }
      },
      beforeMount:function () {
        var userData = JSON.parse(this.userData)
        this.userId = userData.id;
        this.userName = userData.referredName;
      },
      methods:{
        hideChangePassword:function () {
          this.$emit('hideChangePassword');
        },
        changePassword:function(){

          if(this.newPassword.length > 20 || this.newPassword.length < 8 || this.newPassword.indexOf(" ") != -1){
            this.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "密码长度在8位到20位之间，中间不能有空格",
              button1: "确认",
              button1CallBack:function () {

              }
            });

            return false;
          }else{
            if(this.newPassword != this.confirmPassword){
              this.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "两次的密码不一样",
                button1: "确认",
                button1CallBack:function () {

                }
              });
              return false;
            }
          }



          var This = this;
          this.axios({
            url: this.$store.state.other.ipAddress + "/manages/manageusers!updatePasswordById.action",
            method: "POST",
            data: {"newPassword": This.newPassword, "id": This.userId},
          }).then(function (response) {
              var data = response.data;

              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "密码修改成功",
                button1: "确认",
                button1CallBack:function () {
                  This.hideChangePassword();
                }
              });

          }).catch(function (e) {

          });
        }
      }
    }
</script>

<style scoped>
  .shade{
    background-color: rgba(0,0,0,0.4);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
  }
  .change-password-container{
    height: 375px;
    width: 390px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -195px;
    margin-top: -187.5px;
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
  }
  .change-password-head-div{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
  }
  .change-password-head-div img{
    cursor: pointer;
  }
  .input-style:disabled{
    background-color: white;
  }
  .change-password-title{
    text-align: center;
    font-size: 18px;
    color: #2b3541;
    margin-bottom: 20px;
    height: 60px;
    line-height: 60px;
  }
  .input-label{
    color: #2b3541;
    font-size: 16px;
    display: block;
    width: 90px;
    text-align: right;
  }
  .input-outer-div{
    margin-left: 10px;
  }
  .input-style{
    width: 260px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .input-style:disabled{
    background-color: white;
  }
  .input-line-div{
    display: flex;
    margin-bottom: 30px;
    align-items: center;
  }
  .button-style{
    background-color:#ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 6px;
    width: 90px;
    height: 30px;
    cursor: pointer;
  }
  .button-style:last-child{
    margin-left:40px ;
  }
  .text-align{
    text-align: center;
    width: 260px;
  }
</style>
