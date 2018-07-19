<template>
  <div class="login-container-div">
    <div class="input-line-div">
      <div class="input-label">用户名：</div>
      <div class="input-outer-line">
        <img class="login-img-label" src="../../assets/login/inputU.png" />
        <input type="text" class="input-style" v-model="userName"/>
      </div>
      <div class="notice-div"></div>
    </div>
    <div class="input-line-div">
      <div class="input-label">用户名：</div>
      <div class="input-outer-line">
        <img class="login-img-label" src="../../assets/login/inputP.png" />
        <input type="password" class="input-style" v-model="passwordV"/>
      </div>
      <div class="notice-div"></div>
    </div>
    <div class="login-button" @click="loginSystem">登录</div>
    <div class="input-line-div">
      <div class="remember-forget-line">
        <input type="checkbox" v-model="rememberCheck"/>
        <span class="remember-password">记住密码</span>
        <span class="forget-password-button">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login-component",
      data (){
          return {
            userName:"",
            passwordV:"",
            rememberCheck:false
          }
      },
      beforeMount:function () {
        var rememberStatus = localStorage.getItem("rememberStatus");
        this.rememberCheck = rememberStatus=="false"?false:true;

        if(rememberStatus == "false"){
           return false;
        }

        var tempUserName = localStorage.getItem("userName");
        if(!!tempUserName){
          this.userName = tempUserName;
        }

        var tempPasswordV = localStorage.getItem("passwordV");
        if(!!tempPasswordV){
          this.passwordV = tempPasswordV;
        }

      },
      watch:{
        //检查 记住密码状态框 进行 本地状态保存
        rememberCheck:function () {
          localStorage.setItem("rememberStatus",this.rememberCheck);
        }

      },
      methods:{
        loginSystem:function () {
            var postData = {
              'userName':this.userName,
              'password':this.passwordV,
              'loginMethod':"local",
            };

            var This = this;
            this.axios({
                url: this.$store.state.other.ipAddress + "/j_spring_security_check",
                method: "POST",
                params: postData,
                xhrFields: {
                  withCredentials: true // 携带跨域cookie
                }
              }).then(function(response){
                var data = response.data;
                if(data.result == 1){

                  This.$store.commit("changeToken",data.token);
                  sessionStorage.setItem("token",data.token)

                  sessionStorage.setItem("userInfo",JSON.stringify(data.userinfo))

                  if(This.rememberCheck){
                    localStorage.setItem("userName",This.userName);
                    localStorage.setItem("passwordV",This.passwordV);
                  }else{
                    localStorage.removeItem("userName");
                    localStorage.removeItem("passwordV");
                  }

                  if(data.userinfo.roleId == 1){
                    This.$router.push({
                      name:'userManage',
                      params:{}
                    });
                  }else{
                    This.$router.push({
                      name:'home',
                      params:{}
                    });
                  }
                }else if(data.result == 2){

                  This.$store.dispatch("dialogParameter", {
                    type: "alert",
                    changeText: "用户名或密码不正确。",
                    button1: "确认",
                    button1CallBack:function () {
                      if(This.rememberCheck){

                      }else{
                        localStorage.removeItem("userName");
                        localStorage.removeItem("passwordV");
                      }
                    }
                  });

                }
              }).catch(function () {

            });
        }
      }
    }
</script>

<style scoped>
  .login-container-div{
    height: 400px;
    width: 360px;
    background-color: rgba(255,255,255,0.7);
    padding: 40px 20px;
    box-sizing: border-box;
  }
  .input-label{
    color: #2b3541;
    font-size: 16px;
  }
  .input-line-div{
    width: 100%;
    height: 100px;
  }
  .input-outer-line{
    margin-top: 10px;
    position: relative;
  }
  .input-style{
    height: 40px;
    border: 1px solid #999999;
    width: 100%;
    padding-left: 40px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: rgba(255,255,255,0.3);
  }
  .notice-div{
    height: 20px;
    width: 100%;
    font-size: 12px;
    color: red;
  }
  .login-button{
    width: 100%;
    height: 40px;
    background-color: #2b3541;
    color: white;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-top: 20px;
  }
  .remember-password,
  .forget-password-button{
    font-size: 16px;
    color: #2b3541;
    margin-left: 10px;
    cursor: pointer;
  }
  .forget-password-button{
    margin-left: 40px;
  }
  .remember-forget-line{
    margin-top: 20px;
  }
  .login-img-label{
    position: absolute;
    left: 10px;
    top: 10px;
  }
</style>
