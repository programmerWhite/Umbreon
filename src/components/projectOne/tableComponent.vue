<template>
  <div class="table-container-div">
    <div class="table-line-div" v-for="(item,key) in tempProjectData" :key="key">
      <div class="table-cell-div"
           v-for="(item1,key1) in item"
           :contenteditable="item1.edit && editStatus"
           @blur="blurDivInput"
           :cows="key"
           :cols="key1"
           :key="key1"
           :dataType="item1.type">{{dealHtmlData(item1.value)}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table-component",
    props:["tableConfig"],
    data(){
      return {
        tempProjectData:[],
        editStatus:true,
        inputError:false
      }
    },
    mounted:function () {
      this.editStatus = this.tableConfig.editStatus;
      this.tempProjectData = this.cloneData(this.tableConfig.tableData);
    },
    methods:{
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
        var rows = e.target.getAttribute('cows');
        var cols = e.target.getAttribute('cols');
        var dataType = e.target.getAttribute('dataType');
        var text = e.target.innerText;
        var tempText = text.split('.');

        if(dataType == "number" ){
          /*正则表达式测试数据是否符合规则*/
          var reg =  new RegExp("^[0-9]+\.?[0-9]*$");
          //判断是否是 是数字
          if(!reg.test(text) || tempText.length >2 ){

              this.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "你输入的内容不符合规范",
                button1: "确认",
                button1CallBack:function () {

                },
              });
            //不符合规则 还原会修改前端的数据
            e.target.innerText = this.tempProjectData[rows][cols].value;
            return false;
          }

          if(text.indexOf('.') == -1){
            text = text+".00";
          }else{
            if(tempText[1].length == 0){
              text = text+"00";
            }else if(tempText[1].length == 1){
              text = text+"0";
            }else{
              text = tempText[0]+"."+tempText[1].substr(0,2);
            }
          }

          e.target.innerText = this.dealHtmlData(text);
        }

        this.tempProjectData[rows][cols].value = text;

        this.$emit("dataChange",this.tempProjectData);
      },
      dealHtmlData:function (value) {
        var reg = RegExp("^[0-9]{1,}.?[0-9]{0,}$");
        if(!!reg.test(value)){
          value = parseFloat(value);
          value = value.toFixed(2);
          value = parseFloat(value);
          value = value.toLocaleString();
          return value;//返回的是字符串23,245.12保留2位小数
        }else{
          return value;
        }
      },
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
    border-bottom:1px solid #cccccc;
    width: 100%;
  }
  .table-cell-div,
  .table-line-operation{
    width: 100%;
    min-height: 30px;
    text-align: center;
    border-right: 1px solid #dedfe2;
    background-color: #ffffff;
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

  .table-cell-div[contenteditable=false]{
    background-color: #f1f1f1;
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
