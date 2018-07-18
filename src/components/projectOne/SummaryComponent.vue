<template>
  <div class="summary-container-div">
    <change-project-status @changeProjectStatus="changeProjectStatus"></change-project-status>
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
  import changeProjectStatus from "@/components/projectOne/changeProjectStatus"
  import summaryProduceLine from "@/components/projectOne/summaryProduceLine"

  export default {
    name: "summary-component",
    props:['baseData'],
    components:{changeProjectStatus,summaryProduceLine},
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
                bgColor:"#ed6b1a",
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
              tempArray.push({
                value:tempData,
                bgColor:"white",
                color:"#333333"
              })
            }
            this.tableArray.push(tempArray);
          }else if( i == 1){
            let tempArray = [
              {
                value:"",
                bgColor:"#ed6b1a",
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
              tempArray.push({
                value:tempData,
                bgColor:"white",
                color:"#333333"
              })
            }
            this.tableArray.push(tempArray);
          }else{

            let tempArray = [
              {
                value:data[i].segmentName,
                bgColor:"#ed6b1a",
                color:"white"
              },
              {
                childData:[
                  {
                    value:"单方造价<br/><span style='font-size: 10px'>(RMB/m2)</span>",
                    bgColor:"white",
                    color:"#ed6b1a"
                  },{
                    value:"总价<br/><span style='font-size: 10px'>(RMB)</span>",
                    bgColor:"white",
                    color:"#ed6b1a"
                  }
                ]
              }
            ]
            for(var j=0;j<data[i].perSquarePriceStr.length;j++){
              let tempData1 = data[i].perSquarePriceStr[j];
              let tempData2 = data[i].totalPriceStr[j];
              tempArray.push({
                childData:[
                  {
                    value:tempData1,
                    bgColor:"white",
                    color:"#333333"
                  },{
                    value:tempData2,
                    bgColor:"white",
                    color:"#333333"
                  }
                ]
              });
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
