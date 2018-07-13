<template>
  <div>
    <head-component></head-component>
    <div class="user-m-container-div">
      <div class="user-m-head-div">
        <img @click="backToAllUser" src="../../assets/common/back.png" />
        <span>用户管理</span>
      </div>

    <div class="detail-container">
      <div class="input-container-div">
        <div class="input-line-div">
          <span class="input-label">用戶名</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" v-model="userName"/>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">姓名</span>
          <div class="input-outer-div">
            <input class="input-style" type="text"  v-model="realName"/>
          </div>
        </div>
        <div class="input-line-div" >
          <span class="input-label">重置密码</span>
          <div class="input-outer-div">
            <input class="input-style" type="text"  v-model="passwordV"/>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用戶公司</span>
          <div class="input-outer-div">
            <select class="select-user-type" >
              <option v-for="item in companyData" @click="changeDepartmentData" :selected="companyValue == item.id" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用户部门</span>
          <div class="input-outer-div">
            <select class="select-user-type" v-model="departmentValue">
              <option v-for="item in departmentData" :value="item.id" :selected="departmentValue == item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-line-div">
          <span class="input-label">用户类型</span>
          <div class="input-outer-div">
            <input class="input-style" type="text" disabled="disabled" v-model="userType"/>
          </div>
        </div>
        <div class="input-line-div align-start" v-if="projectData.length > 0">
          <span class="input-label">项目分配</span>
          <div class="input-outer-div">
            <div class="project-container">
              <div class="project-line-div" v-for="(item,key) in projectData" :key="key" >
                <div class="no-choice-div" :class="item.isVisible==1?'choice-div':''" :index="key" @click="changeVisible"></div>
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
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"

  export default {
    name: "user-detail",
    components:{headComponent},
    data(){
      return{
        userName:"",
        realName:"",
        userType:"",
        projectData:{},
        initProjectData:{},
        passwordV:"",
        companyData:"",//创建新用户时 选择的 公司 选项
        departmentData:"",//创建新用户时 选择的 部门 选项
        companyValue:null,//当前 用户 选择的公司 值
        departmentValue:null,//当前选择 部门 的 值
        userId:null,
        detailUserType:"scan"
      }
    },
    created:function () {
      this.userId = this.$route.params.userId;
      this.getDetailData(this.userId);
    },
    methods:{
      changeDepartmentData:function (e) {
        var value = e.target.getAttribute('value');
        this.companyValue = value;

        this.departmentData = this.findData(value);
        this.departmentValue = null;
      },
      backToAllUser:function () {
        this.$router.push({
          name:"userManage"
        })
      },
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
          This.userType = data.oneUserMsg.name;

          This.companyValue = data.oneUserMsg.company;
          This.departmentValue = data.oneUserMsg.department;

          This.companyData = data.companyAndDepartmentMsg;/*公司 信息*/

          if(This.companyValue){
            This.departmentData = This.findData(This.companyValue);
          }

          if(data.projects){
            This.projectData = This.cloneData(data.projects);
            This.initProjectData = This.cloneData(data.projects);
          }

        });

      },
      /*点击 复选框的时候 改变是否可见*/
      changeVisible:function (e) {
        var index = e.target.getAttribute('index');
        this.projectData[index].isVisible = this.projectData[index].isVisible == 1?0:1;
      },

      initProject:function () {
          this.projectData = this.cloneData(this.initProjectData);
      },
      /*发送 数据*/
      sendProjectData:function () {
          this.changeHadUser();
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

        var password = this.passwordV;
        if(password != "" && password != " "){
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
        }


        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageusers!updateOneUser.action",
          method: "POST",
          params: {
            "projectsString": projectsString,
            "userId": This.userId,
            "password":password,
            "realName":This.realName,
            "companyId":This.companyValue,
            "departmentId":This.departmentValue,
          },
        }).then(function (response) {
          var data = response.data;
          if(data.messageType == 1){
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目分配信息修改成功",
              button1: "确认",
              button1CallBack:function () {
              }
            });
          }
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
  .user-m-container-div{
    width: 1200px;
    margin: 0 auto;
  }
  .user-m-head-div{
    height: 40px;
    width: 100%;
    background-color: #ed6b1a;
    display: flex;
    align-items: center;
  }
  .user-m-head-div img{
    margin: 0 10px;
    cursor: pointer;
  }
  .user-m-head-div span{
    margin-left: 20px;
    line-height: 40px;
    color: white;
  }
  .detail-container{
    height: 825px;
    width: 790px;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    border-radius: 6px;
  }
  .add-user-container-style{
    height: 875px;
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
