<template>
  <div class="page-container-div" v-show="totalPage > 1">
    <div class="change-page-number" v-if="currentPage > 1 " @click="clickNumPage" :pageNum="currentPage-1">&lt; 前页</div>
    <div class="page-num" v-for="(item,key) in pageArray" :class="item==currentPage?'current-page-style':''" v-bind:key="key" :pageNum="item" @click="clickNumPage">{{item}}</div>
    <div class="change-page-number" v-if="currentPage < totalPage " @click="clickNumPage" :pageNum="parseInt(currentPage)+1">后页 &gt;</div>
  </div>
</template>

<script>
    export default {
        name: "page-component",
      props:["totalPage","currentPage"],
      data(){
          return{
            startPage:1,
            endPage:1,
            pageArray:[]
          }
      },
      beforeMount:function () {

        var CURRENT_PAGE = this.currentPage;
        var allPage = this.totalPage;
        var endPage = parseInt(CURRENT_PAGE);

        if(CURRENT_PAGE > 5){
          this.startPage = CURRENT_PAGE - 3;
        }

        if(endPage + 3 < allPage){
          this.endPage = endPage + 3;
        }else{
          this.endPage = allPage;
        }

        for(var i = this.startPage;i <= this.endPage;i++){
          this.pageArray.push(i);
        }

      },
      methods:{
          clickNumPage:function (e) {
            var currentPage = e.target.getAttribute("pageNum");

            this.$emit('pageChange',currentPage);
          }
      }
    }
</script>

<style scoped>
  .page-container-div{
    display: flex;
    align-items: center;
  }
  .change-page-number{
    color: #2b3541;
    font-size: 16px;
    cursor: pointer;
  }
  .change-page-number:hover{
    color: #ed6b1a;
  }
  .page-num{
    color: #2b3541;
    font-size: 16px;
    padding:0 8px;
    cursor: pointer;
  }
  .page-num:hover{
    color: #ed6b1a;
  }
  .current-page-style{
    color: #ff0101;
  }
</style>
