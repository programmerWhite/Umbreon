<template>
  <div class="add-project-page-div">
    <head-component></head-component>
    <div class="add-new-pro-div">
      <div class="pro-home-head">
        <div class="page-log">
          <h2>新增项目</h2>
          <h2 class="font-size-18">NEW Project</h2>
        </div>
      </div>
      <div class="add-new-content-div">
        <div class="input-line-div">
          <div class="input-label">项目名称：</div>
          <div class="input-outer-div">
            <input type="text" class="input-style" v-model="projectTitle"/>
          </div>
        </div>
        <div class="input-line-div flex-start">
          <div class="input-label">项目描述：</div>
          <div class="input-outer-div">
            <textarea type="text" class="text-area-style" v-model="projectDesc"></textarea>
          </div>
        </div>
        <div class="input-line-div">
          <div class="input-label">城市：</div>
          <div class="input-outer-div">
            <input type="text" class="input-style" v-model="cityName"/>
          </div>
        </div>
        <div class="input-line-div flex-start">
          <div class="input-label">项目区域：</div>
          <div class="input-outer-div display-flex-style width-540">
            <div class="check-zone-container" v-for="(item,key) in dataZone">
              <div class="no-choice-div" :class="item.isVisible==1?'choice-div':''" :index="key" @click="changeNewVisible"></div>
              <div class="project-name">{{item.title}}</div>
            </div>
          </div>
        </div>
        <div class="input-line-div">
          <div class="table-container-div">
            <table-component :tableData="projectTableData" v-if="projectTableData.length > 0"></table-component>
          </div>
        </div>
        <div class="input-line-div">
          <div class="add-photo-container-div">
            <p v-if="imgArray.length == 0">这里可以添加项目介绍图片</p>
            <div v-else class="img-container-div">
              <div class="img-photo-one" v-for="(item,key) in imgArray" :key="key">
                <img class="upload-img" :src="item" />
                <img class="close-img" @click="deletePhoto(key)" src="../../assets/common/closeCircle.png" />
              </div>
            </div>
            <div class="add-img-div">
              <span class="orange-add-label" @click="addImgToFile">+</span>
            </div>
          </div>
        </div>
        <div class="add-pro-button-line">
          <button class="button-style" @click="backToProjectAll">取消</button>
          <button class="button-style" @click="addNewProject">确定</button>
        </div>
      </div>
    </div>
    <input class="add-img" ref="addImgInput" type="file" @change="uploadProjectImg" />
  </div>
</template>

<script>
  /*desc:
  * 组件 的 关闭 需要调用 父级组件中的 方法，实现 关闭
  * 方法名：hideAddNewPro
  * */
  import headComponent from "@/components/common/headComponent"
  import tableComponent from "@/components/common/tableComponent"
  import $ from "jquery"

  export default {
    name: "add-new-project",
    components:{headComponent,tableComponent},
    data(){
      return{
        dataZone:[],//项目区域  数据
        projectTableData:[],/*生成项目表格数据*/
        projectTitle:"",
        cityName:"",
        projectDesc:"",
        stageString:"",
        recordsCode:"",
        imgArray: [],
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
        }
      }
    },
    created:function () {
      this.getInitProjectData();
    },
    methods:{
      changeNewVisible:function (e) {
        var index = e.target.getAttribute("index");
        this.$set(this.dataZone,index,{
          isVisible:this.dataZone[index].isVisible==1?0:1,
          title:this.dataZone[index].title,
          id:this.dataZone[index].id,
        })
      },
      /*获取项目显示 初始数据*/
      getInitProjectData:function () {
        var This = this;
        this.axios({
          url:this.$store.state.other.ipAddress + "/manages/manageprojects!queryCommonMsgForAddProject.action",
          method: "POST",
          params:{}
        }).then(function (response) {
            var data = response.data;
            This.dataZone = data.segment;

            This.projectTableData = JSON.parse(data.commonB0).rows;
        });
      },
      /*添加一个新项目*/
      addNewProject:function () {
        var title = this.projectTitle;
        var photoes = this.imgArray.join("@");
        var cityName = this.cityName;
        var description = this.projectDesc;
        var stageString = "";
        var recordsCode = JSON.stringify(this.projectTableData);

        var dataZoneArray = [];
        for(var item of this.dataZone){
          if(item.isVisible == 1){
            dataZoneArray.push(item.id);
          }
        }
        var segmentString = dataZoneArray.join("@");

        if(title == "" || title == " "){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "项目名称不能为空。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(description == "" || description == " "){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "项目描述不能为空。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(cityName == "" || cityName == " "){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "项目城市不能为空。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(dataZoneArray == "" || dataZoneArray == " "){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "项目区域必须勾选。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(this.imgArray.length == 0){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "请添加项目图片。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        var postData = {
          "title":title,
          "photoes":photoes,
          "cityName":cityName,
          "stageString":stageString,
          "recordsCode":recordsCode,
          "segmentString":segmentString,
          "description":description
        };

        this.axios({
          url:this.$store.state.other.ipAddress + "/manages/manageprojects!addNewProject.action",
          method:"post",
          params:postData,
        }).then(function (response) {

          This.$router.push({
            name:"projectOne",
            parmas:{
              projectId:response.data.projectId
            }
          })

        });

      },

      backToProjectAll:function () {
        this.$router.push({
          name:"allProject"
        });
      },

      addImgToFile:function () {
        this.$refs.addImgInput.click();
      },
      /*上传图片功能*/
      uploadProjectImg:function (event) {
        let reader =new FileReader();
        let img1=event.target.files[0];

        let type=img1.type;//文件的类型，判断是否是图片
        let size=img1.size;//文件的大小，判断图片的大小

        if(this.imgData.accept.indexOf(type) == -1){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "请选择我们支持的图片格式。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        if(size>3145728){
          this.$store.dispatch("dialogParameter", {
            type: "alert",
            changeText: "请选择3M以内的图片。",
            button1: "确认",
            button1CallBack:function () {

            },
          });
          return false;
        }

        reader.readAsDataURL(img1);

        var This = this;

        reader.onload = function () {
          let form = new FormData();
          form.append('token',sessionStorage.getItem('token'));
          form.append('imageCode',this.result);

          $.ajax({
            url:This.$store.state.other.ipAddress + '/manages/files!uploadProjectPhoto.action',
            data:form,
            type:"post",
            async:false,
            processData:false,
            xhrFields:{
              withCredentials: true
            },
            // beforeSend: function(xhr) {
            //   xhr.setRequestHeader('Content-Type','multipart/form-data');
            // },
            crossDomain:true,
            contentType:false,
            success:function (data) {
              This.imgArray.push(data.newURL);
            },
            error:function () {
              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "上传图片出错。",
                button1: "确认",
                button1CallBack:function () {

                },
              });
            }
          });

        }
      },
      /*删除一张图片*/
      deletePhoto:function (index) {
        this.imgArray.splice(index,1);
      },
    }
  }
</script>

<style scoped>
  .add-new-content-div{
    width: 935px;
    margin: 0 auto;
  }
  .pro-home-head{
    display: flex;
    justify-content: space-between;
    height: 75px;
    align-items: stretch;
    margin-top: 15px;
  }
  .add-new-pro-div{
    width: 1200px;
    margin: 0 auto;
    background-color: white;
    padding:0 10px 30px 10px;
    border-radius: 6px;
  }
  .page-log{
    text-align: right;
    color: #2b3541;
    border-bottom: 2px solid ;
    height: 80px;
  }
  .page-log h2{
    line-height: 40px;
    margin: 0;
    font-size: 24px;
    color: #2b3541;
    font-weight: 100;
  }
  .width-540{
    width: 540px;
  }
  .input-line-div{
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  .input-label{
    width: 150px;
    text-align: right;
  }
  .input-style{
    height: 40px;
    width: 540px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
  .text-area-style{
    height: 120px;
    width: 540px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
  .select-style{
    height: 40px;
    width: 540px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
  .flex-start{
    align-items: flex-start;
  }
  .no-choice-div{
    height: 16px;
    width: 16px;
    border-radius: 2px;
    margin-left: 20px;
    cursor: pointer;
    background: url("../../assets/common/noChoice.png");
  }
  .choice-div{
    background: url("../../assets/common/choice.png");
  }
  .project-name{
    margin-left: 10px;
    color: #2b3541;
    font-size: 14px;
  }
  .check-zone-container{
    width: 120px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding-bottom: 10px;
  }
  .button-style{
    background-color:#ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
    border-radius: 6px;
    width: 90px;
    height: 30px;
    cursor: pointer;
  }
  .button-style:last-child{
    margin-left:40px ;
  }

  .add-pro-button-line{
    display: flex;
    align-items: center;
    margin-top: 50px;
    justify-content: center;
  }
  .display-flex-style{
    display: flex;
    flex-wrap: wrap;
  }
  .font-size-18{
    font-size: 18px !important;
  }
  .table-container-div{
    width: 100%;
  }
  .add-photo-container-div{
    min-height: 140px;
    width: 540px;
    border: 1px solid #cccccc;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .add-photo-container-div:hover{
    border-color: #ed6b1a;
  }
  .add-photo-container-div p{
    font-size: 16px;
    color: #999999;
    margin-top: 30px;
    text-align: center;
  }
  .orange-add-label{
    color: #ed6b1a !important;
    font-size: 40px !important;
    margin-top: 20px !important;
    font-weight: 500;
  }
  .add-img{
    display: none;
  }
  .add-img-div{
    text-align: center;
  }
  .img-container-div{

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
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
  .img-photo-one{
    height: auto;
    width: 110px;
    position: relative;
    margin-right: 20px;
  }
  .img-photo-one:nth-child(4n){
    margin-right: 0px;
  }
</style>
