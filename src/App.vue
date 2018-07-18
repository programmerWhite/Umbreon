<template>
  <div id="app">
    <router-view></router-view>
    <dialog-component></dialog-component>
  </div>
</template>

<script>

  import dialogComponent from "@/components/common/dialogComponent"

  export default {
    name: 'App',
    components:{dialogComponent}
  }
</script>

<style>

</style>
