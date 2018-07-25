<template>
  <div class="home-page-div">
    <head-component></head-component>
    <div class="per-c-div">
      <div class="per-c-head-div">
        <span class="head-label">个人信息</span>
      </div>
      <div class="line-div">
        <div class="line-label-div">头像</div>
        <div class="edit-photo">
          <img class="user-photo" @click="addImgToFile" :src="userPhoto" :onerror="defaultPhoto" />
        </div>
      </div>
      <div class="line-div">
        <div class="line-label-div">用户名:</div>
        <div class="input-outer-div">
          <input type="text" class="input-style" v-model="userName" disabled="disabled"/>
        </div>
      </div>
      <div class="line-div">
        <div class="line-label-div">姓名:</div>
        <div class="input-outer-div">
          <input type="text" class="input-style" v-model="nameText"/>
        </div>
      </div>
      <div class="line-div">
        <div class="line-label-div">登录密码:</div>
        <div class="input-outer-div">
          <input type="password" class="input-style" v-model="oldPassword"/>
        </div>
      </div>
      <div class="line-div">
        <div class="line-label-div">新密码:</div>
        <div class="input-outer-div">
          <input type="password" class="input-style" v-model="newPassword"/>
        </div>
      </div>
      <div class="line-div">
        <div class="line-label-div">确认密码:</div>
        <div class="input-outer-div">
          <input type="password" class="input-style" v-model="confirmPassword"/>
        </div>
      </div>
      <div class="button-line-div">
        <button class="button-style" @click="goBack">取消</button>
        <button class="button-style" @click="saveUserInfo">确认</button>
      </div>
    </div>
    <input class="add-img" ref="addImgInput" type="file" @change="uploadProjectImg" />
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import $ from "jquery"

  export default {
    name: "personal-center",
    components:{headComponent},
    data(){
      return{
        imgData: {//支持的图片格式
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
        },
        userName:"",
        oldPassword:"",
        newPassword:"",
        nameText:"",
        confirmPassword:"",
        userPhoto:"",
        defaultPhoto:'this.src="' + require('../../assets/common/defaultPhotpo.png') + '"',
        userId:null,
        userInfo:null
      }
    },
    beforeMount:function () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

      var userInfo = this.userInfo;
      this.userPhoto = !!userInfo.photograph?userInfo.photograph:"";
      this.userName = userInfo.referredName;
      this.nameText = userInfo.realName;
      this.userRole = userInfo.name;
      this.roleId = userInfo.roleId;
      this.userId = userInfo.id;
    },
    methods:{
      goBack:function () {
        this.$router.go(-1);
      },
      addImgToFile:function () {
        this.$refs.addImgInput.click();
      },
      /*上传图片功能*/
      uploadProjectImg:function (event) {
        let reader =new FileReader();
        let img1=event.target.files[0];

        let type=img1.type;//文件的类型，判断是否是图片
        let size=img1.size;//文件的大小，判断图片的大小

        if(this.imgData.accept.indexOf(type) == -1){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "请选择我们支持的图片格式。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(size>1145728){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "请选择1M以内的图片。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        reader.readAsDataURL(img1);

        var This = this;

        reader.onload = function () {
          let form = new FormData();
          form.append('token',sessionStorage.getItem('token'));
          form.append('userId',This.userId);
          form.append('imageCode',this.result);

          $.ajax({
            url:This.$store.state.other.ipAddress + '/manages/files!uploadUserPhoto.action',
            data:form,
            type:"post",
            async:false,
            processData:false,
            xhrFields:{
              withCredentials: true
            },
            // beforeSend: function(xhr) {
            //   xhr.setRequestHeader('Content-Type','multipart/form-data');
            // },
            crossDomain:true,
            contentType:false,
            success:function (data) {
              var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
              userInfo.photograph = data.newURL;
              sessionStorage.setItem('userInfo',JSON.stringify(userInfo));

              This.userPhoto = data.newURL;
            },
            error:function () {
              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "上传图片出错。",
                button1: "确认",
                button1CallBack:function () {

                },
              });
            }
          });

        }
      },

      saveUserInfo:function () {

        // if(this.nameText == "" || this.nameText == " "){
        //   this.$store.dispatch("dialogParameter", {
        //     type: "alert",
        //     changeText: "用户名不能为空。",
        //     button1: "确认",
        //     button1CallBack:function () {
        //
        //     },
        //   });
        //   return false;
        // }


        if(this.newPassword != "" && this.newPassword.length < 8 || this.newPassword.length > 20 || this.newPassword.indexOf(" ") != -1){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "密码长度3-20位。中间不能有空格",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(this.newPassword  != this.confirmPassword){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "两次密码不一样。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        var This = this;
        this.axios({
          url:this.$store.state.other.ipAddress+"/manages/manageusers!updateOneUserBySelf.action",
          method:"post",
          params:{
            userId:This.userId,
            realName:This.nameText,
            oldPassword:This.oldPassword,
            newPassword:This.newPassword,
          }
        }).then(function (response) {
          var data = response.data;
          var dialogText = "";
          if(data.result == 1){
            This.userInfo.realName = This.nameText;
            sessionStorage.setItem("userInfo",JSON.stringify(This.userInfo));

            dialogText = "用户信息修改成功";
          }else if(data.result == 2){
            dialogText = "原密码输入不正确";
          }else if(data.result == 0){
            dialogText = "原密码输入不正确";
          }

          This.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: dialogText,
            button1: "确认",
            button1CallBack:function () {

            },
          });
        });
      }
    }

  }
</script>

<style scoped>
  body{
    background-color: #eeeeee;
  }
  .add-img{
    display: none;
  }
  .per-c-div{
    width: 1200px;
    height: 880px;
    margin: 20px auto;
    background-color:#eeeeee ;
    padding: 20px;
    box-sizing: border-box;
  }
  .per-c-head-div{
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 30px;
  }
  .head-label{
    font-size: 18px;
    color: #2b3541;
  }
  .line-label-div{
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
  .edit-photo{
    width: 440px;
    min-height: 30px;
  }
  .input-style{
    width: 440px;
    height: 40px;
    border-radius: 6px;
    color: #cccccc;
    border: 1px solid #cccccc;
    padding: 0 10px;
    box-sizing: border-box;
    color: #333333;
    font-size: 16px;
  }
  .line-div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .user-photo{
    width: 120px;
    height: 100px;
    border-radius: 4px;
    cursor: pointer;
  }
  .button-line-div{
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  .button-style{
    width: 80px;
    height: 30px;
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 3px;
    cursor: pointer;
  }
  .button-style:last-child{
    margin-left: 20px;
  }
</style>
