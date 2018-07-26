<template>
  <div class="c-type-div">
    <div class="table-content-div">
      <div class="project-h2">{{menuName}}</div>
      <div class="table-name">
        项目 CFA =
        <input class="input-type-head"
               :disabled="!projectTableEditSwitch"
               typp="text"
               v-model="totalCFAArea"/>
        m2</div>
      <table-component :tableConfig="tableConfig" @dataChange="dataChange" v-if="tableConfig.tableData"></table-component>
      <div class="table-line-div">
        <div class="table-cell-div" v-for="(item1,key1) in lastLine"  :key="key1">{{dealHtmlData(item1.value)}}</div>
      </div>
      <div class="pro-button-line-div" v-if="roleId==3 || roleId==2 && projectType">
        <button class="button-style" @click="editProTable('true')" v-show="!projectTableEditSwitch">编辑</button>
        <button class="button-style" @click="editProTable('false')" v-show="projectTableEditSwitch">取消</button>
        <button class="button-style" v-show="projectTableEditSwitch" @click="saveTableData">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import tableComponent from "@/components/projectOne/tableComponent"

  export default {
        name: "project-c-component",
        props:["baseData","componentId","menuName"],
        components:{tableComponent},
      data(){
          return{
            tableConfig:{},
            projectTableEditSwitch:false,
            lastLine:null,
            totalCFAArea:null,
            currentTableData:null,
            userInfo:{},
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
        this.dealData();
        this.totalCFAArea = this.baseData.totalCFAArea;
      },
      methods:{
        changeProjectStatus:function () {

        },
        saveTableData:function () {
          // if(this.componentId == 1){
            var tempData = this.currentTableData;

            /*从数据里面抽取出 需要的数据 进行组装*/
            var segmentWorkString = "";
            for(var i=1;i<tempData.length;i++){
              segmentWorkString += tempData[i][0].value+"@"+tempData[i][3].value+"#";
            }
            segmentWorkString = segmentWorkString.substring(0,segmentWorkString.lastIndexOf("#"));

            var This = this;
            this.axios({
              url:this.$store.state.other.ipAddress + "/manages/manageprojects!updateOneStageSegmentMsg.action",
              method:"post",
              params:{
                "projectSS_id":this.componentId,
                "totalCFAArea":this.totalCFAArea,
                "segmentWorkString":segmentWorkString
              }
            }).then(function (response) {
              var data = response.data;
              if(data.messageType == 1){
                This.$store.dispatch("dialogParameter", {
                  type: "alert",
                  changeText: "内容修改成功",
                  button1: "确认",
                  button1CallBack:function () {
                    This.$router.go(0);
                    This.$emit("reloadPage");
                  },
                });
              }
            });
          // }

        },
        editProTable:function (type) {
          if(type == "true"){
            this.projectTableEditSwitch = true;
            this.tableConfig.editStatus = true;
          }else{
            this.projectTableEditSwitch = false;
            this.tableConfig.editStatus = false;

            /*用户取消的时候需要还原会原来的数据样子*/
            this.dataChange(this.tableConfig.tableData);
          }

          var tempData = this.cloneData(this.tableConfig);
          this.tableConfig = {};
          var This = this;
          setTimeout(function () {
            This.tableConfig = tempData;
          },0);
        },
        /*表格组件内容修改，返回数据，进行 最后一行数据的更新*/
        dataChange:function (tempProjectData) {

          this.currentTableData = tempProjectData;

          // var allPrice = tempProjectData.all_totalPrice;

          // for(var i=1;i<tempProjectData.length;i++){
          //   for(var j=0;j<tempProjectData[i].length;j++){
          //     var tempData = tempProjectData[i][j];
          //     if(j == 2){
          //       allPrice += parseFloat(tempData.value,2)
          //     }
          //   }
          // }

          this.lastLine = [
            {
              edit:false,
              value:""
            },{
              edit:false,
              value:"小计"
            },{
              edit:false,
              value:this.baseData.totalRow.all_totalPrice
            },{
              edit:false,
              value:this.baseData.totalRow.all_perSquarePrice
            },{
              edit:false,
              value:this.baseData.totalRow.all_percentage
            }
          ];
        },
        /*生成 表格显示数据*/
        dealData:function () {
            var tableArray = [
              [{
                edit:false,
                value:'序号'
              },
                {
                  edit:false,
                  value:" "
                },
                {
                  edit:false,
                  value:"单方造价（RMB/m2）"
                },
                {
                  edit:false,
                  value:"总价（RMB）"
                },
                {
                  edit:false,
                  value:"占比"
                }]
            ];

            var tempData = this.cloneData(this.baseData.worksMsg);
            for (var i=0;i<tempData.length;i++){
              tableArray.push([
                {
                  name:"id",
                  edit:false,
                  value:tempData[i].id,
                  type:"string",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                },
                {
                  name:"sort",
                  edit:false,
                  value:tempData[i].workCode,
                  type:"string",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                },
                {
                  name:"title",
                  edit:false,
                  value:tempData[i].title,
                  type:"string",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                },
                {
                  name:"perSquarePrice",
                  edit:true,
                  value:tempData[i].perSquarePrice,
                  type:"number",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                },
                {
                  name:"totalPrice",
                  edit:false,
                  value:tempData[i].totalPrice,
                  type:"number",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                },
                {
                  name:"percentage",
                  edit:false,
                  value:tempData[i].percentage,
                  type:"string",
                  styles:{
                    xie:!!tempData[i].parentId?true:false
                  }
                }
              ]);

            }
            /*赋值当前 table 数据*/
            this.dataChange(tableArray);

            this.tableConfig = {
              editStatus:false,
              tableData:tableArray,
            }
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
        dealHtmlData:function (value) {
          var reg = /^\d+(\.\d+)?$/;
          if(!!reg.exec(value)){
            value = parseFloat(value);
            value = value.toFixed(2);
            value = parseFloat(value);
            value = value.toLocaleString();
            return value;//返回的是字符串23,245.12保留2位小数
          }else{
            return value;
          }
        },
      },

    }
</script>

<style scoped>
  .table-name{
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #333333;
    border: 1px solid #cccccc;
    border-bottom: none;
  }
  .project-h2{
    margin: 10px 0;
    font-size: 18px;
    color: #333333;
  }
  .button-style{
    width: 80px;
    height: 30px;
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 3px;
    margin-left: 20px;
    cursor: pointer;
  }
  .pro-button-line-div{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .table-line-div{
    display: flex;
    align-items: stretch;
    border:1px solid #cccccc;
    box-sizing: border-box;
    border-top: none;
    width: 100%;
  }
  .table-cell-div,
  .table-line-operation{
    width: 100%;
    min-height: 30px;
    text-align: center;
    border-right: 1px solid #dedfe2;
    background-color: #e3e3e3;
    font-size: 14px;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:  5px;
    box-sizing: border-box;
  }
  .table-cell-div:first-child{
    width: 100px;
    flex-shrink: 0;
  }
  .input-type-head{
    border: none;
    background-color: rgba(0,0,0,0);
    color: #333333;
    width: 60px;
    text-align: center;
    padding:10px 0px;
    box-sizing: border-box;
  }
  .input-type-head:focus{
    border: 1px solid #cccccc;
  }
</style>
