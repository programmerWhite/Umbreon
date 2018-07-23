<template>
  <div class="project-one-container">
    <head-component></head-component>
    <div class="head-men-button-line">
      <div class="menu-head-div"  @click="menuShowHideF">
        <img src="../../assets/common/menuImg.png" />
        <span>全部导航</span>
      </div>
    </div>
    <div class="pro-one-content-div">
      <aside class="pro-menu-container-div" v-if="menuShowHide">
        <slide-menu-component :menuData="menuData" @menuClick="menuClick" v-if="menuData.length > 0"></slide-menu-component>
      </aside>
      <section class="pro-set-div" :style="{marginTop:(menuShowHide?'-50px':'0px')}">
        <change-project-status :status="projectStatus" v-if="projectStatus.code != null" @changeProjectStatus="changeProjectStatus"></change-project-status>
        <base-project :baseData="baseData" :menuName="menuName" v-if="!!baseData && componentType=='staticMenu' && componentId == '2'"></base-project>
        <project-c-component :baseData="cTypeData" :menuName="menuName" @reloadPage="reloadPage" :componentId="componentId" v-if="!!cTypeData && componentType=='seg' && componentId != '-1'"></project-c-component>
        <summary-component :baseData="summaryData" :menuName="menuName" v-if="summaryData && componentType=='seg' && componentId == '-1'"></summary-component>
        <project-d-component :baseData="dTypeData" :menuName="menuName" @reloadPage="reloadPage" v-if="!!dTypeData && componentType=='d'"></project-d-component>
      </section>
    </div>
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import slideMenuComponent from "@/components/projectOne/slideMenuComponent"
  import baseProject from "@/components/projectOne/baseProject"
  import projectCComponent from "@/components/projectOne/projectCComponent"
  import SummaryComponent from "@/components/projectOne/SummaryComponent"
  import projectDComponent from "@/components/projectOne/projectDComponent"
  import changeProjectStatus from "@/components/projectOne/changeProjectStatus"

  export default {
      name: "project-one",
      components:{headComponent,slideMenuComponent,baseProject,projectCComponent,SummaryComponent,projectDComponent,changeProjectStatus},
    data(){
        return{
          menuData:{},
          currentComponent:baseProject,
          baseData:null,
          cTypeData:null,
          dTypeData:null,
          summaryData:null,
          componentType:"staticMenu",
          componentId:"2",
          menuName:"",
          projectStatus:{},
          menuShowHide:true
        }
    },
    mounted:function () {
      this.getProjectData();
    },
    methods: {
        reloadPage:function () {
          this.menuClick(this.componentType,this.componentId,this.menuName);
        },
      /*菜单组件调用 父组件的方法*/
      menuClick:function (type,id,menuName) {
        if(type == "staticMenu" && id == -1){
          return false;
        }

        this.componentType = type;
        this.componentId = id;
        this.menuName = menuName;

        if(type == "seg" && id == -1){
          var projectS_id = this.$route.params.projectS_id;
          this.getSummaryData(projectS_id);
        }else if(type == "seg" && id != -1){
          this.getCData(id,menuName);
        }else if(type == "d"){
          this.getDData(id,menuName);
        }
      },
      /*获取汇总信息*/
      getSummaryData:function (id) {
        var This = this;
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryOneStageAllSegmentsMsg.action",
          params: {"projectS_id":id}
        }).then(function (response) {
          var data = response.data;
          This.summaryData = data;
        });
      },
      /*获取C类数据 */
      getCData(id){
        var This = this;
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryOneStageSegmentMsg.action",
          params: {"projectSS_id":id}
        }).then(function (response) {
          var data = response.data;
          This.cTypeData = null;
          setTimeout(function () {
            This.cTypeData = data;
          },0)
        });
      },
      /*获取D类数据 */
      getDData(id){
        var This = this;
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryOneStageDMsg.action",
          params: {"projectSD_id":id}
        }).then(function (response) {
            var data = response.data;
          This.dTypeData = null;
          setTimeout(function () {
            This.dTypeData = data;
          },0)
        });
      },
      /*获取项目基本信息*/
      getProjectData: function () {

        var projectId = this.$route.params.projectId;
        var projectS_id = this.$route.params.projectS_id;
        var This = this;
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryProjectBaseMsgOfOneProject.action",
          params: {"projecId":projectId,"projectS_id":projectS_id}
        }).then(function (response) {
          var data = response.data;
          This.dealMenuData(data.segmentList,data.dList);
          This.baseData = data.projectMsg;

          This.projectStatus.code = data.status;
          This.projectStatus.message = data.statusName;
          This.projectStatus.projectName = data.projectMsg.title;
        });
      },
      /*处理菜单栏数据*/
      dealMenuData:function (segmentList,dList) {
        /*添加一个默认数据*/
        var tempSegment = [{
          menuName:"C.0 汇总",
          type:"seg",
          id:-1
        }];
        /*整理 segmentList 数据*/
        for(var i=0;i<segmentList.length;i++){
          tempSegment.push({
            menuName:segmentList[i].code+" "+segmentList[i].title,
            type:"seg",
            id:segmentList[i].projectSS_id
          });
        }

        /*整理 dList 数据*/
        var tempDList = [];
        for(var i=0;i<dList.length;i++){
          tempDList.push({
            menuName:dList[i].code+" "+dList[i].title,
            type:"d",
            id:dList[i].id
          });
        }

        this.menuData = [
            {
              menuName:"A 商办项目调研报告",
              type:"staticMenu",
              id:-1,
              menuChild:[],
            },
            {
              menuName:"B 项目基本信息",
              type:"staticMenu",
              id:2,
              menuChild:[],
            },
            {
              menuName:"C 分部分项造价比较表",
              childShow:true,
              type:"staticMenu",
              id:-1,
              menuChild:tempSegment,
            },
            {
              menuName:"D 各专业指标及比较分析表",
              childShow:true,
              type:"staticMenu",
              id:-1,
              menuChild:tempDList,
            }
          ];
      },
      changeProjectStatus:function (type) {
        var projectS_id = this.$route.params.projectS_id;
        if(type == 1){
          this.uploadData(projectS_id);
        }else if(type == 2){
          this.rejectData(projectS_id);
        }else if(type == 3){
          this.agreeData(projectS_id);
        }
      },
      //提交 接口调用
      uploadData:function (projectS_id) {
        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!updateProjectStageStatus_Done.action",
          method:"post",
          params:{
            projectS_id:projectS_id
          }
        }).then(function (response) {
          var data = response.data;
          if(data.messageType == 1){
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "已经提交成功，等待审核。",
              button1: "确认",
              button1CallBack:function () {

              }
            });
          }
        });
      },
      //驳回 接口调用
      rejectData:function (projectS_id) {
        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!updateProjectStageStatus_Done.action",
          method:"post",
          params:{
            projectS_id:projectS_id
          }
        }).then(function (response) {
          var data = response.data;
          if(data.messageType == 1){
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目通过审核。",
              button1: "确认",
              button1CallBack:function () {

              }
            });
          }
        });
      },
      //驳回 接口调用
      agreeData:function (projectS_id) {
        var This = this;
        this.axios({
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!updateProjectStageStatus_Rejected.action",
          method:"post",
          params:{
            projectS_id:projectS_id
          }
        }).then(function (response) {
          var data = response.data;
          if(data.messageType == 1){
            This.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目数据已经驳回。",
              button1: "确认",
              button1CallBack:function () {

              }
            });
          }
        });
      },
      menuShowHideF:function () {
        this.menuShowHide = this.menuShowHide?false:true
      }
    }
  }
</script>

<style scoped>
  .pro-one-content-div{
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    width: 1200px;
    margin: 0 auto;
  }
  .pro-menu-container-div{
    width: 250px;
    background-color: white;
    flex-shrink: 0;
  }
  .pro-set-div{
    width: 100%;
    margin-left: 10px;
  }
  .menu-head-div{
    height: 57px;
    width: 250px;
    background-color: #ed6b1a;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .menu-head-div{
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
  }
  .menu-head-div span{
    margin-left: 20px;
    font-size: 18px;
  }
  .head-men-button-line{
    width: 1200px;
    margin: 0 auto;
  }
</style>
