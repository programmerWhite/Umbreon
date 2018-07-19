<template>
  <div>
    <div class="shade"></div>
    <div class="detail-container" :class="detailUserType=='add'?'add-user-container-style':''">
      <div class="user-desc-head-div">
        <h2>{{detailUserType=='scan'?'用户信息':'新增用户'}}</h2>
        <img src="../../assets/common/close.png" @click="hideDetail"/>
      </div>
      <div class="input-container-div">
        <div class="input-line-div">
          <span class="input-label">用戶名</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" :disabled="detailUserType=='scan'" v-model="userName"/>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">姓名</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" :disabled="detailUserType=='scan'" v-model="Name"/>
          </div>
        </div>
        <div class="input-line-div" v-if="detailUserType=='add'">
          <span class="input-label">登录密码</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" :disabled="detailUserType=='scan'" v-model="passwordV"/>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用戶公司</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" :disabled="detailUserType=='scan'" v-model="userCompany" v-if="detailUserType=='scan'"/>
            <select class="select-user-type" v-else-if="detailUserType=='add'" v-model="companyValue">
              <option v-for="item in companyData" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用户部门</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" :disabled="detailUserType=='scan'" v-model="department" v-if="detailUserType=='scan'"/>
            <select class="select-user-type" v-else-if="detailUserType=='add'" v-model="departmentValue">
              <option v-for="item in departmentData" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用户类型</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" disabled="disabled" v-model="userType" v-if="detailUserType=='scan'"/>
            <select class="select-user-type" v-else-if="detailUserType=='add'" v-model="userSelectType">
              <option v-for="item in newUserOptionData" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-line-div align-start">
          <span class="input-label">项目分配</span>
          <div class="input-outer-div">
            <div class="project-container" v-if="detailUserType=='scan'">
              <div class="project-line-div" v-for="(item,key) in projectData" :key="key" >
                <div class="no-choice-div" :class="item.isVisible==1?'choice-div':''" :index="key" @click="changeVisible"></div>
                <div class="project-name">{{item.title}}</div>
              </div>
            </div>

            <div class="project-container" v-else-if="detailUserType=='add'">
              <div class="project-line-div" v-for="(item,key) in addProjectData" :key="key">
                <div class="no-choice-div" :class="item.isVisible==1?'choice-div':''" :index="key" @click="changeNewVisible"></div>
                <div class="project-name">{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-line-div">
        <button class="button-style" @click="initProject">重置</button>
        <button class="button-style" @click="sendProjectData">确定</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
      name: "user-detail",
    props:["userId","detailUserType"],
    data(){
        return{
          userName:"",
          Name:"",
          userCompany:"",
          department:"",
          userType:"",
          projectData:{},
          initProjectData:{},
          addProjectData:{},
          passwordV:"",
          newUserOptionData:{},//创建新用户时 ，选择用户 角色
          userSelectType:"",//创建新用户时 选择的 用户类型
          departmentData:"",//创建新用户时 选择的 部门 选项
          companyData:"",//创建新用户时 选择的 公司 选项
          companyValue:"",//当前 用户 选择的公司 值
          departmentValue:"",//当前选择 部门 的 值
        }
    },
    mounted:function () {
        if(this.detailUserType == "scan"){
          this.getDetailData(this.userId);
        }else{
          this.getNewUserData();
        }
    },
    watch:{
      companyValue:function (value) {
        this.departmentData = this.findData(value);
        this.departmentValue = null;
      }
    },
    methods:{
      getDetailData:function (userId) {
        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageusers!queryVisibleProjectByUserId.action",
          method: "POST",
          params: {
            "userId": userId
          }
        }).then(function (response) {
            var data = response.data;

            This.userName = data.oneUserMsg.referredName;
            This.userCompany = data.oneUserMsg.companyName;
            This.department = data.oneUserMsg.departmentName;
            This.userType = data.oneUserMsg.name;

            This.projectData = This.cloneData(data.projects);
            This.initProjectData = This.cloneData(data.projects);
        });

      },
    /*隐藏 detail 弹窗*/
      hideDetail:function () {
        this.$emit("hideDetail");
      },
      /*点击 复选框的时候 改变是否可见*/
      changeVisible:function (e) {
        var index = e.target.getAttribute('index');
        this.projectData[index].isVisible = this.projectData[index].isVisible == 1?0:1;
      },
      changeNewVisible:function (e) {
        var index = e.target.getAttribute('index');
        this.$set(this.addProjectData,index,{
          id:this.addProjectData[index].id,
          title:this.addProjectData[index].title,
          isVisible:this.addProjectData[index].isVisible == 1?0:1
        });
      },
      initProject:function () {
        if(this.detailUserType == "scan"){
          this.projectData = this.cloneData(this.initProjectData);
        }else{
          this.addProjectData = this.cloneData(this.initProjectData);
        }
      },
      /*发送 数据*/
      sendProjectData:function () {
        if(this.detailUserType == "scan"){
          this.changeHadUser();
        }else{
          this.addNewUser();
        }
      },
      /*改变现有用户的数据*/
      changeHadUser:function () {
        var projectArray = [];
        for(var index in this.projectData){
          var tempData = this.projectData[index];
          if(tempData.isVisible == 1){
            projectArray.push(tempData.id);
          }
        }

        var projectsString = projectArray.join("@");

        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageusers!updateVisibleProjectOfCustomer.action",
          method: "POST",
          params: {"projectsString": projectsString, "userId": This.userId},
        }).then(function (response) {
          var data = response.data;
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目分配信息修改成功",
              button1: "确认",
              button1CallBack:function () {
                This.$emit('hideDetail');
              }
            });
        });
      },
      /*添加一个新用户*/
      addNewUser:function () {
        var referredName = this.userName;
        var password = this.passwordV;
        var companyId = this.companyValue;
        var departmentId = this.departmentValue;
        var roleId = this.userSelectType;

        /*生成 projects 数据*/
        var projectArray = [];
        for(var index in this.addProjectData){
          var tempData = this.addProjectData[index];
          if(tempData.isVisible == 1){
            projectArray.push(tempData.id);
          }
        }

        if(referredName == "" || referredName == " "){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "用户名不能为空。",
            button1: "确认",
            button1CallBack:function () {

            }
          });
          return false;
        }
        if(password.length > 20 || password.length < 8 || password.indexOf(" ") != -1){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "密码长度在8位到20位之间，中间不能有空格",
            button1: "确认",
            button1CallBack:function () {

            }
          });
          return false;

        }

        if(companyId == ""){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "必须选择用户公司。",
            button1: "确认",
            button1CallBack:function () {

            }
          });
          return false;

        }

        if(roleId == ""){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "必须选择用户类型。",
            button1: "确认",
            button1CallBack:function () {

            }
          });
          return false;

        }

        var projectsString = projectArray.join("@");

        var This = this;

        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageusers!addOneUser.action",
          method: "POST",
          params: {
            "referredName": referredName,
            "password": password,
            "companyId": companyId,
            "departmentId": departmentId,
            "roleId": roleId,
            "projectsString": projectsString
          }
        }).then(function (response) {
          var data = response.data;
            if(data.result == 1){
              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "用户创建成功。",
                button1: "确认",
                button1CallBack:function () {
                  This.$emit('userAddSuccess');
                }
              });
            }else{
              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "用户创建失败，稍后再试。",
                button1: "确认",
                button1CallBack:function () {
                  This.$emit('hideDetail');
                }
              });
            }

        }).catch(function(e){

        });
      },
      /*深复制方法*/
      cloneData:function (obj) {
        var buf;
        if(obj instanceof Array){
          buf = [];
          var i = obj.length;
          while(i--){
            buf[i] = this.cloneData(obj[i]);
          }
          return buf;
        }else if(obj instanceof Object){
          buf = {};
          for(var k in obj){
            buf[k] = this.cloneData(obj[k]);
          }
          return buf;
        }else{
          return obj;
        }
      },
      /*新添加用户的时候，获取基本数据*/
      getNewUserData:function () {
        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageusers!queryCommonMsgForAddUser.action",
          method: "POST",
          params: {},
        }).then(function (response) {
            var data = response.data;
            /*把数据 深复制给 addProjectData*/
            This.addProjectData = This.cloneData(data.projects);
            /*给里面的数据添加 一个 isVisible 属性 并赋值 0*/
            for(var index in This.addProjectData){
              This.addProjectData[index].isVisible = 0;
            }
            /*把数据 深复制给 initProjectData*/
            This.initProjectData = This.cloneData(This.addProjectData);

            This.newUserOptionData = data.rolesMsg;/*用户类型 选项*/
            This.companyData = data.companyAndDepartmentMsg;/*公司 信息*/
        });
      },
      /*处理 公司 部门 数据 的过滤选项。*/
      findData:function (id) {
        var length = this.companyData.length;
        for(var i=0;i < length;i++){
          var tempData = this.companyData[i];
          if(id == tempData.id){
            if(!!tempData.childDepartments){
              return tempData.childDepartments;
            }else{
              return [];
            }
          }
        }
        return [];
      },

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
  .detail-container{
    height: 805px;
    width: 790px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -405px;
    margin-top: -385px;
    background-color: white;
    padding: 10px;
    border-radius: 6px;
  }
  .add-user-container-style{
    height: 875px;
    margin-top: -405px;
  }
  .user-desc-head-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #cccccc;
  }
  .user-desc-head-div h2{
    color: #2b3541;
    font-size: 16px;
    font-weight: 100;
  }
  .user-desc-head-div img{
    cursor: pointer;
    margin-right: 10px;
  }
  .input-container-div{
    padding-left: 80px;
    box-sizing: border-box;
    padding-top: 40px;
  }
  .input-label{
    color: #2b3541;
    font-size: 16px;
    display: block;
    width: 90px;
  }
  .input-style{
    width: 540px;
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
  .project-container{
    height: 290px;
    width: 540px;
    border: 1px solid #cccccc;
    border-radius: 6px;
    overflow-y: scroll;
  }
  .align-start{
    align-items: flex-start;
  }
  .button-line-div{
    display: flex;
    align-items: center;
    justify-content: center;
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
  .project-line-div{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  .no-choice-div{
    height: 16px;
    width: 16px;
    border-radius: 2px;
    margin-left: 20px;
    cursor: pointer;
    background: url("../../assets/common/noChoice.png");
  }
  .choice-div{
    background: url("../../assets/common/choice.png");
  }
  .project-name{
    margin-left: 10px;
    color: #2b3541;
    font-size: 14px;
  }
  .select-user-type{
    height: 40px;
    width: 540px;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
</style>
