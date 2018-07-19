<template>
  <div class="picture-scroll-div">
    <div class="picture-inner-div" v-if="scrollImgArray.length > 0">
      <img class="scroll-img" :src="scrollImgArray[currentIndex]" />
    </div>
    <div class="no-project-img" v-else>
      <span>暂时还没有项目图片,请添加。</span>
    </div>
    <div class="index-circle-div">
      <div class="circle-div" v-for="(item,key) in scrollImgArray" @click="changePictureIndex(key)" :class="key == currentIndex?'current-circle':''">{{key+1}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "picture-scroll",
      props:["scrollImgData"],
      data(){
          return {
            scrollImgArray:[],
            currentIndex:0,
            scrollTimer:null
          }
      },
      beforeMount:function () {
          /*初始化数据*/
        this.scrollImgArray = this.scrollImgData;

        var This = this;
        this.scrollTimer = setInterval(function () {

          if(This.currentIndex < This.scrollImgArray.length - 1){
            This.currentIndex++;
          }else{
            This.currentIndex = 0;
          }
        },5000);
      },
      destroyed:function () {
        clearInterval(this.scrollTimer);
      },
      methods: {
        changePictureIndex:function (index) {
          this.currentIndex = index;
        }
      }
    }
</script>

<style scoped>
  .scroll-img{
    height: inherit;
    width: inherit;
  }
  .picture-inner-div{
    height: inherit;
    width: inherit;
  }
  .picture-scroll-div{
    position:relative;
  }
  .index-circle-div{
    position: absolute;
    bottom: 0px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .circle-div{
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background-color: #a6a6a6;
    color: #3d3d3d;
    margin: 0 5px;
    text-align: center;
    font-size: 10px;
    line-height: 16px;
    cursor: pointer;
  }
  .current-circle{
    color: white;
    background-color: #6d6c6b;
  }
  .no-project-img{
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #333333;
  }
</style>
