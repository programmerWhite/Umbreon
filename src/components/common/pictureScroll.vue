<template>
  <div class="picture-scroll-div">
    <div class="picture-inner-div">
      <img class="scroll-img" :src="scrollImgArray[currentIndex]" />
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
        this.scrollImgArray = [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531733503674&di=7556260b116b5e04d6d5e6506ba62e59&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cfd156288aa76ac7254878e2c380.jpg',
          "https://yiweifen.com/UploadFiles/haotu/20170804/4cu0pesmcaw643.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531733503675&di=ece9a5600d1da9b121fc50cb6bd4a42e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F31%2F28%2F71B58PIC9Ia_1024.jpg"
        ];

        var This = this;
        this.scrollTimer = setInterval(function () {

          if(This.currentIndex < This.scrollImgArray.length - 1){
            This.currentIndex++;
          }else{
            This.currentIndex = 0;
          }
        },5000);
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
</style>
