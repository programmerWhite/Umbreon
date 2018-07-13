<template>
  <div class="project-one-container">
    <head-component></head-component>
    <div class="pro-one-content-div">
      <aside class="pro-menu-container-div">
        <slide-menu-component></slide-menu-component>
      </aside>
      <section class="pro-set-div">

      </section>
    </div>
  </div>
</template>

<script>
  import headComponent from "@/components/common/headComponent"
  import slideMenuComponent from "@/components/projectOne/slideMenuComponent"

  export default {
      name: "project-one",
      components:{headComponent,slideMenuComponent},

  }
</script>

<style scoped>
  .pro-one-content-div{
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    width: 1200px;
    margin: 0 auto;
  }
  .pro-menu-container-div{
    width: 250px;
    flex-shrink: 0;
  }
  .pro-set-div{
    margin-left: 10px;
    width: 100%;
  }
</style>
