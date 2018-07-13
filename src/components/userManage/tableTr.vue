<template>
  <tr class="tr-style" v-show="propsData != 'no'">
    <td style="width: 180px">{{propsData.referredName}}</td>
    <td style="width: 150px">{{propsData.name}}</td>
    <td style="width: 345px">{{propsData.companyName}}</td>
    <td style="width: 190px">{{propsData.departmentName}}</td>
    <td style="width: 170px">{{propsData.name}}</td>
    <td style="width: 125px">
      <!--<span class="operation-button color-green" @click="scanDetail" :userId="propsData.id">-->
        <!--<router-link to="'/scanUserDetail'+propsData.id">查看</router-link>-->
      <!--</span>-->
      <span class="operation-button color-green" @click="" :userId="propsData.id" @click="goToUserDetail">查看</span>
      <!--<span class="operation-button color-green" :userData="JSON.stringify(propsData)" @click="scanChangePassword">重置密码</span>-->
      <!--<span class="operation-button color-red" :userId="propsData.id" @click="confirmDeleteUser">删除</span>-->
    </td>
  </tr>

</template>

<script>
  import $ from "jquery"

  export default {
        name: "table-tr",
      props:["trData"],
      data(){
          return{
            propsData:{}
          }
      },
      beforeMount:function () {
        this.propsData = this.trData;
      },
      mounted:function () {

      },
      methods:{
          confirmDeleteUser:function (e) {
            var This = this;
            var userId = e.target.getAttribute('userId');

            this.$store.dispatch("dialogParameter",{
              type:"confirm",
              changeText:"您真的要执行删除操作吗？",
              button2:"取消",
              button1:"确定",
              button1CallBack:function () {
                This.propsData = "no";
                This.deleteOneUser(userId);
              }
            });

          },
        deleteOneUser:function (userId) {
          var This = this;
          this.axios({
            url: this.$store.state.other.ipAddress + "/manages/manageusers!deleteUserById.action",
            method: "POST",
            params: {
              "userId": userId,
            }
          }).then(function (response) {
              var data = response.data;
              This.$store.dispatch("dialogParameter",{
                type:"alert",
                changeText:"用户删除成功。",
                button1:"确认",
                button1CallBack:function () {

                }
              });
          });
        },
        /*调用父组件 显示detail 组件*/
        scanDetail:function (e) {
          var userId = e.target.getAttribute('userId');
          this.$emit('showDetail',userId);
        },
        /*调用父组件 显示changepassword 组件*/
        scanChangePassword:function (e) {
          var userData = e.target.getAttribute('userData');
          this.$emit('scanPassword',userData);
        },
        goToUserDetail:function (e) {
          var userId = e.target.getAttribute('userId');
          this.$router.push({
            name:"scanUserDetail",
            params:{
              userId:userId
            }
          })
        }
      }
    }
</script>

<style scoped>
  .tr-style td{
    text-align: center;
    height: 50px;
    border-left: 1px solid #cccccc;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
  }
  .tr-style td:first-child{
    border-left: none ;
  }
  .color-green{
    color: #1ca52f;
  }
  .color-red{
    color: #ff0101;
  }
  .operation-button{
    cursor: pointer;
  }
  .operation-button a{
    text-decoration: navajowhite;
    color: #1ca52f;
  }
</style>
