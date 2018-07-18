<template>
  <div class="table-container-div">
    <div class="table-line-div" v-for="(item,key) in tempProjectData" :key="key">
      <div class="table-cell-div" v-for="(item1,key1) in item.columns" :contenteditable="tableConfig.editStatus" @blur="blurDivInput" :cows="key" :cols="key1"  :key="key1">{{!!item1.value?item1.value:"-"}}</div>
      <div class="table-line-operation" v-show="tableConfig.editStatus">
        <span @click="addLine(key)">+</span>
        <span @click="deleteLine(key)">-</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "table-component",
      props:["tableConfig"],
      data(){
          return {
            tempProjectData:[]
          }
      },
      mounted:function () {

        var sessionData = sessionStorage.getItem('tempProjectData');
        this.tempProjectData = this.cloneData(this.tableConfig.projectTableData);

        var This = this;
        if(sessionData && this.tableConfig.sessionSwitch){
          this.$store.dispatch("dialogParameter", {
            type: "confirm",
            changeText: "是否加载上次的表格数据。",
            button1: "确认",
            button2: "取消",
            button1CallBack:function () {
              This.tempProjectData = JSON.parse(sessionData);
            },
            button2CallBack:function () {
              sessionStorage.removeItem('tempProjectData');
            }
          });
        }

      },
      methods:{
        /*添加一行*/
        addLine:function (index) {
          index++;
          var tempLine = this.cloneData(this.tempProjectData[0].columns);
          for(var key in tempLine){
            tempLine[key] = "";
          }
          this.tempProjectData.splice(index,0,{
            "columns":tempLine
          });
          sessionStorage.setItem('tempProjectData',JSON.stringify(this.tempProjectData));
        },
        /*删除一行数据*/
        deleteLine:function (index) {
          this.tempProjectData.splice(index,1);
          sessionStorage.setItem('tempProjectData',JSON.stringify(this.tempProjectData));
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
        /*div 输入框 失去焦点的时候 给他 数据做一个保存*/
        blurDivInput:function (e) {
          var text = e.target.innerText;
          var rows = e.target.getAttribute('cows');
          var cols = e.target.getAttribute('cols');

          this.tempProjectData[rows].columns[cols] = {
            value:text
          };
          sessionStorage.setItem('tempProjectData',JSON.stringify(this.tempProjectData));

        }

      }
    }
</script>

<style scoped>
  .table-container-div{
    width: 100%;
    border: 1px solid #dedfe2;
    box-sizing: border-box;
  }
  .table-line-div{
    display: flex;
    align-items: stretch;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
  .table-line-div:last-child{
    border-bottom: none;
  }
  .table-cell-div,
  .table-line-operation{
    width: 100%;
    min-height: 30px;
    text-align: center;
    border-right: 1px solid #dedfe2;
    background-color: #f3f3f3;
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
  .table-cell-div:focus{
    background-color: #ed6b1a;
    color: white;
  }
  .table-line-operation{
    border: none;
  }
  .table-line-operation span{
    cursor: pointer;
    color: #ed6b1a;
    font-size: 20px;
    padding:0 10px;
    font-weight: 800;
  }

</style>
