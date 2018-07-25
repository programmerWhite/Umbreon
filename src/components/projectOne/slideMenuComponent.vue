<template>
  <div class="menu-container-div">
    <div class="menu-content-div">
      <div class="one-level" v-for="(item,key) in menuData" :key="key">
        <div class="one-level-name"
             @mousedown="item.childShow=item.childShow?false:true"
             :class="(item.type+'-'+item.id) == currentMenuId?'current-menu-style':''"
             @click="clickMenu(item.type,item.id,item.menuName)" >
          {{item.menuName}}
        </div>
        <div class="two-level-div" v-for="(item2,key2) in item.menuChild" v-show="item.childShow" v-if="item.menuChild.length > 0" :key="key2">
          <div class="two-level-name" :class="(item2.type+'-'+item2.id) == currentMenuId?'current-menu-style':''" @click="clickMenu(item2.type,item2.id,item2.menuName)">
            <div class="orange-circle"></div>
            <span>{{item2.menuName}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "slide-menu-component",
      props:["menuData","menuClick"],
      data(){
          return{
            currentMenuId:"",
          }
      },
      mounted:function () {
          // console.log(JSON.stringify(this.menuData))
      },
      methods:{
        childShow:function(childShow){
          childShow = childShow?false:true;
        },
        clickMenu:function (type,id,menuName) {
          if(id != -2 && id != -3){
            this.currentMenuId  = type+"-"+id;
          }
          this.$emit("menuClick",type,id,menuName);
          if(type == "staticMenu" && id < 0){
            return false;
          }
          this.menuShowHide = false;
        }
      }
    }
</script>

<style scoped>
  .menu-container-div{
    width: 100%;
    border: 1px solid #eeeeee;
    border-top: none;
    box-sizing: border-box;
  }
  .one-level-name{
    padding-left: 20px;
    color: #ed6b1a;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .two-level-name{
    padding-left: 20px;
    color: #333333;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .orange-circle{
    height: 8px;
    width: 8px;
    background-color: #ed6b1a;
    border-radius: 100%;
    display: inline-block;
    margin:0 10px;
  }
  .current-menu-style{
    background-color: #fbf0e9;
  }
  .menu-content-div{
    box-shadow: 0 2px 10px 2px #cccccc;
  }
</style>
