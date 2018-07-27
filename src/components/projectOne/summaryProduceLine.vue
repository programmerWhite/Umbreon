<template>
  <div class="table-container-div">
    <div class="cols-line-div" v-for="(item,key) in tableArray" :key="key">
      <div class="rows-outer-div"
           v-for="(item1,key1) in item"
           :key1="key1">
        <div class="rows-one-div"
             v-if="!item1.childData"
             :style="{backgroundColor:item1.bgColor,color:item1.color,fontStyle:item1.fontStyle}"
             v-html="item1.value"
             :class="sortLineStyle(item1.value,key)"
        ></div>
        <div class="rows-container-div"
             v-if="item1.childData"
             v-for="(item2,key2) in item1.childData"
             :style="{backgroundColor:item2.bgColor,color:item2.color,fontStyle:item2.fontStyle}"
             :key2="key2"
             v-html="dealHtmlData(item2.value)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import "../common/font.css"

  export default {
        name: "summary-produce-line",
      props:["tableArray"],
      beforeMount:function () {
        // console.log(this.tableArray)
      },
      methods:{
        dealHtmlData:function (value) {
          var reg = /^\d+(\.\d+)?$/;
          if(!!reg.exec(value)){
            value = parseFloat(value);
            // value = value.toFixed(2);
            value = parseFloat(value);
            value = value.toLocaleString();
            return value;//返回的是字符串23,245.12保留2位小数
          }else{
            return value;
          }
        },
        sortLineStyle:function (value,index) {
          if(index == 0) {
            if (value != "" && value.indexOf('.') != -1) {
              return "text-right";
            } else {
              var reg = new RegExp("[a-zA-Z]");
              if (reg.test(value)) {
                return "text-right";
              } else {
                return "text-left";
              }
            }
          }else if(index == 1) {
            return "text-left";
          }
        }
      }
    }
</script>

<style scoped>
  .table-container-div{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    font-family: DroidSansMono;
  }
  .cols-line-div{
    min-width: 50px;
    flex-shrink: 0;
  }
  .rows-one-div,
  .rows-container-div{
    font-size: 14px;
    min-height: 40px;
    text-align: center;
    padding: 0 5px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    flex-shrink: 0;
  }
  .rows-container-div{
    width: 50%;
  }
  .rows-outer-div{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cccccc;
  }
  .text-left{
    justify-content: flex-start;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .text-right{
    justify-content: flex-end;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
</style>
