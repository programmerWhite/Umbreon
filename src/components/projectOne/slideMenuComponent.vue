<template>
  <div class="menu-container-div">
    <div class="menu-head-div">
      <img src="../../assets/common/menuImg.png" />
      <span>全部导航</span>
    </div>
    <div class="menu-content-div">
      <div class="one-level" v-for="(item,key) in menuData" :key="key">
        <div class="one-level-name" @mousedown="item.childShow=item.childShow?false:true" @click="clickMenu(item.type,item.id)">{{item.menuName}}</div>
        <div class="two-level-div" v-for="(item2,key2) in item.menuChild" v-show="item.childShow" v-if="item.menuChild.length > 0" :key="key2">
          <div class="two-level-name" :class="(item2.type+'-'+item2.id) == currentMenuId?'current-menu-style':''" @click="clickMenu(item2.type,item2.id)">
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
            currentMenuId:""
          }
      },
      mounted:function () {
          // console.log(JSON.stringify(this.menuData))
      },
      methods:{
        childShow:function(childShow){
          childShow = childShow?false:true;
        },
        clickMenu:function (type,id) {
          this.currentMenuId  = type+"-"+id;
          this.$emit("menuClick",type,id);
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
  .menu-head-div{
    height: 57px;
    background-color: #ed6b1a;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .menu-head-div{
    display: flex;
    align-items: center;
    color: white;
  }
  .menu-head-div span{
    margin-left: 20px;
    font-size: 18px;
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
</style>
