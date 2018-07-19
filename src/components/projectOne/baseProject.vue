<template>
  <div class="project-base-div">
    <div class="picture-scroll-div" >
      <div class="change-photo-div" @click="popAddProShow=true">修改图片</div>
      <picture-scroll :scrollImgData="imgArray"></picture-scroll>
    </div>
    <div class="pro-desc-outer-div">
      <div class="pro-desc-head-div">
        <div>
          <input class="project-name-input-style" type="text" :disabled="!projectTableEditSwitch" v-model="baseData.title" />
        </div>
        <div class="font-size-16">城市：<input class="city-input-style" type="text" :disabled="!projectTableEditSwitch" v-model="baseData.cityName"/></div>
      </div>
      <textarea class="pro-desc-content-text" :disabled="!projectTableEditSwitch" v-model="projectDescText"></textarea>
      <!--<div class="pro-button-line-div">-->
        <!--<button class="desc-button-style" @click="editProDesc(true)" v-show="!projectEditSwitch">编辑</button>-->
        <!--<button class="desc-button-style" @click="editProDesc(false)" @mousedown="initProjectDescText" v-show="projectEditSwitch">取消</button>-->
        <!--<button class="desc-button-style" v-show="projectEditSwitch">确认</button>-->
      <!--</div>-->
    </div>
    <div class="pro-base-table">
      <div class="pro-table-head">{{menuName}}</div>
      <div class="table-container-div">
        <div class="table-pro-head-div">
          <div class="head-cols-1">序号</div>
          <div class="head-cols-2"></div>
        </div>
        <table-component :tableConfig="tableConfig" @dataChange="dataChange" v-if="tableConfig.projectTableData.length > 0"></table-component>
        <div class="pro-button-line-div" v-if="roleId==3">
          <button class="desc-button-style" @click="editProTable(true)" v-show="!projectTableEditSwitch">编辑</button>
          <button class="desc-button-style" @click="editProTable(false)" v-show="projectTableEditSwitch">取消</button>
          <button class="desc-button-style" v-show="projectTableEditSwitch" @click="saveProjectData">确认</button>
        </div>
      </div>
    </div>
    <div class="shade" v-show="popAddProShow">
      <div class="modify-project-photo">
        <div class="pop-head-div">修改图片</div>
        <div class="img-container-div">
          <div class="img-photo-one" v-for="(item,key) in popImgArray" :key="key">
            <img class="upload-img" :src="item" />
            <img class="close-img" @click="deletePhoto(key)" src="../../assets/common/closeCircle.png" />
          </div>
          <div class="img-photo-one">
            <div class="orange-add-label" @click="addImgToFile">+</div>
          </div>
          </div>
        <div class="button-line-div">
          <button class="pop-button-style" @click="cancelPopPhoto">取消</button>
          <button class="pop-button-style" @click="changeProjectPhoto">确认</button>
        </div>
      </div>
    </div>
    <input class="add-img" ref="addImgInput" type="file" @change="uploadProjectImg" />
  </div>
</template>

<script>
    import pictureScroll from "@/components/common/pictureScroll"
    import tableComponent from "@/components/common/tableComponent"

    import $ from "jquery"

    export default {
        name: "base-project",
      props:["baseData","menuName"],
      components:{pictureScroll,tableComponent},
      data(){
          return {
            projectEditSwitch:false,//项目描述是否可以编辑开关
            projectTableEditSwitch:false,
            popAddProShow:false,/*修改图片显示隐藏变量*/
            imgData: {//支持的图片格式
              accept: 'image/gif, image/jpeg, image/png, image/jpg',
            },
            projectDescText:"",
            imgArray:[],
            popImgArray:[],
            tableConfig:{
              projectTableData:[],
              sessionSwitch:false,
              openEdit:true,
              editStatus:false
            },
            userInfo:{}
          }
      },
      computed: {
        roleId: function () {
          return this.userInfo.roleId;
        },
      },
      beforeMount:function () {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        this.projectDescText = this.baseData.description;

        /*根据#关键字做拆分*/
        if( this.baseData.photoes == ""){
          var imgTemp = [];
        }else{
          var imgTemp = this.baseData.photoes.split('#');
        }

        this.imgArray = this.cloneData(imgTemp);
        this.popImgArray = this.cloneData(imgTemp);

        if(this.baseData.recordsCode == null){
          this.tableConfig.projectTableData = [];
        }else{
          this.tableConfig.projectTableData = JSON.parse(this.baseData.recordsCode);
        }
      },
      methods:{
        changeProjectStatus:function () {

        },
        /*用户点击学习修改项目图片*/
        cancelPopPhoto:function(){
          this.popAddProShow = false;
          //还原 popImgArray 里面的图片数据
          this.popImgArray = this.cloneData(this.imgArray);
        },
        deletePhoto:function (index) {
          this.popImgArray.splice(index,1);
        },
        /*上传修改后的数据*/
        changeProjectPhoto:function () {
          var photoes = this.popImgArray.join("#");
          var projectId = this.$route.params.projectId;
          var This = this;


          if(photoes.length == 0){
            this.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目头像不能为空。",
              button1: "确认",
              button1CallBack:function () {

              },
            });
            return false;
          }

          this.axios({
            url:this.$store.state.other.ipAddress+"/manages/manageprojects!updatePhotoesOfOneProject.action",
            method:"post",
            params:{
              projectId:projectId,
              photoes:photoes
            }
          }).then(function (response) {
            var data = response.data;
            if(data.messageType == 1){
              This.popAddProShow = false;

              This.imgArray = [];
              setTimeout(function () {
                This.imgArray = This.cloneData(This.popImgArray);
              },10);

              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "项目图片修改成功。",
                button1: "确认",
                button1CallBack:function () {

                },
              });
            }
          });
        },
        /*调用文件上传 input*/
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
                This.popImgArray.push(data.newURL);
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

        editProDesc:function (type) {
          this.projectEditSwitch = type;
        },
        editProTable:function (type) {
          this.projectTableEditSwitch = type;
          if(type){
            this.tableConfig.editStatus = true;
          }else{
            this.tableConfig.projectTableData = [];
            this.tableConfig.editStatus = false;

            var This = this;
            setTimeout(function () {
              This.tableConfig.projectTableData = JSON.parse(This.baseData.recordsCode);
            },0);
          }
        },
        initProjectDescText:function () {
          this.projectDescText = this.baseData.description;
        },
        saveProjectData:function () {
          var projectId = this.$route.params.projectId;
          var title = this.baseData.title;

          if(title == " " || title == ""){
            this.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目标题不能为空。",
              button1: "确认",
              button1CallBack:function () {

              },
            });
            return false;
          }

          var cityName = this.baseData.cityName;
          if(cityName == " " || cityName == ""){
            this.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目城市不能为空。",
              button1: "确认",
              button1CallBack:function () {

              },
            });
            return false;
          }

          var description = this.projectDescText;

          if(description.length < 50  || description > 500){
            this.$store.dispatch("dialogParameter", {
              type: "alert",
              changeText: "项目描述内容请在50 到 500 字符之间。",
              button1: "确认",
              button1CallBack:function () {

              },
            });
            return false;
          }

          var recordsCode = JSON.stringify(this.tableConfig.projectTableData);

          var This = this;
          this.axios({
            url:this.$store.state.other.ipAddress+"/manages/manageprojects!updateOneProjectMsg.action",
            method:"post",
            params:{
              "projectId":projectId,
              "title":title,
              "description":description,
              "cityName":cityName,
              "recordsCode":recordsCode
            }
          }).then(function (response) {
            var data = response.data;
            if(data.messageType == 1){
              This.projectTableEditSwitch = false;
              This.$store.dispatch("dialogParameter", {
                type: "alert",
                changeText: "项目内容修改成功",
                button1: "确认",
                button1CallBack:function () {

                },
              });
            }
          });
        },
        //表格中数据发送变化调用
        dataChange:function (data) {
          this.tableConfig.projectTableData = data;
        },
        /*深复制方法*/
        cloneData:function (obj) {
          var buf;
          if(obj instanceof Array){
            buf = [];
            var i = obj.length;
            while(i--){
              buf[i] = this.cloneData(obj[i]);
            }
            return buf;
          }else if(obj instanceof Object){
            buf = {};
            for(var k in obj){
              buf[k] = this.cloneData(obj[k]);
            }
            return buf;
          }else{
            return obj;
          }
        }
      }
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
    background-color: #ed6b1a;
    color: white;
    border: 1px solid #ed6b1a;
  }
  .head-cols-1{
    width: 100px;
    text-align: center;
  }
  .picture-scroll-div{
    height: 290px;
    width: 100%;
    position: relative;
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
    line-height: 40px;
    margin-top: 20px;
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
