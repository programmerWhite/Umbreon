<template>
  <div class="project-base-div">
    <div class="pro-base-table">
      <div class="pro-table-head">{{menuName}}</div>
  </div>
  </div>
</template>

<script>

  import $ from "jquery"

  export default {
    name: "base-project",
    props: ["menuName"],
    data() {
      return {}
    },
  }

</script>

<style scoped>
  .add-img{
    display: none;
  }
  .orange-add-label{
    color: #ed6b1a !important;
    font-size: 40px !important;
    margin-top: 20px !important;
    font-weight: 500;
    height: 100px;
    width: 90px;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
  }
  .img-container-div{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 230px;
  }
  .upload-img{
    height: auto;
    width: 110px;
  }
  .close-img{
    position: absolute;
    right: -8px;
    top: -8px;
    cursor: pointer;
  }
  .button-line-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-photo-one{
    height: auto;
    width: 110px;
    position: relative;
    margin-right: 20px;
  }
  .img-photo-one:nth-child(4n){
    margin-right: 0px;
  }
  .shade{
    height: 100%;
    width:100%;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: rgba(0,0,0,0.4);
  }
  .modify-project-photo{
    padding: 10px;
    box-sizing: border-box;
    width: 580px;
    min-height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -290px;
    margin-top: -165px;
    background-color: white;
    border-radius: 6px;
  }
  .pop-head-div{
    font-size: 18px;
    color: #333333;
    line-height: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
  .project-base-div{
    padding-bottom: 20px;
  }
  .pro-button-line-div{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .table-pro-head-div{
    /*background-color: #ed6b1a;*/
    color: #ed6b1a;
    border: 1px solid #cccccc;
  }
  .head-cols-1{
    width: 100px;
    text-align: center;
  }
  .picture-scroll-div{
    height: 290px;
    width: 100%;
    position: relative;
    margin-top: 30px;
  }
  .picture-scroll-div:hover .change-photo-div{
    display: block;
  }
  .change-photo-div{
    height: 74px;
    width: 100%;
    text-align: center;
    line-height: 74px;
    color: white;
    font-size: 20px;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    top: 0px;
    z-index: 2;
    cursor: pointer;
    display: none;
  }
  .pro-desc-content-text{
    height: 105px;
    width: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    margin: 20px 0;
    resize: none;
    font-size: 16px;
    color: #666666;
    font-family: 微软雅黑;
  }
  .desc-button-style{
    width: 80px;
    height: 30px;
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 3px;
    margin-left: 20px;
    cursor: pointer;
  }
  .pop-button-style{
    width: 80px;
    height: 30px;
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 3px;
    margin-left: 20px;
    cursor: pointer;
  }
  .pro-desc-head-div{
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    margin: 10px 0;
    color: #333333;
  }

  .pro-base-table{
    font-size: 20px;
    line-height: 30px;
    margin-top: 0px;
  }
  .font-size-16{
    font-size: 16px;
  }
  .city-input-style{
    width: 80px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
    padding:0 10px ;
  }
  .city-input-style:disabled{
    background-color: white;
    border: none;
  }
  .project-name-input-style{
    width: 400px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
    padding:0 10px ;
  }
  .project-name-input-style:disabled{
    background-color: white;
    border: none;
    padding:0;

  }
</style>
