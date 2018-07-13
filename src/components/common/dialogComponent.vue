<template>
  <div class="dialog-container-div" v-show="dialogShow">
    <div class="dialog-one-div" :class="dialogShow?'dialog-show-style':'dialog-hide-style'" v-if="dialogType=='alert'">
      <div class="dialog-text" v-html="dialogText"></div>
      <div class="dialog-button-container-div">
        <div class="dialog-button button-style" @click="buttonClick">{{dialogButton1}}</div>
      </div>
    </div>
    <div class="dialog-one-div" :class="dialogShow?'dialog-show-style':'dialog-hide-style'" v-else-if="dialogType=='confirm'">
      <div class="dialog-text" v-html="dialogText"></div>
      <div class="dialog-button-container-div">
        <div class="dialog-button button-style" @click="buttonClick">{{dialogButton1}}</div>
        <div class="dialog-button2 button-style" @click="button2Click">{{dialogButton2}}</div>
      </div>
    </div>
    <div class="dialog-one-div load-container" :class="dialogShow?'dialog-show-style':'dialog-hide-style'" v-else-if="dialogType=='load'">
      <img class="load-img-style" src="../../assets/timg.gif" />
    </div>
  </div>
</template>

<script>

    export default {
      name: "dialog-component",
      data(){
          return{
        }
      },
      computed:{
        dialogType:function () {
          return this.$store.state.dialog.type;
        },
        dialogShow:function () {
          return this.$store.state.dialog.show;
        },
        dialogButton1:function () {
          return this.$store.state.dialog.button1;
        },
        dialogButton2:function () {
          return this.$store.state.dialog.button2;
        },
        dialogText:function () {
          return this.$store.state.dialog.text;
        }
      },
      methods:{
        buttonClick:function () {
          this.$store.dispatch("button1Click1");
        },
        button2Click:function () {
          this.$store.dispatch("button1Click2");
        }
      }
    }
</script>

<style scoped>
  .dialog-container-div{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .dialog-one-div{
    width: 400px;
    background-color: white;
    padding:30px 10px;
    border-radius: 10px;
    position: relative;
  }
  .dialog-button{
    background-color: #ed6b1a;
    color: white;
  }
  .dialog-button2{
    background-color: #cccccc;
    color: white;
    margin-left: 40px;
  }
  .button-style{
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 6px;
    cursor: pointer;
  }
  .dialog-button-container-div{
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-text{
    font-size: 16px;
    color: #212121;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .dialog-show-style{
     animation: topMoveShow 0.2s linear forwards;
  }

  .load-img-style{
    width: 200px;
  }

  @keyframes topMoveShow {
    0%{
      top: -100px;
      opacity: 0;
    }
    100%{
      top: 0px;
      opacity: 1;
    }
  }

  .dialog-hide-style{
    animation: topMoveHide 0.2s linear forwards;
  }


  @keyframes topMoveHide {
    0%{
      top: 0px;
      opacity: 1;
    }
    100%{
      top: -100px;
      opacity: 0;
    }
  }

  .load-container{
    width: 200px;
  }
</style>
