<template>
  <div class="summary-container-div">
    <div class="summary-content-div">
      <div class="summary-head-div">
        <span>汇总</span>
      </div>
      <div class="summary-table-div">
        <summary-produce-line :tableArray="tableArray" v-if="tableArray.length > 0"></summary-produce-line>
      </div>
    </div>
  </div>
</template>

<script>
  import summaryProduceLine from "@/components/projectOne/summaryProduceLine"

  export default {
    name: "summary-component",
    props:['baseData'],
    components:{summaryProduceLine},
    data(){
      return{
        tableArray:[]
      }
    },
    beforeMount:function () {
      this.dealTableData(this.baseData);
    },
    methods:{
      changeProjectStatus:function () {

      },
      dealTableData:function (data) {

        for(var i=0;i<data.length;i++){
          if(i==0){
            let tempArray = [
              {
                value:"序号",
                bgColor:"#white",
                color:"#333333"
              },
              {
                value:"",
                bgColor:"white",
                color:"white"
              }
            ]
            for(var j=0;j<data[i].column.length;j++){
              let tempData = data[i].column[j];
              if(j == data[i].column.length - 1) {
                tempArray.push({
                  value: tempData,
                  bgColor: "#e3e3e3",
                  color: "#333333"
                })
              }else{
                tempArray.push({
                  value: tempData,
                  bgColor: "white",
                  color: "#333333"
                })
              }
            }
            this.tableArray.push(tempArray);
          }else if( i == 1 ){
            let tempArray = [
              {
                value:"",
                bgColor:"white",
                color:"white"
              },
              {
                value:"",
                bgColor:"white",
                color:"white"
              }
            ]
            for(var j=0;j<data[i].column.length;j++){
              let tempData = data[i].column[j];
              if(j == data[i].column.length - 1){
                tempArray.push({
                  value:tempData[0],
                  bgColor:"#e3e3e3",
                  color:"#333333"
                })
              }else{
                tempArray.push({
                  value:tempData[0],
                  bgColor:"white",
                  color:"#333333",
                  fontStyle:tempData[1]==1?"italic":""
                })
              }

            }
            this.tableArray.push(tempArray);
          }else if(i == data.length-1){
            let tempArray = [
              {
                value:"",
                bgColor:"white",
                color:"white"
              },
              {
                value:"占比",
                bgColor:"white",
                color:"#333333"
              }
            ]
            for(var j=0;j<data[i].column.length;j++){
              let tempData = data[i].column[j];
              if(j == data[i].column.length - 1) {
                tempArray.push({
                  value: tempData,
                  bgColor: "#e3e3e3",
                  color: "#333333"
                })
              }else{
                tempArray.push({
                  value: tempData,
                  bgColor: "white",
                  color: "#333333"
                })
              }
            }
            this.tableArray.push(tempArray);
          }
          else{

            let tempArray = [
              {
                value:data[i].segmentName,
                bgColor:"white",
                color:"#333333"
              },
              {
                childData:[
                  {
                    value:"单方造价<br/><span style='font-size: 10px'>(RMB/m2)</span>",
                    bgColor:"white",
                    color:"#333333"
                  },{
                    value:"总价<br/><span style='font-size: 10px'>(RMB)</span>",
                    bgColor:"white",
                    color:"#333333"
                  }
                ]
              }
            ]
            for(var j=0;j<data[i].perSquarePriceStr.length;j++){
              let tempData1 = data[i].perSquarePriceStr[j];
              let tempData2 = data[i].totalPriceStr[j];

              if(j == data[i].perSquarePriceStr.length - 1) {
                tempArray.push({
                  childData: [
                    {
                      value: tempData1,
                      bgColor: "#e3e3e3",
                      color: "#333333"
                    }, {
                      value: tempData2,
                      bgColor: "#e3e3e3",
                      color: "#333333"
                    }
                  ]
                });
              }else{
                tempArray.push({
                  childData: [
                    {
                      value: tempData1,
                      bgColor: "white",
                      color: "#333333"
                    }, {
                      value: tempData2,
                      bgColor: "white",
                      color: "#333333"
                    }
                  ]
                });
              }
            }
            this.tableArray.push(tempArray);
          }

        }
      }
    }
  }
</script>

<style scoped>
  .summary-head-div{
    padding: 20px 0;
  }
</style>
