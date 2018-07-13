<template>
  <div class="home-page-div">
    <head-component></head-component>
    <div class="user-m-container-div">
      <div class="user-m-head-div">
        <span>用户管理</span>
      </div>
      <div class="user-manage-content-div">
        <div class="user-filter-div">
          <div class="filter-outer-div">
            <input type="text" placeholder="登录名" v-model="filterValue"/>

            <select class="select-style" type="text" placeholder="用戶公司" v-model="companyValue">
              <option v-for="item in companyData" :companyId="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>

            <select class="select-style" type="text" placeholder="部门" v-model="departmentValue">
              <option v-for="item in departmentData" :departmentId="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>
            <button class="search-button" @click="getUserData">查询</button>
          </div>
        </div>
        <div class="user-check-box-div">
          <div class="check-box-outer-div">

            <span class="role-span-outer" v-for="item in roleData">
                <input type="checkbox" @click="checkRoles" :roleId="item.id"/>
                <span>{{item.name}}</span>
            </span>

          </div>
          <div class="add-new-user">
            <span class="color-orange">+</span>
            <span @click="addNewUser">新增用户</span>
          </div>
        </div>
        <div class="u-m-scan-div">
            <table class="scan-table">
              <tr>
                <th style="width: 180px">用户名</th>
                <th style="width: 150px">姓名</th>
                <th style="width: 345px">用户公司</th>
                <th style="width: 190px">用户部门</th>
                <th style="width: 170px">用户类型</th>
                <th style="width: 125px">操作</th>
              </tr>
              <tbody>
                <table-tr v-for="(item,key) in trData" @hideDetail="hideDetail" @showDetail="showDetail" @scanPassword="showChangePassword" :trData="item" :key="key"></table-tr>
              </tbody>
            </table>
          <div class="foot-line-div">
            <div class="page-desc"></div>
            <div class="page-container">
              <page-component :totalPage="totalPage" :currentPage="currentPage" v-if="totalPage>0" @pageChange="changePageSize"></page-component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <user-detail v-if="userDetailShow" :userId="detailUserId" :detailUserType="detailUserType" @hideDetail="hideDetail" @userAddSuccess="userAddSuccess"></user-detail>
    <change-password v-if="changePasswordShow" :userData="userData" @hideChangePassword="hideChangePassword"></change-password>
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import tableTr from "@/components/userManage/tableTr"
  import pageComponent from "@/components/common/pageComponent"
  import userDetail from "@/components/userManage/userDetail"
  import changePassword from "@/components/userManage/changePassword"

  export default {
    name: "home",
    components:{headComponent,tableTr,pageComponent,userDetail,changePassword},
    data(){
      return {
        filterValue:"",
        rolesArray:[],
        trData:[],
        roleData:null,
        companyData:null,
        companyValue:null,
        departmentData:null,
        departmentValue:null,
        currentPage:1,
        totalPage:0,
        userDetailShow:false,
        detailUserId:null,
        changePasswordShow:false,
        userData:null,
        detailUserType:"scan"
      }
    },
    beforeCreate:function () {
      /*开启遮罩*/
      this.$store.dispatch("dialogParameter",{
        type:"load"
      });


    },
    mounted:function () {

      if(!!sessionStorage.getItem('currentPage')){
        this.currentPage = sessionStorage.getItem('currentPage');
      }

      this.getUserData();

      var This = this;

      /*关闭遮罩*/
      setTimeout(function () {
        This.$store.commit("closeDialog");
      },1000);

    },
    watch:{
      companyValue:function (value) {
        this.departmentData = this.findData(value);
        this.departmentValue = null;
      },
      trData:function () {

      }
    },
    methods:{
      /*获取页面数据*/
      getUserData:function () {
        var This = this;
        var rolesString = this.rolesArray.join("@");
        This.trData = [];

        this.axios({
          url:this.$store.state.other.ipAddress+"/manages/manageusers!queryUsersByNCDR.action",
          method:"POST",
          params:{
            "rolesString":rolesString,
            "referredName":This.filterValue,
            "companyId":This.companyValue,
            "departmentValue":This.departmentValue,
            "currentPage":This.currentPage,
            "pageSize":10
          }
        }).then(function (response) {
          var data = response.data;
          This.trData = data.userMsg;

          This.totalPage = data.totalPage;

          This.roleData = data.rolesMsg;

          /*添加一个全部用户选项*/
          data.companyAndDepartmentMsg.unshift({
            id:"",
            name:"全部公司",
            parentId:null,
            description:null,
          });

          This.companyData = data.companyAndDepartmentMsg;
        });
      },
      /*点击角色的时候进行 参数修改，重新获取数据*/
      checkRoles:function (e) {
        var roleId = e.target.getAttribute("roleId");
        var index = this.rolesArray.indexOf(roleId);
        if(index == -1){
          this.rolesArray.push(roleId);
        }else{
          this.rolesArray.splice(index,1);
        }

        this.getUserData();

      },

      /*处理 公司 部门 数据 的过滤选项。*/
      findData:function (id) {
        var length = this.companyData.length;
        for(var i=0;i < length;i++){
          var tempData = this.companyData[i];
          if(id == tempData.id){
            if(!!tempData.childDepartments){
              tempData.childDepartments.unshift({
                id:"",
                name:"全部部门",
              });
              return tempData.childDepartments;
            }else{
              return [];
            }
          }
        }
        return [];
      },

      /* 点击处理 子组件 翻页事件的响应，修改参数 */
      changePageSize:function (pageSize) {
        sessionStorage.setItem('currentPage',pageSize);
        this.currentPage = pageSize;
        this.getUserData();
      },
      /*显示detail 组件 查看用户详细信息*/
      showDetail:function (userId) {
        this.detailUserType = "scan";
        this.detailUserId = userId;
        this.userDetailShow = true;
      },
      /*添加新用户*/
      addNewUser:function () {
        this.detailUserType = "add";
        this.userDetailShow = true;
      },
      /*隐藏 detail 组件*/
      hideDetail:function () {
        this.userDetailShow = false;
      },
      /*用户创建成功*/
      userAddSuccess:function () {
        this.userDetailShow = false;
        this.getUserData();
      },
      /*显示 修改密码 子组件 */
      showChangePassword:function (userData) {
        this.userData = userData;
        this.changePasswordShow = true;
      },
      /*隐藏 修改密码 子组件 */
      hideChangePassword:function () {
        this.changePasswordShow = false;
      }
    }

  }
</script>

<style scoped>

  .user-m-container-div{
    height: 875px;
    width: 1200px;
    background-color: #eeeeee;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .user-m-head-div{
    height: 40px;
    width: 100%;
    background-color: #ed6b1a;

  }
  .user-m-head-div span{
    margin-left: 20px;
    line-height: 40px;
    color: white;
  }
  .search-button{
    width: 90px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: white;
    font-size: 16px;
    margin-left: 40px;
    border: 1px solid #ed6b1a;
    background-color: #ed6b1a;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter-outer-div{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-outer-div input{
    height: 30px;
    width: 215px;
    border: 1px solid #cecece;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }
  .user-filter-div{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
  }
  .user-manage-content-div{
    padding: 0 20px;
  }
  .user-check-box-div{
    border-top: 1px solid #ed6b1a;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .add-new-user{
    color: #2b3541;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .color-orange{
    font-size: 22px;
    color: #ed6b1a;
    margin-right: 10px;
  }
  .scan-table{
    border-radius: 6px;
    overflow: hidden;
    border-spacing: 0px;
    border: 1px solid #d2d2d2;
  }
  .scan-table th{
    background-color: #d2d2d2;
    height: 40px;
    text-align: center;
    color: #2b3541;
    font-size: 16px;
    font-weight: 100;
  }
  .check-box-outer-div span{
    color: #2b3541;
  }
  .role-span-outer{
    margin-right: 10px;
  }
  .select-style{
    height: 30px;
    width: 190px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    margin: 0 10px;
  }
  .foot-line-div{
    padding: 0 20px;
    box-sizing: border-box;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
