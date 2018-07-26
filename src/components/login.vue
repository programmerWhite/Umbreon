<template>
  <div>
    <nav class="nav-style">
      <div class="nav-inner-div">
        <div class="log-div">
          <img src="../assets/logImg.png" />
        </div>
        <div class="menu-list-style"></div>
      </div>
    </nav>
    <section class="home-container-div">
      <div class="home-img-div"></div>
      <div class="home-content-div">
        <div class="login-part-div">
          <login-component></login-component>
        </div>
      </div>
    </section>
    <foot-component></foot-component>
  </div>
</template>

<script>
    import footComponent from "@/components/common/footComponent"
    import loginComponent from "@/components/common/loginComponent"
    import store from "./store"

    export default {
        name: "home",
      store,
      components:{footComponent,loginComponent}
    }
</script>

<style scoped>
  .home-container-div{
    height: 580px;
    width: 100%;
    min-width: 1200px;
    position: relative;
  }
  .home-img-div{
    height: 580px;
    width: 100%;
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0px;
    background: url("../assets/homeImg/home.png");
    background-position: center ;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .nav-style{
    height: 60px;
    width: 100%;
  }
  .nav-inner-div{
    width: 1200px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .home-content-div{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }
  .login-part-div{
    position: absolute;
    z-index: 10;
    right: 0px;
    top: 100px;
  }
  .log-div img{
    width: 310px;
  }
</style>
