<template>
  <div class="project-d-div">
    <div class="pro-d-container">
      <div class="project-h2">{{menuName}}</div>
      <div class="table-container-1-div">
        <table-component :tableConfig="tableConfig" @dataChange="dataChange" v-if="tableConfig.projectTableData"></table-component>
        <div class="pro-button-line-div" v-if="roleId==3 || roleId==2 && projectType">
          <button class="desc-button-style" @click="editProTable(true)" v-show="!projectTableEditSwitch">编辑</button>
          <button class="desc-button-style" @click="editProTable(false)" v-show="projectTableEditSwitch">取消</button>
          <button class="desc-button-style" v-show="projectTableEditSwitch" @click="saveTableData">确认</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import tableComponent from "@/components/common/tableComponent"
  import $ from "jquery"

  export default {
        name: "project-d-component",
    props:["baseData","menuName"],
    components:{tableComponent},
    data(){
      return{
        projectTableEditSwitch:false,
        tableConfig:{
          projectTableData:[],/*生成项目表格数据*/
          sessionSwitch:false,
          openEdit:true,
          editStatus:false
        },
        userInfo:null,
      }
    },
    computed: {
      roleId: function () {
        return this.userInfo.roleId;
      },
      projectType:function () {

        var projectType = sessionStorage.getItem('currentProjectType');
        if(projectType == 1){
          return true;
        }else if(projectType == 2){
          return false;
        }

      }

    },
    beforeMount:function () {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(this.baseData.recordsCode){
          var rowsData = JSON.parse(this.baseData.recordsCode);
          this.tableConfig.projectTableData = rowsData;
        }else{
          this.tableConfig.projectTableData = [];
        }

    },
    methods:{
      changeProjectStatus:function () {

      },
      editProTable:function (type) {
        this.projectTableEditSwitch = type;
        if(type){
          this.tableConfig.editStatus = true;
        }else{
          this.tableConfig.projectTableData = [];
          this.tableConfig.editStatus = false;

          var This = this;
          setTimeout(function () {
            This.tableConfig.projectTableData = JSON.parse(This.baseData.recordsCode);
          },0);
        }
      },
      dataChange:function (data) {
        this.tableConfig.projectTableData = data;
      },
      saveTableData:function () {
        var This = this;
        var tempData = JSON.stringify(this.tableConfig.projectTableData);
        var recordsCode = tempData;

        $.ajax({
          url:this.$store.state.other.ipAddress + '/manages/manageprojects!updateOneStageDMsg.action',
          type:"post",
          dataType:"json",
          data:{
            projectSD_id:this.baseData.id,
            recordsCode:recordsCode,
            token: sessionStorage.getItem('token')
          },
          xhrFields:{
            withCredentials: true
          },
          crossDomain:true,
          success:function () {
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "内容修改成功",
              button1: "确认",
              button1CallBack: function () {
                This.$emit("reloadPage");
              },
            });
          }
        });
        // this.axios({
        //   url:this.$store.state.other.ipAddress + '/manages/manageprojects!updateOneStageDMsg.action',
        //   method:"post",
        //   params:{
        //     projectSD_id:this.baseData.id,
        //     recordsCode:recordsCode,
        //   }
        // }).then(function () {
        //   This.$store.dispatch("dialogParameter", {
        //     type: "alert",
        //     changeText: "内容修改成功",
        //     button1: "确认",
        //     button1CallBack:function () {
        //       This.$emit("reloadPage");
        //     },
        //   });
        // });
      }
    }
  }
</script>

<style scoped>

  .project-h2{
    margin: 10px 0;
    font-size: 18px;
    color: #333333;
  }
  .pro-button-line-div{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .desc-button-style{
    width: 80px;
    height: 30px;
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 3px;
    margin-left: 20px;
    cursor: pointer;
  }
</style>
