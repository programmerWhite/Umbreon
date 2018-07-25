<template>
    <div class="project-home-div">
      <head-component></head-component>
      <div class="pro-home-content-div">
        <div class="pro-home-outer-div">
          <!--<div class="add-new-pro-line">-->
            <!--<div class="add-new-pro-button">-->
              <!--<router-link to="addNewProject">-->
                <!--<span class="add-label">+</span>-->
                <!--<span>新增项目</span>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</div>-->
          <div class="pro-one-container-div">
              <project-one v-for="(item,key) in allProjectData.projectsMsg" :projectType="projectType" :projectData="item" :key="key"></project-one>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import projectOne from "@/components/allProject/projectOne"

  export default {
    name: "all-project",
    components:{headComponent,projectOne},
    data(){
      return{
        currentPage:1,
        citiesId:"",
        allProjectData:{},//查询出来的所有 project
      }
    },
    beforeMount:function () {
      this.getAllProject();
    },
    computed:{
      projectType:function () {
        return this.$route.params.type;
      }
    },
    watch:{
        '$route':function (to,from) {
          this.getAllProject();
        }
    },
    methods:{
      getAllProject:function () {
        var This = this;

        var url = this.$store.state.other.ipAddress + "/manages/manageprojects!queryProjectsByConditionsEdit.action";

        if(this.$route.params.type == 1){
          url = this.$store.state.other.ipAddress + "/manages/manageprojects!queryProjectsByConditionsEdit.action";
        }else if(this.$route.params.type == 2){
          url = this.$store.state.other.ipAddress + "/manages/manageprojects!queryProjectsByConditionsView.action";
        }

        this.axios({
          url: url,
          method: "POST",
          params: {
            "userId": JSON.parse(sessionStorage.getItem("userInfo")).id,
            "currentPage": This.currentPage,
            "pageSize": 20,
            "citiesId": This.citiesId
          }
        }).then(function (response) {
          var data = response.data;
          This.allProjectData = data;

        });
      },
    }
  }
</script>

<style scoped>
  .pro-home-content-div{
    width: 1200px;
    margin: 0 auto;
  }
  .pro-home-head{
    display: flex;
    justify-content: space-between;
    height: 75px;
    align-items: stretch;

    margin-top: 20px;
  }
  .page-log{
    text-align: right;
    color: #2b3541;
    border-bottom: 2px solid ;
  }
  .page-log h2{
    line-height: 40px;
    margin: 0;
    font-weight: 100;
  }
  .filter-outer,
  .filter-1-div{
    display: flex;
    align-items: center;
  }
  .filter-1-div{
    margin-right: 15px;
  }
  .filter-button{
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .filter-button:hover{
    color: #ed6b1a;
  }
  .current-filter{
    color: white;
    background-color: #2b3541;
  }
  .search-button{
    cursor: pointer;
  }
  .add-new-pro-line{
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .add-new-pro-button{
    font-size: 16px;
    color: #2b3541;
    cursor: pointer;
  }
  .add-new-pro-button a{
    text-decoration: none;
    color: #2b3541;
    display: flex;
    align-items: center;
  }
  .add-label{
    margin-right: 10px;
    font-size: 30px;
  }
  .pro-one-container-div{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px 0;
  }

</style>
