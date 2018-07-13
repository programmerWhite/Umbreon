<template>
    <div class="home-page-div">
      <head-component></head-component>

    </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"

  export default {
      name: "home",
      components:{headComponent}

  }
</script>

<style scoped>
  body{
    background-color: #eeeeee;
  }
</style>
