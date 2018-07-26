import vue from 'vue';
import Vuex from 'vuex';

vue.use(Vuex);

const dialogModules = {
  state:{
    show:false,
    type:"text",
    text:"",
    button1:"好的",
    button2:"算了",
    button1CallBack:null,
    button2CallBack:null
  },
  mutations:{
    changeType:function (state,type) {
      state.type = type;
    },
    changeButton1:function (state,text) {
      state.button1 = text;
    },
    changeButton2:function (state,text) {
      state.button2 = text;
    },
    button1Cback:function (state,callback) {
      state.button1CallBack = callback;
    },
    button2Cback:function (state,callback) {
      state.button2CallBack = callback;
    },
    changeText:function (state,text) {
      state.text = text;
    },
    dialogShow:function (state) {
      state.show = true;
    },
    closeDialog:function (state) {
      state.show = false;
    },
    runButton1Cback:function (state) {
      if(state.button1CallBack){
        state.button1CallBack();
      }
    },
    runButton2Cback:function (state) {
      if(state.button2CallBack){
        state.button2CallBack();
      }
    }
  },
  actions:{
    button1Click1:function ({commit}) {
      commit("runButton1Cback");
      commit("closeDialog");
    },
    button1Click2:function ({commit}) {
      commit("runButton2Cback");
      commit("closeDialog");
    },
    dialogParameter:function ({commit},dialogObj) {
      if(!!dialogObj.type){
        commit("changeType",dialogObj.type);
      }
      if(!!dialogObj.changeText){
        commit("changeText",dialogObj.changeText);
      }
      if(!!dialogObj.button1){
        commit("changeButton1",dialogObj.button1);
      }
      if(!!dialogObj.button2){
        commit("changeButton2",dialogObj.button2);
      }
      if(!!dialogObj.button1CallBack){
        commit("button1Cback",dialogObj.button1CallBack);
      }
      if(!!dialogObj.button2CallBack){
        commit("button2Cback",dialogObj.button2CallBack);
      }

      if(dialogObj.switch == "close"){
        commit("closeDialog");
      }else{
        commit("dialogShow");
      }


    }
  }
};

const other = {
  state:{
    ipAddress:"http://192.168.128.164:8087",
    token:""
  },
  mutations:{
    changeToken:function (state,token) {
      state.token = token;
    }
  }
}

export default new Vuex.Store({
  modules:{
    dialog:dialogModules,
    other:other
  }
});
