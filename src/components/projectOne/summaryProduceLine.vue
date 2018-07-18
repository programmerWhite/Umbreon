<template>
  <div class="table-container-div">
    <div class="cols-line-div" v-for="(item,key) in tableArray" :key="key">
      <div class="rows-outer-div" v-for="(item1,key1) in item"  :key1="key1">
        <div class="rows-one-div" v-if="!item1.childData"  :style="{backgroundColor:item1.bgColor,color:item1.color}" v-html="item1.value"></div>
        <div class="rows-container-div" v-if="item1.childData" v-for="(item2,key2) in item1.childData" :style="{backgroundColor:item2.bgColor,color:item2.color}" :key2="key2" v-html="item2.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "summary-produce-line",
      props:["tableArray"],
      beforeMount:function () {
        console.log(this.tableArray)
      }
    }
</script>

<style scoped>
  .table-container-div{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  .cols-line-div{
    min-width: 100px;
    flex-shrink: 0;
  }
  .rows-one-div,
  .rows-container-div{
    min-height: 40px;
    text-align: center;
    padding: 0 10px;
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
</style>
