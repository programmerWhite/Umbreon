<template>
  <div class="menu-container-div">
    <div class="menu-head-div">
      <img src="#" />
      <span>全部导航</span>
    </div>
    <div class="menu-content-div">
      <div class="one-level" v-for="(item,key) in menuData" :key="key">
        <div class="one-level-name" @click="item.childShow=item.childShow?false:true">{{item.menuName}}</div>
        <div class="two-level-div" v-for="(item2,key2) in item.menuChild" v-show="item.childShow" v-if="item.menuChild.length > 0" :key="key2">
          <div class="two-level-name">
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
      data(){
          return{
            menuData:[
              {
                menuName:"商办项目调研报告",
                menuChild:[],
              },
              {
                menuName:"项目基本信息",
                menuChild:[],
              },
              {
                menuName:"分部分项造价比较表",
                childShow:false,
                menuChild:[
                  {
                    menuName:"汇总",
                  },
                  {
                    menuName:"地下车库及设备用房",
                  },
                  {
                    menuName:"地下商业",
                  },
                  {
                    menuName:"地上商业",
                  },
                  {
                    menuName:"地上办公",
                  },
                ],
              },
              {
                menuName:"各专业指标及比较分析表",
                childShow:false,
                menuChild:[
                  {
                    menuName:"结构工程",
                  },
                  {
                    menuName:"幕墙工程",
                  },
                  {
                    menuName:"结构工程",
                  },
                  {
                    menuName:"目前工程",
                  },
                  {
                    menuName:"精装修工程",
                  },
                  {
                    menuName:"室外景观工程",
                  },
                  {
                    menuName:"综合机电工程",
                  },
                ],
              }
            ]
          }
      },
      methods:{
        childShow:function(childShow){
          console.log(childShow)
          childShow = childShow?false:true;
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
</style>
