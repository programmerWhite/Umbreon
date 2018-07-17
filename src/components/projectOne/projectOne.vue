<template>
  <div class="project-one-container">
    <head-component></head-component>
    <div class="pro-one-content-div">
      <aside class="pro-menu-container-div">
        <slide-menu-component :menuData="menuData" @menuClick="menuClick" v-if="menuData.length > 0"></slide-menu-component>
      </aside>
      <section class="pro-set-div">
        <base-project :baseData="baseData" v-if="!!baseData && componentType=='staticMenu' && componentId == '2'"></base-project>
        <project-c-component :baseData="cTypeData" @reloadPage="reloadPage" :componentId="componentId" v-if="!!cTypeData && componentType=='seg' && componentId != '-1'"></project-c-component>
      </section>
    </div>
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import slideMenuComponent from "@/components/projectOne/slideMenuComponent"
  import baseProject from "@/components/projectOne/baseProject"
  import projectCComponent from "@/components/projectOne/projectCComponent"

  export default {
      name: "project-one",
      components:{headComponent,slideMenuComponent,baseProject,projectCComponent},
    data(){
        return{
          menuData:{},
          currentComponent:baseProject,
          baseData:null,
          cTypeData:null,
          componentType:"staticMenu",
          componentId:"2"
        }
    },
    mounted:function () {
      this.getProjectData();
    },
    methods: {
        reloadPage:function () {
          this.menuClick(this.componentType,this.componentId);
        },
      /*菜单组件调用 父组件的方法*/
      menuClick:function (type,id) {
          this.componentType = type;
          this.componentId = id;
          console.log(type+"-"+id)
        if(type == "seg" && id == -1){
          this.getSummaryData();
        }else if(type == "seg" && id != -1){
          this.getCData(id);
        }else if(type == "d"){
          this.getDData(id);
        }
      },
      /*获取汇总信息*/
      getSummaryData:function (id) {
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryOneStageSegmentMsg.action",
          params: {"projectS_id":id}
        }).then(function () {

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
        this.axios({
          method: "post",
          url: this.$store.state.other.ipAddress + "/manages/manageprojects!queryOneStageDMsg.action",
          params: {"projectSD_id":id}
        }).then(function () {

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
        });
      },
      /*处理菜单栏数据*/
      dealMenuData:function (segmentList,dList) {
        /*添加一个默认数据*/
        var tempSegment = [{
          menuName:"C.0汇总",
          type:"seg",
          id:-1
        }];
        /*整理 segmentList 数据*/
        for(var i=0;i<segmentList.length;i++){
          tempSegment.push({
            menuName:segmentList[i].code+""+segmentList[i].title,
            type:"seg",
            id:segmentList[i].projectSS_id
          });
        }

        /*整理 dList 数据*/
        var tempDList = [];
        for(var i=0;i<dList.length;i++){
          tempDList.push({
            menuName:dList[i].code+""+dList[i].title,
            type:"d",
            id:dList[i].id
          });
        }

        this.menuData = [
            {
              menuName:"商办项目调研报告",
              type:"staticMenu",
              id:1,
              menuChild:[],
            },
            {
              menuName:"项目基本信息",
              type:"staticMenu",
              id:2,
              menuChild:[],
            },
            {
              menuName:"分部分项造价比较表",
              childShow:true,
              type:"staticMenu",
              id:-1,
              menuChild:tempSegment,
            },
            {
              menuName:"各专业指标及比较分析表",
              childShow:false,
              type:"staticMenu",
              id:-1,
              menuChild:tempDList,
            }
          ];
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
    flex-shrink: 0;
  }
  .pro-set-div{
    margin-left: 10px;
    width: 100%;
  }
</style>
